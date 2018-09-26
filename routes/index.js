var express = require('express');
var router = express.Router();
var database = require('../database.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', { specials: database.specials });
});

module.exports = router;
