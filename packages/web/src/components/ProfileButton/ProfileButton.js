import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '../../redux/auth/auth-actions';
import { authSelector } from '../../redux/auth/auth-selectors';
import ROUTES from '../../routers/routes';

export const ProfileButton = () => {
  const [profileMenuActive, setProfileMenuActive] = useState(false);
  const { currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  let idUser = currentUser._id;
  idUser = idUser.substring(0, 6).toUpperCase();

  function handleSignOut() {
    dispatch(signOut());
  }

  const handleShowProfileMenu = () => {
    setProfileMenuActive(!profileMenuActive);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleShowProfileMenu}
        className="relative"
      >
        <p className="flex items-center">
          Hello&nbsp;
          <span>{currentUser.userName ? currentUser.userName : idUser}</span>
          <i className="bx bx-chevron-down text-2xl" />
        </p>
      </button>
      <nav
        className={
          profileMenuActive ? 'absolute flex flex-col' : 'hidden absolute'
        }
      >
        <Link to={ROUTES.PROFILE}>Profile</Link>
        <button type="button" onClick={handleSignOut}>
          LogOut
        </button>
      </nav>
    </div>
  );
};
