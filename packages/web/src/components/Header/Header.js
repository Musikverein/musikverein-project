import React from 'react';

import ProfileButton from '../ProfileButton';
import Menu from '../Menu';

import './Header.scss';

export const Header = () => {
  return (
    <header className="mobile header">
      <Menu />
      <ProfileButton />
    </header>
  );
};
