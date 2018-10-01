const app = require('../app')
const admin = require('firebase-admin');
const helpers = require('./helper-functions')
const {db, firebaseAuth, adminAuth} = require('../helpers/firestore-admin');
const here_api = require('../secrets/hereAPI.json')
const fetch = require('node-fetch')

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
  let updatedUserData = await updateUserCoordsAndAddress(data);
  data = updatedUserData

  const USER_COLL = process.env.DB_USER_COLL || 'dev_env_users';
  
  /*
  get res.locals.userRecord from previous middleware, 
  and use the FIREBASE AUTH UserID as the key for the db entry 
  */
  db.collection(USER_COLL).doc(res.locals.userRecord.uid).set(data)
    .then(writeTime => {
      // console.log(`\n===\nSaved new user with id...${res.locals.userRecord.uid}\n `)
      next();   // next must be called inside of then()
    })
    .catch(function(error) {
      console.log("Error fetching user data:", error.message);
    });      
}
// =======================================
// GET CURRENT USER OBJECT FROM FIREBASE
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


async function updateUserCoordsAndAddress(userData){
  let coordinates = []
  let address = userData.address;
  const URL = here_api.geocodeURL+address
  console.log('URL IS:   ', URL)
  // const URL = 'https://geocoder.api.here.com/6.2/geocode.json?app_id=V6PIkh4NxmLvNdagihaa&app_code=QB2fWuLaD1jjddRZzCwa-Q&searchtext=32%20cecil%20street%20fitzroy'
  const resultData = await fetch(URL)
    .then(d=>d.json())
    .catch(err => console.log('ERROR IN FETCHING GEOCODE\n ', err))
  // resultData.then(d=> console.log(resultData.Response.View[0].Result[0]))
  let lat = resultData.Response.View[0].Result[0].Location.DisplayPosition.Latitude
  let lon = resultData.Response.View[0].Result[0].Location.DisplayPosition.Longitude
  updatedAddress = resultData.Response.View[0].Result[0].Location.Address.Label
  coordinates =[lat,lon]
  // console.log('\n=====\n', resultData.Response.View[0].Result[0].Location.DisplayPosition)
  console.log('\n=====\n', coordinates)
  userData.address = updatedAddress;
  userData.coordinates = coordinates;
  return userData;
}

module.exports = middleware;

// =======================================
// REFERENCE DOCS
// =======================================

// https://handyman.dulare.com/passing-variables-through-express-middleware/    --> passing data within the server

// https://firebase.google.com/docs/auth/admin/manage-users      --> create and manage users from the node server


// https://medium.com/@codemonk/using-firebase-as-an-authenticating-middleware-in-express-js-99df5f19302f    -->using firebase auth check as middleware:>> 
