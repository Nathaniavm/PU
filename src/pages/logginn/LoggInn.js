import { doc } from 'firebase/firestore'
import React from 'react'

const LoggInn = () => {
  return (
    <div>LoggInn</div>
  )
}


// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

function register() {
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  username = document.getElementById("username").value;

  if(!validate_email(email)){
    alert("efeil email");
    return;
  }
  else if(!validate_password(password)){
    alert("dårlig passord");
    return;
  }
  else if(!validate_field(username)){
    alert("teit brukernavn");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {

    var user = auth.currentUser;
    alert("Bruker opprettet");

    //Add user to database
    var databse_ref = database.ref();

    // Create user data
    var user_data = {
      email : email,
      username : username,
      password : password,
      last_login : Date.now()
    }

    database_ref.child("users/" + user.uid).set(user_data)

    
  })
  .catch(function(error){
    var error_code = error.code;
    var error_message = error.message;

    alert(error_message);
  })
}

function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

function validate_password(password) {
  return password > 6;
}

function validate_field(field) {
  return (field != null) && (field.length > 0)
}


export default LoggInn