import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { selectPlayListByIdState } from '../../redux/playList/playList-selectors';

export const AddToPlayListCard = ({ handleSubmit, playListId, songId }) => {
  const playList = useSelector(selectPlayListByIdState(playListId));

  if (!playList) {
    return null;
  }

  const { title, songs } = playList;

  return songs.includes(songId) ? null : (
    <div className="flex w-full justify-between p-2">
      <h2>{title}</h2>
      <button type="button" onClick={handleSubmit} className="px-4">
        +
      </button>
    </div>
  );
};

AddToPlayListCard.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  playListId: PropTypes.string.isRequired,
  songId: PropTypes.string.isRequired,
};
