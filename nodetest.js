
// const admin = require('firebase-admin');
// const helpers = require('./helper-functions')
// const {db, firebaseAuth, adminAuth} = require('../helpers/firestore-admin');
// const here_api = require('../secrets/hereAPI.json')
const fetch = require('node-fetch')

async function geoCodeUser(userData){
    let coordinates = []
    let address = userData.address;
    // sample addres : https://geocoder.api.here.com/6.2/geocode.json?app_id=V6PIkh4NxmLvNdagihaa&app_code=QB2fWuLaD1jjddRZzCwa-Q&searchtext=36+batman+street fitzroy north
    // const URL = here_api.geocodeURL+address
    const URL = 'https://geocoder.api.here.com/6.2/geocode.json?app_id=V6PIkh4NxmLvNdagihaa&app_code=QB2fWuLaD1jjddRZzCwa-Q&searchtext=32%20cecil%20street%20fitzroy'
    const resultData = await fetch(URL).then(d=>d.json())
    // resultData.then(d=> console.log(resultData.Response.View[0].Result[0]))
    let lat = resultData.Response.View[0].Result[0].Location.DisplayPosition.Latitude
    let lon = resultData.Response.View[0].Result[0].Location.DisplayPosition.Longitude
    coordinates =[lat,lon]
    // console.log('\n=====\n', resultData.Response.View[0].Result[0].Location.DisplayPosition)
    console.log('\n=====\n', coordinates)

    return coordinates
  }

  geoCodeUser({});