import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import {
  searchPlayLists,
  searchSongs,
} from '../../redux/search/search-actions';

export const Search = ({ isSearchSong, isSearchPlayList }) => {
  const dispatch = useDispatch();
  const { formValues, handleInputChange } = useForm({
    search: '',
  });

  const { search } = formValues;

  const handleSearch = () => {
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
    </>
  );
};

Search.propTypes = {
  isSearchSong: PropTypes.bool.isRequired,
  isSearchPlayList: PropTypes.bool.isRequired,
};
