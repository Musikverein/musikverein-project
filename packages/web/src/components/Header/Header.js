import React from 'react';

import './Header.scss';

import Logo from '../Logo';
import ProfileButton from '../ProfileButton';
import SearchButton from '../SearchButton';

function Header() {
  return (
    <header className="mobile header">
      <SearchButton />
      <Logo size="xm" titleLogo={false} />
      <ProfileButton />
    </header>
  );
}

export default Header;
