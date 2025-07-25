import { useSetting } from '../context/SettingContext';

function SettingsPage() {
  const { state, dispatch } = useSetting();
  const { musicVolume, effectVolume } = state;

  const handleChange = (event) => {
    dispatch({
      type:
        event.target.name === 'music'
          ? 'SET_MUSIC_VOLUME'
          : 'SET_EFFECT_VOLUME',
      payload: event.target.value,
    });
  };

  return (
    <section className='w-full h-dvh grid place-items-center'>
      <div className='border-8 border-gray-900 bg-primary px-12 py-6 grid gap-4'>
        <header className='text-6xl text-gray-900'>Settings Page</header>
        <section className='grid gap-2'>
          <label className='flex flex-col text-gray-900 text-xl'>
            Music Volume
            <input
              type='range'
              min='0'
              max='100'
              name='music'
              defaultValue={musicVolume}
              onChange={handleChange}
              className='mt-2 w-full h-4 bg-secondary border-4 border-gray-900 appearance-none cursor-pointer accent-gray-900 shadow-[4px_4px_0_0_black]'
              style={{
                WebkitAppearance: 'none',
                height: '1.5rem',
              }}
            />
          </label>
        </section>
      </div>
    </section>
  );
}

export default SettingsPage;
