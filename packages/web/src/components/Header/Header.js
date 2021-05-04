import React from 'react';

import ProfileButton from '../ProfileButton';
import MenuHamburger from '../MenuHamburger';

import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <MenuHamburger />
      <ProfileButton />
    </header>
  );
};
