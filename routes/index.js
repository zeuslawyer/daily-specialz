var express = require('express');
var router = express.Router();
var database = require('../database.json');
const showIndexPage = require('./handlers/route-show-index')

/* GET home page. */
router.get('/', showIndexPage);

module.exports = router;
