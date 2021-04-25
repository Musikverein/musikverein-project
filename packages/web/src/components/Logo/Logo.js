import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ROUTES from '../../routers/routes';

export const Logo = ({ size, titleLogo }) => {
  return (
    <div>
      <Link to={ROUTES.HOME}>
        <img
          className={`img__logo-${size}`}
          src="https://res.cloudinary.com/musikverein/image/upload/v1619342803/logo-M2_bnwhux.svg"
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
