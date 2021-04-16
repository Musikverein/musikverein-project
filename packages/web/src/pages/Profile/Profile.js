import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

import { authSelector } from '../../redux/auth/auth-selectors';
import ROUTES from '../../routes';

export const Profile = () => {
  const { currentUser } = useSelector(authSelector);
  const { followedBy, following } = currentUser;

  return (
    <div>
      <Header />
      <div className="pt-16 text-center">
        <img
          src={currentUser.image}
          className="w-32 h-32 rounded-full mx-auto border-2 border-mk-magenta"
          alt="profile"
        />
        <h3 className="font-medium mt-4 mb-2">
          {currentUser.userName || 'Complete your profile'}
        </h3>
        <Link
          to={ROUTES.PROFILE_EDIT}
          className="rounded-md p-1.5 border font-light text-sm border-mk-magenta mt-2"
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
    </div>
  );
};
