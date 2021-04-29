import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const DropdownItem = ({ isButton, icon, text, action }) => {
  return isButton ? (
    <button type="button" onClick={action} className="flex items-center">
      <i className={`bx ${icon} text-xl`} />
      <span className="pl-4">{text}</span>
    </button>
  ) : (
    <Link to={action} className="flex items-center">
      <i className={`bx ${icon} text-xl`} />
      <span className="pl-4">{text}</span>
    </Link>
  );
};

DropdownItem.propTypes = {
  isButton: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  action: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
};
