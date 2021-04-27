/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { librarySongSelector } from '../../redux/librarySongs/librarySong-selectors';
import {
  getUserSongs,
  setCurrentPath,
} from '../../redux/librarySongs/librarySong-actions';

import Header from '../../components/Header';
import LibraryNav from '../../components/LibraryNav';
import SongCard from '../../components/SongCard';
import Spinner from '../../components/Spinner';
import * as LibrarySongTypes from '../../redux/librarySongs/librarySong-types';
import { LibrarySelect } from '../../components/LibrarySelect/LibrarySelect';

export const LibrarySongs = () => {
  const dispatch = useDispatch();
  const { isGettingSong, userSongs, currentPath } = useSelector(
    librarySongSelector,
  );

  const handleSelect = ({ target }) => {
    dispatch(setCurrentPath(target.value));
  };

  useEffect(() => {
    dispatch(getUserSongs(currentPath));
  }, [dispatch, currentPath]);

  return (
    <>
      <Header />
      <LibraryNav />
      <main className="main-container-library">
        <LibrarySelect
          selectValue={currentPath}
          title="Song"
          optionMyValue={LibrarySongTypes.USER_SONG_PATH_OWN_SONGS}
          optionLikeValue={LibrarySongTypes.USER_SONG_PATH_LIKED_SONGS}
          handleSelect={handleSelect}
        />
        <section className="bg__primary">
          {isGettingSong ? (
            <Spinner />
          ) : (
            userSongs.length > 0 &&
            userSongs.map((songId) => <SongCard key={songId} songId={songId} />)
          )}
        </section>
      </main>
    </>
  );
};
