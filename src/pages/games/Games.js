import React, { useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';
import './Games.css';
import './profilePhoto.jpg';
import { reportGame } from '../../persistence/ReportGame';
import { favoriteGame, isFavorited, removeFavoriteGame } from '../../persistence/favoriteBackend';
import { getGameData } from '../../persistence/HjemBackend';
import { addGameToQueue, isQueued, removeQueuedGame } from '../../persistence/userQueues';
import { auth } from '../../firebaseConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faUndo, faStar, faTrashAlt, faBan} from '@fortawesome/free-solid-svg-icons';

const Games = () => {
    const { gameID } = useParams();
    const { isLoggedIn, username } = useContext(AuthContext);
    const [game, setGame] = useState(null);
    const [isFavoriteGame, setIsFavoriteGame] = useState(false);
    const [isQueuedGame, setIsQueuedGame] = useState(false);
    //minute and second- inputs 
    const [initialMinutes, setInitialMinutes] = useState(0);
    const [initialSeconds, setInitialSeconds] = useState(0);
    //whether the timer is active 
    const [isActive, setIsActive] = useState(false);
    //the minutes that are actually count down 
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    //comments for a review
    const [comments, setComments] = useState([]);
    const [myReview, setMyReview] = useState('');
    const [myStarReview, setMyStarReview] = useState('');

    useEffect(() => {
        const fetchGame = async () => {
            try {
                const games = await getGameData();
                const foundGame = games.find(game => game.gameID === gameID);
                if (foundGame) {
                    setGame(foundGame);
                    const userID = auth.currentUser.uid;
                    const isFavoritedGame = await isFavorited(userID, foundGame.gameID);
                    const isQueuedGame = await isQueued(userID, foundGame.gameID);
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

    const highlightStars = (event) => {
        const index = parseInt(event.target.getAttribute('data-index'));
        const stars = document.querySelectorAll('.star');
        let numStars = 0;
        for (let i = 0; i < stars.length; i++) {
            if (i < index) {
                stars[i].classList.add('active');
                numStars ++;
            } else {
                stars[i].classList.remove('active');
            }
        }
        setMyStarReview(numStars);
    };


    const resetHighlight = (event) => {
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            star.classList.remove('active');
        });
        setMyStarReview(0);

    }

    //for testing
    const handleMyReviewEditing = (event) =>{
        setMyReview(event.target.value);
        console.log('Message: ', myReview);
        console.log('Num stars:', myStarReview);
    }

    const handleSendComment = () => {
        const newComment = {
            username: localStorage.getItem('username') || '',
            comment: myReview,
            stars: myStarReview
        };
        setComments(prevComments => [...prevComments, newComment]);
        setMyReview('');
        resetHighlight();
        
    };

    const handleDeleteMyReview = (event) => {
        let deleteDiv = event.target.parentNode;
        for (let i = 0; i < 7; i++) {
            deleteDiv = deleteDiv.parentNode;
        }
        deleteDiv.remove();
    }

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
                          <h4>Antall: {game.nPeople}</h4>
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
            <div className='reviewContainer'>
                <div className='reviewTitle'>
                    <h1>Anmeldelser</h1>
                </div>
                {isLoggedIn ? (
                <div className='myReviewBox'>
                    <div class='profilePhotoBox'>
                        <img src={require('./profilePhoto2.jpg')} alt='Profile Photo' class='profileImage' />
                    </div>
                    <div className='writeReviewDiv'>
                        <div className='textAreaDiv'>
                            <textarea className='writeReviewBox'value={myReview || ''} placeholder='Skriv din anmeldelse' onChange={handleMyReviewEditing}>
                            </textarea>
                        </div>
                        <div class='ratingDiv'>
                            <FontAwesomeIcon icon={faStar} className='star' data-index="1" onClick={highlightStars} onMouseOut={() => {setMyReview(0)}}/>
                            <FontAwesomeIcon icon={faStar} className='star' data-index="2" onClick={highlightStars} onMouseOut={() => {setMyReview(0)}}/>
                            <FontAwesomeIcon icon={faStar} className='star' data-index="3" onClick={highlightStars} onMouseOut={() => {setMyReview(0)}}/>
                            <FontAwesomeIcon icon={faStar} className='star' data-index="4" onClick={highlightStars} onMouseOut={() => {setMyReview(0)}}/>
                            <FontAwesomeIcon icon={faStar} className='star' data-index="5" onClick={highlightStars} onMouseOut={() => {setMyReview(0)}}/>
                            <div className='sendButton' onClick={handleSendComment}>
                                <h2>Send</h2>
                            </div>
                        </div>
                    </div>
                </div>
                ):(
                    <div></div>
                )}
                {comments.map((comment, index) => (
                    <div key={index} className='othersReviewBox'>
                        <div className='profilePhotoBox'>
                            <img src={require('./profilePhoto2.jpg')} alt='Profile Photo' class='profileImage' />
                        </div>
                        <div className='writeReviewDiv'>
                            <div className='textAreaDiv'>
                                <div className='othersWriteReviewBox'>
                                    <h2>{comment.username}</h2>
                                    <div className='actualOthersReview'>
                                        <h5>{comment.comment}</h5>
                                        <div class='othersRatingDiv'>
                                            <div class='starsReviewed'>
                                                <h1>{comment.stars}/5</h1>
                                                <FontAwesomeIcon icon={faStar} className='othersStar'/>
                                            </div>
                                            <div className='myTrashDiv'>
                                                <FontAwesomeIcon icon={faTrashAlt} className='commentToTrash' onClick={handleDeleteMyReview}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                ))}
                

                <div className='othersReviewBox'>
                    <div class='profilePhotoBox'>
                        <img src={require('./profilePhoto2.jpg')} alt='Profile Photo' class='profileImage' />
                    </div>
                    <div className='writeReviewDiv'>
                        <div className='textAreaDiv'>
                            <div className='othersWriteReviewBox'>
                                <h2> James Heui </h2>
                                <div className='actualOthersReview'>
                                    <h5> Artig spill!</h5>
                                    <div class='othersRatingDiv'>
                                        <div class='starsReviewed'>
                                            <h1>4/5</h1>
                                            <FontAwesomeIcon icon={faStar} className='othersStar'/>
                                        </div>
                                        <div className='trashDiv'>
                                        <span>Rapporter</span> 
                                        <span className="icon"><i className="fa fa-flag"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='othersReviewBox'>
                    <div class='profilePhotoBox'>
                        <img src={require('./profilePhoto2.jpg')} alt='Profile Photo' class='profileImage' />
                    </div>
                    <div className='writeReviewDiv'>
                        <div className='textAreaDiv'>
                            <div className='othersWriteReviewBox'>
                                <h2> Brukernavn123 </h2>
                                <div className='actualOthersReview'>
                                    <h5> Fantastisk nettside! Elsker spesielt dette spillet!</h5>
                                    <div class='othersRatingDiv'>
                                        <div class='starsReviewed'>
                                            <h1>5/5</h1>
                                            <FontAwesomeIcon icon={faStar} className='othersStar'/>
                                        </div>
                                        <div className='trashDiv'>
                                        <span>Rapporter</span> 
                                        <span className="icon"><i className="fa fa-flag"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
      );
  };

export default Games;


