/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './LibrarySongs.scss';

import Header from '../../components/Header';
import LibraryNav from '../../components/LibraryNav';
import SongCard from '../../components/SongCard';
import { getSongs } from '../../redux/song/song-actions';
import { songSelector } from '../../redux/song/song-selectors';
import Spinner from '../../components/Spinner';

const OWN_SONGS = 'ownSongs';
const LIKED_SONGS = 'likedSongs';

export const LibrarySongs = () => {
  const dispatch = useDispatch();
  const { songs, isGettingSong } = useSelector(songSelector);
  const [filter, setFilter] = useState(OWN_SONGS);

  const handleSelect = ({ target }) => {
    setFilter(target.value);
  };

  useEffect(() => {
    dispatch(getSongs());
  }, [filter, dispatch]);

  return (
    <>
      <Header />
      <LibraryNav />
      <main className="main-container-library">
        <div className="library-select">
          <select value={filter} onChange={handleSelect} className="rounded-4">
            <option value={OWN_SONGS}>My songs</option>
            <option value={LIKED_SONGS}>Liked songs</option>
          </select>
        </div>

        <section className="bg__primary">
          {isGettingSong ? (
            <Spinner />
          ) : (
            songs.length > 0 &&
            songs.map((song) => <SongCard key={song._id} {...song} />)
          )}
        </section>
      </main>
    </>
  );
};
