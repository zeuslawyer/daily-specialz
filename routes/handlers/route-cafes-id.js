const getCafeById = require("../../actions/get-cafe-by-id");
const addSpecialsToCafe = require("../../actions/add-specials-to-cafe");
const SPECIALS_COLLECTION =
  process.env.DB_SPECIALS_COLLECTION || "dev_env_specials";
const USERS_COLLECTION = process.env.DB_SPECIALS_COLLECTION || "dev_env_users";

const routeCafesId = (req, res, next) => {
  let uid = req.params.userId;
  getCafeById(uid)
    .then(addSpecialsToCafe)
    .then(cafedoc => {
      // console.log(cafedoc)
        // res.send(cafedoc)
      res.render("cafe/cafe-profile.ejs", {
        cafe: cafedoc,
        uid: uid
      });
    })
    .catch(e => {
      console.log(e);
      res.send("ERROR");
    });
};

module.exports = routeCafesId;
