import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ROUTES from '../../routers/routes';

export const Logo = ({ size, titleLogo }) => {
  return (
    <div>
      <Link to={ROUTES.HOME}>
        <img
          className={`img__logo-${size} mtb-6`}
          src="https://res.cloudinary.com/musikverein/image/upload/v1618842646/logo-M_jtjwyj.svg"
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
