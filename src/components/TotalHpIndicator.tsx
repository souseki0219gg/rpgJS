import React from 'react';

import { totalHpIndicatorStyles as styles } from 'styles/components/totalHpIndicator';

type HpIndicatorProps = {
  hp: number;
  maxHp: number;
};

const TotalHpIndicator: React.FC<HpIndicatorProps> = (props) => {
  const { hp, maxHp } = props;
  return (
    <>
      <div css={styles.container}>
        <div css={styles.gaugeContainer}>
          <div css={styles.gauge(hp / maxHp)}></div>
        </div>
        <div css={styles.textContainer}>
          <span css={styles.text}>HP: </span>
          <span css={styles.text}>
            {hp}/{maxHp}
          </span>
        </div>
      </div>
    </>
  );
};

export default TotalHpIndicator;
