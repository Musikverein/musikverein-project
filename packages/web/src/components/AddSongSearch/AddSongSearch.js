import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { resetSearch, searchSongs } from '../../redux/search/search-actions';
import { searchSelector } from '../../redux/search/search-selectors';
import Spinner from '../Spinner';
import { songSelector } from '../../redux/song/song-selectors';
import { addSongToPlayList } from '../../redux/libraryPlayList/libraryPlayList-actions';

export const AddSongSearch = ({ playListId }) => {
  const dispatch = useDispatch();
  const { formValues, handleInputChange } = useForm({
    search: '',
  });
  const { songs: songsStore } = useSelector(songSelector);
  const { isSearchingSong, songs } = useSelector(searchSelector);

  const { search } = formValues;

  useEffect(() => {
    return () => {
      dispatch(resetSearch());
    };
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchSongs(search));
  };
  const handleSubmit = (songId) => {
    dispatch(addSongToPlayList({ playListId, songId }));
  };
  return (
    <>
      <h1 className="text-white text-semibold text-lg pb-4">
        Let&apos;s find something for your playlist
      </h1>
      <form onSubmit={handleSearch} className="pb-4 flex items-center">
        <input
          value={search}
          name="search"
          placeholder="Search..."
          className="form__input rounded-4"
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bx bx-search text-gray-200 text-4xl pl-4"
        />
      </form>

      <>
        <h1 className="text-white text-semibold text-lg pb-4">
          Result of Songs:{' '}
        </h1>
        <section>
          {isSearchingSong ? (
            <Spinner />
          ) : (
            songs.length > 0 &&
            songs.map((songId) => (
              <div
                key={songId}
                className="flex w-full justify-between p-2 text-white"
              >
                <h2>{songsStore[songId]?.title}</h2>
                <button
                  type="button"
                  onClick={() => handleSubmit(songId)}
                  className="px-4 bx bx-plus"
                />
              </div>
            ))
          )}
        </section>
      </>
    </>
  );
};

AddSongSearch.propTypes = {
  playListId: PropTypes.string.isRequired,
};
