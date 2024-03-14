import React from 'react'
import './NewUser.css'
//import { useAuth } from '../../AuthContext'
import { register } from '../../persistence/NewUserBackend';
import { loginData } from '../../persistence/LoggInnBackend';
import { useAuth } from '../../AuthContext';



const NewUser = () => {

  const { login } = useAuth();

  const handleNewUser = async () => {

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
      const result = await register(username, password, email);
      if (result){
        // console.log("Bruker opprettet!")
              //if backend is OK:
        loginData(email,password);
        login(username)
      }
      else {
        console.log("Error med registrering til databasen");
      }
        



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