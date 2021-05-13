import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { searchSelector } from '../../redux/search/search-selectors';
import Header from '../../components/Header';
import {
  resetSearch,
  searchPlayLists,
  searchSongs,
  searchUsers,
} from '../../redux/search/search-actions';
import { UserList } from '../../components/UserList/UserList';
import { PlayListList } from '../../components/PlayListList/PlayListList';
import SongList from '../../components/SongList';

export const Search = () => {
  const dispatch = useDispatch();
  const { formValues, handleInputChange, resetForm } = useForm({
    search: '',
  });
  const {
    isSearchingSong,
    songs,
    isSearchingPlayList,
    playlists,
    isSearchingUser,
    users,
  } = useSelector(searchSelector);
  const { search } = formValues;

  useEffect(() => {
    return () => {
      dispatch(resetSearch());
    };
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchSongs(search));
    dispatch(searchPlayLists(search));
    dispatch(searchUsers(search));
    resetForm();
  };

  return (
    <>
      <Header />
      <section className="main-container px-4">
        <form onSubmit={handleSearch} className="py-4 flex items-center">
          <input
            value={search}
            name="search"
            placeholder="Search..."
            className="rounded-4 form__input"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="bx bx-search text-gray-200 text-4xl pl-4"
          />
        </form>
        <section>
          <h1 className="text-white text-semibold text-lg pb-4">
            Result of Playlists:{' '}
          </h1>
          <div className="flex">
            <PlayListList loading={isSearchingPlayList} playlists={playlists} />
          </div>
        </section>
        <h1 className="text-white text-semibold text-lg pb-4">
          Result of Songs:{' '}
        </h1>
        <SongList loading={isSearchingSong} songs={songs} />
        <h1 className="text-white text-semibold text-lg pb-4">
          Result of Users:{' '}
        </h1>
        <UserList loading={isSearchingUser} users={users} />
      </section>
    </>
  );
};
