import React from 'react';
import PropTypes from 'prop-types';

export const ModalMenuOptionsItem = ({ handleClose, icon, text, action }) => {
  const handleAction = () => {
    action();
    handleClose();
  };
  return (
    <button type="button" onClick={handleAction} className="flex items-center">
      <i className={`bx ${icon} text-xl`} />
      <span className="pl-4 text-left">{text}</span>
    </button>
  );
};

ModalMenuOptionsItem.propTypes = {
  handleClose: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};
