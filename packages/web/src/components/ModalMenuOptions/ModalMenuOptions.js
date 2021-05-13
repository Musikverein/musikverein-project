import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import './ModalMenuOptions.scss';

Modal.setAppElement('#root');

export const ModalMenuOptions = ({
  isOpen,
  handleClose,
  children,
  ...props
}) => {
  return (
    <Modal
      className="modal-menu-options"
      overlayClassName="overlay-menu-options"
      onRequestClose={handleClose}
      isOpen={isOpen}
      closeTimeoutMS={200}
      {...props}
    >
      <div className="modal-menu-options__container">{children}</div>
    </Modal>
  );
};

ModalMenuOptions.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
