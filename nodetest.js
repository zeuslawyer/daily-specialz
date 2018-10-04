
// const admin = require('firebase-admin');
// const helpers = require('./helper-functions')
const {db, firestore_db, adminAuth} = require ('./helpers/firestore-admin')
// const here_api = require('../secrets/hereAPI.json')
const fetch = require('node-fetch')




// async function geoCodeUser(userData){
//     let coordinates = []
//     let address = userData.address;
//     // sample addres : https://geocoder.api.here.com/6.2/geocode.json?app_id=V6PIkh4NxmLvNdagihaa&app_code=QB2fWuLaD1jjddRZzCwa-Q&searchtext=36+batman+street fitzroy north
//     // const URL = here_api.geocodeURL+address
//     const URL = 'https://geocoder.api.here.com/6.2/geocode.json?app_id=V6PIkh4NxmLvNdagihaa&app_code=QB2fWuLaD1jjddRZzCwa-Q&searchtext=32%20cecil%20street%20fitzroy'
//     const resultData = await fetch(URL).then(d=>d.json())
//     // resultData.then(d=> console.log(resultData.Response.View[0].Result[0]))
//     let lat = resultData.Response.View[0].Result[0].Location.DisplayPosition.Latitude
//     let lon = resultData.Response.View[0].Result[0].Location.DisplayPosition.Longitude
//     coordinates =[lat,lon]
//     // console.log('\n=====\n', resultData.Response.View[0].Result[0].Location.DisplayPosition)
//     console.log('\n=====\n', coordinates)

//     return coordinates
//   }

//   geoCodeUser({});


// QUERY COLLECTION DOCS BY FIELD - RETURNS ARRAY OF RESULTS IN A 'QUERY SNAPSHOT' OBJECT
// let ref = db.collection('dev_env_users')
// let result = ref.where('last-name', '==', 'testy').get()  //gets a promise that reslolves to a QUERYSNAPSHOT  
// let out = result
//     .then(querySnapshot=>{           //iterates over each document within qsnapshot - but qsnapshotis NOT an array
//         let out = []
//         querySnapshot.forEach(docSnap=> {
//             // console.log(docSnap.data())
//             out.push(docSnap.data())
//         })
//         console.log(querySnapshot.docs.length + ' matching results\n')  // shows how many matching results
//         return out
//     });

//  out.then(d=>console.log(d))  


// TEST IF DOCUMENT EXISTS
// let test = db.collection('dev_env_users').doc('3tUzVt2M5nawqk1UG3mlcKSG3wX2')  //returns a documentReference
//  test.get()   //returns doc snapshot PROMISE which has an exists property
//  .then(d=>console.log(d.exists))
// // test.then(d=>console.log(d))


var refs = [ 'ZNB4c6Qr8L6K7Z2JuQzo',
'g1v9irki01IcWfZ5MUd6',
'MPaemplS11DhdEkJim4l',
'NrSpIvMCoxI9L8YbvqMu' ]


async function  getAllSpecials(specialsRefs) {
    if (specialsRefs.length <1) {
      return -1
    }
  
    
    //TODO -- refactor below
    let c = 0
    specialsRefs.forEach(  function (ref) {
        var docRefObject = db.collection('dev_env_specials').doc(ref) ////returns a documentReference
        var snap =    docRefObject.get() // returns a promise
        snap.then( (snap) => {
          if(snap.exists){
             console.log(snap.data())
             results.push(snap.data())
          } else(
            console.log('\n======\ndidnt seem to find this one: ' + ref + '\n=========\n')
          )
        }).then(r=> {return results})
        .catch(err=>console.log('error fetching the specials objects....', err))
    })
  
  }

  console.log( getAllSpecials(refs))
  getAllSpecials(refs).then(r=>console.log(r))



  //BACKUP
  // router.get('/:userId', async function(req, res, next) {
  
  //   let uid = req.params.userId;
  
  //   // TODO refactor below with helper function below
  //   var specialsDocObj = db.collection(USERS_COLLECTION).doc(uid) ////returns a documentReference
  //   var userSnap = specialsDocObj.get() // returns a promise
  //   var arrayOfRefs = userSnap.then( (userSnap) => {
  //                       var specialsRefs = userSnap.data().specials_refs;
  //                       return specialsRefs;
  //                     });
    
  //   specialsObjects = [];
  
  //   arrayOfRefs
  //     .then(function (refs) {
  //       console.log('PREEE')
  //         refs.forEach( function(refID) {
  //           console.log('ONE')
  //           var specialsDocObj = db.collection('dev_env_specials').doc(refID) ////returns a documentReference
  //           var refSnap =  specialsDocObj.get() // returns a promise
  //           refSnap
  //             .then((refSnap) => {
  //               if(refSnap.exists){
  //                 console.log('TWO')
  //                 specialsObjects.push(refSnap.data())
  //               } else(
  //                 console.log('\n======\ndidnt seem to find this one: ' + ref + '\n=========\n')
  //               )
  //             })
  //             .catch( (err1) => {
  //               console.log('ERROR#1 IN GETTING REF SNAP,  ', err1)
  //             });
  //         });
  //         return specialsObjects
  //     })
  //     .then(function(refs){
  //       res.send(specialsObjects)
  //       // res.render('cafe-profile.ejs')
  //     })   
  //     .catch((err2)=>{
  //       console.log('ERROR#2 IN GETTING REFS ARRAY,  ', err2)
  //       res.render('error.ejs', {errorMessage: 'No such resource - REFS ARRAY N/A . Oopsie.'})
  //     });
  
  // })  //EOM