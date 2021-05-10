/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { librarySongSelector } from '../../redux/librarySongs/librarySong-selectors';
import { play } from '../../redux/player/player-actions';
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

  const handlePlaySong = ({ songId }) => {
    dispatch(play(songId));
  };

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
          {isGettingSong ? (
            <Spinner />
          ) : (
            userSongs.length > 0 &&
            userSongs.map((songId) => (
              <SongCard
                key={songId}
                songId={songId}
                handlePlay={() => handlePlaySong({ songId })}
                playListId=""
              />
            ))
          )}
        </section>
      </main>
    </>
  );
};
