import React, { useState } from 'react';
import { useAuth } from '../../AuthContext'
import './MinSide.css'
import { signOutUser } from '../../persistence/LoggInnBackend';
import {Link } from 'react-router-dom';

const MinSide = () => {
  const { logout, isAdmin, isLoggedIn} = useAuth();

  const handleLogout = () => {
    signOutUser();
    logout();
  }

   // State variable to store reported games
   const [deletedGames, setDeletedGames] = useState([]);

   // Function to handle reporting a game
   const handleDeleteGame = (gameID) => {
       // Add the reported game to the reportedGames state variable
       setDeletedGames([...deletedGames, gameID]);
       // You can also perform additional actions here such as making an API call to report the game to the backend
       console.log("Spillet " + gameID + " er slettet");
   };

    // Placeholder games, will be switched with backend retreiving method
    const placeholderGames = [
      {gameID: 1, title: 'Stiv Heks', description: 'En blir valgt til å være heks, heksa skal løpe etter de andre og prøve å ta på dem, hvis man blir truffet av heksa må man stå med beina spredt, og man blir fri hvis noen kraber under beina dine'
      , category: 'fysisk lek', nPeople: '10', reportCount: '2'},
      {gameID: 2, title: 'Navnedyrleken', description: 'Alle sier navnet sitt, og et dyr med samme forbokstav som navnet', category: 'navnelek', nPeople: '1', reportCount: '2'},
      {gameID: 3, title: 'Spille kort', description: 'Bare spille ett eller annet med kort', category: 'icebreaker', nPeople: '4', reportCount: '2'},
      {gameID: 4, title: 'Sista', description: 'Løpe etter hverandre', category: 'fysisk lek', nPeople: '4', reportCount: '2'},
    ];

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
              <div className='HeaderInDiv2'>
                <h1>
                  Favoritter
                </h1>
              </div>
              <div className='InputFavorites'>
                <div className='SquareGame'> </div>
                <div className='SquareGame'> </div>
                <div className='SquareGame'> </div>
              </div>
            </div>
            <div className='QueueDiv'>
              <div className='HeaderInDiv2'>
                <h1>
                  Kø
                </h1>
              </div>
              <div className='InputQueue'> 
                <div className='SquareGame'> </div>
                <div className='SquareGame'> </div>
                <div className='SquareGame'> </div>
              </div>
            </div>
          </div>

          <div className='LogoutDiv'>
            <button className='LogoutButton' type='button' onClick={handleLogout}>Logg ut</button>
          </div>

          {isAdmin && (
            <div className='RapportedUsersDiv'>
              <div className='HeaderInDiv'>
                <h1>Rapporterte spill</h1>
              </div>
              <table className='ulReportedGame'>
                <tr>
                  <th>Navn</th>
                  <th>Kategori</th>
                  <th>Antall ganger rapportert</th>
                  <th>Slett spill</th>
                </tr>
                {placeholderGames.map((game, index) => (
                    <tr key={index}>
                        <td className="ReportedGameTitle"> 
                            <Link to={`/game/${game.gameID}`} key={index} className="gamesSquare">{game.title}</Link>
                        </td>
                        <td className="ReportedGameCategory">{game.category}</td>
                        <td className="ReportedGameReportCount">Reports: {game.reportCount}</td>
                        <td className='ReportedGameDelete' onClick={() => handleDeleteGame(game.gameID)}>
                          <button> Trykk</button>
                        </td>
                    </tr>
                ))}
              </table>
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
