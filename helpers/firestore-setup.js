const admin = require('firebase-admin');

var serviceAccount = require('../secrets/daily-specialz-f4bd522c9c77.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();
module.exports = db;

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

