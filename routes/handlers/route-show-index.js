

const SPECIALS_COLLECTION = process.env.DB_SPECIALS_COLLECTION || "dev_env_specials";
const USERS_COLLECTION = process.env.DB_SPECIALS_COLLECTION || "dev_env_users";



const showIndexPage =  function(req, res, next) {
    res.render('index.ejs', {specials: undefined});
  }

  module.exports = showIndexPage;