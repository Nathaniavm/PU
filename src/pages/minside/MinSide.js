import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext'
import './MinSide.css'
import { removeReports } from '../../persistence/ReportGame';
import {Link } from 'react-router-dom';
import '../hjem/Hjem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'; 
import { faStepBackward } from '@fortawesome/free-solid-svg-icons';
import { faStepForward  } from '@fortawesome/free-solid-svg-icons';
import { getGameData } from '../../persistence/HjemBackend';
import { listFavorites } from '../../persistence/favoriteBackend';
import { gameTitleExists, retrieveGameInfo } from '../../persistence/OpprettLekerBackend';

var games = await getGameData();

const MinSide = () => {
  const { isAdmin, isLoggedIn} = useAuth();

  const [favoriteGames, setFavoriteGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await listFavorites();
        // console.log(favorites);

        setFavoriteGames(favorites);
        setLoading(false);
      }
      catch (error) {
        console.error("Error fetching favorites: ", error);
      }
    };
    fetchFavorites();
  }, []);
  

  
  // const favoritePlaceholderGames = [
  //   {gameID: 1, title: 'Stiv Heks', description: 'En blir valgt til å være heks, heksa skal løpe etter de andre og prøve å ta på dem, hvis man blir truffet av heksa må man stå med beina spredt, og man blir fri hvis noen kraber under beina dine'
  //   , category: 'fysisk lek', nPeople: '10'},
  //   {gameID: 2, title: 'Navnedyrleken', description: 'Alle sier navnet sitt, og et dyr med samme forbokstav som navnet', category: 'navnelek', nPeople: '1'},
  //   {gameID: 3, title: 'Spille kort', description: 'Bare spille ett eller annet med kort', category: 'icebreaker', nPeople: '4'},
  //   {gameID: 4, title: 'Sista', description: 'Løpe etter hverandre', category: 'fysisk lek', nPeople: '4'},
  //   {gameID: 1, title: 'Stiv Heks', description: 'En blir valgt til å være heks, heksa skal løpe etter de andre og prøve å ta på dem, hvis man blir truffet av heksa må man stå med beina spredt, og man blir fri hvis noen kraber under beina dine'
  //   , category: 'fysisk lek', nPeople: '10'},
  //   {gameID: 2, title: 'Navnedyrleken', description: 'Alle sier navnet sitt, og et dyr med samme forbokstav som navnet', category: 'navnelek', nPeople: '1'},
  //   {gameID: 4, title: 'Sista', description: 'Løpe etter hverandre', category: 'fysisk lek', nPeople: '4'},
  // ]

   // State variable to store reported games
   const [deletedGames, setDeletedGames] = useState([]);

   // Function to handle reporting a game
   const handleDeleteGame = (gameID) => {
       // Add the reported game to the reportedGames state variable
       setDeletedGames([...deletedGames, gameID]);
       // You can also perform additional actions here such as making an API call to report the game to the backend
       console.log("Spillet " + gameID + " er slettet");
   };


      const [currentIndex, setCurrentIndex] = useState(0);

      const queuePlaceholderGames = [
        {gameID: 1, title: 'Stiv Heks', description: 'En blir valgt til å være heks, heksa skal løpe etter de andre og prøve å ta på dem, hvis man blir truffet av heksa må man stå med beina spredt, og man blir fri hvis noen kraber under beina dine'
        , category: 'fysisk lek', nPeople: '10', reportCount: '2'},
        {gameID: 2, title: 'Navnedyrleken', description: 'Alle sier navnet sitt, og et dyr med samme forbokstav som navnet', category: 'navnelek', nPeople: '1', reportCount: '2'},
        {gameID: 3, title: 'Spille kort', description: 'Bare spille ett eller annet med kort', category: 'icebreaker', nPeople: '4', reportCount: '2'},
        {gameID: 4, title: 'Sista', description: 'Løpe etter hverandre', category: 'fysisk lek', nPeople: '4', reportCount: '2'},
      ];
    

    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex +1) % queuePlaceholderGames.length);
    }

    const handlePrevious = () => {
      setCurrentIndex((prevIndex) => prevIndex === 0 ? queuePlaceholderGames.length -1 : prevIndex -1);
    };

    const [showGameInfo, setShowGameInfo] = useState(false);
    const game = queuePlaceholderGames[currentIndex];
    
    const handleShowMore = () => {
      setShowGameInfo(!showGameInfo);
    };

var reportedGamesList = [];
for(var i = 0; i < games.length; i++) {
    if (games[i].nReported > 0) {
      reportedGamesList.push(games[i])
    }
}
// console.log(reportedGamesList);


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
                <div className= 'gameOverviewGrid'>
                      <div className= 'gameVerticalList'>
                          {favoriteGames.map((game, index) => (
                              <Link to={`/game/${game.gameID}`} key={index} className= "gameSquareVerticalList">
                                  <h4>{game.title}</h4>
                                  <div className="gameSquare-p-content">
                                      <p>Kategori: {game.category}</p>
                                      <p>Antall: {game.nPeopleMin} - {game.nPeopleMax}</p>
                                  </div>
                              </Link>
                            ))}
                      </div>
                  </div>
                
              </div>
            </div>
            <div className='QueueDiv'>
              <div className='HeaderInDiv2'>
                <h1>
                  Kø
                </h1>
              </div>
              <div className='InputQueue'> 
              <FontAwesomeIcon icon={faStepBackward} className='icon' onClick={handlePrevious}></FontAwesomeIcon>
              <div className='SquareGame'> 
                <div className='queueHeaderDiv'>
                  <h4>
                    {game.title}
                  </h4>
                </div>
                <div className='queueCategory'>
                <h5>Type: </h5> {game.category}
                  <h5>Antall: </h5> {game.nPeople}
                </div>
                {showGameInfo && (
                  <div className='queueGameInfo'>
                   {game.description}
                  </div>
                )}
                <button onClick={handleShowMore} className='showMoreButton'>
                  {showGameInfo ? 'Vis mindre' : 'Vis mer'}
                </button>
              </div>
              <FontAwesomeIcon icon={faStepForward} className='icon' onClick={handleNext}></FontAwesomeIcon>
            </div>
            </div>
          </div>

          {isAdmin && (
            <div className='RapportedUsersDiv'>
              <div className='HeaderInDiv'>
                <h1>Rapporterte spill</h1>
              </div>
              <table className='ulReportedGame'>
                <thead>
                  <tr>
                    <th>Navn</th>
                    <th>Kategori</th>
                    <th>Antall ganger rapportert</th>
                    <th>Slett spill</th>
                  </tr>
                  {reportedGamesList.map((game, index) => (
                      <tr key={index}>
                          <td className="ReportedGameTitle"> 
                              <Link to={`/game/${game.gameID}`} key={index} className="gamesSquare">{game.title}</Link>
                          </td>
                          <td className="ReportedGameCategory">{game.category}</td>
                          <td className="ReportedGameReportCount">Reports: {game.nReported}</td>
                          <td className='ReportedGameDelete' onClick={() => handleDeleteGame(game.gameID)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </td>
                      </tr>
                  ))}
                </thead>

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

export default MinSide;
