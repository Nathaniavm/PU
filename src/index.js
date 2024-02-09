import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
import 'firebase/firestore'; //import other Firebase services as needed
import { AuthProvider } from './AuthContext';

const firebaseConfig = {

  apiKey: "AIzaSyBrc7jaRtUp6-Fe7MIG3nDMPtuNKmahoQs",
  authDomain: "icebreakers-f64b9.firebaseapp.com",
  databaseURL: "https://icebreakers-f64b9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "icebreakers-f64b9",
  storageBucket: "icebreakers-f64b9.appspot.com",
  messagingSenderId: "296281915003",
  appId: "1:296281915003:web:e5e50fcc523861911d2cde"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
