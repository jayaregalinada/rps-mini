import { useEffect, useState } from 'react';
import WeaponCard from '../components/WeaponCard';
import { useGame } from '../context/GameContext';
import { matchService } from '../services/match-service';
import { useSetting } from '../context/SettingContext';
import SelectedWeaponCard from '../components/SelectedWeaponCard';
import { cn } from '../utils/cn';
import { useMusic } from '../context/MusicContext';
import Button from '../components/Button';
import { useNavigate } from 'react-router';

function GamePage() {
  const { state, dispatch } = useGame();
  const {
    opponent,
    player,
    winner,
    isLoading,
    availableWeapons,
    outcome,
    rounds,
  } = state;
  const { state: settingState } = useSetting();
  const { playSong } = useMusic();
  const [timer, setTimer] = useState(5);
  const isMatchFinished = !isLoading && winner;
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      playSong();
    }, 3000);
  }, []);

  const chooseForOpponent = () => {
    const { weapons } = opponent;
    const opponentChoice = weapons[Math.floor(Math.random() * weapons.length)];

    dispatch({ type: 'CHOOSE_OPPONENT', payload: opponentChoice });
  };

  const chooseForPlayer = async (weapon) => {
    if (opponent.choice === null) {
      dispatch({ type: 'CHOOSE_PLAYER', payload: weapon });
    }
  };

  const startMatchWeapons = async (playerChoice, opponentChoice) => {
    dispatch({ type: 'MATCHING' });
    const { winner, outcome } = await matchService([
      playerChoice,
      opponentChoice,
    ]);
    dispatch({ type: 'MATCHED', payload: { winner, outcome } });
  };

  useEffect(() => {
    let nextRoundTimerId;
    let timerId;

    if (timerId) {
      clearInterval(timerId);
    }

    if (winner) {
      setTimer(settingState.nextRoundTimer / 1000);
      nextRoundTimerId = setTimeout(() => {
        dispatch({ type: 'NEXT_ROUND' });
      }, settingState.nextRoundTimer);
      timerId = setInterval(() => {
        setTimer((previous) => previous - 1);
      }, 1000);
    }

    return () => {
      if (nextRoundTimerId) {
        clearTimeout(nextRoundTimerId);
      }
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [winner, settingState.nextRoundTimer]);

  useEffect(() => {
    if (player.choice) {
      chooseForOpponent();
    }
  }, [player.choice]);

  useEffect(() => {
    if (opponent.choice && player.choice && winner === null) {
      startMatchWeapons(player.choice, opponent.choice);
    }
  }, [opponent.choice, player.choice, winner]);

  useEffect(() => {
    if (rounds.length === 0) {
      dispatch({ type: 'START' });  
    }
  }, [availableWeapons, rounds.length]);

  const isWeaponChosen = (weapon) => {
    return weapon === player.choice;
  };

  const hasPlayerChosen = (weapon) => {
    return player.choice !== null && !isWeaponChosen(weapon);
  };

  const handleClick = () => {
    if (isMatchFinished) {
      dispatch({ type: 'NEXT_ROUND' });
    }
  };

  return (
    <>
      <Button className='fixed text-xl top-4 left-4' onClick={() => navigate('/menu')}>Menu</Button>
      <section className='w-full h-dvh grid grid-flow-col place-content-center grid-cols-1 grid-rows-4 lg:gap-6'>
        <div className='row-span-3 grid grid-rows-[1fr_auto_1fr] place-content-center place-items-center h-full px-4 lg:py-6 lg:gap-4'>
          {opponent.choice && (
            <SelectedWeaponCard
              hasWinner={winner}
              isWinner={winner === opponent.choice}
              name={opponent.choice}
            />
          )}
          <div
            role={isMatchFinished ? 'button' : 'banner'}
            onClick={handleClick}
            className={cn(
              'flex justify-center items-center text-4xl flex-col h-30 gap-2 row-start-2 bg-primary p-8 border-8 border-gray-900 w-dvw lg:w-auto lg:text-5xl',
              isMatchFinished && 'cursor-pointer'
            )}
          >
            {!isLoading && !winner && (
              <>
                <p>Round {rounds.length + 1}</p>
                <p className='text-lg text-gray-700'>Select Weapon</p>
              </>
            )}
            {isLoading && (
              <>
                <p>Fight</p>
                <p className='text-lg text-gray-700'>Loading ...</p>
              </>
            )}
            {isMatchFinished && (
              <>
                <p className='capitalize'>{outcome}</p>
                <p className='text-lg text-gray-700'>
                  Next round in {timer}s or Click to skip
                </p>
              </>
            )}
          </div>
          {player.choice && (
            <SelectedWeaponCard
              hasWinner={winner}
              isWinner={winner === player.choice}
              name={player.choice}
            />
          )}
        </div>
        <div className='row-start-4 snap-x gap-4 flex overflow-x-auto p-4 scroll-px-4 w-full lg:items-end'>
          {player.weapons.map((weapon) => (
            <WeaponCard
              className={cn(
                'h-full',
                hasPlayerChosen(weapon) && 'opacity-80 cursor-not-allowed'
              )}
              key={weapon}
              onClick={() => chooseForPlayer(weapon)}
              name={weapon}
              isSelected={isWeaponChosen(weapon)}
            >
              {weapon}
            </WeaponCard>
          ))}
        </div>
      </section>
    </>
  );
}

export default GamePage;
