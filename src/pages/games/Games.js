import React from 'react'
import { useParams } from 'react-router-dom';
import './Games.css'

const Games = () => {
    //Retrieve the gameID from the URL
    const { gameID } = useParams();

    // Placeholder games, will be switched with backend retreiving method
    const placeholderGames = [
        {gameID: 1, title: 'Stiv Heks', description: 'bladdi bladdi bla', category: 'fysisk lek', nPeople: '10'},
        {gameID: 2, title: 'Navnedyrleken', description: 'blææææææææ', category: 'icebreaker', nPeople: '1'},
        {gameID: 3, title: 'Klumpelure', description: 'blåååpopppppepepewpepe', category: 'tullete', nPeople: '4'},
        {gameID: 4, title: 'BONGONG', description: 'fjsdhkfhdsufheuh', category: 'tullete', nPeople: '4'},
    ];

    // Find the game baced on the gameID
    const game = placeholderGames.find(game => game.gameID === parseInt(gameID));

    // If not game found, show message
    if (!game) {
        return <p>Fant ikke spillet.</p>;
    }
    return (
    <>
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
        </div>
    </> 
    )

}

export default Games;