// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBeUZXDyxAg9BGLpZJTjWoT3_AYB3lVUYs",
    authDomain: "treasureh0nt.firebaseapp.com",
    projectId: "treasureh0nt",
    storageBucket: "treasureh0nt.appspot.com",
    messagingSenderId: "206728540248",
    appId: "1:206728540248:web:55c5c3c31f53a340cada2d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider }