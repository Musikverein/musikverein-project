import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import ROUTES from '../../routers/routes';

import './LibraryNav.scss';

export const LibraryNav = ({ handleShowCreatePlayListModal }) => {
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
          <button
            type="button"
            className="bx bx-plus-circle text-3xl library-nav__link"
            onClick={handleShowCreatePlayListModal}
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

LibraryNav.propTypes = {
  handleShowCreatePlayListModal: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.func,
  ]).isRequired,
};
