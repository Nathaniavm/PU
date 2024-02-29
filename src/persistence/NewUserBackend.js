import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, database } from '../firebaseConfig'; //Import firebase instance
import { emailExists, usernameExists } from './LoggInnBackend';

// BACKEND FILE FOR REGISTERING NEW USERS IN THE DATABASE?

//Validate username function:
function isValidUsername(str){
  const alloweddChars = /^[a-zA-Z0-9]+$/;

  return alloweddChars.test(str) && str.length < 20;
}

//Register new users to the database
export async function register(username, password, email) {  
    //Optionally validate fields (email), unsure if frontend will handle this
    if(await emailExists(email)){
      alert("Email already exists!");
      return;
    }
    else if(await usernameExists(username)){
      alert("Username already exists");
      return;
    }
    else if(!isValidUsername(username)) {
      alert("Usernames can only contain letters and numbers");
      return;
    }
  
    //Register user
    return createUserWithEmailAndPassword(auth, email, password)    
    .then(function() {
      //Declare user variable
      var user = auth.currentUser;
      alert("User created");
  
      //Create user data
      var user_data = {
        email : email,
        username : username,
        last_login : Date.now()
      }
  
      //Save user data to database
      return set(ref(database, "users/" + user.uid), user_data)
      .then(() =>{
        console.log("Registration successful")
        return;
      })
      .catch(error => {
        console.log("New error")
        throw new Error("Error saving user data to the database " + error.message);
      });
    })
    .catch(function(error){
      // Alert any potential errors
      var error_code = error.code;
      var error_message = error.message;

      console.log(error_code, error_message);
      alert(error_message);
    })
}
  