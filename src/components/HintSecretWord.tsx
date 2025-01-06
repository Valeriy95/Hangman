import '../styles/hintSecretWord.scss';

interface HintSecretWordProps {
    numberHint: number;
}

const HintSecretWord: React.FC<HintSecretWordProps> = ({ numberHint }) => {

const hintSecretWordArr: string[] = ['What animal catches mice?', 'Where do people live?', 'What connects the shores?', 'Where does water flow?', 'What shines in the sky at night?', 'What falls in winter?', 'Where do trees grow?','What flies and chirps?','What shines brightly at night?','What fruit is red or green?'];

    return (
      <div className="hint-secret-word">
          Hint: {hintSecretWordArr[numberHint]}
      </div>
    );
  }
  
  export default HintSecretWord;