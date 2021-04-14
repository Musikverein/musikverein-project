import React, { useState } from 'react';

export const MenuMobile = () => {
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
      {showMenu && '<nav></nav>'}
    </>
  );
};
