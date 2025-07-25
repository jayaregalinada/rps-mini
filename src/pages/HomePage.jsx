import { useNavigate } from 'react-router';
import Button from '../components/Button';
import { useMusic } from '../context/MusicContext';
import { useSetting } from '../context/SettingContext';

function HomePage() {
  const { dispatch: settingDispatch } = useSetting();
  const { dispatch: musicDispatch } = useMusic();
  const navigate = useNavigate();

  const handleClick = (choice) => {
    const INITIAL_VOLUME = 80;
    const volume = choice ? INITIAL_VOLUME : 0;
    settingDispatch({
      type: 'SET_VOLUMES',
      payload: volume,
    });
    musicDispatch({ type: 'START_SONG' });
    setTimeout(() => {
      navigate('/menu');
    }, 3000);
  };

  return (
    <section className='w-full h-dvh grid place-items-center '>
      <div className='grid gap-10 border-8 border-gray-900 bg-primary px-12 py-6'>
        <h1 className='text-7xl text-gray-900'>
          Do you like to play with music?
        </h1>
        <div className='flex gap-4 justify-center w-lg mx-auto'>
          <Button
            className='text-3xl w-full bg-green-400'
            withFlashing
            onClick={() => handleClick(true)}
          >
            Yes
          </Button>
          <Button
            className='text-3xl w-full bg-red-400'
            withFlashing
            onClick={() => handleClick(false)}
          >
            No
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
