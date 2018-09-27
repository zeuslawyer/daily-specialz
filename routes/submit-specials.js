var express = require('express');
var router = express.Router();
const db = require('../helpers/firestore-setup');
const app = require('../app')
var fs = require('fs');


const SPECIALS_COLL = process.env.DB_SPECIALS_COLL || 'dev_env_specials';

// =======================================
// NEW SPECIALS GET FORM
// =======================================
router.get('/', function(req, res, next) {
  res.render('submit-specials.ejs');
});

// =======================================
// NEW SPECIALS POST ROUTE
// =======================================
router.post('/', saveToDatabase, getDocId, function(req, res, next) {

  res.render('test.ejs', {from: 'submit specials post route'})

});

module.exports = router;

// =======================================
// MIDDLEWARE
// =======================================

function saveToDatabase(req, res, next){
  let data = req.body.specials
  var addDoc = db.collection(SPECIALS_COLL).add(data)
    .then(ref => {
          //REFERENCE on passing data between middleware and across app:
        // https://handyman.dulare.com/passing-variables-through-express-middleware/
      res.locals.doc_id = ref.id;
      next();
    });
    // next must be called inside of then()
}

function getDocId(req, res, next) {
  console.log('res.locals.doc_id has a value:  ', res.locals.doc_id ? 'TRUE' : 'FALSE' , `doc is ${res.locals.doc_id}`)
  next()
}
