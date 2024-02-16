import { doc } from 'firebase/firestore'
import { ref, getDatabase, get, child } from 'firebase/database'
import React from 'react'
import { useAuth } from '../../AuthContext'
import { Link } from 'react-router-dom';
import './LoggInn.css'
import { loginData, userExists, passwordMatch } from '../../persistence/LoggInnBackend'


const LoggInn = () => {
  const { IsLoggedIn, login, logout } = useAuth();

  var username;

  const handleLogin = async () => {
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
          try{
            console.log(loginData(email, password))
            await loginData(email, password);
            console.log("Success");
          }
          catch(error){
            console.log("Error ?: " + error);
          }
          //login(usernameValue);

          //Return to home page on a successful login
          //window.location.replace("/");
        }
        username.value = '';
        password.value = '';
        email.value = '';

      }
    }
  }


  const readFromFirebase = () => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users/${username}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }



  const handleLogout = () => {
    logout();
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