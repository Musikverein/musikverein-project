import React from 'react';
import { NavLink } from 'react-router-dom';
import ROUTES from '../../routes';

export const LibraryNav = () => {
  return (
    <nav className="pt-10">
      <NavLink to={ROUTES.LIBRARY_SONGS}>My songs</NavLink>
      <NavLink to={ROUTES.LIBRARY_PLAYLISTS}>My Playlists</NavLink>
    </nav>
  );
};
