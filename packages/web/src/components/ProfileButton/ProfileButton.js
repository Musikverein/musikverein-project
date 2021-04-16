import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authSelector } from '../../redux/auth/auth-selectors';
import ROUTES from '../../routes';

export const ProfileButton = () => {
  const [profileMenuActive, setProfileMenuActive] = useState(false);
  const { currentUser } = useSelector(authSelector);
  let idUser = currentUser._id;
  idUser = idUser.substring(0, 6).toUpperCase();

  const handleShowProfileMenu = () => {};
  return (
    <div>
      <nav>
        <button type="button" onClick={handleShowProfileMenu}>
          <p className="flex items-center">
            Hello&nbsp;
            <span>{currentUser.userName ? currentUser.userName : idUser}</span>
            <i className="bx bx-chevron-down text-2xl" />
          </p>
        </button>
      </nav>
    </div>
  );
};
