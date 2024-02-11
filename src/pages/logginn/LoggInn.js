import React from 'react'
import { useAuth } from '../../AuthContext'
import { Link } from 'react-router-dom';
import './LoggInn.css'

const LoggInn = () => {
  const { IsLoggedIn, login, logout } = useAuth();


  const handleLogin = () => {
    if(!IsLoggedIn){
      const username = document.getElementById('username').value;
      //Login logic for database
      login(username); //if the login from database is OK
    }

  }

  const handleLogout = () => {
    logout();
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