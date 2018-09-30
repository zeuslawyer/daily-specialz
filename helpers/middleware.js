const app = require('../app')
const admin = require('firebase-admin');
const helpers = require('./helper-functions')
const db = require('../helpers/firestore-setup');


const middleware = {}

// =======================================
// CREATE USER and SAVE to FIREBASE
// =======================================
middleware.createNewFirebaseUser = (req, res, next) => {
    const userObject = req.body
    admin.auth().createUser({
        email: userObject.email,
        emailVerified: false,
        password: userObject.password,
        displayName: userObject['display-name'],
        photoURL: userObject.photoURL,
        disabled: false,
      })
        .then(function(userRecord) {
          console.log("Successfully created new Firebase User Object:>>  ", userRecord.uid);
          // firebase user UID becomes the document ID in the firestore database for easier cross-ref
          res.locals.userRecord = userRecord
          next()
        })
        .catch(function(error) {
          console.log("Error creating new user:", error);
          res.render('error.ejs', {errorMessage: error})
        //   next(error)
        });
}

middleware.saveUserToDb = function(req, res, next){
  let data = req.body
  const USER_COLL = process.env.DB_USER_COLL || 'dev_env_users';
//get res.locals.userRecord from previous middleware
  db.collection(USER_COLL).doc(res.locals.userRecord.uid).set(data)
    .then(writeTime => {
      console.log(`saved new user....with id...${res.locals.userRecord.uid}\n `)
      next();   // next must be called inside of then()
    })
    .catch(function(error) {
      console.log("Error fetching user data:", error);
    });      
}


module.exports = middleware;

// =======================================
// REFERENCE DOCS
// =======================================

// https://handyman.dulare.com/passing-variables-through-express-middleware/    --> passing data within the server

// https://firebase.google.com/docs/auth/admin/manage-users      --> create and manage users from the node server