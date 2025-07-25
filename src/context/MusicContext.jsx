import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { useSetting } from './SettingContext';

export const MusicContext = createContext();

const initialState = {
  status: 'idle',
  nowPlayingIndex: null,
  nowPlaying: null,
  playlists: [
    {
      url: './music/8 Bit Push By HeatleyBros.mp3',
      title: 'Push - HeatleyBros',
      credit: (
        <p>
          Free Music For Your Youtube Videos{' '}
          <a target='_blank' href='https://www.youtube.com/user/HeatleyBros'>
            https://www.youtube.com/user/HeatleyBros
          </a>
        </p>
      ),
    },
    {
      url: './music/8 Bit Climb By HeatleyBros.mp3',
      title: 'Climb - HeatleyBros',
      credit: (
        <p>
          Free Music For Your Youtube Videos{' '}
          <a href='https://www.youtube.com/user/HeatleyBros'>
            https://www.youtube.com/user/HeatleyBros
          </a>
        </p>
      ),
    },
    {
      url: './music/8 Bit Crush By HeatleyBros.mp3',
      title: 'Crush - HeatleyBros',
      credit: (
        <p>
          Free Music For Your Youtube Videos{' '}
          <a href='https://www.youtube.com/user/HeatleyBros'>
            https://www.youtube.com/user/HeatleyBros
          </a>
        </p>
      ),
    },
    {
      url: './music/8 Bit Grind By HeatleyBros.mp3',
      title: 'Grind - HeatleyBros',
      credit: (
        <p>
          Free Music For Your Youtube Videos{' '}
          <a href='https://www.youtube.com/user/HeatleyBros'>
            https://www.youtube.com/user/HeatleyBros
          </a>
        </p>
      ),
    },
    {
      url: './music/8 Bit Jump By HeatleyBros.mp3',
      title: 'Jump - HeatleyBros',
      credit: (
        <p>
          Free Music For Your Youtube Videos{' '}
          <a href='https://www.youtube.com/user/HeatleyBros'>
            https://www.youtube.com/user/HeatleyBros
          </a>
        </p>
      ),
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case 'START_SONG':
      return {
        ...state,
        nowPlayingIndex: 0,
        nowPlaying: state.playlists[0],
        status: 'playing',
      };

    case 'NEXT_SONG': {
      const nextSongIndex =
        (state.nowPlayingIndex + 1) % state.playlists.length;

      return {
        ...state,
        nowPlayingIndex: nextSongIndex,
        nowPlaying: state.playlists[nextSongIndex],
        status: 'playing',
      };
    }

    case 'PLAY_SONG':
      return {
        ...state,
        status: 'playing',
      };

    case 'PAUSE_SONG':
      return {
        ...state,
        status: 'pause',
      };

    case 'STOP_SONG':
      return {
        ...state,
        status: 'stop',
      };

    default:
      return state;
  }
}

export function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { state: settingState } = useSetting();

  useEffect(() => {
    if (state.nowPlaying) {
      if (!audioRef.current) {
        audioRef.current = new Audio(state.nowPlaying.url);
        audioRef.current.loop = false;
        audioRef.current.autoplay = true;
        audioRef.current.addEventListener('ended', () => {
          dispatch({ type: 'NEXT_SONG' });
        });
      } else {
        audioRef.current.src = state.nowPlaying.url;
      }

      const tryPlaying = () => {
        audioRef.current.play().catch(() => {
          setTimeout(tryPlaying, 1000);
        });
      };

      tryPlaying();
    }
  }, [state.nowPlayingIndex, state.nowPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = settingState.musicVolume / 100;
    }
  }, [settingState.musicVolume, audioRef.current]);

  const nextSong = () => {
    dispatch({ type: 'NEXT_SONG' });
  };

  const playSong = () => {
    if (state.status === 'playing') {
      return;
    }

    dispatch({
      type: state.status === 'pause' ? 'PLAY_SONG' : 'START_SONG',
    });
  };

  return (
    <MusicContext.Provider value={{ state, dispatch, nextSong, playSong }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);

  if (!context) {
    throw new Error('useMusic must be used within MusicProvider');
  }

  return context;
}
