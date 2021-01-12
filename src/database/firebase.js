import {nanoid} from 'nanoid'
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyCOQXbcw47uk1t24usSAzhOqmoawkLSMBU",
    authDomain: "urluid.firebaseapp.com",
    projectId: "urluid",
    storageBucket: "urluid.appspot.com",
    messagingSenderId: "442653172652",
    appId: "1:442653172652:web:3bc34707c9588539781009"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
// const auth = firebase.auth()

var api = {
    generateUrl: async (url) => {
        while(true){
            const id = nanoid(7)
            var result = await db.collection('links').doc(id).get().then(async (doc) => {
                if(doc.data() === undefined){
                    await db.collection('links').doc(id).set({
                        url: url,
                        id: id
                    })
                    return id
                }
            })
            if(result){
                return result
            }
        }
    },
    getLink: async (id) => {
        var result = await db.collection('links').doc(id).get()

        return result
    }
}

export {api}
