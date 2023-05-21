import React from 'react';
import { Enemy } from 'models/character';
import enemyImage from 'assets/images/enemy/mon_025r.png';
import HpIndicator from './HpIndicator';
import { enemyDisplayStyles as styles } from 'styles/components/enemyDisplay';


type EnemyDisplayProps = {
  enemy: Enemy;
};

const EnemyDisplay: React.FC<EnemyDisplayProps> = (props) => {
  const { enemy } = props;
  return (
    <>
      <div css={styles.container}>
        <HpIndicator hp={enemy.status.hp} maxHp={enemy.maxHp} />
        <div css={styles.imageContainer}>
          <img src={enemyImage}></img>
        </div>
      </div>
    </>
  );
};

export default EnemyDisplay;
