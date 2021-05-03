import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import {
  resetSearch,
  searchPlayLists,
  searchSongs,
} from '../../redux/search/search-actions';
import { searchSelector } from '../../redux/search/search-selectors';
import Spinner from '../Spinner';
import { songSelector } from '../../redux/song/song-selectors';
import { addSongToPlayList } from '../../redux/libraryPlayList/libraryPlayList-actions';

export const Search = ({ isSearchSong, isSearchPlayList, playListId }) => {
  const dispatch = useDispatch();
  const { formValues, handleInputChange } = useForm({
    search: '',
  });
  const { songs: songsStore } = useSelector(songSelector);
  const [searchSubmit, setSearchSubmit] = useState(false);
  const {
    // isSearchingPlayList,
    isSearchingSong,
    songs,
    // playlists,
  } = useSelector(searchSelector);

  const { search } = formValues;

  useEffect(() => {
    return () => {
      dispatch(resetSearch());
    };
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchSubmit(true);
    if (isSearchSong) {
      dispatch(searchSongs(search));
    }
    /*     if (isSearchPlayList) {
      dispatch(searchPlayLists(search));
    } */
  };
  const handleSubmit = (songId) => {
    dispatch(addSongToPlayList({ playListId, songId }));
  };
  return (
    <>
      <h1 className="text-white text-semibold text-lg pb-4">
        Let&apos;s find something for your playlist
      </h1>
      <form onSubmit={handleSearch} className="pb-4">
        <input
          value={search}
          name="search"
          placeholder="Search..."
          className="p-4 rounded-4"
          onChange={handleInputChange}
        />
        <button type="submit">Submit</button>
      </form>
      {isSearchSong && (
        <>
          <h1 className="text-white text-semibold text-lg pb-4">
            Result of Songs:{' '}
          </h1>
          <section>
            {isSearchingSong && !searchSubmit ? (
              <Spinner />
            ) : (
              songs.length > 0 &&
              songs.map((songId) => (
                <div
                  key={songId}
                  className="flex w-full justify-between p-2 text-white"
                >
                  <h2>{songsStore[songId].title}</h2>
                  <button
                    type="button"
                    onClick={() => handleSubmit(songId)}
                    className="px-4"
                  >
                    +
                  </button>
                </div>
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
      )}
    </>
  );
};

Search.propTypes = {
  isSearchSong: PropTypes.bool.isRequired,
  isSearchPlayList: PropTypes.bool.isRequired,
  playListId: PropTypes.string.isRequired,
};
