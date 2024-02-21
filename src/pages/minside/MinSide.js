import React from 'react'
import { useAuth } from '../../AuthContext'
import './MinSide.css'
import { signOutUser } from '../../persistence/LoggInnBackend';

const MinSide = () => {
  const { logout, isAdmin, isLoggedIn } = useAuth();

  const handleLogout = () => {
    signOutUser();
    logout();
  }

  return (
    <>
      {isLoggedIn ? (
        <div className='MPContainer'>
          <div className='TitleDiv'>
            <h1>
              Min Side
            </h1>
          </div>

          <div className='MyPageDiv'>
            <div className='FavoritesDiv'>
              <div className='HeaderInDiv'>
                <h1>
                  Favoritter
                </h1>
              </div>
            </div>
            <div className='QueueDiv'>
              <div className='HeaderInDiv'>
                <h1>
                  Kø
                </h1>
              </div>
            </div>
          </div>

          <div className='LogoutDiv'>
            <button className='LogoutButton' type='button' onClick={handleLogout}>Logg ut</button>
          </div>

          {isAdmin && (
            <div className='RapportedUsersDiv'>
              <div className='HeaderInDiv'>
                <h1>Rapporterte spillere</h1>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="MinSide__not-logged-in">
          <div className='ErrorLoginContainer'>
            <h2 className='ErrorLoginMessage'>
              For å ha tilgang til disse funksjonene er det nødvendig at du er logget inn.
            </h2>
            <Link to="/logginn">Logg inn</Link>
          </div>
        </div>
      )}
    </>
  )
}

export default MinSide
