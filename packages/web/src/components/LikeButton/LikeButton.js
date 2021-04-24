import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../redux/auth/auth-selectors';
import { likeSong } from '../../redux/song/song-actions';

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
        likedBy.contains(userId)
          ? 'bx bxs-heart text-2xl'
          : 'bx bx-heart text-2xl'
      }
    />
  );
};

LikeButton.propTypes = {
  likedBy: PropTypes.array.isRequired,
  songId: PropTypes.string.isRequired,
};
