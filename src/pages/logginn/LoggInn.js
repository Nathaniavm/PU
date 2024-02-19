import { ref, getDatabase, get, child } from 'firebase/database'
import React from 'react'
import { useAuth } from '../../AuthContext'
import { Link } from 'react-router-dom';
import './LoggInn.css'
import { loginData, usernameExists, passwordMatch, signOutUser, emailExists, getEmailFromUsername } from '../../persistence/LoggInnBackend'


const LoggInn = () => {
  const { IsLoggedIn, login, loginAdmin } = useAuth();

  function nameIsEmail(username){
    //Check format for wether an input field is email
    const res = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(res.test(String(username).toLowerCase())){
      return true;
    }
    else return false;
  }

  var username;

  const handleLogin = async () => {
    if(!IsLoggedIn){

      const username = document.getElementById('username');
      const password = document.getElementById('password');
      var email = username;
      var emailValue = "";
      const usernameValue = username.value;
      const passwordValue = password.value;

      let isEmail = nameIsEmail(usernameValue);
      
      if (isEmail){ 
        email = username; 
        emailValue = usernameValue;
        //Make all lower case?
      }


      if(!usernameValue.trim() || !passwordValue.trim()){
        alert("Begge felter er påkrevd!")
      }
      else{
        if (isEmail){
          if (! await emailExists(emailValue)){ //Await for å vente til queryen av databasen er ferdig
            alert("Eposten finnes ikke");
            return;
          }
        }
        else {
          if(! await usernameExists(usernameValue)){
          alert("Brukernavnet finnes ikke");
          return;
          }
        }  

        //Vet ikke om vi trenger dette siden vi har sjekket brukernavn, og hvis det stemmer vil det automatisk bli passord som er feil
        if(!passwordMatch(usernameValue, passwordValue)){
          alert("Feil passord")
        }
        else {
          if(!isEmail){
            //emailValue = "test@test.no";
            emailValue = await getEmailFromUsername(usernameValue);
            //console.log("emailValue: " + emailValue);
          }

          try{
            //console.log(loginData(email, password))
            await loginData(emailValue, passwordValue);
            console.log("Success");
          }
          catch(error){
            console.log("Error ?: " + error);
            alert("Feil passord") //
            return;
          }
          login(usernameValue);
          if(usernameValue == 'Admin'){
            loginAdmin(); //need work, everyone should not be admin
          }

          //Return to home page on a successful login
          //window.location.replace("/");
        }
        //Dette er vel ikke nødvendig da dette er variabler som ble definert da funksjonen ble kalt, og vil dermed ikke ta plass etter funksjonen har returnert?
        username.value = '';
        password.value = '';
        email.value = '';
      }
    }
  }


  //Jeg vet ikke om dette faktisk er i bruk?
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
    signOutUser();
    logout();
  }



  return (
      <div className='logInContainer'>
        <div className='logInHeader'>
          <h1>Logg inn her:</h1>
        </div>
        <form className='formContainer'>
          <div className='inputFieldContainer'>
            <input className='inputField' type="text" placeholder='Brukernavn/Epost' id="username" name='username' autoFocus></input>
          </div>
          <div className='inputFieldContainer'>
            <input className='inputField' type="password" placeholder='Passord' id="password" name='password'></input>
          </div>
          {/* 
          <div className='inputFieldContainer'>
            <input className='inputField' type="email" placeholder='Epost' id="email" name="email"></input>
          </div>
          */}
          <div className='buttonDiv'>
            <button className= 'button' type='button' onClick={handleLogin}>Logg inn</button>
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