import React from 'react';
import { useMenu } from 'hooks/useMenu';
import { menuStyles as styles } from 'styles/components/menu';
import { Link } from 'react-router-dom';
import { pageRoutes } from 'constants/routes';

const Menu: React.FC = () => {
  const { isOpen, setIsOpen } = useMenu();

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }
  return (
    <div css={styles.container}>
      <div>
        Menu
        <button onClick={handleClose}>Close</button>
      </div>
      <Link to={pageRoutes.top}>Top</Link>
    </div>
  );
};

export default Menu;
