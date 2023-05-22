import React from 'react';

import { useNavigate } from 'react-router-dom';
import { pageRoutes } from 'constants/routes';

const IndexPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(pageRoutes.game);
  };

  return (
    <>
      <div>
        <h1>rpgJS</h1>
        <p>Simple RPG game engine</p>
        <button onClick={handleClick}>Start</button>
      </div>
    </>
  );
};

export default IndexPage;
