import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import Header from '../components/Header';
import LibraryNav from '../components/LibraryNav';
import ProtectedRoute from '../components/ProtectedRoute';
import LibraryPlaylists from '../pages/LibraryPlaylists';
import LibrarySongs from '../pages/LibrarySongs';
import { authSelector } from '../redux/auth/auth-selectors';
import ROUTES from '../routes';

export const LibraryRouter = () => {
  const { isAuthenticated } = useSelector(authSelector);
  return (
    <div>
      <Header />
      <LibraryNav />
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
          component={LibraryPlaylists}
          exact
        />
        {/*        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path={ROUTES.LIBRARY}
          component={}
          exact
        />
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          path={ROUTES.LIBRARY}
          component={}
          exact
        /> */}
        <Redirect to={ROUTES.LIBRARY_SONGS} />
      </Switch>
    </div>
  );
};
