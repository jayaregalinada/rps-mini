import { createContext, useContext, useEffect, useReducer } from 'react';

export const SettingContext = createContext();

const initialState = {
  musicVolume: null,
  effectVolume: null,
  autoNextRound: true,
  nextRoundTimer: 5000,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_VOLUMES':
      return {
        ...state,
        musicVolume: action.payload,
        effectVolume: action.payload,
      };

    case 'SET_MUSIC_VOLUME':
      return {
        ...state,
        musicVolume: action.payload,
      };

    case 'SET_EFFECT_VOLUME':
      return {
        ...state,
        effectVolume: action.payload,
      };

    case 'TOGGLE_AUTO_NEXT_ROUND':
      return {
        ...state,
        autoNextRound: !state.autoNextRound,
      };

    case 'SET_NEXT_ROUND_TIMER':
      return {
        ...state,
        nextRoundTimer: action.payload,
      };

    default:
      return state;
  }
}

export function SettingProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { musicVolume, effectVolume } = state;

  const LOCAL_STORAGE_KEY = 'rps_mini_settings';

  const persistToStorage = (settingsData) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(settingsData));
  };

  const getFromStorage = () => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  };

  useEffect(() => {
    const settings = getFromStorage();

    persistToStorage({
      musicVolume:
        settings && settings.musicVolume !== null
          ? settings.musicVolume
          : musicVolume,
      effectVolume:
        settings && settings.effectVolume !== null
          ? settings.effectVolume
          : effectVolume,
    });
  }, [musicVolume, effectVolume]);

  useEffect(() => {
    const settings = getFromStorage();

    if (settings && settings.musicVolume !== null) {
      dispatch({
        type: 'SET_MUSIC_VOLUME',
        payload: settings.musicVolume,
      });
    }

    if (settings && settings.effectVolume !== null) {
      dispatch({
        type: 'SET_EFFECT_VOLUME',
        payload: settings.effectVolume,
      });
    }
  }, []);

  return (
    <SettingContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingContext.Provider>
  );
}

export function useSetting() {
  const context = useContext(SettingContext);

  if (!context) {
    throw new Error('useSetting must be used with SettingProvider');
  }

  return context;
}
