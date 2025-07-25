import { createContext, useContext, useEffect, useReducer } from 'react';

export const WeaponContext = createContext();

const initialState = {
  allWeapons: [
    'Cat',
    'Cockroach',
    'Devil',
    'Dragon',
    'Duck',
    'Dynamite',
    'Fire',
    'Fish',
    'Gun',
    'Helicopter',
    'Laser',
    'Lightning',
    'Man',
    'Medusa',
    'Monkey',
    'Nuke',
    'Paper',
    'Poison',
    'Police',
    'Porcupine',
    'Prayer',
    'Rock',
    'Scissors',
  ],
  availableWeapons: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_WEAPONS':
      return {
        ...state,
        availableWeapons: action.payload,
      };

    case 'RESET':
      return {
        ...state,
        availableWeapons: [],
      };

    default:
      return state;
  }
}

export function WeaponProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_WEAPONS', payload: [...state.allWeapons] });
  }, []);

  return (
    <WeaponContext.Provider value={{ state, dispatch }}>
      {children}
    </WeaponContext.Provider>
  );
}

export function useWeapon() {
  const context = useContext(WeaponContext);

  if (!context) {
    throw new Error('useWeapon must be used within WeaponProvider');
  }

  return context;
}
