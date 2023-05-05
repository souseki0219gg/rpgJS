import React from 'react';
import Narrator from 'models/narrator';

type NarrationWindowProps = {
  narrator: Narrator;
};

const NarrationWindow: React.FC<NarrationWindowProps> = (props) => {
  const { narrator } = props;

  return (
    <>
      <div>
        {narrator.text}
      </div>
    </>
  );
};

export default NarrationWindow;
