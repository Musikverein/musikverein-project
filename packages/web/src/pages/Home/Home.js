import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/Header';
import PlayListCard from '../../components/PlayListCard';
import SongCard from '../../components/SongCard';
import Spinner from '../../components/Spinner';
import UserCard from '../../components/UserCard';
import { getGenres } from '../../redux/genre/genre-actions';
import {
  getTrendPlayed,
  getTrendPlayLists,
  getTrendSongs,
  getTrendUsers,
} from '../../redux/Home/home-actions';
import { homeSelector } from '../../redux/Home/home-selectors';
import { play } from '../../redux/player/player-actions';

import './Home.scss';

export function Home() {
  const dispatch = useDispatch();
  const {
    isGettingTrendSongs,
    isGettingTrendPlayLists,
    isGettingTrendUsers,
    isGettingTrendPlayed,
    trendSongs,
    trendPlayLists,
    trendUsers,
    trendPlayed,
  } = useSelector(homeSelector) || {};

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      dispatch(getGenres());
      dispatch(getTrendSongs());
      dispatch(getTrendPlayLists());
      dispatch(getTrendUsers());
      dispatch(getTrendPlayed());
    }
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const handlePlaySong = ({ songId }) => {
    dispatch(play(songId));
  };

  return (
    <>
      <Header />
      <main className="main-container">
        <section>
          <h1 className="text-white text-semibold text-lg pb-4">
            Playlists most followed:
          </h1>
          <div>
            {isGettingTrendPlayLists ? (
              <Spinner />
            ) : (
              trendPlayLists?.length > 0 &&
              trendPlayLists.map((playlistId) => (
                <PlayListCard key={playlistId} playListId={playlistId} />
              ))
            )}
          </div>
        </section>

        <section>
          <h1 className="text-white text-semibold text-lg pb-4">
            Songs most liked:
          </h1>
          <div>
            {isGettingTrendPlayed ? (
              <Spinner />
            ) : (
              trendSongs?.length > 0 &&
              trendSongs.map((songId) => (
                <SongCard
                  key={songId}
                  songId={songId}
                  handlePlay={() => handlePlaySong({ songId })}
                />
              ))
            )}
          </div>
        </section>

        <section>
          <h1 className="text-white text-semibold text-lg pb-4">
            Songs most played:
          </h1>
          <div>
            {isGettingTrendSongs ? (
              <Spinner />
            ) : (
              trendPlayed?.length > 0 &&
              trendPlayed.map((songId) => (
                <SongCard
                  key={songId}
                  songId={songId}
                  handlePlay={() => handlePlaySong({ songId })}
                />
              ))
            )}
          </div>
        </section>

        <section>
          <h1 className="text-white text-semibold text-lg pb-4">
            Users most followed:
          </h1>
          <div>
            {isGettingTrendUsers ? (
              <Spinner />
            ) : (
              trendUsers?.length > 0 &&
              trendUsers.map((userId) => (
                <UserCard key={userId} userId={userId} />
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
}
