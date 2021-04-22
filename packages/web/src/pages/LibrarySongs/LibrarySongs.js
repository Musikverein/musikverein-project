/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SongCard from '../../components/SongCard';
import { getSongs } from '../../redux/song/song-actions';
import { selectSongState } from '../../redux/song/song-selectors';

const OWN_SONGS = 'ownSongs';
const LIKED_SONGS = 'likedSongs';

export const LibrarySongs = () => {
  const dispatch = useDispatch();
  const { songs } = useSelector(selectSongState);
  const [filter, setFilter] = useState(OWN_SONGS);

  const handleSelect = ({ target }) => {
    setFilter(target.value);
  };

  useEffect(() => {
    dispatch(getSongs());
  }, [filter, dispatch]);

  return (
    <>
      <select className="text-gray-500" value={filter} onChange={handleSelect}>
        <option value={OWN_SONGS}>My songs</option>
        <option value={LIKED_SONGS}>Liked songs</option>
      </select>

      <section>
        {songs.length > 0 &&
          songs.map((song) => <SongCard key={song._id} {...song} />)}
      </section>
    </>
  );
};
