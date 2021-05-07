import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export const HeaderGoBack = ({ children }) => {
  const history = useHistory();
  return (
    <div className="h-14 w-full flex justify-end items-center sticky pr-4 top-0 bg__primary z-10">
      <button
        type="button"
        className="absolute left-0 px-4 bx bxs-chevron-left text-4xl"
        onClick={() => history.goBack()}
      />
      {children}
    </div>
  );
};

HeaderGoBack.propTypes = {
  children: PropTypes.element.isRequired,
};
