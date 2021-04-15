import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ROUTES from '../../routes';

import './Navigation.scss';

export const Navigation = ({ showMenu }) => {
  return (
    <nav className="navbar bg-purple-600 flex flex-col align-center animate__animated animate__fadeInLeftBig">
      <Link to={ROUTES.PROFILE}>Profile</Link>
      <Link to={ROUTES.HOME}> Home </Link>
      <Link to={ROUTES.LIBRARY}> Library </Link>
    </nav>
  );
};

Navigation.propTypes = {
  showMenu: PropTypes.bool.isRequired,
};
