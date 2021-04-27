import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../redux/auth/auth-selectors';
import { likeSong } from '../../redux/librarySongs/librarySong-actions';

export const LikeButton = ({ likedBy, songId }) => {
  const {
    currentUser: { _id: userId },
  } = useSelector(authSelector);
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(likeSong(songId));
  };
  return (
    <button
      type="button"
      onClick={handleLike}
      className={
        likedBy.includes(userId)
          ? 'bx bxs-heart text-xl'
          : 'bx bx-heart text-xl'
      }
    />
  );
};

LikeButton.propTypes = {
  likedBy: PropTypes.array.isRequired,
  songId: PropTypes.string.isRequired,
};
