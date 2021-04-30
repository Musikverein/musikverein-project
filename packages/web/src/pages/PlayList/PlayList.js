import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './PlayList.scss';

import Header from '../../components/Header';
import { getPlayList } from '../../redux/libraryPlayList/libraryPlayList-actions';
import { selectPlayListByIdState } from '../../redux/playList/playList-selectors';
import { SongCard } from '../../components/SongCard/SongCard';
import { playPlayList } from '../../redux/player/player-actions';

export const PlayList = () => {
  const { playListId } = useParams();
  const dispatch = useDispatch();
  const {
    title,
    owner,
    isPublic,
    songs,
    type,
    image,
    followedBy,
  } = useSelector(selectPlayListByIdState(playListId));

  useEffect(() => {
    dispatch(getPlayList(playListId));
  }, [dispatch, playListId]);

  const handlePlayPlayList = ({ songIndex = 0 }) => {
    dispatch(playPlayList({ songs, songIndex }));
  };

  return (
    <>
      <Header />
      <main className="main-container">
        <div className="flex flex-col pt-4 items-center">
          <img src={image} alt="playlist" />
          <h2>{title}</h2>
          <p>
            {type} de {owner}
          </p>
          <p>{isPublic ? 'Public' : 'Private'}</p>
          <p>{followedBy.length} Follows</p>
          <button
            type="button"
            className="bx bx-play-circle text-4xl"
            onClick={handlePlayPlayList}
          />
        </div>
        <br />
        <hr />
        <div className="playlist-songs">
          {songs.map((song) => (
            <SongCard key={song} songId={song} />
          ))}
        </div>
      </main>
    </>
  );
};
