const app = require('../app');
const {db, firebaseAuth, adminAuth} = require('./firestore-admin');
const admin = require('firebase-admin')

//setup database refs
const USER_COLL = process.env.DB_USER_COLL || 'dev_env_users';
const SPECIALS_COLL = process.env.DB_SPECIALS_COLL || 'dev_env_specials';
const helpers = {};


// =======================================
// UPDATE a USER document in firestore
// =======================================
helpers.updateSpecialsArray = function(userID, newSpecialsRef){
    db.collection(USER_COLL).doc(userID)
            .update({
                specials_refs: admin.firestore.FieldValue.arrayUnion(newSpecialsRef)
            })
            .then( ()=> console.log('\n.......user data updated........\n'))
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating user data document:==>   \n", error);
            });    
}

// =======================================
// GEO CODE STUFF
// =======================================
helpers.geocodeUser = function(userData){

}


module.exports = helpers;
