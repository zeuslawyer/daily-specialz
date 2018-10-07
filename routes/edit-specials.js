var express = require("express");
var router = express.Router({mergeParams: true});
const app = require("../app");
const middleware = require("../helpers/middleware");
const saveSpecialsToDatabase = require("../actions/save-specials-to-db");

//FIREBASE FIRESTORE
const { db, firebaseAuth, adminAuth } = require("../helpers/firestore-admin");



// =======================================
// NEW SPECIALS FORM     /cafes/id/new
// =======================================

router.get("/", function(req, res, next) {
  let userId = req.params.userId;
  res.render("specials-form.ejs", { userId: userId });
});

router.post("/", saveSpecialsToDatabase, function(req, res, next) {
  console.log(
    `\n received doc id from res.locals object... - doc id is \n${
      res.locals.specials_ref_id
    }\n`
  );
  res.redirect("/cafes/" + req.params.userId);
});



router.get("/", function(req, res, next) {
  res.send("NO VALID ROUTE HERE");
});

module.exports = router;

// =======================================
// MIDDLEWARE
// =======================================

// function saveSpecialsToDatabase(req, res, next){
//   const SPECIALS_COLL = process.env.DB_SPECIALS_COLL || 'dev_env_specials';
//   let data = req.body.specials
//   var addDoc = db.collection(SPECIALS_COLL).add(data)
//     .then(ref => {
//           //REFERENCE on passing data between middleware and across app:
//         // https://handyman.dulare.com/passing-variables-through-express-middleware/
//       res.locals.doc_id = ref.id;
//       next();   // next must be called inside of then()
//     });
// }

// function getDocId(req, res, next) {
//   console.log('res.locals.doc_id has a value:  ', res.locals.doc_id ? 'TRUE' : 'FALSE' , `doc is ${res.locals.doc_id}`)
//   next()
// }
