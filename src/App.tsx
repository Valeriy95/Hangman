import React from 'react';
import GallowsPart from './components/GallowsPart';
import QuizPart from './components/QuizPart';
import './styles/index.scss';


const App: React.FC = () => {

  function getRandomInt() {
    return Math.floor(Math.random() * 10);
  }

  const randomNum = getRandomInt()

  const secretWordArr = ['Cat', 'House', 'Bridge', 'River', 'Moon', 'Snow', 'Forest','Bird','Star','Apple'];

  const secretWordLength = secretWordArr[randomNum].length;
  
  return <div className='container'>
    <GallowsPart />
    <QuizPart wordLength={secretWordLength} randomNum={randomNum} secretWordArr={secretWordArr}/>
  </div>;
};

export default App;
