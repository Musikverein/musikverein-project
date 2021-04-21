import React from 'react';

import './Header.scss';

import ProfileButton from '../ProfileButton';
import Menu from '../Menu';

export const Header = () => {
  return (
    <header className="mobile header">
      <Menu />
      <ProfileButton />
    </header>
  );
};
