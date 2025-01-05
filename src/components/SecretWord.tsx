import { useEffect } from "react";
import '../styles/secretWord.scss';

interface SecretWordProps {
  lengthWord: number; // Тип пропса
  hintSecretWord: string[];
}

const SecretWord: React.FC<SecretWordProps> = ({ lengthWord, hintSecretWord }) => {

  function createSecretWord() {
    const secretWordContainer = document.querySelector('.secret-word-container') as HTMLElement
    if (secretWordContainer) {
      secretWordContainer.innerHTML = '';
      for (let i = 0; i < hintSecretWord.length; i++) {
        const divContent = document.createElement('div');
        // divContent.innerText = '_';
        console.log(hintSecretWord[i])
        divContent.innerText = hintSecretWord[i];
        divContent.className = 'secret-word-line'
        secretWordContainer.append(divContent);
      }
    }
  }

  useEffect(() => {
    createSecretWord();
  }, [hintSecretWord]);
  
    return (
      <div className='secret-word-container'>
      </div>
    );
}
  
export default SecretWord;