import React, { useState } from 'react'
import './Hjem.css'
//import myImage from './reklame.png';
import { Link } from 'react-router-dom';



const placeholderGames = [
  {gameID: 1, title: 'Stiv Heks', description: 'En blir valgt til å være heks, heksa skal løpe etter de andre og prøve å ta på dem, hvis man blir truffet av heksa må man stå med beina spredt, og man blir fri hvis noen kraber under beina dine'
  , category: 'fysisk lek', nPeople: '10'},
  {gameID: 2, title: 'Navnedyrleken', description: 'Alle sier navnet sitt, og et dyr med samme forbokstav som navnet', category: 'navnelek', nPeople: '1'},
  {gameID: 3, title: 'Spille kort', description: 'Bare spille ett eller annet med kort', category: 'icebreaker', nPeople: '4'},
  {gameID: 4, title: 'Sista', description: 'Løpe etter hverandre', category: 'fysisk lek', nPeople: '4'},
]

const Hjem = () => {
    const [searchInput, setSearchInput] = useState('')
    const [selectedCategory, setCategory] = useState('alle')

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
    <>
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

          <div className='searchBar'>
            <h4>Søk etter leker:</h4>
            <form>
              <label for="search"> </label>
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

          <div className='gameOverview'>
            <h4>Bli kjent-leker:</h4>
            <div className='gameGrid'>
              {filteredGames.map((game, index) => (
                <Link to={`game/${game.gameID}`} key={index} className="gameSquare">
                  <h4>{game.title}</h4>
                  <div className="gameSquare-p-content">
                    <p>Kategori: {game.category}</p>
                    <p>Antall: {game.nPeople}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

      <div className='rightSideContainer'>
        {/* Commented this out because of problems when filtering games, need some work on the image scaling i suppose */}
        {/*<img src={myImage} alt='Her skal det være reklame' width="100%" height="100%"></img>*/}
      </div>

    </div>

    </>

  )
}

export default Hjem