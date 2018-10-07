
// FIREBASE ADMIN SDK SETUP
const admin = require('firebase-admin')
var adminCredentials = require('../secrets/firebase-admin-credentials.json');
admin.initializeApp({
  credential: admin.credential.cert(adminCredentials),
  databaseURL: "https://daily-specialz.firebaseio.com"
});

var db = admin.firestore();
var adminAuth = admin.auth();


//FIREBASE JS SDK SETUP
const firebase = require('firebase')
require ('firebase/auth')
require ('firebase/firestore')

const firebaseConfig = require('../secrets/firebase-auth-credentials.js')
firebase.initializeApp(firebaseConfig)
var firebaseAuth = firebase.auth()
var firestore_db = firebase.firestore()

module.exports = {db, firebaseAuth, adminAuth, firestore_db, admin, firebase};





// =======================================
// database seeding
// =======================================
// var docRef = db.collection('test_env').doc('sample_users').collection('test-coll').doc('sub_d0c');

// var setAda = docRef.set({
//   first: 'Ada',
//   last: 'Lovelace',
//   born: 1815
// });


// var aTuringRef = db.collection('test_env').doc('specialz');

// var setAlan = aTuringRef.set({
//   'first': 'Alan',
//   'middle': 'Mathison',
//   'last': 'Turing',
//   'born': 1912
// });

