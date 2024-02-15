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

export default LoggInn