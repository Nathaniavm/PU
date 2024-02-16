import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set, update } from 'firebase/database';
import app from '../firebaseConfig'; //Import firebase instance

// BACKEND FILE FOR FETCHING USERS FROM DATABASE

//Login setup
const auth = getAuth(app);
const database = getDatabase(app);

export const userExists = (username) => {
    //Check if username is registered in the database
    return true;
}

export const passwordMatch = (username, password) => {
    //Check if password matches username in database
    return true;
}


export function loginData(email, passord){

    //Validate if necessary

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
    .catch(function(error){
        // Alert any potential errors
        var error_code = error.code;
        var error_message = error.message;
  
        console.log(error_code, error_message);
        alert("Error %: " + error_message);
      });
}