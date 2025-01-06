import { useEffect } from "react";
import '../styles/virtualKeyboard.scss';


interface VirtualKeyboardProps {
    arrImgHangman: HTMLElement[];
    secretWord: string;
    setClick: React.Dispatch<React.SetStateAction<number>>;
    setHintSecretWord: React.Dispatch<React.SetStateAction<string[]>>;
    setIsWin: React.Dispatch<React.SetStateAction<boolean>>;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ arrImgHangman, secretWord, setClick, setHintSecretWord, setIsWin}) => {

    const keyCodes: string[] = ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM'];

    const alpabetEn: string[] = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];

    let counter: number = 0;

    function createKey() {
        const keyboardContainer = document.querySelector('.keyboard-container') as HTMLElement;
        keyboardContainer.innerHTML = '';
        for (let i = 0; i < alpabetEn.length; i += 1) {
            const divKey = document.createElement('div');
            divKey.innerHTML = alpabetEn[i];
            divKey.className = `p${i + 1} virtual-key`;
            divKey.setAttribute('data-key', keyCodes[i]);
            divKey.addEventListener('click', () => {
                const key = divKey.dataset.key;
                let isCorrectGuess = false;
                for (let i = 0; i < secretWord.length; i++) {
                    if (key?.slice(3).toLowerCase() === secretWord[i].toLowerCase()) {
                        setHintSecretWord((prevHint) => {
                            const newHint = [...prevHint];
                            newHint[i] = divKey.innerHTML.toLowerCase();
                            if (!newHint.includes('_')) {
                                setClick(6);
                                setIsWin(true);
                              }
                            return newHint;
                        });
                        divKey.dataset.click = 'yes';
                        divKey.style.background = '#0e9f0e';
                        isCorrectGuess = true;
                    }
                }
                if (!isCorrectGuess) {
                    if (divKey.dataset.click !== 'yes') {
                        divKey.dataset.click = 'yes';
                        divKey.style.background = '#ff390f';
                        arrImgHangman[counter].style.display = 'block'
                        counter++;
                        setClick((prev) => prev + 1);
                    }
                }
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
