const app = require('../app')
const {db, admin, firebaseAuth, adminAuth} = require('../helpers/firestore-admin');
const here_api = require('../secrets/hereAPI.json')
const fetch = require('node-fetch')
const updateUserCoordsAndAddress = require('../actions/update-User-Coords-And-Address')

//GEOFIRE
const {GeoFirestore} = require('geofirestore')

//setup database refs
const USER_COLLECTIONECTION = process.env.DB_USER_COLLECTION || 'dev_env_users';
const SPECIALS_COLLECTION = process.env.DB_SPECIALS_COLLECTION || 'dev_env_specials';

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
          // console.log("Successfully created new Firebase User Object:>>  ", userRecord.uid);
          
          // firebase user UID becomes the document ID in the firestore database for easier cross-ref
          res.locals.userRecord = userRecord
          // console.log('\nATTACHED to LOCALS => \n', res.locals.userRecord);
          next()
        })
        .catch(function(error) {
          console.log("Error creating new user:", error);
          res.render('error.ejs', {errorMessage: error})
        //   next(error)
        });
}

middleware.saveUserToDb = async function(req, res, next){
  let data = req.body
  data.specials_refs = []
  data = await updateUserCoordsAndAddress(data);
  
  const USER_COLLECTION = process.env.DB_USER_COLLECTION || 'dev_env_users';
  
  /*
  get res.locals.userRecord from previous middleware, 
  and use the FIREBASE AUTH UserID as the key for the db entry 
  */
  let userId = res.locals.userRecord.uid
  // db.collection(USER_COLLECTION).doc(userId).set(data)
  //   .then(writeTime => {
  //     // console.log(`\n===\nSaved new user with id...${res.locals.userRecord.uid}\n `)
  //     next();   // next must be called inside of then()
  //   })
  //   .catch(function(error) {
  //     console.log("Error fetching user data:", error.message);
  //   });  
  
  //GEOFIRE SET
  const geofirestore = new GeoFirestore(db.collection(USER_COLLECTION))
  var setData = {}
  setData[userId] = data
  geofirestore.set(setData)
  .then((docRefID) => console.log(`=====\nDocRefID = ${docRefID}, ${Object.keys(docRefID)}, and uid is ${userId}\n`)) // ID of newly added document
  .then(d=> next())
  .catch( err => console.log('ERROR \n ....   ', error))
}


// =======================================
// GET CURRENT USER OBJECT FROM FIREBASE AUTH
// =======================================
middleware.getCurrentUser = function (req, res, next) {
  console.log('REQ PATH = ',req.path, '\n=========\n')
  console.log(req.body)
  adminAuth.getUserByEmail(req.body.email)
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      res.locals.currentUser = userRecord.toJSON();
      console.log("Successfully fetched user data:", res.locals.currentUser);
      next();
    })
    .catch(function(error) {
      console.log("Error fetching user data:", error);
      next()
    });
}


middleware.isAuthenticated = function (req, res, next) {
  let user  = firebaseAuth.currentUser;
  if (user !== null) {
    req.user = user;
    next();
  } else {
    res.redirect('error', {errorMessage: 'You need to log in to access this page'})
  }
}



module.exports = middleware;

// =======================================
// REFERENCE DOCS
// =======================================

// https://handyman.dulare.com/passing-variables-through-express-middleware/    --> passing data within the server

// https://firebase.google.com/docs/auth/admin/manage-users      --> create and manage users from the node server


// https://medium.com/@codemonk/using-firebase-as-an-authenticating-middleware-in-express-js-99df5f19302f    -->using firebase auth check as middleware:>> 
