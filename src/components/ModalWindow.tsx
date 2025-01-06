import '../styles/modalWindow.scss';

interface TestProps {
    click: number;
    isWin: boolean;
    secretWord: string;
}

const ModalWindow: React.FC<TestProps> = ({ click, isWin, secretWord }) => {

    const restart = document.querySelector('.restart');
    restart?.addEventListener('click', function () {
        document.location.reload();
    })
    
    return (
        <div
            className="modal-window"
            style={{
            display: click === 6 ? 'block' : 'none',
            }}
        >
            <div className="modal-window-content">
                <h3 className={`title-modal-window ${isWin === true ? 'win' : 'lost'}`}>{isWin === true ? 'YOU WIN' : 'YOU LOST'}</h3>
                <h3 className="title-modal-window">{secretWord}</h3>
                <button className="restart">RESTART</button>
            </div>
    </div>
    );
}
    
export default ModalWindow;