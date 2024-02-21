import React, { useContext, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import { Link } from 'react-router-dom';
import './Opprettleker.css';
import { registerGame } from '../../OpprettLekerBackend';

const OpprettLeker = () => {
  const { isLoggedIn, username } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    nPeople: '',
    category: ''
  });

  const handleCreateGame = () => {
    // Access form data from state
    const { title, description, nPeople, category } = formData;
    console.log(title, description, nPeople, category);

    if (!title.trim()) {
      alert("Tittel er påkrevd")
    } else if (!description.trim()) {
      alert("Beskrivelse er påkrevd")
    }
    //Send data to backend

    registerGame(title, description, nPeople); //added for database


    // Clear form inputs after submission
    setFormData({
      title: '',
      description: '',
      nPeople: '',
      category: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
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

              <div className="Opprettleker__form-nPeople Opprettleker__form-general">
                <input
                  className='inputField'
                  type="number"
                  id="nPeople"
                  name="nPeople"
                  placeholder='Antall personer, la stå blank hvis ubegrenset antall'
                  value={formData.nPeople}
                  onChange={handleInputChange}
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

export default OpprettLeker;