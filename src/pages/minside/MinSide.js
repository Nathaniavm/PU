import React, { useCallback, useEffect, useState } from 'react';
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
import { retrieveQueue } from '../../persistence/userQueues';
import useTimer from '../../common/timer/Timer';
import { faPlay, faUndo } from '@fortawesome/free-solid-svg-icons';

var games = await getGameData();

const MinSide = () => {
  const { isAdmin, isLoggedIn} = useAuth();

  const [favoriteGames, setFavoriteGames] = useState([]);
  const [queuedGames, setQueuedGames] = useState([]);
  const [loading, setLoading] = useState(true);

  //Timer variables
  const [initialMinutes, setInitialMinutes] = useState(1);
  const [initialSeconds, setInitialSeconds] = useState(0);
  const { minutes, seconds, isActive, startCountdown, resetCountdown, setMinutes } = useTimer(initialMinutes, initialSeconds);

  // State variable to store reported games
  const [deletedGames, setDeletedGames] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    let index = currentIndex;
    setCurrentIndex((prevIndex) => (prevIndex +1) % queuedGames.length);
    let newIndex = (index + 1) % queuedGames.length;
    // console.log(newIndex)
    setInitialMinutes(queuedGames[newIndex].time);
    setMinutes(queuedGames[newIndex].time);
  }, [currentIndex, queuedGames, setMinutes]);

  useEffect(() => {
    const fetchFavoritesAndQueue = async () => {
      try {
        const favorites = await listFavorites();
        const queue = await retrieveQueue()
        // console.log(queue)
        for(let i = 0; i < favorites.length; i++) {
          const selectedGame = games.find(game => game.gameID === favorites[i].gameID);
          setFavoriteGames(prevFavoriteGames => [...prevFavoriteGames, selectedGame]);
        }

        for(let i = 0; i < queue.length; i++) {
          const selectedGame = games.find(game => game.gameID === Object.keys(queue[i])[0]);
          setQueuedGames(prevQueuedGames => [...prevQueuedGames, selectedGame]);
          if(i === 0){
            setInitialMinutes(selectedGame.time)
            setMinutes(selectedGame.time);
          }
        }


        setLoading(false);
      }
      catch (error) {
        console.error("Error fetching favorites: ", error);
      }
    };
    fetchFavoritesAndQueue();
  }, [setMinutes]);


  useEffect(() =>{
    if(minutes === 0 && seconds === 0){
      handleNext()
    }
  },[minutes, seconds, handleNext]);




   // Function to handle reporting a game
   const handleDeleteGame = (gameID) => {
       // Add the reported game to the reportedGames state variable
       setDeletedGames([...deletedGames, gameID]);
       // You can also perform additional actions here such as making an API call to report the game to the backend
      //  console.log("Spillet " + gameID + " er slettet");
   };



    

    const handlePrevious = () => {
      let index = currentIndex;
      setCurrentIndex((prevIndex) => prevIndex === 0 ? queuedGames.length -1 : prevIndex -1);
      let newIndex = currentIndex;
      if(index === 0) {
        newIndex = queuedGames.length -1;
      }
      else{
        newIndex = index -1;
      }
      // console.log(newIndex)
      setInitialMinutes(queuedGames[newIndex].time);
      setMinutes(queuedGames[newIndex].time);
    };

    const [showGameInfo, setShowGameInfo] = useState(false);
    // console.log(queuedGames)
    const queuedgame = queuedGames[currentIndex];
    // console.log(queuedgame)
    //setInitialMinutes(queuedgame.time)
    const handleShowMore = () => {
      setShowGameInfo(!showGameInfo);
    };

    var reportedGamesList = [];
    for(var i = 0; i < games.length; i++) {
        if (games[i].nReported > 0) {
          reportedGamesList.push(games[i])
        }
    }


    // Event handlers for timer input fields
    const handleMinuteInputChange = (e) => {
      setInitialMinutes(parseInt(e.target.value));
    };

    const handleSecondInputChange = (e) => {
        setInitialSeconds(parseInt(e.target.value));
    };

    

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
            {queuedGames.length > 0 ? (
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
                      {queuedgame.title}
                    </h4>
                  </div>
                  <div className='queueCategory'>
                  <h5>Type: </h5> {queuedgame.category}
                    <h5>Antall: </h5> {queuedgame.nPeopleMin} - {queuedgame.nPeopleMax}
                  </div>
                  {showGameInfo && (
                    <div className='queueGameInfo'>
                    {queuedgame.description}
                    </div>
                  )}
                  <button onClick={handleShowMore} className='showMoreButton'>
                    {showGameInfo ? 'Vis mindre' : 'Vis mer'}
                  </button>
                </div>
                <FontAwesomeIcon icon={faStepForward} className='icon' onClick={handleNext}></FontAwesomeIcon>
                </div>
                <div className="timerQueue">
                  <div className='timer'>
                    <div className='timerContainer'>
                      <div className='inputTimerContainer'>
                      <input
                        className='timeInputField'
                        type="number"
                        value={initialMinutes}
                        onChange={handleMinuteInputChange}
                        disabled={isActive}
                      />
                      <span className='unit'> minutter </span>
                      <input
                        className='timeInputField'
                        type="number"
                        value={initialSeconds}
                        onChange={handleSecondInputChange}
                        disabled={isActive}
                      />
                      <span className='unit'> sekunder </span>
                      </div>
                      <div className='timerDiv'>
                        <h1>
                          {minutes.toString().padStart(2, '0')}:
                          {seconds.toString().padStart(2, '0')}
                        </h1>
                      </div>
                      <div className='timerButtonsContainer'>
                        <button className = 'button' onClick={startCountdown}>
                          <FontAwesomeIcon icon={faPlay} />
                        </button>
                        <button className= 'button' onClick={resetCountdown}>
                          <FontAwesomeIcon icon={faUndo} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          
            ) : (
              <div className='HeaderInDiv2'>
                <h1>
                    Køen er tom
                </h1>
              </div>
            )}
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
