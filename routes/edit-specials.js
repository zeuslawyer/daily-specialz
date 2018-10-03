var express = require('express');
var router = express.Router();
const app = require('../app')
const middleware = require('../helpers/middleware')
const helpers = require('../helpers/helper-functions')
const {db, firebaseAuth, adminAuth} = require('../helpers/firestore-admin');


// =======================================
// GET - new specials form
// =======================================

router.get('/',   function(req, res, next) {

  res.send('EDIT NEW SPECIALS HERE?')

});
// router.get('/:userId',  async function(req, res, next) {
//   let userId = req.params.userId;
//   adminAuth.getUser(userId)
//     .then(function(userRecord) {
//       // See the UserRecord reference doc for the contents of userRecord.
//       // console.log('\nFETCHED user record from db \n',  userRecord);
//     })
//     .then(function(user) {
//       res.render('submit-specials.ejs')
//     })
//     .catch(function(error) {
//       console.log("============\n GET new specials form - could not retrieve user", error);
//       //
//     });
// });

// // =======================================
// // NEW SPECIALS POST ROUTE
// // =======================================
// router.post('/:userId',   saveSpecialsToDatabase, getDocId, function(req, res, next) {

//   res.render('test.ejs', {from: 'submit specials post route'})

// });

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
