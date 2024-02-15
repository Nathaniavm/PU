import React from 'react'
import './NewUser.css'
import { useAuth } from '../../AuthContext'


const NewUser = () => {

  const { login } = useAuth();

  const handleNewUser = () => {

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');

    const username = usernameInput.value;
    const password = passwordInput.value;
    const email = emailInput.value;

    console.log(username, password, email);
    //run backend for creating new user

    //if backend is OK:
    login(username)

    usernameInput.value = '';
    passwordInput.value = '';
    emailInput.value = '';
    
  }


  return (
    <div className='logInContainer'>
      <div className='logInHeader'>
        <h1>Lag ny bruker her:</h1>
      </div>

      <form>
        <label for='username'>Brukernavn:</label>
        <input type="text" id="username" name='username'></input>

        <label for='password'>Passord:</label>
        <input type="password" id="password" name='password'></input>

        <label for="email">Epost:</label>
        <input type="email" id="email" name="email"></input>
        
        <button type='button' onClick={handleNewUser}>Logg inn</button>
      </form>
    </div>
  )
}

export default NewUser