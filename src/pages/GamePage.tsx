import React from 'react';

import GameWindow from 'components/GameWindow';
import Menu from 'components/Menu';
import { GameProvider } from 'providers/gameProvider';
import { MenuProvider } from 'providers/menuProvider';
import { gamePageStyles as styles } from 'styles/pages/gamePage';

const GamePage: React.FC = () => {
  
  return (
    <>
      <main>
        <div css={styles.stack}>
          <MenuProvider>
            <GameProvider>
              <GameWindow />
            </GameProvider>
            <Menu />
          </MenuProvider>
        </div>
      </main>
    </>
  );
};

export default GamePage;
