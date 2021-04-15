import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authSelector } from '../../redux/auth/auth-selectors';
import ROUTES from '../../routes';

export const ProfileButton = () => {
  const { currentUser } = useSelector(authSelector);

  return (
    <div>
      <Link to={ROUTES.PROFILE}>
        {currentUser.image ? (
          <img
            src={currentUser.image}
            alt="User profile"
            className="w-10 h-10 rounded-full mx-auto border-2 border-mk-grey"
          />
        ) : (
          <i className="bx bx-user text-4xl" />
        )}
      </Link>
    </div>
  );
};
