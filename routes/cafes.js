var express = require('express');
var router = express.Router();
// var {createNewFirebaseUser} = require('../helpers/helper-functions')
const middleware = require('../helpers/middleware');


router.get('/', function(req, res, next) {
  // redirect to login page if user comes to just /cafes
  res.redirect('/cafes/login')
});

/* GET CAFE REGISTRATION PAGE */
router.get('/register', function(req, res, next) {
  res.render('./cafe/cafe-register.ejs');
});

/* GET cafe login PAGE */
router.get('/login', function(req, res, next) {
  res.render('./cafe/cafe-login.ejs');
});

/* POST cafe login PAGE */
router.post('/login', function(req, res, next) {
  res.send( req.body);
});

/* REGISTRATION POST ROUTE*/
router.post('/register', middleware.createNewFirebaseUser, middleware.saveUserToDb, (req, res)=>{
  res.render('test.ejs', {from:"cafe login route - on form submit"})
})

module.exports = router;

