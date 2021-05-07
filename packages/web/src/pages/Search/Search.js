import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { searchSelector } from '../../redux/search/search-selectors';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import SongCard from '../../components/SongCard';
import UserCard from '../../components/UserCard';
import PlayListCard from '../../components/PlayListCard';
import { play } from '../../redux/player/player-actions';
import {
  resetSearch,
  searchPlayLists,
  searchSongs,
  searchUsers,
} from '../../redux/search/search-actions';

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

  const handlePlaySong = ({ songId }) => {
    dispatch(play(songId));
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
        <>
          <h1 className="text-white text-semibold text-lg pb-4">
            Result of Playlists:{' '}
          </h1>
          <section>
            {isSearchingPlayList ? (
              <Spinner />
            ) : (
              playlists?.length > 0 &&
              playlists.map((playlistId) => (
                <PlayListCard key={playlistId} playListId={playlistId} />
              ))
            )}
          </section>
        </>

        <>
          <h1 className="text-white text-semibold text-lg pb-4">
            Result of Songs:{' '}
          </h1>
          <section>
            {isSearchingSong ? (
              <Spinner />
            ) : (
              songs?.length > 0 &&
              songs.map((songId) => (
                <SongCard
                  key={songId}
                  songId={songId}
                  handlePlay={() => handlePlaySong({ songId })}
                />
              ))
            )}
          </section>
        </>
        <>
          <h1 className="text-white text-semibold text-lg pb-4">
            Result of Users:{' '}
          </h1>
          <section>
            {isSearchingUser ? (
              <Spinner />
            ) : (
              users?.length > 0 &&
              users.map((userId) => <UserCard key={userId} userId={userId} />)
            )}
          </section>
        </>
      </section>
    </>
  );
};
