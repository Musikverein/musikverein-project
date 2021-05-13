import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/Header';
import { PlayListList } from '../../components/PlayListList/PlayListList';
import SongList from '../../components/SongList';
import { UserList } from '../../components/UserList/UserList';
import { getGenres } from '../../redux/genre/genre-actions';
import {
  getTrendPlayed,
  getTrendPlayLists,
  getTrendSongs,
  getTrendUsers,
} from '../../redux/Home/home-actions';
import { homeSelector } from '../../redux/Home/home-selectors';

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

  return (
    <>
      <Header />
      <main className="main-container">
        <section>
          <h1 className="text-white text-semibold text-lg pb-4">
            Playlists most followed:
          </h1>
          <div className="container-playlist-loader">
            <PlayListList
              loading={isGettingTrendPlayLists}
              playlists={trendPlayLists}
              count={10}
            />
          </div>
        </section>

        <section>
          <h1 className="text-white text-semibold text-lg pb-4">
            Songs most liked:
          </h1>
          <SongList
            loading={isGettingTrendPlayed}
            songs={trendSongs}
            count={10}
          />
        </section>

        <section>
          <h1 className="text-white text-semibold text-lg pb-4">
            Songs most played:
          </h1>
          <SongList
            loading={isGettingTrendSongs}
            songs={trendPlayed}
            count={10}
          />
        </section>

        <section>
          <h1 className="text-white text-semibold text-lg pb-4">
            Users most followed:
          </h1>
          <UserList
            loading={isGettingTrendUsers}
            users={trendUsers}
            count={10}
          />
        </section>
      </main>
    </>
  );
}
