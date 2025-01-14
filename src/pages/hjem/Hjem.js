import React, { useState } from 'react'
import './Hjem.css'
//import myImage from './reklame.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faThLarge, faStar } from '@fortawesome/free-solid-svg-icons';
import { getGameData } from '../../persistence/HjemBackend';

/*
Need to run this install to run: npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons
*/

/*const games = [
  {gameID: 1, title: 'Stiv Heks', description: 'En blir valgt til å være heks, heksa skal løpe etter de andre og prøve å ta på dem, hvis man blir truffet av heksa må man stå med beina spredt, og man blir fri hvis noen kraber under beina dine'
  , category: 'fysisk lek', nPeople: '10'},
  {gameID: 2, title: 'Navnedyrleken', description: 'Alle sier navnet sitt, og et dyr med samme forbokstav som navnet', category: 'navnelek', nPeople: '1'},
  {gameID: 3, title: 'Spille kort', description: 'Bare spille ett eller annet med kort', category: 'icebreaker', nPeople: '4'},
  {gameID: 4, title: 'Sista', description: 'Løpe etter hverandre', category: 'fysisk lek', nPeople: '4'},
  {gameID: 1, title: 'Stiv Heks', description: 'En blir valgt til å være heks, heksa skal løpe etter de andre og prøve å ta på dem, hvis man blir truffet av heksa må man stå med beina spredt, og man blir fri hvis noen kraber under beina dine'
  , category: 'fysisk lek', nPeople: '10'},
  {gameID: 2, title: 'Navnedyrleken', description: 'Alle sier navnet sitt, og et dyr med samme forbokstav som navnet', category: 'navnelek', nPeople: '1'},
  {gameID: 4, title: 'Sista', description: 'Løpe etter hverandre', category: 'fysisk lek', nPeople: '4'},
]
*/
var games = await getGameData();
// console.log(games);


const Hjem = () => {
    const [searchInput, setSearchInput] = useState('')
    const [selectedCategory, setCategory] = useState('alle')
    const [isListView, setListView] = useState(true);

    const handleSearchChange = (e) => {
      setSearchInput(e.target.value);
    }

    const handleCategoryChange = (e) => {
      setCategory(e.target.value);
    }

    const toggleToGrid = () => {
      setListView(false);
    }

    const toggleToList = () => {
      setListView(true);
    }

    console.log(games)

    const filteredGames = games.filter( game =>
      (game.title.toLowerCase().includes(searchInput.toLowerCase()) || searchInput === '') &&
      (selectedCategory === 'alle' || game.category === selectedCategory)
      );

  return (
    <div className='classContainer'>

      <div className='leftSideContainer'>
        {/* Commented this out because of problems when filtering games, need some work on the image scaling i suppose */}
        {/*<img src={myImage} alt='Her skal det være reklame' width="100%" height="100%"></img>*/}
      </div>
      
        <div className='middleContainer'>
          <div className='title'>
            <h1>
            Icebreakers
            </h1>
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
      <div className="switchViewContainer">
        <button className={`toggleBtn ${!isListView ? 'active' : ''}`} onClick={toggleToGrid}>
          <FontAwesomeIcon icon={faThLarge} />
        </button>
        <button className={`toggleBtn ${isListView ? 'active' : ''}`} onClick={toggleToList}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <div className={isListView ? 'gameOverviewList' : 'gameOverviewGrid'}>
                    <h4>Bli kjent-leker:</h4>
                    <div className={isListView ? 'gameHorisontalList' : 'gameVerticalList'}>
                        {filteredGames.map((game, index) => (
                            <Link to={`game/${game.gameID}`} key={index} className={isListView ? "gameSquareHorisontalList" : "gameSquareVerticalList"}>
                                <div className={isListView ? "eachGameContainer" : "eachGameContainerVertical"}>
                                  <div className={isListView ? "eachGameContainerLeft" : "eachGameContainerVerticalLeft"}>

                                  </div>
                                  <div className={isListView ? "eachGameContainerMid" : "eachGameContainerVerticalMid"}>
                                    <h4>{game.title}</h4>
                                  </div>
                                  <div className={isListView ? "eachGameContainerRight" : "eachGameContainerVerticalRight"}>
                                    {game.averageScore}/5
                                    <FontAwesomeIcon icon={faStar} className='othersStar'/>
                                  </div>
                                </div>
                                <div className={isListView ? "gameSquare-p-content-horisontal" : "gameSquare-p-content-vertical"}>
                                    <p>Kategori: {game.category}</p>
                                    <p>Antall: {game.nPeopleMin} - {game.nPeopleMax}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
      </div>
    </div>

    <div className='rightSideContainer'>
      {/* Your right side content */}
    </div>
  </div>
);
}

export default Hjem