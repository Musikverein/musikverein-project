import React, { useState } from 'react';
import Menu from '../Menu';

import './MenuHamburger.scss';

export const MenuHamburger = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <button
        type="button"
        className={showMenu ? 'relative menu open' : 'relative menu'}
        onClick={handleShowMenu}
      >
        <div className="menu-link">
          <span className="menu-icon">
            <span className="menu-line menu-line-1" />
            <span className="menu-line menu-line-2" />
            <span className="menu-line menu-line-3" />
          </span>
        </div>
      </button>
      <Menu showMenu={showMenu} />
    </>
  );
};
