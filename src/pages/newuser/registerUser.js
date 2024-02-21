import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import app from '../../firebaseConfig'; //Import firebase instance

// BACKEND FILE FOR REGISTERING NEW USERS IN THE DATABASE?

//Login setup
const auth = getAuth(app);
const database = getDatabase(app);

//Register new users to the database
export function register(username, password, email) {  
    //Optionally validate fields (email), unsure if frontend will handle this
  
    //Register user
    return createUserWithEmailAndPassword(auth, email,password)    
    .then(function() {
      //Declare user variable
      var user = auth.currentUser;
      alert("User created");
  
      //Add user to Firebase Database
      var database_ref = ref(database);
  
      //Create user data
      var user_data = {
        email : email,
        username : username,
        //password : password, 
        //To simply store the password in plain text, although this is not good practice for real application
        last_login : Date.now()
      }
  
      //Save user data to database
      return set(ref(database, "users/" + user.uid), user_data);
    })
    .catch(function(error){
      // Alert any potential errors
      var error_code = error.code;
      var error_message = error.message;

      console.log(error_code, error_message);
      alert(error_message);
    })

}

  