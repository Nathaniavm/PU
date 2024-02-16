import { doc } from 'firebase/firestore'
import React from 'react'
import { useAuth } from '../../AuthContext'
import { Link } from 'react-router-dom';
import './LoggInn.css'


const LoggInn = () => {
  const { IsLoggedIn, login, logout } = useAuth();


  const handleLogin = () => {
    if(!IsLoggedIn){

      const username = document.getElementById('username');
      const password = document.getElementById('password');
      const email = document.getElementById('email');

      const usernameValue = username.value;
      const passwordValue = password.value;
      const emailValue = email.value;

      if(!usernameValue.trim() || !passwordValue.trim() || !emailValue.trim()){
        alert("Alle felter er påkrevd!")
        username.value = '';
        password.value = '';
        email.value = '';
      }
      else{

        if(!userExists(usernameValue)){
          alert("Bruker finnes ikke")
        }

        else if(!passwordMatch(username, password)){
          alert("Feil passord")
        }

        else {
          login(usernameValue);

          //Return to home page on a successful login
          window.location.replace("/");
        }
        username.value = '';
        password.value = '';
        email.value = '';

      }
    }
  }

  const handleLogout = () => {
    logout();
  }

  const userExists = (username) => {
    //Check if username is registered in the database
    return true;
  }

  const passwordMatch = (username, password) => {
    //Check if password matches username in database
    return true;
  }


  return (
      <div className='logInContainer'>
        <div className='logInHeader'>
          <h1>Logg inn her:</h1>
        </div>
        <form className='formContainer'>
          <div className='inputFieldContainer'>
            <input className='inputField' type="text" placeholder='Brukernavn' id="username" name='username'></input>
          </div>
          <div className='inputFieldContainer'>
            <input className='inputField' type="password" placeholder='Passord' id="password" name='password'></input>
          </div>
          <div className='inputFieldContainer'>
            <input className='inputField' type="email" placeholder='Epost' id="email" name="email"></input>
          </div>
          <div className='buttonDiv'>
            <button className= 'button' type='button' onClick={handleLogin}>Logg inn</button>
            <button className= 'button' type='button' onClick={handleLogout}>Logg ut</button>
          </div>
        </form>
        <div className="logInNewUser">
          <p>Ny bruker? </p>
          <Link to='/newUser'>Trykk her</Link>
        </div>
    </div>
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