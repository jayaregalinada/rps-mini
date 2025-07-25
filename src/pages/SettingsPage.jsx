import { Link } from 'react-router';
import { useSetting } from '../context/SettingContext';

function SettingsPage() {
  const { state, dispatch } = useSetting();
  const { musicVolume, nextRoundTimer } = state;

  const handleChange = (event) => {
    dispatch({
      type:
        event.target.name === 'music'
          ? 'SET_MUSIC_VOLUME'
          : 'SET_EFFECT_VOLUME',
      payload: event.target.value,
    });
  };

  const handleChangeTimer = (event) => {
    dispatch({
      type: 'SET_NEXT_ROUND_TIMER',
      payload: Number(event.target.value) * 1000,
    });
  };

  return (
    <section className='w-full h-dvh grid place-items-center'>
      <div className='border-8 border-gray-900 bg-primary p-12 max-w-4xl w-full'>
        <Link to='/menu' className='border-4 border-gray-900 p-2'>
          Back To Menu
        </Link>
        <div className='grid gap-4 mt-4'>
          <header className='text-6xl text-gray-900'>Settings</header>
          <section className='grid gap-2'>
            <label className='flex flex-col text-gray-900 text-xl'>
              <p>
                Music Volume
                <span className='ml-2 text-sm text-gray-600'>
                  {musicVolume}%
                </span>
              </p>
              <input
                type='range'
                min='0'
                max='100'
                name='music'
                defaultValue={musicVolume}
                onChange={handleChange}
                className='py-3 px-1 mt-2 w-full h-4 bg-secondary border-4 border-gray-900 appearance-none cursor-pointer accent-gray-900 shadow-[4px_4px_0_0_black]'
                style={{
                  WebkitAppearance: 'none',
                  height: '1.5rem',
                }}
              />
            </label>

            <label className='flex flex-col text-gray-900 text-xl'>
              <p>
                Next Round Timer{' '}
                <span className='ml-2 text-sm text-gray-600'>
                  Maximum of 5 seconds
                </span>
              </p>
              <input
                type='number'
                min='1'
                max='5'
                name='timer'
                defaultValue={nextRoundTimer / 1000}
                onChange={handleChangeTimer}
                className='p-4 mt-2 w-full h-4 bg-secondary border-4 border-gray-900 appearance-none cursor-pointer accent-gray-900 shadow-[4px_4px_0_0_black]'
              />
            </label>
          </section>
        </div>
      </div>
    </section>
  );
}

export default SettingsPage;
