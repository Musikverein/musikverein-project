import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PublicRoute = ({ isAuthenticated, ...props }) => {
  return !isAuthenticated ? <Route {...props} /> : <Redirect to="/" />;
};

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
