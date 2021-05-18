import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ROUTES from '../../routers/routes';

import './Logo.scss';

export const Logo = ({ size, titleLogo }) => {
  return (
    <div>
      <Link to={ROUTES.HOME}>
        <img
          className={`img__logo-${size} images-shadow`}
          src="https://res.cloudinary.com/musikverein-project/image/upload/v1621345047/logo-M2_a0ecfu.svg"
          alt="logo-M"
        />
        {titleLogo && <h1 className="text-center text-2xl">Musikverein</h1>}
      </Link>
    </div>
  );
};

Logo.propTypes = {
  size: PropTypes.string.isRequired,
  titleLogo: PropTypes.bool.isRequired,
};
