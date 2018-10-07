const {db, firebase} = require ('../helpers/firestore-admin')
const SPECIALS_COLLECTION= process.env.DB_SPECIALS_COLLECTION  || 'dev_env_specials';
const updateSpecialsRefsInUserDoc = require('./update-specials-refs-in-user')



const saveSpecialsToDatabase =  (req, res, next) => { 
    let data = req.body.specials
    //add cafe id to specials document
    data.user_id = req.params.userId

    data.timestamp = firebase.firestore.Timestamp.now().toDate();
    
    // write specials doc to collection
    db.collection(SPECIALS_COLLECTION).add(data)
      .then(ref => {
        res.locals.specials_ref_id = ref.id;
        // add ref to specials document in the user's document, in an array
        updateSpecialsRefsInUserDoc(req.params.userId, ref.id)
        next();   // next must be called inside of then()
      });
  }

  module.exports = saveSpecialsToDatabase

  //REFERENCE on passing data between middleware and across app:
  // https://handyman.dulare.com/passing-variables-through-express-middleware/