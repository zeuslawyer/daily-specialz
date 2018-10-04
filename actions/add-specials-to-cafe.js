const {db, firestore_db, adminAuth} = require ('../helpers/firestore-admin')
const USERS_COLLECTION= process.env.DB_SPECIALS_COLLECTION  || 'dev_env_users';
const SPECIALS_COLLECTION= process.env.DB_SPECIALS_COLLECTION  || 'dev_env_specials';


const addSpecialsToCafe =  function (cafedoc) {
    const iterable = cafedoc.specials_refs.map( ref =>{
        return db.collection(SPECIALS_COLLECTION).doc(ref).get()
        .then(snap => (snap.data()))
    })
    return Promise.all(iterable).then(specials => {
        cafedoc.specials = specials;
        return cafedoc;
    })
}


module.exports = addSpecialsToCafe;