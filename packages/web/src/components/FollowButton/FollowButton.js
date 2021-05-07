import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { authSelector } from '../../redux/auth/auth-selectors';
import { followPlayList } from '../../redux/libraryPlayList/libraryPlayList-actions';
import { selectUserByIdState } from '../../redux/user/user-selectors';

export const FollowButton = ({ followedBy, playListId, text }) => {
  const { currentUser } = useSelector(authSelector);
  const { _id: userId } = useSelector(selectUserByIdState(currentUser)) || {};
  const dispatch = useDispatch();
  const handleLike = () => {
    dispatch(followPlayList(playListId));
  };

  return (
    <button type="button" onClick={handleLike} className="flex items-center">
      {followedBy.includes(userId) ? (
        <i className="bx bxs-bookmark-plus text-xl" />
      ) : (
        <i className="bx bx-bookmark-plus text-xl" />
      )}
      {text &&
        (followedBy.includes(userId) ? (
          <span className="pl-4">Unfollow</span>
        ) : (
          <span className="pl-4">Follow</span>
        ))}
    </button>
  );
};

FollowButton.propTypes = {
  followedBy: PropTypes.array.isRequired,
  playListId: PropTypes.string.isRequired,
  text: PropTypes.bool.isRequired,
};
