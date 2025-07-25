import { BrowserRouter, Route, Routes } from 'react-router';
import { GameProvider } from './context/GameContext';
import { MusicProvider } from './context/MusicContext';
import { SettingProvider } from './context/SettingContext';
import { WeaponProvider } from './context/WeaponContext';
import GamePage from './pages/GamePage';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <SettingProvider>
      <MusicProvider>
        <WeaponProvider>
          <GameProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<HomePage />} index />
                <Route element={<MenuPage />} path='menu' />
                <Route element={<GamePage />} path='game' />
                <Route element={<SettingsPage />} path='settings' />
              </Routes>
            </BrowserRouter>
          </GameProvider>
        </WeaponProvider>
      </MusicProvider>
    </SettingProvider>
  );
}

export default App;
