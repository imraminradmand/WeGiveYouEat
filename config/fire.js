import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDctukg0o-mKXmUU6O8Ixci_xdICLYMoTY",
    authDomain: "wegiveyoueat.firebaseapp.com",
    projectId: "wegiveyoueat",
    storageBucket: "wegiveyoueat.appspot.com",
    messagingSenderId: "667510836837",
    appId: "1:667510836837:web:336b63b1da939c1ef9c08c",
    measurementId: "G-7BV7QK92EW"
}

firebase.initializeApp(firebaseConfig)

export default firebase