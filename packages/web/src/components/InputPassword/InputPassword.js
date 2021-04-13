import React, { useState } from 'react';

import './InputPassword.scss';

export const InputPassword = ({ ...props }) => {
  const [viewPassword, setViewPassword] = useState(false);

  const handleToglePasswordView = () => {
    if (viewPassword) {
      setViewPassword(false);
    } else {
      setViewPassword(true);
    }
  };

  return (
    <div className="input-password">
      <div className="input-password__input">
        <input {...props} type={viewPassword ? 'text' : 'password'} />
        {viewPassword ? (
          <button
            type="button"
            className="password-vision bx bxs-low-vision"
            onClick={handleToglePasswordView}
          />
        ) : (
          <button
            type="button"
            className="password-vision bx bx-show-alt"
            onClick={handleToglePasswordView}
          />
        )}
      </div>
    </div>
  );
};
