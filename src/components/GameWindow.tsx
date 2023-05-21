import React from 'react';
import { useGame } from 'hooks/useGame';
import { useMenu } from 'hooks/useMenu';
import { gameWindowStyles as styles } from 'styles/components/gameWindow';
import ActionCardWidget from './card/ActionCardWidget';
import NarrationWindow from './NarrationWindow';
import TotalHpIndicator from './TotalHpIndicator';
import EnemyDisplay from './EnemyDisplay';

const GameWindow: React.FC = () => {
  const { game } = useGame();
  const { setIsOpen } = useMenu();

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div css={styles.container}>
        <div css={styles.topArea}>
          <div>
            {game.playerManager.group.map((player, index) => (
              <div key={index}>
                {player.status.name}: {player.status.hp}
              </div>
            ))}
          </div>
          <button onClick={handleToggleMenu}>Menu</button>
        </div>
        <div css={styles.middleArea}>
          <div>
            {game.enemyManager.group.map((enemy, index) => (
              <div key={index}>
                <EnemyDisplay enemy={enemy}></EnemyDisplay>
              </div>
            ))}
          </div>
        </div>
        <div css={styles.bottomArea}>
          <NarrationWindow narrator={game.narrator}></NarrationWindow>
          <TotalHpIndicator
            hp={game.playerManager.totalHp}
            maxHp={game.playerManager.totalMaxHp}
          ></TotalHpIndicator>
          <div>
            {game.playerManager.group.map((player, index) => (
              <div key={index} css={styles.cardContainer}>
                {player.cards.map((actionCard, index) => (
                  <ActionCardWidget key={index} actionCard={actionCard} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GameWindow;
