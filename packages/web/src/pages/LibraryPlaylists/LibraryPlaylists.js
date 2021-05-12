import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/Header';
import LibraryNav from '../../components/LibraryNav';
import { LibrarySelect } from '../../components/LibrarySelect/LibrarySelect';
import * as LibraryPlayListTypes from '../../redux/libraryPlayList/libraryPlayList-types';
import {
  createPlayList,
  getUserPlayLists,
  setCurrentPath,
} from '../../redux/libraryPlayList/libraryPlayList-actions';
import { userPlayListSelector } from '../../redux/libraryPlayList/libraryPlayList-selectors';
import ModalLayout from '../../components/ModalLayout';
import { PlayListForm } from '../../components/PlayListForm/PlayListForm';
import { PlayListList } from '../../components/PlayListList/PlayListList';

export const LibraryPlayLists = () => {
  const { currentPath, userPlayLists, isGettingUserPlayList } = useSelector(
    userPlayListSelector,
  );
  const [isCreatePlaylist, setIsCreatePlaylist] = useState(false);
  const dispatch = useDispatch();

  const handleSelect = ({ target }) => {
    dispatch(setCurrentPath(target.value));
  };

  const handleShowCreatePlayListModal = useCallback(() => {
    setIsCreatePlaylist((prevState) => !prevState);
  }, [setIsCreatePlaylist]);

  const handleCreatePlayList = async (formValues) => {
    dispatch(createPlayList({ ...formValues }));
  };
  useEffect(() => {
    let mounted = true;
    if (mounted) dispatch(getUserPlayLists(currentPath));
    return () => {
      mounted = false;
    };
  }, [dispatch, currentPath]);

  return (
    <>
      <Header />
      <main className="main-container">
        <LibraryNav
          handleShowCreatePlayListModal={handleShowCreatePlayListModal}
        />
        <LibrarySelect
          selectValue={currentPath}
          title="PlayList"
          optionMyValue={LibraryPlayListTypes.USER_PLAYLIST_PATH_OWN_PLAYLIST}
          optionLikeValue={
            LibraryPlayListTypes.USER_PLAYLIST_PATH_FOLLOW_PLAYLIST
          }
          handleSelect={handleSelect}
        />

        <section className="flex flex-wrap library-space">
          <PlayListList
            loading={isGettingUserPlayList}
            playlists={userPlayLists}
          />
        </section>
        <ModalLayout
          isOpen={isCreatePlaylist}
          handleClose={handleShowCreatePlayListModal}
        >
          <PlayListForm
            handleSubmit={handleCreatePlayList}
            playListTitle=""
            playistType="PlayList"
            playListPublic
            defaultImg=""
            handleClose={handleShowCreatePlayListModal}
          />
        </ModalLayout>
      </main>
    </>
  );
};
