import '../styles/gallowsPart.scss';

const GallowsPart: React.FC = () => {
  return (
    <div className='gallows-part-container'>
        <h1 className='title'>HANGMAN GAME</h1>
        <div className='gallows-part-content'>
          <div className='img-gallows'></div>
          <div className='img-head'></div>
          <div className='img-body'></div>
          <div className='img-hand-one'></div>
          <div className='img-hand-two'></div>
          <div className='img-leg-one'></div>
          <div className='img-leg-two'></div>
        </div>
    </div>
  );
}

export default GallowsPart;