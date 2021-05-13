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
import * as LibrarySongTypes from '../../redux/librarySongs/librarySong-types';
import { LibrarySelect } from '../../components/LibrarySelect/LibrarySelect';
import SongList from '../../components/SongList';

export const LibrarySongs = () => {
  const dispatch = useDispatch();
  const { isGettingSong, userSongs, currentPath } = useSelector(
    librarySongSelector,
  );

  const handleSelect = ({ target }) => {
    dispatch(setCurrentPath(target.value));
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) dispatch(getUserSongs(currentPath));
    return () => {
      mounted = false;
    };
  }, [dispatch, currentPath]);

  return (
    <>
      <Header />
      <main className="main-container">
        <LibraryNav handleShowCreatePlayListModal />
        <LibrarySelect
          selectValue={currentPath}
          title="Song"
          optionMyValue={LibrarySongTypes.USER_SONG_PATH_OWN_SONGS}
          optionLikeValue={LibrarySongTypes.USER_SONG_PATH_LIKED_SONGS}
          handleSelect={handleSelect}
        />
        <section className="library-space p-1">
          <SongList loading={isGettingSong} songs={userSongs} />
        </section>
      </main>
    </>
  );
};
