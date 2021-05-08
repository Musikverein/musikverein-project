import React from 'react';
import PropTypes from 'prop-types';
import ProfileButton from '../ProfileButton';
import MenuHamburger from '../MenuHamburger';

import './Header.scss';

export const Header = ({ isHidden }) => {
  return (
    <header className={isHidden ? 'mobile-hidden header' : 'header'}>
      <MenuHamburger />
      <ProfileButton />
    </header>
  );
};

Header.defaultProps = {
  isHidden: false,
};

Header.propTypes = {
  isHidden: PropTypes.bool,
};
