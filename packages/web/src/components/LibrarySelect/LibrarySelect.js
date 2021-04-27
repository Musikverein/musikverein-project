import React from 'react';
import PropTypes from 'prop-types';

import './LibrarySelect.scss';

export const LibrarySelect = ({
  selectValue,
  title,
  optionMyValue,
  optionLikeValue,
  handleSelect,
}) => {
  return (
    <div className="library-select">
      <select value={selectValue} onChange={handleSelect} className="rounded-4">
        <option value={optionMyValue}>My {title}</option>
        <option value={optionLikeValue}>Liked {title}</option>
      </select>
    </div>
  );
};

LibrarySelect.propTypes = {
  selectValue: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  optionMyValue: PropTypes.string.isRequired,
  optionLikeValue: PropTypes.string.isRequired,
  handleSelect: PropTypes.func.isRequired,
};
