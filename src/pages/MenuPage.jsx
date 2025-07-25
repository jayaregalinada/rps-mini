import { useEffect } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router';
import { useGame } from '../context/GameContext';
import { useMusic } from '../context/MusicContext';

function MenuPage() {
  const navigate = useNavigate();
  const { state: gameState, dispatch: gameDispatch } = useGame();
  const { playSong } = useMusic();
  const { rounds } = gameState;

  useEffect(() => {
    document.title = 'Welcome to the RPS Mini';
    setTimeout(() => {
      playSong();
    }, 3000);
  }, []);

  const REDIRECT_TIMER = 3000;

  const navigateToGame = () => {
    setTimeout(() => {
      navigate('/game');
    }, REDIRECT_TIMER);
  };

  const handleStartGame = () => {
    gameDispatch({ type: 'START' });
    navigateToGame();
  };

  const navigateToSettings = () => {
    setTimeout(() => {
      navigate('/settings');
    }, REDIRECT_TIMER);
  };

  return (
    <section className='w-full h-dvh grid place-items-center place-content-center gap-4 text-center'>
      <div className='grid gap-4 bg-primary backdrop-blur-sm px-12 py-6 border-8 border-gray-900'>
        <h1 className='text-6xl text-gray-900 lg:text-8xl'>
          Welcome to RPS Mini
        </h1>
        <div className='text-left mx-auto'>
          <h2 className='text-3xl font-semibold text-gray-800 mb-2'>
            How to Play
          </h2>
          <ul className='list-disc list-inside text-gray-700 space-y-2 text-2xl'>
            <li>Pick a weapon from the bottom</li>
            <li>The computer will choose after you</li>
            <li>Wait 5 seconds between rounds</li>
          </ul>
        </div>
      </div>
      {rounds.length > 0 && (
        <Button
          className='text-6xl bg-gray-400 w-full'
          onClick={navigateToGame}
          withFlashing
        >
          Continue Game
        </Button>
      )}
      <Button
        className='text-6xl bg-green-400 w-full'
        onClick={handleStartGame}
        withFlashing
      >
        Start {rounds.length > 0 && `New`} Game
      </Button>
      <Button
        className='text-6xl w-full'
        onClick={navigateToSettings}
        withFlashing
      >
        Settings
      </Button>
    </section>
  );
}

export default MenuPage;
