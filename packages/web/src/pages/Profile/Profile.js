import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header/Header';

import { signOut } from '../../redux/auth/auth-actions';
import { authSelector } from '../../redux/auth/auth-selectors';

export const Profile = () => {
  const { currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <div>
      <button type="button" onClick={handleSignOut}>
        LogOut
      </button>
      <Header />
    </div>
  );
};
