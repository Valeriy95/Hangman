import { useEffect } from "react";
import '../styles/incorrectGuessesCounter.scss';

interface IncorrectGuessesCounterProps {
    click: number;
}

const IncorrectGuessesCounter: React.FC<IncorrectGuessesCounterProps> = ({ click }) => {

  
    useEffect(() => {

    }, [click]);
    
    return (
        <div className="incorrect-guesses-container">
            Incorrect guesses:&nbsp;<span className="incorrect-guesses-text">{click}</span>&nbsp;<span className="incorrect-guesses-text">/</span>&nbsp;<span className="incorrect-guesses-text">6</span> 
        </div>
    );
}
    
export default IncorrectGuessesCounter;