import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Games.css';
import { reportGame } from '../../persistence/ReportGame';
import { favoriteGame, isFavorited, removeFavoriteGame } from '../../persistence/favoriteBackend';
import { getGameData } from '../../persistence/HjemBackend';
import { addGameToQueue, isQueued, removeQueuedGame } from '../../persistence/userQueues';
import { auth } from '../../firebaseConfig';

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

    if (!game) {
        return <p>Fant ikke spillet.</p>;
    }

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

    return (
        <>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
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
        </>
    );
};

export default Games;
