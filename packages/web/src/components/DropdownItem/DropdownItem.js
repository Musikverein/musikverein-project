import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export const DropdownItem = ({ isButton, icon, text, action }) => {
  return isButton ? (
    <button type="button" onClick={action} className="flex items-center">
      <i className={`bx ${icon} text-xl`} />
      <span className="pl-4">{text}</span>
    </button>
  ) : (
    <NavLink
      to={action}
      className="flex items-center"
      activeClassName="text-white"
    >
      <i className={`bx ${icon} text-xl`} />
      <span className="pl-4">{text}</span>
    </NavLink>
  );
};

DropdownItem.propTypes = {
  isButton: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  action: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
};
