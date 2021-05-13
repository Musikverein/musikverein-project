import React from 'react';
import { func } from 'prop-types';
import { useDropzone } from 'react-dropzone';

import './Dropzone.scss';

export const Dropzone = ({ onFileSelected }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'audio/*',
    maxFiles: 1,
    onDropAccepted: onFileSelected,
  });

  return (
    <div className="pb-4">
      <section className="dropzone h-56">
        <div
          {...getRootProps({ className: 'dropzone' })}
          className="dropzone_container"
        >
          <input {...getInputProps()} id="dropzoneInput" />
          <p className="text-center">
            Drag n drop some files here, or click to select files
          </p>
        </div>
      </section>
    </div>
  );
};

Dropzone.propTypes = {
  onFileSelected: func,
};

Dropzone.defaultProps = {
  onFileSelected: (_) => {},
};
