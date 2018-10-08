const {db, firestore_db, adminAuth} = require ('../helpers/firestore-admin')
const USERS_COLLECTION= process.env.DB_SPECIALS_COLLECTION  || 'dev_env_users';
const SPECIALS_COLLECTION= process.env.DB_SPECIALS_COLLECTION  || 'dev_env_specials';


const addSpecialsToCafe =  function (cafedoc) {
    //from the cafe USER document, extract the array of specials, and MAP it to an iterable use in for promise.all
    const iterable = cafedoc.d.specials_refs.map( ref => {
        //return array of promises that each resolve to the snapshot of the specials document from specials collection
        return db.collection(SPECIALS_COLLECTION).doc(ref).get()
                .then((snap) => {
                    //check if undefined
                    if (snap.data()) {
                        return snap.data();
                    }    
                })
                .then(data => {
                    data.specialsId = ref;
                    // console.log(data)
                    return data;
                })  
    })

    return Promise.all(iterable).then(specials => {
        //attach specials array as property on cafedoc
        cafedoc.d.specials = specials;
        return cafedoc;
    })
}


module.exports = addSpecialsToCafe;