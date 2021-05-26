import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import LibraryPlayLists from '../pages/LibraryPlaylists';
import LibrarySongs from '../pages/LibrarySongs';
import { authSelector } from '../redux/auth/auth-selectors';
import ROUTES from './routes';

export const LibraryRouter = () => {
  const { isAuthenticated } = useSelector(authSelector);
  return (
    <>
      <Switch>
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path={ROUTES.LIBRARY_SONGS}
          component={LibrarySongs}
          exact
        />
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path={ROUTES.LIBRARY_PLAYLISTS}
          component={LibraryPlayLists}
          exact
        />
        <Redirect to={ROUTES.LIBRARY_SONGS} />
      </Switch>
    </>
  );
};
