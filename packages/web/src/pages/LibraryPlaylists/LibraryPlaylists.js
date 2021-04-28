import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/Header';
import LibraryNav from '../../components/LibraryNav';
import { LibrarySelect } from '../../components/LibrarySelect/LibrarySelect';
import * as LibraryPlayListTypes from '../../redux/libraryPlayList/libraryPlayList-types';
import {
  getUserPlayLists,
  setCurrentPath,
} from '../../redux/libraryPlayList/libraryPlayList-actions';
import { userPlayListSelector } from '../../redux/libraryPlayList/libraryPlayList-selectors';
import { Spinner } from '../../components/Spinner/Spinner';
import PlayListCard from '../../components/PlayListCard';

export const LibraryPlayLists = () => {
  const { currentPath, userPlayLists, isGettingPlayList } = useSelector(
    userPlayListSelector,
  );
  const dispatch = useDispatch();

  const handleSelect = ({ target }) => {
    dispatch(setCurrentPath(target.value));
  };

  useEffect(() => {
    dispatch(getUserPlayLists(currentPath));
  }, [dispatch, currentPath]);

  return (
    <>
      <Header />
      <LibraryNav />
      <main className="main-container-library">
        <LibrarySelect
          selectValue={currentPath}
          title="PlayList"
          optionMyValue={LibraryPlayListTypes.USER_PLAYLIST_PATH_OWN_PLAYLIST}
          optionLikeValue={
            LibraryPlayListTypes.USER_PLAYLIST_PATH_FOLLOW_PLAYLIST
          }
          handleSelect={handleSelect}
        />

        <section className="bg__primary">
          {isGettingPlayList ? (
            <Spinner />
          ) : (
            userPlayLists.length > 0 &&
            userPlayLists.map((playListId) => (
              <PlayListCard key={playListId} playListId={playListId} />
            ))
          )}
        </section>
      </main>
    </>
  );
};
