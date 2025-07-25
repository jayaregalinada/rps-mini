import { createContext, useContext, useEffect, useReducer } from 'react';
import { useWeapon } from './WeaponContext';

export const GameContext = createContext();

const initialState = {
  player: {
    weapons: [],
    score: 0,
    choice: null,
  },
  opponent: {
    weapons: [],
    score: 0,
    choice: null,
  },
  availableWeapons: [],
  winner: null,
  outcome: null,
  rounds: [],
};

function choice(previousChoice, previousWeapons, availableWeapons) {
  const remainingWeapons = availableWeapons
    .filter((weapon) => !previousWeapons.includes(weapon))
    .filter((weapon) => weapon !== previousChoice);

  const randomIndex = Math.floor(Math.random() * remainingWeapons.length);

  const newRandomWeapon = remainingWeapons[randomIndex];
  const newWeapons = previousWeapons.filter(
    (weapon) => weapon !== previousChoice
  );

  return [...newWeapons, newRandomWeapon];
}

function getRandomWeapons(allWeapons, count = 4) {
  const shuffled = allWeapons.slice().sort(() => 0.5 - Math.random());

  return shuffled.slice(0, count);
}

function isPlayerWinner(winner, playerChoice) {
  return winner === playerChoice;
}

function reducer(state, action) {
  const { player, availableWeapons, opponent } = state;

  switch (action.type) {
    case 'START':
      return {
        ...state,
        player: {
          weapons: getRandomWeapons(availableWeapons),
          score: 0,
          choice: null,
        },
        opponent: {
          weapons: getRandomWeapons(availableWeapons),
          score: 0,
          choice: null,
        },
        rounds: [],
        winner: null,
        outcome: null,
      };

    case 'NEXT_ROUND':
      return {
        ...state,
        player: {
          ...player,
          weapons: choice(player.choice, player.weapons, availableWeapons),
          choice: null,
        },
        opponent: {
          ...opponent,
          weapons: choice(opponent.choice, opponent.weapons, availableWeapons),
          choice: null,
        },
        winner: null,
        outcome: null,
      };

    case 'CHOOSE_PLAYER':
      return {
        ...state,
        player: {
          ...player,
          choice: action.payload,
        },
      };

    case 'CHOOSE_OPPONENT':
      return {
        ...state,
        opponent: {
          ...opponent,
          choice: action.payload,
        },
      };

    case 'MATCHING':
      return {
        ...state,
        isLoading: true,
        winner: null,
      };

    case 'MATCHED':
      const { winner, outcome } = action.payload;

      return {
        ...state,
        isLoading: false,
        winner,
        outcome,
        rounds: [
          ...state.rounds,
          {
            id: state.rounds.length + 1,
            weapon: winner,
            outcome,
            winner: isPlayerWinner(winner, player.choice)
              ? 'player'
              : 'opponent',
          },
        ],
      };

    case 'SET_WEAPONS':
      return {
        ...state,
        availableWeapons: action.payload,
      };

    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { state: weaponState } = useWeapon();

  useEffect(() => {
    dispatch({
      type: 'SET_WEAPONS',
      payload: weaponState.availableWeapons,
    });
  }, [weaponState.availableWeapons]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }

  return context;
}
