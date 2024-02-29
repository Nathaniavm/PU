import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import './SpinTheWheel.css'

const data = [
  { option: 'Sista' },
  { option: 'Nappe hale' },
  { option: 'Stiv heks' },
  { option: 'Sussy wussy'},
];

const SpinTheWheel = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const onStopSpinning = () => {
    setMustSpin(false);
    setSelectedOption(data[prizeNumber].option);
  }

  return (
    <>
        <div className="spinTheWheelMain">
            <div className='title'>
                <h1>
                Spin The Wheel
                </h1>
            </div>
            <div className="spinTheWheel">
                <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}
                    data={data}
                    backgroundColors={['#3463e1', '#eaedff']}
                    onStopSpinning={onStopSpinning}
                />
                <button className='button' onClick={handleSpinClick}>SPIN</button>
            </div>
            {selectedOption && <div>Selected Option: {selectedOption}</div>}
        </div>
    </>
  );
};

export default SpinTheWheel;
