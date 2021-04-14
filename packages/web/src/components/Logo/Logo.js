import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Logo.scss';
import logo from '../../img/logo-M.svg';
import * as ROUTES from '../../routes';

export const Logo = ({ size, titleLogo }) => {
  return (
    <div>
      <Link to={ROUTES.HOME}>
        <img className={`img__logo-${size} mtb-6`} src={logo} alt="logo-M" />
        {titleLogo && <h1 className="text-center text-2xl">Musikverein</h1>}
      </Link>
    </div>
  );
};

Logo.propTypes = {
  size: PropTypes.string.isRequired,
  titleLogo: PropTypes.bool.isRequired,
};
