import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import InfoProfile from '../../components/InfoProfile';
import Header from '../../components/Header/Header';

import { signOut } from '../../redux/auth/auth-actions';
import { authSelector } from '../../redux/auth/auth-selectors';
import ROUTES from '../../routes';

export const Profile = () => {
  const { currentUser } = useSelector(authSelector);
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <div>
      <Header />
      <div className="pt-16 text-center">
        <img
          src={
            currentUser.image
              ? currentUser.image
              : 'https://i.pinimg.com/originals/6e/ff/53/6eff53e82b80fb5dd7614d5ba054f144.jpg'
          }
          className="w-32 h-32 rounded-full mx-auto border-2 border-mk-magenta"
          alt="profile"
        />
        <h3 className="font-medium mt-4 mb-2">
          {currentUser.firstName && currentUser.lastName
            ? `${currentUser.firstName} ${currentUser.lastName}`
            : 'Your name'}
        </h3>
        <Link
          to={ROUTES.PROFILE_EDIT}
          className="rounded-md px-4 border font-light text-sm border-mk-magenta mt-2"
        >
          Edit your profile
        </Link>
      </div>
      <InfoProfile />

      <button type="button" onClick={handleSignOut}>
        LogOut
      </button>
    </div>
  );
};
