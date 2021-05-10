import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { authSelector } from '../../redux/auth/auth-selectors';
import { likeSong } from '../../redux/librarySongs/librarySong-actions';
import { selectUserByIdState } from '../../redux/user/user-selectors';

import './LikeButton.scss';

export const LikeButton = ({ likedBy, songId, text }) => {
  const { currentUser } = useSelector(authSelector);
  const { _id: userId } = useSelector(selectUserByIdState(currentUser)) || {};
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likeSong(songId));
  };
  return (
    <button type="button" onClick={handleLike} className="flex items-center">
      {likedBy.includes(userId) ? (
        <i className="a-icon--heart bx bxs-heart text-xl is-active" />
      ) : (
        <i className="a-icon--heart bx bx-heart text-xl" />
      )}
      {text &&
        (likedBy.includes(userId) ? (
          <span className="pl-4">Dislike</span>
        ) : (
          <span className="pl-4">Like</span>
        ))}
    </button>
  );
};

LikeButton.propTypes = {
  likedBy: PropTypes.array.isRequired,
  songId: PropTypes.string.isRequired,
  text: PropTypes.bool.isRequired,
};
