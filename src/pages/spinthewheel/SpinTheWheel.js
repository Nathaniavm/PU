import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { Link } from 'react-router-dom';
import './SpinTheWheel.css';
import '../hjem/Hjem.css';
import { listFavorites } from '../../persistence/favoriteBackend';

// HUSK IF LOGGED IN FOR Å BRUKE DETTE
// const favoriteGames = await listFavorites();
// console.log(favoriteGames);

const placeholderGames = [
    {gameID: 1, title: 'Stiv Heks', description: 'En blir valgt til å være heks, heksa skal løpe etter de andre og prøve å ta på dem, hvis man blir truffet av heksa må man stå med beina spredt, og man blir fri hvis noen kraber under beina dine'
    , category: 'fysisk lek', nPeople: '10'},
    {gameID: 2, title: 'Navnedyrleken', description: 'Alle sier navnet sitt, og et dyr med samme forbokstav som navnet', category: 'navnelek', nPeople: '1'},
    {gameID: 3, title: 'Spille kort', description: 'Bare spille ett eller annet med kort', category: 'icebreaker', nPeople: '4'},
    {gameID: 4, title: 'Sista', description: 'Løpe etter hverandre', category: 'fysisk lek', nPeople: '4'},
];

const SpinTheWheel = () => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [selectedOption, setSelectedOption] = useState('');
    const [dataArray, setDataArray] = useState([]);
    let audio = new Audio("/SpinTheWheelSound.mp3");

    const [searchInput, setSearchInput] = useState('')
    const [selectedCategory, setCategory] = useState('alle')

    const handleSpinClick = () => {
        if (!mustSpin && dataArray.length > 1) {
            audio.play();
            const newPrizeNumber = Math.floor(Math.random() * dataArray.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }
    };

    const onStopSpinning = () => {
        setMustSpin(false);
        setSelectedOption(dataArray[prizeNumber]);
    };

    const toggleGameSelection = (gameID) => {
        const index = dataArray.findIndex(game => game.gameID === gameID);
        if (index === -1) {
            const selectedGame = placeholderGames.find(game => game.gameID === gameID);
            setDataArray(prevDataArray => [...prevDataArray, selectedGame]);
        } else {
            const updatedDataArray = [...dataArray];
            updatedDataArray.splice(index, 1);
            setDataArray(updatedDataArray);
        }
    };


    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    }
  
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const filteredGames = placeholderGames.filter( game =>
        (game.title.toLowerCase().includes(searchInput.toLowerCase()) || searchInput === '') &&
        (selectedCategory === 'alle' || game.category === selectedCategory)
    );

    return (
        <div className="spinTheWheelMain">
            <div className='title'>
                <h1>Spin The Wheel</h1>
            </div>
                <div className="search-filter-container">
                    <div className='searchBar'>
                        <h4>Søk etter leker:</h4>
                        <form>
                            <label htmlFor="search"> </label>
                            <input 
                            className= 'homeInputField' 
                            type='search' 
                            id='search' 
                            name='search'
                            value={searchInput}
                            onChange={handleSearchChange}
                            placeholder='Søk etter tittel'
                            />
                        </form>
                    </div>

                <div className='filter'>
                    <h4>Velg type lek:</h4>
                    <select
                        className='homeInputField'
                        id='choiceBox'
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                    >
                        <option value='alle'>Alle</option>
                        <option value='navnelek'>Navnelek</option>
                        <option value='icebreaker'>Icebreaker</option>
                        <option value='fysisk lek'>Fysisk lek</option>
                    </select>
                </div>
        </div>
            <div className='gameOverviewGrid'>
                <h4>Klikk på minimum to leker for å spinne:</h4>
                <div className='gameVerticalList'>
                    {filteredGames.map((game, index) => (
                        <div
                            className={dataArray.some(selectedGame => selectedGame.gameID === game.gameID) ? "gameSquareVerticalList selected" : "gameSquareVerticalList"}
                            onClick={() => toggleGameSelection(game.gameID)}
                            key={index}
                        >
                            <h4>{game.title}</h4>
                            <div className="gameSquare-p-content-vertical">
                                <p>Kategori: {game.category}</p>
                                <p>Antall: {game.nPeople}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="spinTheWheel">
                {dataArray.length > 1 && (
                    <div className='wheel'>
                        <Wheel
                            mustStartSpinning={mustSpin}
                            prizeNumber={prizeNumber}
                            spinDuration={0.9}
                            numSpins={10}
                            data={dataArray.map(game => ({ option: game.title }))}
                            backgroundColors={['#3463e1', '#eaedff']}
                            onStopSpinning={onStopSpinning}
                        />
                        <button className='button' onClick={handleSpinClick}>SPIN</button>
                    </div>
                )}
            </div>
            {selectedOption &&
                <div className='gameOverviewList'>
                    <Link to={`/game/${selectedOption.gameID}`} className="gameSquareHorisontalList">
                        <h4>{selectedOption.title}</h4>
                        <div className="gameSquare-p-content-horisontal">
                            <p>Kategori: {selectedOption.category}</p>
                            <p>Antall: {selectedOption.nPeople}</p>
                        </div>
                    </Link>
                </div>}
        </div>
    );
};

export default SpinTheWheel;

