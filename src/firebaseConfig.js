import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';


const firebaseConfig = {

    apiKey: "AIzaSyBrc7jaRtUp6-Fe7MIG3nDMPtuNKmahoQs",
    authDomain: "icebreakers-f64b9.firebaseapp.com",
    databaseURL: "https://icebreakers-f64b9-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "icebreakers-f64b9",
    storageBucket: "icebreakers-f64b9.appspot.com",
    messagingSenderId: "296281915003",
    appId: "1:296281915003:web:e5e50fcc523861911d2cde"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export {auth, database};