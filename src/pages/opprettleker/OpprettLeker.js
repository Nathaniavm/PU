import React, { useContext, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import { Link } from 'react-router-dom';
import './Opprettleker.css';

const OpprettLeker = () => {
  const { isLoggedIn, username } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    nPeople: ''
  });

  const handleCreateGame = () => {
    // Access form data from state
    const { title, description, nPeople } = formData;
    console.log(title, description, nPeople);

    if(!title.trim()){
      alert("Tittel er påkrevd")
    }

    else if(!description.trim()){
      alert("Beskrivelse er påkrevd")
    }
    //Send data to backend



    // Clear form inputs after submission
    setFormData({
      title: '',
      description: '',
      nPeople: ''
    });
  };

  const handleChange = (e) => {
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
              <div className="Opprettleker__form-title">
                <input
                  className='inputField'
                  type="text"
                  id="title"
                  name="title"
                  placeholder='Tittel, påkrevd informasjon'
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              <div className="Opprettleker__form-description">
                <textarea
                  className='inputField'
                  rows="4"
                  cols="50"
                  id="description"
                  name="description"
                  placeholder='Beskrivelse, påkrevd informasjon'
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="Opprettleker__form-nPeople">
                <input
                  className='inputField'
                  type="number"
                  id="nPeople"
                  name="nPeople"
                  placeholder='Antall personer, la stå blank hvis ubegrenset antall'
                  value={formData.nPeople}
                  onChange={handleChange}
                />
              </div>

              <div className="Opprettleker__form-btn">
                <button className= 'button' type="button" onClick={handleCreateGame}>
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
