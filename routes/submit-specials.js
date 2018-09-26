var express = require('express');
var router = express.Router();
var app

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('submit-specials.ejs', { title: 'Express' });
});
router.post('/', function(req, res, next) {
  console.log (req.body.specials);
  res.render('test.ejs', {from: 'submit specials post route'})

});

module.exports = router;
