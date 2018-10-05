


const renderViewPostRegistration = (req, res) => {
    // get uid from res.locals from middleware and redirect to that route to show list of specials
    // this is post request so uid not avail in params
    let uid = res.locals.userRecord.uid
    res.redirect('/cafes/'+uid)
  }


module.exports = renderViewPostRegistration