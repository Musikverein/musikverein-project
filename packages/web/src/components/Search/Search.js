import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import {
  searchPlayLists,
  searchSongs,
} from '../../redux/search/search-actions';
import { searchSelector } from '../../redux/search/search-selectors';
import Spinner from '../Spinner';
import SongCard from '../SongCard';

export const Search = ({ isSearchSong, isSearchPlayList }) => {
  const dispatch = useDispatch();
  const { formValues, handleInputChange } = useForm({
    search: '',
  });
  const [searchSubmit, setSearchSubmit] = useState(false);
  const {
    isSearchingPlayList,
    isSearchingSong,
    songs,
    playlists,
  } = useSelector(searchSelector);

  const { search } = formValues;

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchSubmit(true);
    if (isSearchSong) {
      dispatch(searchSongs(search));
    }
    if (isSearchPlayList) {
      dispatch(searchPlayLists(search));
    }
  };

  return (
    <>
      <h1 className="text-white text-semibold text-lg pb-4">
        Let&apos;s find something for your playlist
      </h1>
      <form onSubmit={handleSearch}>
        <input
          value={search}
          name="search"
          placeholder="Search..."
          className="p-4 rounded-4"
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      {/* {isSearchSong && (
        <>
          <h1>Result of Songs: </h1>
          <section>
            {isSearchingSong && !searchSubmit ? (
              <Spinner />
            ) : (
              songs.length > 0 &&
              songs.map((songId) => (
                <SongCard
                  key={songId}
                  songId={songId}
                  handlePlay={() => console.log('hola')}
                  isPlaylist={false}
                />
              ))
            )}
          </section>
        </>
      )}
      {isSearchPlayList && (
        <>
          <h1>Result of Playlists: </h1>
          <section>{}</section>
        </>
      )} */}
    </>
  );
};

Search.propTypes = {
  isSearchSong: PropTypes.bool.isRequired,
  isSearchPlayList: PropTypes.bool.isRequired,
};
