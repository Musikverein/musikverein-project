import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export const HeaderGoBack = ({ children }) => {
  const history = useHistory();
  return (
    <div className="h-14 bg__primary headerGoBack px-4">
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
