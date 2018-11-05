const { admin, db } = require("../../helpers/firestore-admin");
const { GeoFirestore } = require("geofirestore");
const addSpecialsToCafe = require('../../actions/add-specials-to-cafe')
const SPECIALS_COLLECTION = process.env.DB_SPECIALS_COLLECTION || "dev_env_specials";
const USERS_COLLECTION = process.env.DB_SPECIALS_COLLECTION || "dev_env_users";



//DUMMY LOCATION
var lat = -37.793954;
var lon = 144.9747993;

// Create a GeoFirestore index     REFERENCE: https://www.npmjs.com/package/geofirestore#geofirestorequery
const collectionRef = admin.firestore().collection(USERS_COLLECTION);
const geoFirestore = new GeoFirestore(collectionRef);

//ROUTE HANDLER
const showIndexPage = function(req, res, next) {
    const center = new admin.firestore.GeoPoint(lat, lon);
    
    
    const geoQuery = geoFirestore.query({
      center: center,
      radius: 1.5//kms
      // query: (ref) => ref.where('d.specials_refs', '>', 0)    // query where specials_refs is not an array
    });
   
    geoQuery.on("key_entered", (userID, userDoc, distance) => {
         console.log(`${userDoc.displayname} is ${distance} kms away`)
        var out = []
        addSpecialsToCafe(userDoc)
        // .then(specials => console.log('object :', specials))
            .then(updatedUserDoc => res.render("index.ejs", { userObject: updatedUserDoc }))
    });
    // res.render("index.ejs", { userObject: {} });
};

module.exports = showIndexPage;



// const getSpecialsNearby = (userID, userDoc, distance, req, res) => {
//     return addSpecialsToCafe(userDoc)
//     // .then(specials => console.log('object :', specials))
//     .then(specials => specials)
// }


// const getSpecialsNearby = (userRef, userDoc, distance) => {
//   // console.log('key : ' , userRef, 'DOC: ', userDoc.specials_refs, 'DISTANCE:  ', distance )
//   console.log("DOC: ", userDoc, "DISTANCE:  ", distance);

//   userDoc.specials_refs.forEach(specials_ref => {
//     var out = db
//       .collection("dev_env_specials")
//       .doc(userRef)
//       .get();

//     out.then(snap => console.log(snap.data()));
//     //   .then(snap => console.log(specials_ref + " <<<<>>>>>" + snap.exists));
//   });

//   // res.render('index.ejs', {specials: [userDoc]});
// };
