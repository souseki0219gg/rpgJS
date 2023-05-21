import React from 'react';
import { hpIndicatorStyles as styles } from 'styles/components/hpIndicator';

type HpIndicatorProps = {
  hp: number;
  maxHp: number;
};

const HpIndicator: React.FC<HpIndicatorProps> = (props) => {
  const { hp, maxHp } = props;
  return (
    <>
      <div css={styles.container}>
        <div css={styles.gaugeContainer}>
          <div css={styles.gauge(hp / maxHp)}></div>
        </div>
      </div>
    </>
  );
};

export default HpIndicator
