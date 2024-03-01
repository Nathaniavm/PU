import React from 'react'
import { useParams } from 'react-router-dom';
import './Games.css'

const Games = () => {
    //Retrieve the gameID from the URL
    const { gameID } = useParams();

    // Placeholder games, will be switched with backend retreiving method
    const placeholderGames = [
        {gameID: 1, title: 'Stiv Heks', description: 'En blir valgt til å være heks, heksa skal løpe etter de andre og prøve å ta på dem, hvis man blir truffet av heksa må man stå med beina spredt, og man blir fri hvis noen kraber under beina dine'
        , category: 'fysisk lek', nPeople: '10'},
        {gameID: 2, title: 'Navnedyrleken', description: 'Alle sier navnet sitt, og et dyr med samme forbokstav som navnet', category: 'navnelek', nPeople: '1'},
        {gameID: 3, title: 'Spille kort', description: 'Bare spille ett eller annet med kort', category: 'icebreaker', nPeople: '4'},
        {gameID: 4, title: 'Sista', description: 'Løpe etter hverandre', category: 'fysisk lek', nPeople: '4'},
    ];

    // Find the game baced on the gameID
    const game = placeholderGames.find(game => game.gameID === parseInt(gameID));

    // If not game found, show message
    if (!game) {
        return <p>Fant ikke spillet.</p>;
    }

    const handleReportGame = (game) => {
        var alertedGameID = game.gameID;
        var alertedgGameTitle = game.title;
        alert("Spillet " + alertedgGameTitle + " ble rapportert")
        console.log(alertedGameID);
    }

    const handleMakeFavoriteGame = (game) => {
        var alertedGameID = game.gameID;
        var alertedgGameTitle = game.title;
        alert("Spillet " + alertedgGameTitle + " ble lagt til i favoritter")
        console.log(alertedGameID);
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
                <button className='moreButton queueButton' type='button'><i className="fa fa-plus"></i> Legg til i kø</button>
                <button className='moreButton reportButton' type='button' onClick={() => handleReportGame(game)}>
                    <i className="fa fa-flag"></i> Rapporter</button>
            </div>   
        </div>
    </> 
    )

}

export default Games;