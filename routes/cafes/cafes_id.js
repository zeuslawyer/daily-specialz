
const getCafeById = require('../../actions/get-cafe-by-id')
const addSpecialsToCafe = require('../../actions/add-specials-to-cafe')
const SPECIALS_COLLECTION= process.env.DB_SPECIALS_COLLECTION  || 'dev_env_specials';
const USERS_COLLECTION= process.env.DB_SPECIALS_COLLECTION  || 'dev_env_users';

const routeCafesId = (req, res, next) => {
    let uid = req.params.userId;
    getCafeById(uid)
        .then(addSpecialsToCafe)
        .then(cafedoc => {
            console.log(cafedoc)
            res.send(cafedoc)
        })
        .catch(e => {
            console.log(e)
            res.send('ERROR')
        })

    // TODO refactor below with helper function below
    // var specialsDocObj = db.collection(USERS_COLLECTION).doc(uid) ////returns a documentReference
    // var userSnap = specialsDocObj.get() // returns a promise
    // var arrayOfRefs = userSnap.then( (userSnap) => {
    //                     var specialsRefs = userSnap.data().specials_refs;
    //                     return specialsRefs;
    //                   });
    
    // arrayOfRefs
    //   .then(function (refs) {
    //     return refs.map( async function(refID) {
    //         var specialsDocObj = db.collection('dev_env_specials').doc(refID) ////returns a documentReference
    //         var refSnap =   await specialsDocObj.get() // returns a promise
    //         // console.log('REFSNAP IS..... ', refSnap.data(), '===\n')
    //         return refSnap.data();
    //       });
    //   })
    //   .then(function(arr){
    //     console.log('ARR is....\n', arr)
    //     res.send(arr)
    //     // res.render('cafe-profile.ejs')
    //   })   
    //   .catch((err2)=>{
    //     console.log('ERROR#2 IN GETTING REFS ARRAY,  ', err2)
    //     res.render('error.ejs', {errorMessage: 'No such resource - REFS ARRAY N/A . Oopsie.'})
    //   });
  
  }


module.exports = routeCafesId;