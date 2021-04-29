import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Dropdown.scss';

export const Dropdown = ({ handleClose, children, styleNav }) => {
  const clickOutsiteDropdown = useCallback(
    (e) => {
      if (!document.querySelector(`.${styleNav}`)?.contains(e.target)) {
        handleClose();
      }
    },
    [handleClose, styleNav],
  );
  useEffect(() => {
    window.addEventListener('click', clickOutsiteDropdown);
    return () => {
      window.removeEventListener('click', clickOutsiteDropdown);
    };
  }, [clickOutsiteDropdown]);

  return (
    <nav className={`${styleNav} flex flex-col shadow-xl`}>{children}</nav>
  );
};

Dropdown.propTypes = {
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  styleNav: PropTypes.string.isRequired,
};
