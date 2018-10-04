const saveSpecialsToDatabase =  (req, res, next) => { 
    let data = req.body.specials
    data.user_id = req.params.userId
    
    db.collection(SPECIALS_COLLECTION).add(data)
      .then(ref => {
            //REFERENCE on passing data between middleware and across app:
          // https://handyman.dulare.com/passing-variables-through-express-middleware/
        res.locals.specials_ref_id = ref.id;
        // add ref to specials document in the user's document, in an array
        helpers.updateSpecialsArray(req.params.userId, ref.id)
        next();   // next must be called inside of then()
      });
  }

  module.exports = saveSpecialsToDatabase