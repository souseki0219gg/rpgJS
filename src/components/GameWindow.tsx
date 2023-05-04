import React from 'react';
import { useGame } from 'hooks/useGame';
import { gameWindowStyles as styles } from 'styles/components/gameWindow';
import ActionCardWidget from './card/ActionCardWidget';
import playerImage from 'assets/images/player/mon_234r.png';
import enemyImage from 'assets/images/enemy/mon_025r.png';
import NarrationWindow from './NarrationWindow';

const GameWindow: React.FC = () => {
  const { game } = useGame();
  return (
    <>
      <div css={styles.container}>
        <div>
          player: {game.player.status.name}
        </div>
        <div>
          hp: {game.player.status.hp}
        </div>
        <img src={playerImage}></img>
        <div>
          enemy: {game.enemy.status.name}
        </div>
        <div>
          hp: {game.enemy.status.hp}
        </div>
        <img src={enemyImage}></img>
        <div>
          {game.player.cards.map((actionCard, index) => (
            <ActionCardWidget key={index} actionCard={actionCard} />
          ))}
        </div>
        <NarrationWindow narrator={game.narrator}></NarrationWindow>
      </div>
    </>
  );
};

export default GameWindow;
