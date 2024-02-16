import { signInWithEmailAndPassword } from 'firebase/auth';
import { ref, update } from 'firebase/database';
import {auth, database} from '../firebaseConfig'; //Import firebase instance

// BACKEND FILE FOR FETCHING USERS FROM DATABASE


export const userExists = (username) => {
    //Check if username is registered in the database

    return true;
}

export const passwordMatch = (username, password) => {
    //Check if password matches username in database
    return true;
}

export function signOutUser() {
    return auth.signOut()
    .then(function() {
        //Sign out successful
        console.log("User signed out");
    })
    .catch(function(error) {
        //An error occured
        console.log("Error signing out: " + error);
    })
}


export function loginData(email, passord){

    //Validate if necessary

    console.log("Email: " + email + "\nPassword: " + passord);

    return signInWithEmailAndPassword(auth, email, passord)
    .then(function() {
        //Declare user variable
        var user = auth.currentUser;
        alert("User logged in");
    
        //Create user data
        var user_data = {
          last_login : Date.now()
        }
    
        //Save user data to database
        return update(ref(database, "users/" + user.uid), user_data);
    })

    // Kan kun catche én gang, hvis vi catcher her funker ikke catchen i try/catch der funksjonen kalles
    // Vet ikke hva som er lurest
    // .catch(function(error){
    //     // Alert any potential errors
    //     var error_code = error.code;
    //     var error_message = error.message;
  
    //     console.log(error_code, error_message);
    //     alert("Error %: " + error_message);
    //   });
}