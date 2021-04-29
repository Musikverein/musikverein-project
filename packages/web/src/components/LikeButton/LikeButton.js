import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../redux/auth/auth-selectors';
import { likeSong } from '../../redux/librarySongs/librarySong-actions';

export const LikeButton = ({ likedBy, songId, text }) => {
  const {
    currentUser: { _id: userId },
  } = useSelector(authSelector);
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likeSong(songId));
  };
  return (
    <button type="button" onClick={handleLike} className="flex items-center">
      {likedBy.includes(userId) ? (
        <i className="bx bxs-heart text-xl" />
      ) : (
        <i className="bx bx-heart text-xl" />
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
