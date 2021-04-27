/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mySongSelector } from '../../redux/mySongs/mySong-selectors';
import { getMySongs, setCurrentPath } from '../../redux/mySongs/mySong-actions';

import './LibrarySongs.scss';

import Header from '../../components/Header';
import LibraryNav from '../../components/LibraryNav';
import SongCard from '../../components/SongCard';
import Spinner from '../../components/Spinner';
import * as MySongTypes from '../../redux/mySongs/mySong-types';

export const LibrarySongs = () => {
  const dispatch = useDispatch();
  const { isGettingSong, mySongs, currentPath } = useSelector(mySongSelector);

  const handleSelect = ({ target }) => {
    dispatch(setCurrentPath(target.value));
  };

  useEffect(() => {
    dispatch(getMySongs(currentPath));
  }, [dispatch, currentPath]);

  return (
    <>
      <Header />
      <LibraryNav />
      <main className="main-container-library">
        <div className="library-select">
          <select
            value={currentPath}
            onChange={handleSelect}
            className="rounded-4"
          >
            <option value={MySongTypes.MY_SONG_PATH_OWN_SONGS}>My songs</option>
            <option value={MySongTypes.MY_SONG_PATH_LIKED_SONGS}>
              Liked songs
            </option>
          </select>
        </div>

        <section className="bg__primary">
          {isGettingSong ? (
            <Spinner />
          ) : (
            mySongs.length > 0 &&
            mySongs.map((songId) => <SongCard key={songId} songId={songId} />)
          )}
        </section>
      </main>
    </>
  );
};
