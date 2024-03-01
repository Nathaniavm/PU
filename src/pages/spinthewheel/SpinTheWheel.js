import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { Link } from 'react-router-dom';
import './SpinTheWheel.css';
import '../hjem/Hjem.css';

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

    const handleSpinClick = () => {
        if (!mustSpin && dataArray.length > 1) {
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

    return (
        <div className="spinTheWheelMain">
            <div className='title'>
                <h1>Spin The Wheel</h1>
            </div>
            <div className="spinTheWheel">
                {dataArray.length > 1 && (
                    <div className='wheel'>
                        <Wheel
                            mustStartSpinning={mustSpin}
                            prizeNumber={prizeNumber}
                            data={dataArray.map(game => ({ option: game.title }))}
                            backgroundColors={['#3463e1', '#eaedff']}
                            onStopSpinning={onStopSpinning}
                        />
                        <button className='button' onClick={handleSpinClick}>SPIN</button>
                    </div>
                )}
            </div>
            {selectedOption &&
                <div>
                    <Link to={`/game/${selectedOption.gameID}`} className="gameSquareHorisontalList">
                        <h4>{selectedOption.title}</h4>
                        <div className="gameSquare-p-content">
                            <p>Kategori: {selectedOption.category}</p>
                            <p>Antall: {selectedOption.nPeople}</p>
                        </div>
                    </Link>
                </div>}
            <div className='gameOverviewGrid'>
                <h4>Klikk på minimum to leker for å spinne:</h4>
                <div className='gameVerticalList'>
                    {placeholderGames.map((game, index) => (
                        <div
                            className={dataArray.some(selectedGame => selectedGame.gameID === game.gameID) ? "gameSquareVerticalList selected" : "gameSquareVerticalList"}
                            onClick={() => toggleGameSelection(game.gameID)}
                            key={index}
                        >
                            <h4>{game.title}</h4>
                            <div className="gameSquare-p-content">
                                <p>Kategori: {game.category}</p>
                                <p>Antall: {game.nPeople}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpinTheWheel;

