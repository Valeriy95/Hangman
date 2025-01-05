import { createElement, useState } from 'react';
import '../styles/quizPart.scss';
import SecretWord from './SecretWord';
import HintSecretWord from './HintSecretWord';
import IncorrectGuessesCounter from './IncorrectGuessesCounter';
import VirtualKeyboard from './VirtualKeyboard';
import React from 'react';

interface QuizPartProps {
    wordLength: number; // Тип пропса
    randomNum: number;
    secretWordArr: string[];
}

const QuizPart: React.FC<QuizPartProps> = ({ wordLength, randomNum, secretWordArr }) => {
  const [click, setClick] = useState(0);
  const [secretWord, setSecretWord] = useState(secretWordArr[randomNum]);
  const [hintSecretWord, setHintSecretWord] = useState<string[]>([]);

  const alpabetEn = [
    'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
    'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
    'z', 'x', 'c', 'v', 'b', 'n', 'm',
  ];

  const imgHead = document.querySelector('.img-head') as HTMLElement;
  const imgBody = document.querySelector('.img-body') as HTMLElement;
  const imgHandOne = document.querySelector('.img-hand-one') as HTMLElement;
  const imgHandTwo = document.querySelector('.img-hand-two') as HTMLElement;
  const imgLegOne = document.querySelector('.img-leg-one') as HTMLElement;
  const imgLegTwo = document.querySelector('.img-leg-two') as HTMLElement;

  const arrImgHangman: HTMLElement[] = [];
  if (imgHead) arrImgHangman.push(imgHead);
  if (imgBody) arrImgHangman.push(imgBody);
  if (imgHandOne) arrImgHangman.push(imgHandOne);
  if (imgHandTwo) arrImgHangman.push(imgHandTwo);
  if (imgLegOne) arrImgHangman.push(imgLegOne);
  if (imgLegTwo) arrImgHangman.push(imgLegTwo);

  console.log(arrImgHangman)


  // Инициализация массива с "_"
  React.useEffect(() => {
    setHintSecretWord(Array(wordLength).fill('_'));
    console.log(hintSecretWord);
  }, [wordLength]);

  React.useEffect(() => {
    console.log("Updated hintSecretWord:", hintSecretWord);
    console.log(hintSecretWord);
  }, [hintSecretWord]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      console.log(e.key.toLowerCase());

      // Проверяем, является ли нажатая клавиша буквой
      if (!alpabetEn.includes(e.key.toLowerCase())) return;

      const arrVirtualKey = document.querySelectorAll('.virtual-key');
      let isCorrectGuess = false;

      // Проверяем все вхождения буквы в слове
      secretWord.split('').forEach((char, index) => {
        if (e.key.toLowerCase() === char.toLowerCase()) {
          console.log('Correct guess!');

          // Обновляем все совпадения буквы в массиве
          setHintSecretWord((prevHint) => {
            const newHint = [...prevHint];
            newHint[index] = char.toLowerCase();
            return newHint;
          });

          // Отмечаем клавишу как использованную
          for (let y = 0; y < arrVirtualKey.length; y++) {
            const element = arrVirtualKey[y] as HTMLElement;
            if (element.dataset.key === e.code && element.dataset.click !== 'yes') {
              console.log('Marking key as used.');
              element.dataset.click = 'yes';
              element.style.background = 'red';
            }
          }
          isCorrectGuess = true;
        }
      });

      if (!isCorrectGuess) {
        console.log('Incorrect guess!');
        if (click < 6) {
          console.log(arrImgHangman[click].style.display = 'block')
        }
        setClick((prev) => prev + 1); // Увеличиваем счётчик ошибок
      }
    };

    // Добавляем обработчик события
    document.addEventListener('keydown', handleKeyDown);

    // Удаляем обработчик при размонтировании компонента
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [secretWord, alpabetEn]);

  return (
    <div className='quiz-part-container'>
      <SecretWord lengthWord={wordLength} hintSecretWord={hintSecretWord}/>
      <HintSecretWord numberHint={randomNum} />
      <IncorrectGuessesCounter click={click} />
      <VirtualKeyboard click={click} secretWord={secretWord} setClick={setClick} setHintSecretWord={setHintSecretWord}/>
    </div>
  );
};

export default QuizPart;
