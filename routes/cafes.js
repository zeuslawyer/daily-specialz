var express = require('express');
var router = express.Router();
// var {createNewFirebaseUser} = require('../helpers/helper-functions')
const middleware = require('../helpers/middleware');
const helpers = require('../helpers/helper-functions');
const {db, firestore_db, adminAuth} = require ('../helpers/firestore-admin')

const SPECIALS_COLLECTION= process.env.DB_SPECIALS_COLLECTION  || 'dev_env_specials';
const USERS_COLLECTION= process.env.DB_SPECIALS_COLLECTION  || 'dev_env_users';


router.get('/', function(req, res, next) {
  // redirect to login page if user comes to just /cafes
  res.redirect('/cafes/login')
});

// =======================================
// REGISTER NEW CAFE   /cafes/register
// =======================================
router.get('/register', function(req, res, next) {
  res.render('./cafe/cafe-register.ejs');
});


router.post('/register', middleware.createNewFirebaseUser, middleware.saveUserToDb, (req, res)=>{
  // get uid from res.locals from middleware and redirect to that route to show list of specials
  let uid = res.locals.userRecord.uid
  res.redirect('/cafes/'+uid)
})

// =======================================
// LOGIN  CAFE  /cafes/login
// =======================================
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
      res.redirect('/cafes/'+userRecord.uid);
    })
    .catch(function(error) {
      console.log("============\nError fetching user data:", error);
      res.render('error.ejs', {errorMessage: error.message})
    });
  
});

// =======================================
// NEW SPECIALS FORM     /cafes/id/new
// =======================================

router.get('/:userId/new',  async function(req, res, next) {
  let userId = req.params.userId;
  res.render('specials-form.ejs', {userID:userId}) 

});


router.post('/:userId',   saveSpecialsToDatabase, getDocId, function(req, res, next) {
  // console.log(`\n received doc id from res.locals object... - doc id is \n${res.locals.specials_ref_id}\n`)
  res.redirect('/cafes/'+req.params.userId)
});

// =======================================
//  SHOW LIST OF SPECIALS - CAFE    /cafes/id
// =======================================

router.get('/:userId', function(req, res, next) {
  let uid = req.params.userId
  var docRefObject = db.collection('dev_env_users').doc(uid) ////returns a documentReference
  var snap = docRefObject.get() // returns a promise
  snap.then( (snap) => {
    if(snap.exists){
      res.render('cafe-profile.ejs')
    } else(
      res.render('error.ejs', {errorMessage: 'No such resource. Oopsie.'})
    )
  })
  
});


module.exports = router;

// =======================================
// MIDDLEWARE
// =======================================

function saveSpecialsToDatabase(req, res, next){ 
  let data = req.body.specials
  data.user_id = req.params.userId
  
  db.collection(SPECIALS_COLLECTION).add(data)
    .then(ref => {
          //REFERENCE on passing data between middleware and across app:
        // https://handyman.dulare.com/passing-variables-through-express-middleware/
      res.locals.specials_ref_id = ref.id;
      // add ref to specials document in the user's document, in an array
      helpers.updateSpecialsArray(req.params.userId, ref.id)
      next();   // next must be called inside of then()
    });
}

function getDocId(req, res, next) {
  console.log('\n=====\nres.locals.specials_ref_id has a value:  ', res.locals.specials_ref_id ? 'TRUE' : 'FALSE' , `doc is ${res.locals.specials_ref_id}\n`)
  next()
}
