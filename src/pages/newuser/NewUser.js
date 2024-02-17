import React from 'react'
import './NewUser.css'
import { useAuth } from '../../AuthContext'
import { register } from '../../persistence/NewUserBackend';



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

    if(!validate_password(password)){
      alert("Ugyldig passord!");
    }
    else if(!validate_email(email)){
      alert("Ugyldig email!");
    }
    else if(!username.trim() || !password.trim() || !email.trim()){
      alert("Alle felter er påkrevd!");
    }
    else{
      register(username, password, email);
      alert("Bruker opprettet!")
        
      //Redirect to login page on a successful login
      window.location.replace("/logginn");

      //if backend is OK:
      //login(username)

    }
    
  }

  function validate_email(email) {
    const  expression = /^[^@]+@\w+(\.\w+)+\w$/;
    return expression.test(email);
  }
  
  function validate_password(password) {
    return password.length > 6;
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