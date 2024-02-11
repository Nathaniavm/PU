import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import firebaseConfig from './firebaseConfig'; //from firebaseConfig.js


// Initialize Firebase app
const app = initializeApp(firebaseConfig);

//Login setup
const auth = getAuth(app);
const database = getDatabase(app);

//Register new users to the database
export function register() {
    //Get all input fields
    //Can also use register(email, username, password), which is better?
    let email = document.getElementById("email".value);
    let username = document.getElementById("username".value);
    let password = document.getElementById("password".value); 
  
    //Optionally validate fields (email), unsure if frontend will handle this
  
    //Register user
    return auth.createUserWithEmailAndPassword(email,password)
    .then(function() {
      //Declare user variable
      var user = auth.currentUser;
      alert("User created");
  
      //Add user to Firebase Database
      var database_ref = database.ref();
  
      //Create user data
      var user_data = {
        email : email,
        username : username,
        //password : password, 
        //To simply store the password in plain text, although this is not good practice for real application
        last_login : Date.now()
      }
  
      //Save user data to database
      return database_ref.child("users/" + user.uid).set(user_data);
    })
    .catch(function(error){
      // Alert any potential errors
      var error_code = error.code;
      var error_message = error.message;
  
      alert(error_message);
    })
}
  