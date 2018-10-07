
const here_api = require('./secrets/firebase-auth-credentials')
const fetch = require('node-fetch')
const {admin, db} = require('./helpers/firestore-admin');
const {GeoFirestore} = require('geofirestore')

const newCollection = db.collection('GFS')
const geofirestore = new GeoFirestore(newCollection)

var coords = new admin.firestore.GeoPoint(5.79, -102.41)

geofirestore.add({ 
  coordinates: coords,
  name: 'zubin',
  age: 37,
  hot: true
})
  .then((docRef) => console.log(docRef.id)) // ID of newly added document
  .catch( err => console.log('ERROR \n ....   ', error))
  
// // console.log(geofirestore)

// geofirestore.set({"ZP_KEY":{ coordinates: coords}})
//   .then((docRefID) => console.log(docRefID)) // ID of newly added document
//   .catch( err => console.log('ERROR \n ....   ', error))