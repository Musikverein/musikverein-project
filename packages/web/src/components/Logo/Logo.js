import React from 'react';
import PropTypes from 'prop-types';

import './Logo.scss';
import logo from '../../img/logo-M.svg';

export const Logo = ({ size = 'm' }) => {
  return (
    <div>
      <img className={`img__logo-${size} mtb-6`} src={logo} alt="logo-M" />
      <h1 className="text-center text-2xl">Musikverein</h1>
    </div>
  );
};

Logo.propTypes = {
  size: PropTypes.string.isRequired,
};
