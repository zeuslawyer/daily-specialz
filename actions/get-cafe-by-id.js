const {db, firestore_db, adminAuth} = require ('../helpers/firestore-admin')
const USERS_COLLECTION= process.env.DB_SPECIALS_COLLECTION  || 'dev_env_users';


const getCafeById =  function (uid) {
    return db.collection(USERS_COLLECTION).doc(uid).get()
        .then(snap => (snap.data()))
}


module.exports = getCafeById;