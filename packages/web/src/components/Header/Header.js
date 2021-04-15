import React from 'react';

import './Header.scss';

import ProfileButton from '../ProfileButton';
import Menu from '../Menu';

function Header() {
  return (
    <header className="mobile header">
      <Menu />
      <ProfileButton />
    </header>
  );
}

export default Header;
