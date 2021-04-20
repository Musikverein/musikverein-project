import React from 'react';
import { func } from 'prop-types';
import { useDropzone } from 'react-dropzone';

function Dropzone({ onFileSelected }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'audio/*',
    maxFiles: 1,
    onDropAccepted: onFileSelected,
  });
  // eslint-disable-next-line no-unused-vars
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>{file.path}</li>
  ));

  return (
    <div>
      <section className=" mt-4 p-4 border-2 rounded-md bg-dark border-dark-light border-dashed outline-none">
        <div
          {...getRootProps({ className: 'dropzone' })}
          className="flex flex-col items-center p-4"
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
}

Dropzone.propTypes = {
  onFileSelected: func,
};

Dropzone.defaultProps = {
  onFileSelected: (_) => {},
};

export default Dropzone;
