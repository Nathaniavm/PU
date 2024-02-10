import React, { useContext } from 'react'
import { AuthContext } from  '../../AuthContext'
import { Link } from 'react-router-dom';
import './OpprettLeker.css';

const OpprettLeker = () => {
  const {isLoggedIn, username} = useContext(AuthContext)

  const handleCreateGame = () => {

  }

  return (
    <div className='Opprettleker__main'>
      {isLoggedIn ? (
        <div className="Opprettleker__logged-in">
          <h1>Hei {username}!</h1>
          <h3>Her kan du opprette dine egne bli-kjent leker slik at andre besøkere kan leke disse</h3>
          <div className="Opprettleker__logged-in-form">
            <form>
              <div className="Opprettleker__form-title">
                <label for='title'>Tittel (påkrevd):</label>
                <input type="text" id='title' name='title'></input>
              </div>

              <div className="Opprettleker__form-description">
                <label for='description'>Beskrivelse:</label>
                <textarea rows='4' cols='50' id='description' name='description'></textarea>
              </div>

              <div className="Opprettleker__form-nPeople">
                <label for="nPeople">Antall personer:</label>
                <input type="number" id="nPeople" name="nPeople"></input>
              </div>

              <div className="Opprettleker__form-btn">
                <button type='button' onClick={handleCreateGame}>Send</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="Opprettleker__not-logged-in">
          <h1>For å benytte deg av denne funksjonen må du være logget inn, dette er fordi vi vil ha kontroll på hvem som opprettet lekene.</h1>
          <Link to='/logginn'>Logge inn</Link>
          </div>
      )
    }
    </div>
  )
}

export default OpprettLeker