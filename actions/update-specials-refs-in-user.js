const {db, firebaseAuth, adminAuth} = require('../helpers/firestore-admin');
const admin = require('firebase-admin')
const USER_COLLECTION = process.env.DB_USER_COLLECTION || 'dev_env_users';

const updateSpecialsRefsInUserDoc = (userID, newSpecialsRef) => {
    db.collection(USER_COLLECTION).doc(userID)
            .update({
                specials_refs: admin.firestore.FieldValue.arrayUnion(newSpecialsRef)
            })
            .then( ()=> console.log('\n.......user data updated........\n'))
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating user data document:==>   \n", error);
            });    
}

module.exports = updateSpecialsRefsInUserDoc