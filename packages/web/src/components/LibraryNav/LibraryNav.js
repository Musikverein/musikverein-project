import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ROUTES from '../../routers/routes';

import './LibraryNav.scss';

export const LibraryNav = () => {
  const location = useLocation();
  return (
    <nav className="library-nav">
      <NavLink
        to={ROUTES.LIBRARY_SONGS}
        className="library-nav__link"
        activeClassName="library-nav__link-active"
      >
        My songs
      </NavLink>
      <NavLink
        to={ROUTES.LIBRARY_PLAYLISTS}
        className="library-nav__link"
        activeClassName="library-nav__link-active"
      >
        My Playlists
      </NavLink>
      <div className="ml-auto">
        {location.pathname === ROUTES.LIBRARY_PLAYLISTS && (
          <NavLink
            to={ROUTES.PLAYLIST_CREATE}
            className="bx bx-plus-circle text-3xl library-nav__link"
            activeClassName="library-nav__link-active"
          />
        )}
        <NavLink
          to={ROUTES.SONG_UPLOAD}
          className="bx bx-cloud-upload text-3xl library-nav__link"
          activeClassName="library-nav__link-active"
        />
      </div>
    </nav>
  );
};
