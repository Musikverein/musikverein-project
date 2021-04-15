import React, { useState } from 'react';
import Navigation from '../Navigation';

export const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <button
        type="button"
        className="bx bx-menu-alt-left text-4xl"
        onClick={handleShowMenu}
      />
      {showMenu && <Navigation />}
    </>
  );
};
