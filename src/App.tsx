import React from 'react';
import GameWindow from 'components/GameWindow';
import { GameProvider } from 'providers/gameProvider';
import { ThemeProvider } from '@emotion/react';
import { lightTheme } from 'styles/theme';

const App: React.FC = () => {
  return (
    <div className="App">
      <ThemeProvider theme={lightTheme}>
        <header className="App-header">
          <h1>
            rpgJS
          </h1>
          <main>
            <div className="game">
              <GameProvider>
                <GameWindow />
              </GameProvider>
            </div>
          </main>
        </header>
      </ThemeProvider>
    </div>
  );
}

export default App;

