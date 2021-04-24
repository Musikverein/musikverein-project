import React from 'react';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../routers/routes';

import './LibraryNav.scss';

export const LibraryNav = () => {
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
      <NavLink
        to={ROUTES.UPLOAD_SONG}
        className="bx bx-cloud-upload text-3xl library-nav__link ml-auto"
        activeClassName="library-nav__link-active"
      />
    </nav>
  );
};
