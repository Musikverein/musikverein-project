import React from 'react';
import { useSelector } from 'react-redux';
import { Switch } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import UploadSong from '../pages/UploadSong';
import { authSelector } from '../redux/auth/auth-selectors';
import ROUTES from './routes';
import { LibraryRouter } from './LibraryRouter';
import Player from '../components/Player';
import { playerSelector } from '../redux/player/player-selectors';

export const AppRouter = () => {
  const { isAuthenticated } = useSelector(authSelector);
  const { songs, isPlayingSong } = useSelector(playerSelector);
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
          path={ROUTES.PROFILE_EDIT}
          component={ProfileEdit}
          exact
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
      </Switch>
      {isPlayingSong && <Player playList={songs} />}
    </>
  );
};
