import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '../../redux/auth/auth-actions';
import { authSelector } from '../../redux/auth/auth-selectors';
import ROUTES from '../../routers/routes';
import Dropdown from '../Dropdown';
import DropdownItem from '../DropdownItem';

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
        <p className="flex items-center font-normal">
          Hello&nbsp;
          <span className="font-semibold">
            {currentUser.userName ? currentUser.userName : idUser}
          </span>
          <i className="bx bx-chevron-down text-2xl" />
        </p>
      </button>
      {profileMenuActive && (
        <Dropdown
          handleClose={handleShowProfileMenu}
          styleNav="dropdown-profile"
        >
          <>
            <DropdownItem
              isButton={false}
              icon="bx-user"
              text="Profile"
              action={ROUTES.PROFILE}
            />
            <DropdownItem
              isButton
              icon="bx-log-out-circle"
              text="LogOut"
              action={handleSignOut}
            />
          </>
        </Dropdown>
      )}
    </div>
  );
};
