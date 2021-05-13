import React, { useEffect, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {
  deletePlayList,
  editUserPlayList,
  followPlayList,
  getPlayList,
  getPlayListAndPlay,
  updateOrderPlayList,
} from '../../redux/libraryPlayList/libraryPlayList-actions';
import { selectPlayListByIdState } from '../../redux/playList/playList-selectors';
import { userPlayListSelector } from '../../redux/libraryPlayList/libraryPlayList-selectors';
import { SongCard } from '../../components/SongCard/SongCard';
import { authSelector } from '../../redux/auth/auth-selectors';
import ModalLayout from '../../components/ModalLayout';
import { PlayListForm } from '../../components/PlayListForm/PlayListForm';
import ConfirmText from '../../components/ConfirmText';
import ROUTES from '../../routers/routes';
import Spinner from '../../components/Spinner';

import './PlayList.scss';
import { selectUserByIdState } from '../../redux/user/user-selectors';
import { HeaderGoBack } from '../../components/HeaderGoBack/HeaderGoBack';
import { AddSongSearch } from '../../components/AddSongSearch/AddSongSearch';
import Header from '../../components/Header';
import ModalMenuOptions from '../../components/ModalMenuOptions';
import ModalMenuOptionsItem from '../../components/ModalMenuOptionsItem';

export const PlayList = () => {
  const { playListId } = useParams();
  const dispatch = useDispatch();

  const [isEditPlayList, setIsEditPlayList] = useState(false);
  const [isDeletePlayList, setIsDeletePlayList] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [menuOptionOpen, setMenuOptionOpen] = useState(false);

  const { isGettingPlayList } = useSelector(userPlayListSelector);
  const state = useSelector(selectPlayListByIdState(playListId));
  const { userName } = useSelector(selectUserByIdState(state?.owner)) || {};
  const { currentUser } = useSelector(authSelector);
  const { _id: userId } = useSelector(selectUserByIdState(currentUser)) || {};

  useEffect(() => {
    dispatch(getPlayList(playListId));
  }, [dispatch, playListId]);

  if (!state) {
    return <Spinner />;
  }

  const { title, owner, isPublic, songs, type, image, followedBy } = state;

  if (owner !== userId && !isPublic) {
    return <Redirect to={ROUTES.LIBRARY_PLAYLISTS} />;
  }

  const handlePlayPlayList = ({ songId = null }) => {
    dispatch(getPlayListAndPlay({ playListId, songId }));
  };

  const handlePlayListEdit = () => {
    setIsEditPlayList(!isEditPlayList);
  };
  const handleRemovePlayList = () => {
    dispatch(deletePlayList(playListId));
  };
  const handleConfirmDeletePlayList = () => {
    setIsDeletePlayList(!isDeletePlayList);
  };
  const handleSubmitEditForm = (formValues) => {
    dispatch(editUserPlayList({ ...formValues, playListId }));
  };

  const handleFollowPlayList = () => {
    dispatch(followPlayList(playListId));
  };

  const handleMenuOption = () => {
    setMenuOptionOpen(!menuOptionOpen);
  };

  const handleSearch = () => {
    setIsSearching(!isSearching);
  };
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(songs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(updateOrderPlayList({ songs: items, playListId }));
  };
  return (
    <>
      <Header isHidden />
      <main className="main-container">
        {isGettingPlayList ? (
          <Spinner />
        ) : (
          <>
            <HeaderGoBack>
              <>
                {userId !== owner && (
                  <button type="button" onClick={handleFollowPlayList}>
                    {followedBy?.includes(userId) ? 'Unfollow' : 'Follow'}
                  </button>
                )}
                {userId === owner && (
                  <button
                    type="button"
                    className="pl-4 "
                    onClick={handleMenuOption}
                  >
                    <i className="bx bx-dots-vertical-rounded text-2xl" />
                  </button>
                )}
              </>
            </HeaderGoBack>
            <div className="flex flex-col mb-2 items-center playlist">
              <img src={image} alt="playlist" className="playlist-img" />
              <h2 className="text-title-h2 pt-4 pt-2">{title}</h2>
              <div className="flex justify-center text-dd mt-2">
                <p className="px-2">
                  {type} of
                  <Link
                    to={`${ROUTES.USER_WITHOUT_PARAM}${owner}`}
                    className="hover:underline"
                  >
                    {' '}
                    {userName}{' '}
                  </Link>
                </p>
                <p className="px-2">{isPublic ? 'Public' : 'Private'}</p>
                <p className="px-2">{followedBy?.length} Follows</p>
              </div>
            </div>

            <div className="playlist-songs">
              <button
                type="button"
                className="images-shadow m-auto playlist-button-play flex items-center justify-content"
                onClick={handlePlayPlayList}
              >
                <i className="bx bx-play text-4xl " />
              </button>
              <DragDropContext
                onDragEnd={handleOnDragEnd}
                enableDefaultSensors={userId === owner}
              >
                <Droppable droppableId="songs">
                  {(provided) => (
                    <ul
                      className="songs"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {songs.map((song, index) => (
                        <Draggable key={song} draggableId={song} index={index}>
                          {(prov) => (
                            <li
                              key={song}
                              ref={prov.innerRef}
                              {...prov.draggableProps}
                              {...prov.dragHandleProps}
                            >
                              <SongCard
                                key={song}
                                songId={song}
                                handlePlay={() =>
                                  handlePlayPlayList({ songId: song })
                                }
                                playListId={playListId}
                                ownerPlayList={owner}
                              />
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
            <ModalLayout
              isOpen={isEditPlayList}
              handleClose={handlePlayListEdit}
            >
              <PlayListForm
                playListTitle={title}
                playistType={type}
                playListPublic={isPublic}
                defaultImg={image}
                handleSubmit={handleSubmitEditForm}
                handleClose={handlePlayListEdit}
              />
            </ModalLayout>
            <ModalLayout
              isOpen={isDeletePlayList}
              handleClose={handleConfirmDeletePlayList}
            >
              <ConfirmText
                handleRemove={handleRemovePlayList}
                onCancel={handleConfirmDeletePlayList}
                title={title}
              />
            </ModalLayout>
            <ModalLayout isOpen={isSearching} handleClose={handleSearch}>
              <AddSongSearch
                isSearchSong
                isSearchPlayList={false}
                playListId={playListId}
              />
            </ModalLayout>

            <ModalMenuOptions
              isOpen={menuOptionOpen}
              handleClose={handleMenuOption}
            >
              <>
                {owner === userId && (
                  <ModalMenuOptionsItem
                    isButton
                    icon="bx-edit-alt"
                    text="Edit Playlist"
                    action={handlePlayListEdit}
                    handleClose={handleMenuOption}
                  />
                )}
                {owner === userId && (
                  <ModalMenuOptionsItem
                    isButton
                    icon="bx-trash"
                    text="Remove Playlist"
                    action={handleConfirmDeletePlayList}
                    handleClose={handleMenuOption}
                  />
                )}
                <ModalMenuOptionsItem
                  isButton
                  icon="bx-list-plus"
                  text="Add new songs"
                  action={handleSearch}
                  handleClose={handleMenuOption}
                />
              </>
            </ModalMenuOptions>
          </>
        )}
      </main>
    </>
  );
};
