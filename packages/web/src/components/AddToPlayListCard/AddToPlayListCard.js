import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { playListSelector } from '../../redux/playList/playList-selectors';

export const AddToPlayListCard = ({ handleSubmit, playListId, songId }) => {
  const { playLists } = useSelector(playListSelector);
  const { title, songs } = playLists[playListId];
  return songs.includes(songId) ? (
    ''
  ) : (
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
