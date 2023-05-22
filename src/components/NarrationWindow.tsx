import React from 'react';
import Narrator from 'models/narrator';

import { narrationWindowStyles as styles } from 'styles/components/narrationWindow';

type NarrationWindowProps = {
  narrator: Narrator;
};

const NarrationWindow: React.FC<NarrationWindowProps> = (props) => {
  const { narrator } = props;

  return (
    <>
      <div css={styles.container}>
        {narrator.currentTexts.map((text, index) => (
          <p key={index} css={styles.text}>{text}</p>
        ))}
      </div>
    </>
  );
};

export default NarrationWindow;
