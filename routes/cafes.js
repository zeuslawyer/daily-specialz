var express = require('express');
var router = express.Router();
var {createNewFirebaseUser} = require('../helpers/helper-functions')


router.get('/', function(req, res, next) {
  res.send('no route for /cafes yet');
});

/* GET CAFE REGISTRATION PAGE */
router.get('/register', function(req, res, next) {
  res.render('cafe-register.ejs');
});

/* REGISTRATION POST ROUTE*/
router.post('/register', (req, res)=>{
  console.log(req.body, ' saving to db....');
  createNewFirebaseUser(req.body);
  res.render('test.ejs', {from:"cafe login route - on form submit"})
})

module.exports = router;

