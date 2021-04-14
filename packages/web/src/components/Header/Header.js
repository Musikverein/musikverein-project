import React from 'react';

import './Header.scss';

import ProfileButton from '../ProfileButton';
import MenuMobile from '../MenuMobile';

function Header() {
  return (
    <header className="mobile header">
      <MenuMobile />
      <ProfileButton />
    </header>
  );
}

export default Header;
