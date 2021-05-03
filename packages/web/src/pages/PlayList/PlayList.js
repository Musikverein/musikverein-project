import React, { useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Header from '../../components/Header';
import {
  deletePlayList,
  editUserPlayList,
  followPlayList,
  getPlayList,
  updateOrderPlayList,
} from '../../redux/libraryPlayList/libraryPlayList-actions';
import { selectPlayListByIdState } from '../../redux/playList/playList-selectors';
import { userPlayListSelector } from '../../redux/libraryPlayList/libraryPlayList-selectors';
import { SongCard } from '../../components/SongCard/SongCard';
import { playPlayList } from '../../redux/player/player-actions';
import { authSelector } from '../../redux/auth/auth-selectors';
import Dropdown from '../../components/Dropdown';
import DropdownItem from '../../components/DropdownItem';
import ModalLayout from '../../components/ModalLayout';
import { PlayListForm } from '../../components/PlayListForm/PlayListForm';
import ConfirmText from '../../components/ConfirmText';
import ROUTES from '../../routers/routes';
import Spinner from '../../components/Spinner';
import { Search } from '../../components/Search/Search';

import './PlayList.scss';

export const PlayList = () => {
  const { playListId } = useParams();
  const dispatch = useDispatch();

  const history = useHistory();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEditPlayList, setIsEditPlayList] = useState(false);
  const [isDeletePlayList, setIsDeletePlayList] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const { isGettingPlayList } = useSelector(userPlayListSelector);
  const state = useSelector(selectPlayListByIdState(playListId));
  const {
    currentUser: { _id: userId },
  } = useSelector(authSelector);

  useEffect(() => {
    dispatch(getPlayList(playListId));
  }, [dispatch, playListId]);

  if (!state || (state?.owner !== userId && !state?.isPublic)) {
    return <Redirect to={ROUTES.LIBRARY_PLAYLISTS} />;
  }

  const { title, owner, isPublic, songs, type, image, followedBy } = state;

  const handlePlayPlayList = ({ songId = null }) => {
    const songIndex = songId ? songs.indexOf(songId) : 0;
    dispatch(playPlayList({ songs, songIndex }));
  };

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
      <Header />
      <main className="main-container">
        {isGettingPlayList ? (
          <Spinner />
        ) : (
          <>
            <div className="h-8 w-full flex justify-end items-center mt-4">
              <button
                type="button"
                className="absolute left-0 px-4 bx bxs-chevron-left text-4xl"
                onClick={() => history.goBack()}
              />
              <button type="button" onClick={handleFollowPlayList}>
                {followedBy.includes(userId) ? 'Unfollow' : 'Follow'}
              </button>
              {userId === owner && (
                <button type="button" className="px-4" onClick={handleDropdown}>
                  <i className="bx bx-dots-vertical-rounded text-2xl" />
                </button>
              )}
              {dropdownOpen && (
                <Dropdown handleClose={handleDropdown} styleNav="dropdown">
                  <>
                    <DropdownItem
                      isButton
                      icon="bx-edit-alt"
                      text="Edit Playlist"
                      action={handlePlayListEdit}
                    />
                    <DropdownItem
                      isButton
                      icon="bx-trash"
                      text="Remove Playlist"
                      action={handleConfirmDeletePlayList}
                    />
                    <DropdownItem
                      isButton
                      icon="bx-list-plus"
                      text="Add new songs"
                      action={handleSearch}
                    />
                  </>
                </Dropdown>
              )}
            </div>
            <div className="flex flex-col pt-8 items-center playlist">
              <img src={image} alt="playlist" className="playlist-img" />
              <h2 className="text-lg font-semibold text-light pt-4 pt-2">
                {title}
              </h2>
              <div className="flex justify-center text-sm text-gray-200">
                <p className="px-2">{type} of Manolo</p>
                <p className="px-2">{isPublic ? 'Public' : 'Private'}</p>
                <p className="px-2">{followedBy.length} Follows</p>
              </div>
              <button
                type="button"
                className="absolute playlist-button-play flex items-center justify-content"
                onClick={handlePlayPlayList}
              >
                <i className="bx bx-play text-4xl " />
              </button>
            </div>
            <br />
            <hr />
            <div className="playlist-songs">
              <DragDropContext onDragEnd={handleOnDragEnd}>
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
              <Search
                isSearchSong
                isSearchPlayList={false}
                playListId={playListId}
              />
            </ModalLayout>
          </>
        )}
      </main>
    </>
  );
};
