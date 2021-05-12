import React from 'react';
import PropTypes from 'prop-types';
import SpinnerList from '../placeholder/ListCardSpinner';
import PlayListCard from '../PlayListCard';

export const PlayListList = ({ loading, playlists, count }) => {
  return (
    <>
      {loading ? (
        <SpinnerList type="Playlist" count={count} />
      ) : (
        playlists?.length > 0 &&
        playlists.map((playlistId) => (
          <PlayListCard key={playlistId} playListId={playlistId} />
        ))
      )}
    </>
  );
};

PlayListList.defaultProps = {
  count: 5,
};

PlayListList.propTypes = {
  count: PropTypes.number,
  playlists: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};
