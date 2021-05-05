import React from 'react';
import { useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import UploadSong from '../pages/UploadSong';
import { authSelector } from '../redux/auth/auth-selectors';
import ROUTES from './routes';
import { LibraryRouter } from './LibraryRouter';
import Player from '../components/Player';
import { playerSelector } from '../redux/player/player-selectors';
import PlayList from '../pages/PlayList';

export const AppRouter = () => {
  const { isAuthenticated } = useSelector(authSelector);
  const { playingNow } = useSelector(playerSelector);
  return (
    <>
      <Switch>
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path={ROUTES.LIBRARY}
          component={LibraryRouter}
        />

        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path={ROUTES.PROFILE}
          component={Profile}
          exact
        />

        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path={ROUTES.HOME}
          component={Home}
          exact
        />

        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path={ROUTES.SONG_UPLOAD}
          component={UploadSong}
          exact
        />

        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path={ROUTES.PLAYLIST}
          component={PlayList}
          exact
        />
      </Switch>
      {playingNow && <Player />}
    </>
  );
};
