import React from 'react';
import PropTypes from 'prop-types';
import ROUTES from '../../routers/routes';

import './Menu.scss';
import MenuItem from '../MenuItem';
import { Logo } from '../Logo/Logo';

export const Menu = ({ showMenu }) => {
  return (
    <nav className={showMenu ? 'menu-overlay open' : 'menu-overlay'}>
      <div>
        <div className="logo-musikverein">
          <Logo size="xs" titleLogo={false} />
        </div>
        <MenuItem path={ROUTES.HOME} text="Home" icon="bxs-home" />
        <MenuItem
          path={ROUTES.LIBRARY}
          text="Library"
          icon="bx-library"
          isExact={false}
        />
        <MenuItem path={ROUTES.SEARCH} text="Search" icon="bx-search-alt" />
        <MenuItem
          path={ROUTES.SONG_UPLOAD}
          text="Upload Song"
          icon="bx-cloud-upload"
        />
      </div>
    </nav>
  );
};

Menu.propTypes = {
  showMenu: PropTypes.bool.isRequired,
};
