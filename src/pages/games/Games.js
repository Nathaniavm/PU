import React from 'react'
import './Games.css'

const Games = () => {
    return (
    <>
        <div className='gamesContainer'>
            <div className='gameTitle'>
                <h1>Knutemor</h1>
            </div>

            <div className='aboutGame'>
                <div className='aboutItem'>
                    <h4>Antall: 6-14</h4>
                </div>
                 <div className='aboutItem'>
                    <h4>Kategori: Fysiske leker</h4>
                </div>
            </div>

            <div className='gameDescription'>
                <p>1. Alle skal stå i en sirkel med ansiktet innover. Sirkelen skal ikke være større enn at man rekker over til personen på motsatt side av sirkelen.</p>
                <p>2. Alle skal strekke ut sin høyre arm og ta tak i en annen persons arm. Dette skal være tilfeldig. Deretter gjør du det samme med venstre arm. Du kan ikke holde samme personen med begge armene</p>
                <p>3. Nå skal gruppen prøve å løse opp knuten uten å slippe hendene til hverandre</p>
                <p>4. For en ekstra utfordring kan man si at knuten skal være løst innen et gitt tidsrom</p>
            </div>         
        </div>
    </> 
    )

}

export default Games;