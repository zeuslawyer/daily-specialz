var express = require('express');
var router = express.Router();

//ACTIONS & HANDLERS
const middleware = require('../helpers/middleware');
const saveSpecialsToDatabase = require("../actions/save-specials-to-db");
const routeCafesId = require('./handlers/route-cafes-id')
const getCafeById = require('../actions/get-cafe-by-id')
const addSpecialsToCafe = require('../actions/add-specials-to-cafe')

//FIREBASE SETUP
const {db, firestore_db, adminAuth} = require ('../helpers/firestore-admin')
const USERS_COLLECTION= process.env.DB_SPECIALS_COLLECTION  || 'dev_env_users';


// =======================================
//  SHOW CAFE PROFILE/ SPECIALS - CAFE    /cafes/id
// =======================================

router.get('/:userId', routeCafesId)  //EOM

// =======================================
// LOGIN  CAFE  /cafes/login
// =======================================

router.get('/', function(req, res, next) {
  // redirect to login page if user comes to just /cafes
  res.redirect('/cafes/login')
});


/* GET - cafe LOGIN PAGE */
router.get('/login', function(req, res, next) {
  res.render('./cafe/cafe-login.ejs');
});

/* POST-  cafe LOGIN page */
router.post('/login', function(req, res, next) {
  adminAuth.getUserByEmail(req.body.email)             
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      // console.log("========\nSuccessfully fetched user data:", userRecord.toJSON());
      // getCafeById(userRecord.uid)
      //   .then( (cafedoc) => addSpecialsToCafe(cafedoc))
      //   .then(res.redirect('/cafes/'+userRecord.uid))
      res.redirect('/cafes/'+userRecord.uid);
    })
    .catch(function(error) {
      console.log("============\nError fetching user data:", error);
      res.render('error.ejs', {errorMessage: error})
    });
  
});






module.exports = router;






// =======================================
// MIDDLEWARE
// =======================================

function getDocId(req, res, next) {
  // console.log('\n=====\nres.locals.specials_ref_id has a value:  ', res.locals.specials_ref_id ? 'TRUE' : 'FALSE' , `doc is ${res.locals.specials_ref_id}\n`)
  next()
}
