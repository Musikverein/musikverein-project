import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/Header';
import LibraryNav from '../../components/LibraryNav';
import { LibrarySelect } from '../../components/LibrarySelect/LibrarySelect';
import * as LibraryPlayListTypes from '../../redux/libraryPlayList/libraryPlayList-types';
import { setCurrentPath } from '../../redux/libraryPlayList/libraryPlayList-actions';
import { userPlayListSelector } from '../../redux/libraryPlayList/libraryPlayList-selectors';
import { Spinner } from '../../components/Spinner/Spinner';
import PlaylistCard from '../../components/PlaylistCard';

export const LibraryPlaylists = () => {
  const { currentPath, userPlaylists, isGettingPlaylist } = useSelector(
    userPlayListSelector,
  );
  const dispatch = useDispatch();

  const handleSelect = ({ target }) => {
    dispatch(setCurrentPath(target.value));
  };
  return (
    <>
      <Header />
      <LibraryNav />
      <main className="main-container-library">
        <LibrarySelect
          value={currentPath}
          title="Playlist"
          optionMyValue={LibraryPlayListTypes.USER_PLAYLIST_PATH_OWN_PLAYLIST}
          optionLikeValue={
            LibraryPlayListTypes.USER_PLAYLIST_PATH_FOLLOW_PLAYLIST
          }
          handleSelect={handleSelect}
        />

        {/*       <section className="bg__primary">
          {isGettingPlaylist ? (
            <Spinner />
          ) : (
            userPlaylists.length > 0 &&
            userPlaylists.map((playlistId) => (
              <PlaylistCard key={playlistId} playlistId={playlistId} />
            ))
          )}
        </section> */}
      </main>
    </>
  );
};
