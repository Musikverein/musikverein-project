import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import ROUTES from '../../routes';

export const ProtectedRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect to={ROUTES.LOGIN} />
  );
};

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
