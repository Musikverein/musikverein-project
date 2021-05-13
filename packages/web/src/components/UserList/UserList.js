import React from 'react';
import PropTypes from 'prop-types';
import SpinnerList from '../placeholder/ListCardSpinner';
import UserCard from '../UserCard';

export const UserList = ({ users, count, loading }) => {
  return (
    <>
      {loading ? (
        <SpinnerList type="User" count={count} />
      ) : (
        users?.length > 0 &&
        users.map((userId) => <UserCard key={userId} userId={userId} />)
      )}
    </>
  );
};

UserList.defaultProps = {
  count: 5,
};

UserList.propTypes = {
  count: PropTypes.number,
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};
