import React, { useEffect } from 'react';
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

import Die from './components/die.jsx'

import { nanoid } from 'nanoid';


function App() {
  const [die, setDie] = React.useState(generateAllDie());
  const {widthCft, heightCft} = useWindowSize();
  const buttonRef = React.useRef(null);
  const gameWon = die.every((item, index, arr) => {
    return item.isHeld === true && item.value === arr[0].value
  });
  
  useEffect(() =>{
    if(gameWon){
      buttonRef.current.focus()
    }
  },[gameWon])


  function generateAllDie() {
    const newDie = [];
    for(let i = 1; i <= 10; i++){
      const randomNumb = Math.ceil(Math.random() * 6);
      newDie.push(
        {
          value : randomNumb,
          isHeld : false,
          id : nanoid()
        }
      );    
    }
    return newDie;
  }
  
  //Map die Element
  const dieElement = die.map(dieObj => {
    return <Die 
    key={dieObj.id}
    id={dieObj.id}
    value={dieObj.value}
    isHeld={dieObj.isHeld}
    holdFunction={hold}/>
  });
  
  function handdleRoll(){
    
    if(!gameWon){
      setDie(prevDie => prevDie.map(die => ({
        ...die,
        value : die.isHeld ? die.value : Math.ceil(Math.random() * 6)
      }))); 
    } else {
      setDie(prevDie => prevDie.map(die => ({
        ...die,
        value : Math.ceil(Math.random() * 6),
        isHeld : !die.isHeld
      })));
    }
    
  }
  
  function hold(id){
    setDie(prevDie => {
      return prevDie.map(item => ({
        ...item,
        isHeld : item.id === id ? !item.isHeld : item.isHeld
      }))
    });
  }

  return (
    <>
      {gameWon && <Confetti width={widthCft} height={heightCft} recycle={false} />}
      <main>
        <h1 className="title">Tenziez</h1>
        <p className="instruction">Roll untill all dice are the same. Click each dice to freeze it at its current value between rolls</p>
        <div className='dice-container'>
          {dieElement}
        </div>

        <button ref={buttonRef} className='button-game' onClick={handdleRoll}>
          {gameWon ? 'New game' : 'Roll'}
        </button>

      </main>
    </>
  )
}

export default App
