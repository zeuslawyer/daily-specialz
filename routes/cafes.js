var express = require('express');
var router = express.Router();
// var {createNewFirebaseUser} = require('../helpers/helper-functions')
const middleware = require('../helpers/middleware');
const {db, firebaseAuth, adminAuth} = require ('../helpers/firestore-admin')



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
  adminAuth.getUserByEmail(req.body.email)              //TODO - refactor to use DB instead of AdminAuth
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

//YWnHjZFLDXf68CXCjHib13IM8oO2
router.get('/:userId/new',  async function(req, res, next) {
  let userId = req.params.userId;
  adminAuth.getUser(userId)                 //TODO - refactor to use DB instead of AdminAuth
    .then(function(userRecord) {

      /// ???????????????
    })
    .then(function(user) {
      res.render('specials-form.ejs')  // TODO: pass the array of specials from User Record
    })
    .catch(function(error) {
      console.log("============\n GET new specials form - could not retrieve user", error);
      //
    });
});


router.post('/:userId',   saveSpecialsToDatabase, getDocId, function(req, res, next) {
  res.render('test.ejs', {from: 'submit specials post route'})
});

// =======================================
//  SHOW LIST OF SPECIALS - CAFE    /cafes/id
// =======================================

router.get('/:userId', function(req, res, next) {
  //TODO:  use uid to get list of specials
  res.render('test.ejs', {from: `....${req.originalUrl}`})
});


module.exports = router;



// =======================================
// MIDDLEWARE
// =======================================

function saveSpecialsToDatabase(req, res, next){
  const SPECIALS_COLL = process.env.DB_SPECIALS_COLL || 'dev_env_specials';
  let data = req.body.specials
  var addDoc = db.collection(SPECIALS_COLL).add(data)
    .then(ref => {
          //REFERENCE on passing data between middleware and across app:
        // https://handyman.dulare.com/passing-variables-through-express-middleware/
      res.locals.doc_id = ref.id;
      next();   // next must be called inside of then()
    });
}

function getDocId(req, res, next) {
  console.log('res.locals.doc_id has a value:  ', res.locals.doc_id ? 'TRUE' : 'FALSE' , `doc is ${res.locals.doc_id}`)
  next()
}
