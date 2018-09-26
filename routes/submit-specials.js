var express = require('express');
var router = express.Router();
var database= require('../database.json');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('submit-specials.ejs', { title: 'Express' });
});
router.post('/', saveToDatabase, function(req, res, next) {

  res.render('test.ejs', {from: 'submit specials post route'})

});

module.exports = router;

// =======================================
// MIDDLEWARE
// =======================================

function saveToDatabase(req, res, next){
  let specials = req.body.specials;
  database.specials.push(specials);

  let data = JSON.stringify(database);
  fs.writeFileSync('database.json', data );
  console.log(JSON.parse(data));
  
  next();
}

