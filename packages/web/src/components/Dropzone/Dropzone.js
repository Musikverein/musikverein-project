import React from 'react';
import { func } from 'prop-types';
import { useDropzone } from 'react-dropzone';

export const Dropzone = ({ onFileSelected }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'audio/*',
    maxFiles: 1,
    onDropAccepted: onFileSelected,
  });
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  return (
    <div>
      <section className="dropzone">
        <div
          {...getRootProps({ className: 'dropzone' })}
          className="dropzone_container"
        >
          <input {...getInputProps()} />
          <p>Drag n drop some files here, or click to select files</p>
        </div>
      </section>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </div>
  );
};

Dropzone.propTypes = {
  onFileSelected: func,
};

Dropzone.defaultProps = {
  onFileSelected: (_) => {},
};
