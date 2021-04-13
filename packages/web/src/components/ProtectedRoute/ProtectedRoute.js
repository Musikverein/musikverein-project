import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ProtectedRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? <Route {...props} /> : <Redirect to="/login" />;
};

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
