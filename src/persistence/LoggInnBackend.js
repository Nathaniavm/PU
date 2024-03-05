import { signInWithEmailAndPassword } from 'firebase/auth';
import { equalTo, query, get, getDatabase, orderByChild, ref, update, orderByKey } from 'firebase/database';
import { auth, database } from '../firebaseConfig'; //Import firebase instance

// BACKEND FILE FOR FETCHING USERS FROM DATABASE


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
export async function getEmailFromUsername(username){
    
    try{
        //Create database reference to "users"
        const dbRef = ref(getDatabase(), "users");

        //Create database query for username
        const userQuery = query(dbRef, orderByChild("username"), equalTo(username));

        //Execute query
        const snapshot = await get(userQuery);

        if (snapshot.exists()) {
            const userData = snapshot.val()[Object.keys(snapshot.val())[0]];
            //console.log(userData);
            const userEmail = userData.email;
            return userEmail; //User exists
        }
        else {
            return null;
        }
    }
    catch (error){
        console.log("Error med query til databasen ved søking etter brukernavn: " + error);
        return false;
    }
}
export async function getUsernameFromID(userID){
    
    try{
        //Create database reference to "users"
        const dbRef = ref(getDatabase(), "users");

        //Create database query for username
        const userQuery = query(dbRef, orderByKey(), equalTo(String(userID)));

        //Execute query
        const snapshot = await get(userQuery);

        if (snapshot.exists()) {
            const userData = snapshot.val()[Object.keys(snapshot.val())];
            const userEmail = userData.username;
            return userEmail; //User exists
        }
        else {
            return null;
        }
    }
    catch (error){
        console.log("Error med query til databasen ved søking etter brukernavn: " + error);
        return false;
    }
}

export async function usernameExists(username){
    try{
        //Create database reference to "users"
        const dbRef = ref(getDatabase(), "users");

        //Create database query for username
        //OBS! Må ha ".indexON": "username" som en rule i firebase databasen
        const userQuery = query(dbRef, orderByChild("username"), equalTo(username));

        //Execute query
        const snapshot = await get(userQuery);

        if (snapshot.exists()) {
            //console.log("Brukernavnet finnes");
            return true; //User exists
        }
        else {
            return false;
        }
    }
    catch (error){
        console.log("Error med query til databasen: " + error);
        return false;
    }
}
export async function emailExists(email){
    try{
        //Create database reference to "users"
        const dbRef = ref(getDatabase(), "users");

        //Create database query for email
        //OBS! Må ha ".indexON": "email" som en rule i firebase databasen
        const userQuery = query(dbRef, orderByChild("email"), equalTo(email));

        //Execute query
        const snapshot = await get(userQuery);

        if (snapshot.exists()) {
            //console.log("Eposten finnes");
            return true; //User exists
        }
        else {
            return false;
        }
    }
    catch (error){
        console.log("Error med query til databasen: " + error);
        return false;
    }
}


export function loginData(email, passord){

    //Validate fields if necessary
    //console.log("Email: " + email + "\nPassword: " + passord);

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