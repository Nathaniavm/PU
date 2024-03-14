import React, { useContext, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import { Link } from 'react-router-dom';
import './Opprettleker.css';
import { gameIDExists, gameTitleExists, registerGame } from '../../persistence/OpprettLekerBackend';

const OpprettLeker = () => {
  const { isLoggedIn, username } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    nPeopleMin: '',
    nPeopleMax: '',
    category: '',
    time: ''
  });
 
  const handleCreateGame = async () => {
    // Access form data from state
    let { title, description, nPeopleMin, nPeopleMax, category, time } = formData;

    if (!title.trim()) {
      alert("Tittel er påkrevd")
      return
    } else if (!description.trim()) {
      alert("Beskrivelse er påkrevd")
      return
    } else if (!category) {
      alert("Velg en kategori!")
      return
    }
    // console.log(nPeople);
    // console.log(typeof nPeople);

    //Sjekk om feltene er gyldige:
    // console.log(title.trim());
    if (isValidGameTitle(title.trim())){
      if (title.length > 40){
        alert("Game title is too long!");
        return;
      }
    }
    else {
      alert("Game title can only be made with letters and numbers");
      return;
    }

    if (nPeopleMin == ""){
      nPeopleMin = "0"
    }

    if (nPeopleMax == ""){
      nPeopleMax = "Ubegrenset"
    }
    //Send data to backend

    //Sjekk for om spillet allerede finnes
    if (! await gameTitleExists(title)) {
      registerGame(title, description, nPeopleMin, nPeopleMax, category, time); //added for database 

      // Clear form inputs after submission
      setFormData({
        title: '',
        description: '',
        nPeopleMin: '',
        nPeopleMax: '',
        category: '',
        time: ''
      });
    }
    else {
      console.log("Spillet finnes allerede");
    }


  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "nPeopleMin" || name === "nPeopleMax") {
      const sanitizedValue = value.replace(/\D/g, '');
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: sanitizedValue
      }));    
    }
    else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));  
    }
  };

  return (
    <div className="Opprettleker__main">
      {isLoggedIn ? (
        <div className="Opprettleker__logged-in">
          <div className='headers'>
            <h1>Hei {username}!</h1>
            <h3>
              Her kan du opprette dine egne bli-kjent leker slik at andre besøkende kan leke disse
            </h3>
          </div>
          <div className="Opprettleker__logged-in-form">
            <form className='form'>
              <div className="Opprettleker__form-title Opprettleker__form-general">
                <input
                  className='inputField'
                  type="text"
                  id="title"
                  name="title"
                  placeholder='Tittel, påkrevd informasjon'
                  value={formData.title}
                  
                  onChange={handleInputChange}
                />
              </div>

              <div className="Opprettleker__form-description Opprettleker__form-general">
                <textarea
                  className='inputField'
                  rows="4"
                  cols="50"
                  id="description"
                  name="description"
                  placeholder='Beskrivelse, påkrevd informasjon'
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className='Opprettleker__form-nPeoplediv'>
                  <input
                    className='inputFieldnPeople'
                    type="text"
                    id="nPeopleMin"
                    name="nPeopleMin"
                    value={formData.nPeopleMin}
                    onChange={handleInputChange}
                    placeholder='Minimum antall deltakere'
                    pattern='[0-9]*'
                  />
                
                  <input
                    className='inputFieldnPeople'
                    type="text"
                    id="nPeopleMax"
                    name="nPeopleMax"
                    value={formData.nPeopleMax}
                    onChange={handleInputChange}
                    placeholder='Maksimim antall deltakere'
                    pattern='[0-9]*'
                  />
                
              </div>
              <div className='Opprettleker__form-category Opprettleker__form-general'>
                <select required
                  className={`selectField ${formData.category === '' ? 'placeholder' : ''}`}
                  id='category'
                  name='category'
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  {formData.category === '' && (
                    <option value="" disabled>Velg kategori</option>
                  )}
                  <option value='alle'>Alle</option>
                  <option value='navnelek'>Navnelek</option>
                  <option value='icebreaker'>Icebreaker</option>
                  <option value='fysisk lek'>Fysisk lek</option>
                </select>
              </div>

              <div className="Opprettleker__form-time Opprettleker__form-general">
                <input
                  className='inputField'
                  type="text"
                  id="time"
                  name="time"
                  placeholder='Anbefalt antall minutter å spille'
                  value={formData.time}
                  
                  onChange={handleInputChange}
                  pattern='[0-9]*'
                />
              </div>

              <div className="Opprettleker__form-btn Opprettleker__form-general">
                <button className='button' type="button" onClick={handleCreateGame}>
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="Opprettleker__not-logged-in">
          <div className='ErrorLoginContainer'>
            <h2 className='ErrorLoginMessage'>
              For å benytte deg av denne funksjonen må du være logget inn, dette er fordi vi vil ha
              kontroll på hvem som opprettet lekene.
            </h2>
            <Link to="/logginn">Logg inn</Link>
          </div>
        </div>
      )}
    </div>
  );
};

function isValidGameTitle(str){
  let allowedChars = /^[a-zA-Z0-9\sæÆøØåÅ!?-]+$/;
  if (allowedChars.test(str)) {
    return true;
  }
  else {
    return false;
  }
}


export default OpprettLeker;