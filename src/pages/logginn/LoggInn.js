import React from 'react'
import { useAuth } from '../../AuthContext'

const LoggInn = () => {
  const { isLoggedIn, login} = useAuth();

  const handleLogin = () => {
    //Login logic for database
    login(); //if the login from database is OK
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
      </form>

    </div>
  )
}

export default LoggInn