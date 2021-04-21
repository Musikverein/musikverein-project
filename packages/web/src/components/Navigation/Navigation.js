import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ROUTES from '../../routers/routes';

import './Navigation.scss';

export const Navigation = ({ showMenu }) => {
  return (
    <nav className={showMenu ? 'menu-overlay open' : 'menu-overlay'}>
      <NavLink to={ROUTES.PROFILE}>Profile</NavLink>
      <NavLink to={ROUTES.HOME}> Home </NavLink>
      <NavLink to={ROUTES.LIBRARY}> Library </NavLink>
      <NavLink to={ROUTES.UPLOAD_SONG}> Upload Song </NavLink>
    </nav>
  );
};

Navigation.propTypes = {
  showMenu: PropTypes.bool.isRequired,
};
