import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { play } from '../../redux/player/player-actions';
import SpinnerList from '../placeholder/ListCardSpinner';
import SongCard from '../SongCard';

export const SongList = ({ loading, count, songs, handlePlay }) => {
  const dispatch = useDispatch();

  const handleSongPlayDefault = ({ songId }) => {
    dispatch(play(songId));
  };

  return (
    <>
      {loading ? (
        <SpinnerList count={count} />
      ) : (
        songs?.length > 0 &&
        songs.map((songId) => (
          <SongCard
            key={songId}
            songId={songId}
            handlePlay={
              handlePlay
                ? () => handlePlay({ songId })
                : () => handleSongPlayDefault({ songId })
            }
          />
        ))
      )}
    </>
  );
};

SongList.defaultProps = {
  count: 5,
  handlePlay: false,
};

SongList.propTypes = {
  count: PropTypes.number,
  songs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  handlePlay: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};
