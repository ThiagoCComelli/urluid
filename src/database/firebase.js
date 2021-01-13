import {nanoid} from 'nanoid'
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {signOut,signIn} from '../actions/index'

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
const auth = firebase.auth()


var api = {
    generateUrl: async (url,authorUID=null,name=null,id=null) => {
        var result
        if(url === ""){
            return false
        }
        if(id === null){
            while(true){
                const id = nanoid(7)
                result = await db.collection('links').doc(id).get().then(async (doc) => {
                    if(doc.data() === undefined){
                        await db.collection('links').doc(id).set({
                            url: url,
                            id: id,
                            authorUID: authorUID,
                            clicks: 0,
                            name: name
                        })
                        return id
                    }
                })
                if(result){
                    return result
                }
            }
        } else {
            result = await db.collection('links').doc(id).get().then(async (doc) => {
                if(doc.data() === undefined){
                    await db.collection('links').doc(id).set({
                        url: url,
                        id: id,
                        authorUID: authorUID,
                        clicks: 0,
                        name: name
                    })
                    return {message:id,status:"success"}
                }else{
                    return {status:"error",message:"Error! URL already taken"}
                }
            })
            return result
        }
        
    },
    getLink: async (id) => {
        var result = await db.collection('links').doc(id).get()

        return result
    },
    createAccount: async(user) => {
        var result = await auth.createUserWithEmailAndPassword(user.email,user.password).then(async (userAuth) => {
            db.collection('users').doc(userAuth.user.uid).set({
                uid: userAuth.user.uid,
                name: user.name,
                email: user.email,
                links: []
            })
            return {
                uid: userAuth.user.uid,
                name: user.name,
                email: user.email,
                links: []
            }
        }).catch((error) => {
            return error
        })
        console.log(result)
        return result
    },
    enterAccount: async(user) => {
        var result = await auth.signInWithEmailAndPassword(user.email,user.password).then(async(userAuth) => {
            var user = await db.collection('users').doc(userAuth.user.uid).get()

            return user.data()
        }).catch((error) => {
            return error
        })

        return result
    },
    exitAccount: () => {
        auth.signOut()
    },
    checkAuth: async (dispatch,history) => {
        auth.onAuthStateChanged(async(userAuth) => {
            if(userAuth !== null) {
                try{
                  db.collection('users').doc(userAuth.uid).get().then((doc) => {
                    dispatch(signIn(doc.data()))
                  })
                }catch{
                  history.go(0)
                }
              } else {
                dispatch(signOut())
              }
        })
    },
    getAllLinks: (uid,setLinks) => {
        db.collection('links').where('authorUID','==',uid).onSnapshot((docs) => {
            setLinks(docs.docs.map((item) => {return item.data()}))
        })
    },
    incrementClicks: (id) => {
        db.collection('links').doc(id).update({
            clicks: firebase.firestore.FieldValue.increment(1)
        })
    },
    updateLink: async (item) => {
        return await db.collection('links').doc(item.id).update({
            url: item.url,
            name: item.name
        }).then(() => {
            return true
        }).catch((error) => {
            return error
        })
    },
    deleteLink: async (id) => {
        return await db.collection('links').doc(id).delete().then(() => {
            return true
        }).catch((error) => {
            return error
        })
    }
}

export {api}
