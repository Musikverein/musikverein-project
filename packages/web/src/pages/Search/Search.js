import React, { useEffect, useState } from 'react';
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
  const [isSearch, setIsSearch] = useState(false);
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
      setIsSearch(false);
    };
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchSongs(search));
    dispatch(searchPlayLists(search));
    dispatch(searchUsers(search));
    resetForm();
    setIsSearch(true);
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
        {isSearch && (
          <>
            <section>
              <h1 className="text-white text-semibold text-lg pb-4">
                Result of Playlists:{' '}
              </h1>
              <div className="container-playlist-loader">
                <PlayListList
                  loading={isSearchingPlayList}
                  playlists={playlists}
                  count={2}
                />
              </div>
            </section>
            <section>
              <h1 className="text-white text-semibold text-lg pb-4">
                Result of Songs:{' '}
              </h1>
              <SongList loading={isSearchingSong} songs={songs} />
            </section>
            <section>
              <h1 className="text-white text-semibold text-lg pb-4">
                Result of Users:{' '}
              </h1>
              <UserList loading={isSearchingUser} users={users} />
            </section>
          </>
        )}
      </section>
    </>
  );
};
