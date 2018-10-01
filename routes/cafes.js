var express = require('express');
var router = express.Router();
// var {createNewFirebaseUser} = require('../helpers/helper-functions')
const middleware = require('../helpers/middleware');
const {firebaseAuth, adminAuth} = require ('../helpers/firestore-admin')



router.get('/', function(req, res, next) {
  // redirect to login page if user comes to just /cafes
  res.redirect('/cafes/login')
});

/* GET CAFE REGISTRATION PAGE */
router.get('/register', function(req, res, next) {
  res.render('./cafe/cafe-register.ejs');
});

/*  POST  cafe registration ROUTE*/
router.post('/register', middleware.createNewFirebaseUser, middleware.saveUserToDb, (req, res)=>{
  res.render('test.ejs', {from:"cafe login route - on form submit"})
})

/* GET cafe LOGIN PAGE */
router.get('/login', function(req, res, next) {
  res.render('./cafe/cafe-login.ejs');
});

/* POST cafe LOGIN page */
router.post('/login', function(req, res, next) {
  adminAuth.getUserByEmail(req.body.email)
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("========\nSuccessfully fetched user data:", userRecord.toJSON());
      res.redirect('/submit-specials');
    })
    .catch(function(error) {
      console.log("============\nError fetching user data:", error);
      res.render('error.ejs', {errorMessage: error.message})
    });
  
});



module.exports = router;

