import { useMusic } from '../context/MusicContext';
import { useSetting } from '../context/SettingContext';
import Button from './Button';

function MusicPlayer() {
  const { state, nextSong } = useMusic();
  const { state: settingState, dispatch } = useSetting();
  const { musicVolume } = settingState;

  const handleChange = (event) => {
    dispatch({
      type: 'SET_MUSIC_VOLUME',
      payload: event.target.value,
    });
  };

  return (
    <div className='bg-primary border-8 border-gray-900 p-8 font-pixel text-black w-full mx-auto'>
      <p className='text-3xl text-gray-900 text-center mb-4'>
        Now Playing: {state.nowPlaying?.title || 'Nothing'}
      </p>
      <div className='text-center mb-4'>{state.nowPlaying?.credit}</div>
      <input
        type='range'
        min='0'
        max='100'
        defaultValue={musicVolume}
        onChange={handleChange}
        className='py-3 px-1 mt-2 w-full h-4 bg-secondary border-4 border-gray-900 appearance-none cursor-pointer accent-gray-900 shadow-[4px_4px_0_0_black]'
        style={{
          WebkitAppearance: 'none',
          height: '1.5rem',
        }}
      />
      <Button className='w-full border-4' onClick={() => nextSong()}>
        Next
      </Button>
    </div>
  );
}

export default MusicPlayer;
