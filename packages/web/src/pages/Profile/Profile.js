import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/auth/auth-selectors';

import Header from '../../components/Header';
import ROUTES from '../../routers/routes';

import './Profile.scss';

export const Profile = () => {
  const history = useHistory();
  const { currentUser } = useSelector(authSelector);
  const { followedBy, following } = currentUser;

  return (
    <>
      <main className="main-container-without-header">
        <div className="h-14 w-full flex justify-end items-center sticky top-0 pt-4 bg__primary">
          <button
            type="button"
            className="absolute left-0 px-4 bx bxs-chevron-left text-4xl"
            onClick={() => history.goBack()}
          />
        </div>
        <div className="pt-8 text-center h-64">
          <img
            src={currentUser.image}
            className="w-32 h-32 rounded-full mx-auto border-2 border-mk-magenta object-cover"
            alt="profile"
          />
          <h3 className="font-medium mt-4 mb-4">
            {currentUser.userName || 'Complete your profile'}
          </h3>
          <Link
            to={ROUTES.PROFILE_EDIT}
            className="rounded-4 w-full button-secundary"
          >
            Edit your profile
          </Link>
        </div>

        <div className="flex justify-around text-center p-6">
          <div>
            <span className="font-medium">{followedBy.length}</span>
            <p className="font-light text-xs">FOLLOWERS</p>
          </div>
          <div>
            <span className="font-medium">{following.length}</span>
            <p className="font-light text-xs">FOLLOWING</p>
          </div>
        </div>
      </main>
    </>
  );
};
