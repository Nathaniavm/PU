import React from 'react'
import { useParams } from 'react-router-dom';
import './Games.css'
import { reportGame } from '../../persistence/ReportGame';
import { favoriteGame } from '../../persistence/favoriteBackend';
import { getGameData } from '../../persistence/HjemBackend';
import { addGameToQueue } from '../../persistence/userQueues';


var games = await getGameData();

const Games = () => {
    //Retrieve the gameID from the URL
    const { gameID } = useParams();
    // const games = await getGameData();
    // console.log(games);
    // Placeholder games, will be switched with backend retreiving method
    // const placeholderGames = [
    //     {gameID: 1, title: 'Stiv Heks', description: 'En blir valgt til å være heks, heksa skal løpe etter de andre og prøve å ta på dem, hvis man blir truffet av heksa må man stå med beina spredt, og man blir fri hvis noen kraber under beina dine'
    //     , category: 'fysisk lek', nPeople: '10'},
    //     {gameID: '2', title: 'Navnedyrleken', description: 'Alle sier navnet sitt, og et dyr med samme forbokstav som navnet', category: 'navnelek', nPeople: '1'},
    //     {gameID: 3, title: 'Spille kort', description: 'Bare spille ett eller annet med kort', category: 'icebreaker', nPeople: '4'},
    //     {gameID: 4, title: 'Sista', description: 'Løpe etter hverandre', category: 'fysisk lek', nPeople: '4'},
    // ];
    // console.log(placeholderGames);
    // Find the game baced on the gameID
    const game = games.find(game => game.gameID === gameID);
    // If not game found, show message
    if (!game) {
        return <p>Fant ikke spillet.</p>;
    }

    //Alterting user when game is reported and sends gameID to console log
    const handleReportGame = async (game) => {
        var alertedGameID = game.gameID;
        var alertedgGameTitle = game.title;
        
        await reportGame(alertedGameID);

        alert("Spillet " + alertedgGameTitle + " (ID: " + alertedGameID + ") ble rapportert")
    }

    //Alterting user when game is favorited and sends gameID to console log
    const handleMakeFavoriteGame = async (game) => {
        var alertedGameID = game.gameID;
        var alertedgGameTitle = game.title;

    
        if (await favoriteGame(alertedGameID)) {
            console.log("Spillet " + alertedgGameTitle + " ble lagt til i favoritter")
        }
        // console.log(alertedGameID);
    }

    //Alterting user when game is added to queue and sends gameID to console log
    const handleAddToQueue = async (game) => {
        var queuedGameID = game.gameID;
        var queuedGameTitle = game.title;
        if (await addGameToQueue(queuedGameID)) {
            alert("Spillet " + queuedGameTitle + " ble lagt til i køen")
        }
    }

    return (
    <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
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
                <button className='moreButton favoriteButton' type='button' onClick={() => handleMakeFavoriteGame(game)}><i className="fa fa-heart"></i> Favoritt</button>
                <button className='moreButton queueButton' type='button' onClick={() => handleAddToQueue(game)}><i className="fa fa-plus" 
                ></i> Legg til i kø</button>
                <button className='moreButton reportButton' type='button' onClick={() => handleReportGame(game)}>
                    <i className="fa fa-flag"></i> Rapporter</button>
            </div>   
        </div>
    </> 
    )

}

export default Games;