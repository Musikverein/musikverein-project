import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import { authSelector } from '../../redux/auth/auth-selectors';
import ROUTES from '../../routers/routes';

import './Profile.scss';

export const Profile = () => {
  const { currentUser } = useSelector(authSelector);
  const { followedBy, following } = currentUser;

  return (
    <>
      <Header />
      <main className="main-container">
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
            <span className="font-medium">0</span>
            <p className="font-light text-xs">SONGS</p>
          </div>
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
