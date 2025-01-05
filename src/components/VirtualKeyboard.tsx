import { useEffect } from "react";
import '../styles/virtualKeyboard.scss';


interface VirtualKeyboardProps {
    click: number;
    secretWord: string;
    setClick: React.Dispatch<React.SetStateAction<number>>;
    setHintSecretWord: React.Dispatch<React.SetStateAction<string[]>>;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ click, secretWord, setClick, setHintSecretWord}) => {

    const keyCodes = ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM'];

    const alpabetEn = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];

    function createKey() {
        const keyboardContainer = document.querySelector('.keyboard-container') as HTMLElement;
        keyboardContainer.innerHTML = '';
        for (let i = 0; i < alpabetEn.length; i += 1) {
            const divKey = document.createElement('div');
            divKey.innerHTML = alpabetEn[i];
            divKey.className = `p${i + 1} virtual-key`;
            divKey.setAttribute('data-key', keyCodes[i]);
            divKey.addEventListener('click', () => {
                const test = divKey.dataset.key;
                let isCorrectGuess = false;
                for (let i = 0; i < secretWord.length; i++) {
                    if (test?.slice(3).toLowerCase() === secretWord[i].toLowerCase()) {

                        setHintSecretWord((prevHint) => {
                            const newHint = [...prevHint];
                            newHint[i] = divKey.innerHTML;
                            return newHint;
                        });

                        divKey.dataset.click = 'yes';
                        divKey.style.background = 'red';
                        isCorrectGuess = true;
                    }
                }
                if (!isCorrectGuess) {
                    console.log('Incorrect guess!');
                    setClick((prev) => prev + 1);
                }
                console.log(test?.slice(3).toLowerCase())
            })
            keyboardContainer.append(divKey);
        }
    }

    useEffect(() => {
        createKey()
    }, []);
    
    return (
        <div className="keyboard-container">
        </div>
    );
}
    
export default VirtualKeyboard;
