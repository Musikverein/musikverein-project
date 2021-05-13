import React from 'react';
import PropTypes from 'prop-types';

import './ImgEdit.scss';

export const ImgEdit = ({
  handleImage,
  handleImageChange,
  urlPreview,
  refId,
  defaultImg,
  rounded,
}) => {
  return (
    <div className="relative w-32 h-32 m-4">
      <button
        className="absolute bottom-0 right-0"
        type="button"
        onClick={handleImage}
      >
        <span
          className={
            urlPreview ? 'bx bx-x icon_edit' : 'bx bxs-pencil icon_edit'
          }
        />
      </button>
      <img
        src={urlPreview || defaultImg}
        className={
          rounded
            ? 'w-32 h-32 border-2 border-mk-main object-cover rounded-full'
            : 'w-32 h-32 border-2 border-mk-main object-cover rounded-4'
        }
        alt="profile"
      />
      <input
        type="file"
        name={refId}
        id={refId}
        className="hidden"
        onChange={handleImageChange}
        multiple={false}
      />
    </div>
  );
};

ImgEdit.propTypes = {
  handleImage: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  urlPreview: PropTypes.string.isRequired,
  refId: PropTypes.string.isRequired,
  defaultImg: PropTypes.string.isRequired,
  rounded: PropTypes.bool.isRequired,
};
