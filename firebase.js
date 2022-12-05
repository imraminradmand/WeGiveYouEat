// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
import {
    getAuth
} from "firebase/auth";

import {
    collection,
    getFirestore
} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDctukg0o-mKXmUU6O8Ixci_xdICLYMoTY",
    authDomain: "wegiveyoueat.firebaseapp.com",
    projectId: "wegiveyoueat",
    storageBucket: "wegiveyoueat.appspot.com",
    messagingSenderId: "667510836837",
    appId: "1:667510836837:web:336b63b1da939c1ef9c08c",
    measurementId: "G-7BV7QK92EW"
};

// Initialize Firebase

initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()
const userRef = collection(db, 'users')
export {
    auth,
    db,
    userRef
}