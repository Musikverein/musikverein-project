import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectUserByIdState } from '../../redux/user/user-selectors';
import ROUTES from '../../routers/routes';
import UserCardSpinner from '../placeholder/UserCardSpinner';

export const UserCard = ({ userId }) => {
  const state = useSelector(selectUserByIdState(userId));
  if (!state) {
    return <UserCardSpinner />;
  }

  const { image, userName, _id } = state;

  return (
    <section className="flex items-center text-white w-full py-4">
      <img
        className="w-12 h-12 rounded-full images-shadow object-cover"
        alt="profile"
        src={image}
      />
      <Link to={`${ROUTES.USER_WITHOUT_PARAM}${userId}`}>
        <h2 className="font-semibold pl-4">
          {userName || _id.substring(0, 6).toUpperCase()}
        </h2>
      </Link>
    </section>
  );
};

UserCard.propTypes = {
  userId: PropTypes.string.isRequired,
};
