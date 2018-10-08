
const {admin} = require('../../helpers/firestore-admin')
const SPECIALS_COLLECTION = process.env.DB_SPECIALS_COLLECTION || "dev_env_specials";
const USERS_COLLECTION = process.env.DB_SPECIALS_COLLECTION || "dev_env_users";
const { GeoFirestore } = require("geofirestore");


//DUMMY LOCATION
var lat = -37.793954;
var lon = 144.9747993

// Create a GeoFirestore index     REFERENCE: https://www.npmjs.com/package/geofirestore#geofirestorequery
const collectionRef = admin.firestore().collection(USERS_COLLECTION);
const geoFirestore = new GeoFirestore(collectionRef);

//ROUTE HANDLER
const showIndexPage =  function(req, res, next) {
    const center = new admin.firestore.GeoPoint(lat, lon);
    const geoQuery = geoFirestore.query({
        center: center,
        radius: 2.0,  //kms
        // query: (ref) => ref.where('d.specials_refs', '>', 0)    // query where specials_refs is not an array
      });

    
    geoQuery.on('key_entered', ()=> console.log('object :' + 'ENTERED'));

    // geoQuery.get().then((result) => {
    //     console.log('object :', result);
    // }).catch((err) => {
        
    // });  

    res.render('index.ejs', {specials: undefined});
  }

  module.exports = showIndexPage;