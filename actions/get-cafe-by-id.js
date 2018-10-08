const {db, firestore_db, adminAuth} = require ('../helpers/firestore-admin')
const USERS_COLLECTION= process.env.DB_SPECIALS_COLLECTION  || 'dev_env_users';

//when routing to /cafes/:uid this function retrieves the cafe's document from firestore and operates on it
const getCafeById =  function (uid) {
    return db.collection(USERS_COLLECTION).doc(uid).get()
        //implicit return of the 'cafedoc'
        .then(snap => (snap.data())) 
}


module.exports = getCafeById;