import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export const MenuItem = ({ icon, text, path }) => {
  return (
    <NavLink
      to={path}
      className="flex items-center"
      activeClassName="active-menu"
      exact
    >
      <i className={`bx ${icon} text-xl`} />
      <span className="pl-4">{text}</span>
    </NavLink>
  );
};

MenuItem.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  path: PropTypes.PropTypes.string.isRequired,
};
