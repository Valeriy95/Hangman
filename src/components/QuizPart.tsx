import { useState } from 'react';
import '../styles/quizPart.scss';
import SecretWord from './SecretWord';
import HintSecretWord from './HintSecretWord';
import IncorrectGuessesCounter from './IncorrectGuessesCounter';
import VirtualKeyboard from './VirtualKeyboard';
import React from 'react';
import ModalWindow from './ModalWindow';

interface QuizPartProps {
    wordLength: number;
    randomNum: number;
    secretWordArr: string[];
}

const QuizPart: React.FC<QuizPartProps> = ({ wordLength, randomNum, secretWordArr }) => {

  const [click, setClick] = useState(0);
  const [secretWord, setSecretWord] = useState(secretWordArr[randomNum]);
  const [hintSecretWord, setHintSecretWord] = useState<string[]>([]);
  const [arrImgHangman, setArrImgHangman] = useState<HTMLElement[]>([]);
  const [isWin, setIsWin] = useState<boolean>(false);

  const alpabetEn = [
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
    'z', 'x', 'c', 'v', 'b', 'n', 'm',
  ];

  React.useEffect(() => {
    const imgHead = document.querySelector('.img-head') as HTMLElement;
    const imgBody = document.querySelector('.img-body') as HTMLElement;
    const imgHandOne = document.querySelector('.img-hand-one') as HTMLElement;
    const imgHandTwo = document.querySelector('.img-hand-two') as HTMLElement;
    const imgLegOne = document.querySelector('.img-leg-one') as HTMLElement;
    const imgLegTwo = document.querySelector('.img-leg-two') as HTMLElement;
  
    const newArrImgHangman: HTMLElement[] = [];
    if (imgHead) newArrImgHangman.push(imgHead);
    if (imgBody) newArrImgHangman.push(imgBody);
    if (imgHandOne) newArrImgHangman.push(imgHandOne);
    if (imgHandTwo) newArrImgHangman.push(imgHandTwo);
    if (imgLegOne) newArrImgHangman.push(imgLegOne);
    if (imgLegTwo) newArrImgHangman.push(imgLegTwo);
  
    setArrImgHangman(newArrImgHangman);
  }, []);

  React.useEffect(() => {
    setHintSecretWord(Array(wordLength).fill('_'));
  }, [wordLength]);

  React.useEffect(() => {
  }, [hintSecretWord]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (click >= 6) return;
      e.preventDefault();

      if (!alpabetEn.includes(e.key.toLowerCase())) return;

      const arrVirtualKey = document.querySelectorAll('.virtual-key');
      let isCorrectGuess = false;

      secretWord.split('').forEach((char, index) => {
        if (e.key.toLowerCase() === char.toLowerCase()) {

          setHintSecretWord((prevHint) => {
            const newHint = [...prevHint];
            newHint[index] = char.toLowerCase();
            if (!newHint.includes('_')) {
              setClick(6);
              setIsWin(true);
            }
            return newHint;
          });

          for (let y = 0; y < arrVirtualKey.length; y++) {
            const element = arrVirtualKey[y] as HTMLElement;
            if (element.dataset.key === e.code && element.dataset.click !== 'yes') {
              element.dataset.click = 'yes';
              element.style.background = '#0e9f0e';
            }
          }
          isCorrectGuess = true;
        }
      });

      if (!isCorrectGuess) {
        if (click < 6) {
          for (let y = 0; y < arrVirtualKey.length; y++) {
            const element = arrVirtualKey[y] as HTMLElement;
            if (element.dataset.key === e.code && element.dataset.click !== 'yes') {
              element.dataset.click = 'yes';
              element.style.background = '#ff390f';
              arrImgHangman[click].style.display = 'block'
              setClick((prev) => prev + 1);
            }
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [secretWord, alpabetEn]);

  return (
    <div className='quiz-part-container'>
      <SecretWord hintSecretWord={hintSecretWord}/>
      <HintSecretWord numberHint={randomNum} />
      <IncorrectGuessesCounter click={click} />
      {arrImgHangman.length > 0 && (
      <VirtualKeyboard
        arrImgHangman={arrImgHangman}
        secretWord={secretWord}
        setClick={setClick}
        setHintSecretWord={setHintSecretWord}
        setIsWin={setIsWin}
      />
    )}
      <ModalWindow click={click} isWin={isWin} secretWord={secretWord}/>
    </div>
  );
};

export default QuizPart;
