var express = require('express');
var router = express.Router();
// var {createNewFirebaseUser} = require('../helpers/helper-functions')
const middleware = require('../helpers/middleware');


router.get('/', function(req, res, next) {
  res.send('no route for /cafes yet');
});

/* GET CAFE REGISTRATION PAGE */
router.get('/register', function(req, res, next) {
  res.render('./cafe/cafe-register.ejs');
});

/* GET cafe login PAGE */
router.get('/login', function(req, res, next) {
  res.render('./cafe/cafe-login.ejs');
});

/* REGISTRATION POST ROUTE*/
router.post('/register', middleware.createNewFirebaseUser, middleware.saveUserToDb, (req, res)=>{
  res.render('test.ejs', {from:"cafe login route - on form submit"})
})

module.exports = router;

