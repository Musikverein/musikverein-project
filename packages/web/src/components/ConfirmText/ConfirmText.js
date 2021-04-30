import React from 'react';
import PropTypes from 'prop-types';

export const ConfirmText = ({ handleRemove, onCancel, title }) => {
  return (
    <>
      <h3 className="text-white text-lg mb-4 text-center">
        Are you sure you want to remove <br />
        <span className="text-gray-300">{title}</span>?
      </h3>
      <div className="flex">
        <button
          className="text-white button-secundary mx-4 px-4"
          type="button"
          onClick={handleRemove}
        >
          Yes
        </button>
        <button
          className="text-white button-secundary mx-4 px-4"
          type="button"
          onClick={onCancel}
        >
          No
        </button>
      </div>
    </>
  );
};

ConfirmText.propTypes = {
  handleRemove: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
