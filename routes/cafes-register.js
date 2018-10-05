var express = require('express');
var router = express.Router();

const middleware = require('../helpers/middleware');
const {db, firestore_db, adminAuth} = require ('../helpers/firestore-admin')
const routeCafesId = require('./handlers/route-cafes-id')
const saveSpecialsToDatabase = require('../actions/save-specials-to-db')
const getCafeById = require('../actions/get-cafe-by-id')
const addSpecialsToCafe = require('../actions/add-specials-to-cafe')
const renderViewPostRegistration = require('./handlers/route-cafes-register')
const USERS_COLLECTION= process.env.DB_SPECIALS_COLLECTION  || 'dev_env_users';




// =======================================
// REGISTER NEW CAFE   /cafes/register
// =======================================
router.get('/', function(req, res, next) {
  res.render('./cafe/cafe-register.ejs');
});


router.post('/', middleware.createNewFirebaseUser, middleware.saveUserToDb, renderViewPostRegistration )

module.exports = router;