import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Games.css';
import { reportGame } from '../../persistence/ReportGame';
import { favoriteGame, isFavorited, removeFavoriteGame } from '../../persistence/favoriteBackend';
import { getGameData } from '../../persistence/HjemBackend';
import { addGameToQueue, isQueued, removeQueuedGame } from '../../persistence/userQueues';
import { auth } from '../../firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faUndo } from '@fortawesome/free-solid-svg-icons';

const Games = () => {
    const { gameID } = useParams();
    const [game, setGame] = useState(null);
    const [isFavoriteGame, setIsFavoriteGame] = useState(false);
    const [isQueuedGame, setIsQueuedGame] = useState(false);

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const games = await getGameData();
                const foundGame = games.find(game => game.gameID === gameID);
                if (foundGame) {
                    setGame(foundGame);
                    const userID = auth.currentUser.uid;
                    const isFavoritedGame = await isFavorited(userID, foundGame.gameID);
                    const isQueuedGame = await isQueued(foundGame.gameID);
                    const foundMinutes = foundGame.time;
                    const foundMinutesInt = parseInt(foundMinutes)
                    setInitialMinutes(foundMinutesInt);
                    setIsFavoriteGame(isFavoritedGame);
                    setIsQueuedGame(isQueuedGame);
                } else {
                    console.log('Game not found.');
                }
            } catch (error) {
                console.error('Error fetching game data:', error);
            }
        };

        fetchGame();
    }, [gameID]);

    // Dette funka ikke så vi får se på det senere
    // // WITH USE EFFECT THE GAME ISN'T LOADED WHEN LOADING IN A PAGE, AND WILL DISPLAY "Fant ikke spillet". TO INSTEAD SAY LOADING:
    // if (!game) {
    //     return <p>Loading...</p>;
    // }
    const handleReportGame = (game) => {
        reportGame(game.gameID);
        alert(`Spillet ${game.title} (ID: ${game.gameID}) ble rapportert`);
    };

    const handleMakeFavoriteGame = async (game) => {
        const alertedGameID = game.gameID;
        const alertedGameTitle = game.title;

        if (await favoriteGame(alertedGameID)) {
            console.log(`Spillet ${alertedGameTitle} ble lagt til i favoritter`);
        }

        setIsFavoriteGame(true);
    };

    const handleAddToQueue = async (game) => {
        const queuedGameID = game.gameID;
        const queuedGameTitle = game.title;
        if (await addGameToQueue(queuedGameID)) {
            console.log(`Spillet ${queuedGameTitle} ble lagt til i køen`);
        }
        
        setIsQueuedGame(true);
    };

    //let recommendedMinutes= game.time;

    //minute and second- inputs 
    const [initialMinutes, setInitialMinutes] = useState(0);
    const [initialSeconds, setInitialSeconds] = useState(0);
    //whether the timer is active 
    const [isActive, setIsActive] = useState(false);
    //the minutes that are actually count down 
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
      
    useEffect(() => {
        let intervalId;
      
        if (isActive) {
            intervalId = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                  clearInterval(intervalId);
                  setIsActive(false);
                } else {
                  setMinutes(prevMinutes => prevMinutes - 1);
                  setSeconds(59);
                }
              } else {
                  setSeconds(prevSeconds => prevSeconds - 1);
              }
            }, 1000);
          }
      
        return () => clearInterval(intervalId);
        }, [isActive, minutes, seconds]);
    

    const handleMinuteInputChange = (e) => {
        setInitialMinutes(parseInt(e.target.value));
    };
        
    const handleSecondInputChange = (e) => {
        setInitialSeconds(parseInt(e.target.value));
    };


    if (!game) {
        return <p>Fant ikke spillet.</p>;
    }

    //remove favorite from backend
    const handleRemoveFavoriteGame = (game) => {
        setIsFavoriteGame(false);
        removeFavoriteGame(game.gameID)
            .then(() => {
                console.log("Game removed from favorites successfully");
            })
            .catch((error) => {
                console.log("Error removing game from favorites: ", error);
            })
    }

    const handleRemoveQueuedGame = (game) => {
        setIsQueuedGame(false);
        removeQueuedGame(game.gameID)
            .then(() => {
                console.log("Game removed from queued games successfully");
            })
            .catch((error) => {
                console.log("Error removing game from queued games: ", error);
            })
    }


    const startCountdown = () => {
      if(isActive){
        setIsActive(false);
        setMinutes(minutes);
        setSeconds(seconds);
      }
      else if(!isActive && (initialMinutes !== minutes || initialSeconds !== seconds)){
        setMinutes(minutes);
        setSeconds(seconds);
        setIsActive(true);
      }
      else if (!isActive && (initialMinutes !== 0 || initialSeconds !== 0)) {
        setMinutes(initialMinutes);
        setSeconds(initialSeconds);
        setIsActive(true);
      }
    };
    
    const resetCountdown = () => {
      setIsActive(false);
      setMinutes(initialMinutes);
      setSeconds(initialSeconds);
    };

    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
            <div className='page'>
              <div className='gamesContainer'>
                  <div className='gameTitle'>
                      <h1>{game.title}</h1>
                  </div>

                  <div className='aboutGame'>
                      <div className='aboutItem'>
                          <h4>Antall: {game.nPeopleMin} - {game.nPeopleMax}</h4>
                      </div>
                      <div className='aboutItem'>
                          <h4>Kategori: {game.category}</h4>
                      </div>
                  </div>
                  <div className='gameDescription'>
                      <p>{game.description}</p>
                  </div> 

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
                <div className='buttonsContainer'>
                {!isFavoriteGame ? (
                    <button className='moreButton favoriteButton' type='button' onClick={() => handleMakeFavoriteGame(game)}>
                        <i className="fa fa-heart"></i> Favoritt
                    </button>
                ) : (
                    <button className='moreButton removeButton' type='button' onClick={() => handleRemoveFavoriteGame(game)}>
                        <i className="fa fa-heart"></i> Fjern Favoritt
                    </button>
                )}
                {!isQueuedGame ? (
                    <button className='moreButton queueButton' type='button' onClick={() => handleAddToQueue(game)}>
                        <i className="fa fa-plus"></i> Legg til i kø
                    </button>
                ) : (
                    <button className='moreButton removeButton' type='button' onClick={() => handleRemoveQueuedGame(game)}>
                        <i className="fa fa-minus"></i> Fjern fra kø
                    </button>
                )}

                    <button className='moreButton reportButton' type='button' onClick={() => handleReportGame(game)}>
                        <i className="fa fa-flag"></i> Rapporter
                    </button>
                </div>
            </div>
        </div>
      </div>
      );
  };

export default Games;


