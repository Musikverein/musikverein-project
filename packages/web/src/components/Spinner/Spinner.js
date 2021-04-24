import React from 'react';
import './Spinner.scss';

export const Spinner = () => {
  return (
    <div className="w-full flex justify-center p-4">
      <div className="loader" />
    </div>
  );
};
