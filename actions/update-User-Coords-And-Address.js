const here_api = require("../secrets/hereAPI.json");
const fetch = require("node-fetch");
const {
  db,
  admin,
  firebaseAuth,
  adminAuth
} = require("../helpers/firestore-admin");
const { GeoFirestore } = require("geofirestore");

const updateUserCoordsAndAddress = async function(userData) {

  let address = userData.address;
  const URL = here_api.geocodeURL + address;
  console.log("URL IS:   ", URL);
  const resultData = await fetch(URL)
    .then(d => d.json())
    .catch(err => console.log("ERROR IN FETCHING GEOCODE\n ", err));
  // resultData.then(d=> console.log(resultData.Response.View[0].Result[0]))

  // add addres full text
  updatedAddress = resultData.Response.View[0].Result[0].Location.Address.Label;
  userData.address = updatedAddress;

  //get lat + lon
  let lat =
    resultData.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
  let lon =
    resultData.Response.View[0].Result[0].Location.DisplayPosition.Longitude;

  userData.loc = [lat, lon];

  //GEOFIRESTORE GEOPOINT OBJECT
  userData.coordinates = new admin.firestore.GeoPoint(lat, lon);

  console.log("\n=====\n", userData.coordinates, "\n", userData.loc);

  return userData;
};

module.exports = updateUserCoordsAndAddress;
