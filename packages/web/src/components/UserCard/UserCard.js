import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectUserByIdState } from '../../redux/user/user-selectors';
import ROUTES from '../../routers/routes';
import Spinner from '../Spinner';

export const UserCard = ({ userId }) => {
  const state = useSelector(selectUserByIdState(userId));
  if (!state) {
    return <Spinner />;
  }
  const { image, userName, _id } = state;

  return (
    <section className="flex items-center text-white w-full">
      <img
        className="w-12 h-12 rounded-full border-2 border-mk-magenta object-cover"
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
