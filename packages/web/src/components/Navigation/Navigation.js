import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../routes';

export const Navigation = () => {
  return (
    <nav className="fixed z-10 navbar inset-0">
      <Link to={ROUTES.HOME}> Home </Link>
      <Link to={ROUTES.LIBRARY}> Library </Link>
    </nav>
  );
};
