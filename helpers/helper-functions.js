const app = require('../app');
const admin = require('firebase-admin');
const helpers = {};


// =======================================
// CREATE USER and SAVE to FIREBASE
// =======================================
helpers.createNewFirebaseUser = (userObject) => {
    admin.auth().createUser({
        email: userObject.email,
        emailVerified: false,
        password: userObject.password,
        displayName: userObject['display-name'],
        photoURL: userObject.photoURL,
        disabled: false
      })
        .then(function(userRecord) {
          console.log("Successfully created new user:", userRecord , userRecord.uid);
        })
        .catch(function(error) {
          console.log("Error creating new user:", error);
        });
}

module.exports = helpers;





// =======================================
// REFERENCE DOCS
// =======================================

// https://firebase.google.com/docs/auth/admin/manage-users      --> create and manage users from the node server