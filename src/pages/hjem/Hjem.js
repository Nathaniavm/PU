import React from 'react'
import './Hjem.css'
import myImage from './friends.jpg';

const Hjem = () => {
  return (
    <>
    <div className='classContainer'>

      <div className='leftSideContainer'>
        <img src={myImage} alt='Friends at beach' width="250" height="1000"></img>
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
            <input type='search' id='search' name='search'></input>
          </form>
        </div>

        <div className='filter'>
          <h4>Velg type lek:</h4>
          <select id='choiceBox'>
            <option value='option1'>Navnelek</option>
            <option value='option2'>Icebreaker</option>
            <option value='option3'>Fysisk lek</option>
          </select>
        </div>

        <div className='gameOverview'>
          <h4>Bli kjent-leker:</h4>
          <ul>
            <li>
              <p>lek 1</p>
            </li>
          </ul>
          <ul>
            <li>
              <p>lek 2</p>
            </li>
          </ul>
        </div>
        </div>


      <div className='rightSideContainer'>
        <img src={myImage} alt='Friends at beach' width="250" height="1000"></img>
      </div>

    </div>

    </>

  )
}

export default Hjem