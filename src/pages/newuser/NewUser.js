import React from 'react'
import './NewUser.css'
import { useAuth } from '../../AuthContext'
import { register } from './registerUser';



const NewUser = () => {

  const { login } = useAuth();

  const handleNewUser = () => {

    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');

    const username = usernameInput.value;
    const password = passwordInput.value;
    const email = emailInput.value;


    //console.log(username, password, email);
    //run backend for creating new user

    register(username, password, email);


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
            <button className='button' type='button' onClick={handleNewUser}>Ny bruker</button>
          </div>
      </form>
    </div>
  )
}

export default NewUser