
const here_api = require('./secrets/firebase-auth-credentials')
const fetch = require('node-fetch')
const {admin, db} = require('./helpers/firestore-admin');
const {GeoFirestore} = require('geofirestore')
const firebase= require('firebase')

const newCollection = db.collection('GFS')
const geofirestore = new GeoFirestore(newCollection)

var coords = new admin.firestore.GeoPoint(5.79, -102.41)

// geofirestore.add({ 
//   coordinates: coords,
//   name: 'zubin',
//   age: 37,
//   hot: true
// })
//   .then((docRef) => console.log(docRef.id)) // ID of newly added document
//   .catch( err => console.log('ERROR \n ....   ', error))
  
// // console.log(geofirestore)

// geofirestore.set({"ZP_KEY":{ coordinates: coords}})
//   .then((docRefID) => console.log(docRefID)) // ID of newly added document
//   .catch( err => console.log('ERROR \n ....   ', error))



// console.log(firebase.firestore.Timestamp.fromDate(new Date()).toDate())
// console.log(new firebase.firestore.Timestamp.now().toDate())
// console.log('object :', new Date());
// console.log('object :', firebase.firestore.Timestamp.now());
var out = db
      .collection("dev_env_specials")
      .doc('lolyNERnINAXhT2Gfi36')
      .get();

    out.then(snap => console.log(snap.data()));
    //   .then(snap => console.log(specials_ref + " <<<<>>>>>" + snap.exists));
  