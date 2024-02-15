import React from 'react'
import { useAuth } from '../../AuthContext'
import { Link } from 'react-router-dom';
import './LoggInn.css'

const LoggInn = () => {
  const { IsLoggedIn, login, logout } = useAuth();


  const handleLogin = () => {
    if(!IsLoggedIn){

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const email = document.getElementById('email').value;

      console.log(username, password, email);

      if(!userExists(username)){
        alert("Bruker finnes ikke")
      }

      else if(!passwordMatch(username, password)){
        alert("Feil passord")
      }

      else {
        login(username);

        //Return to home page on a successful login
        window.location.replace("/");
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

      <form>
        <label for='username'>Brukernavn:</label>
        <input type="text" id="username" name='username'></input>

        <label for='password'>Passord:</label>
        <input type="password" id="password" name='password'></input>

        <label for="email">Epost:</label>
        <input type="email" id="email" name="email"></input>
        
        <button type='button' onClick={handleLogin}>Logg inn</button>
        <button type='button' onClick={handleLogout}>Logg ut</button>
      </form>
      <div className="logInNewUser">
        <p>Hvis du ikke har en bruker kan du logge inn</p>
        <Link to='/newUser'>her</Link>
      </div>
    </div>
  )
}

export default LoggInn