import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { playListSelector } from '../../redux/playList/playList-selectors';
import { authSelector } from '../../redux/auth/auth-selectors';
import { deletePlayList } from '../../redux/libraryPlayList/libraryPlayList-actions';
import Dropdown from '../Dropdown';
import DropdownItem from '../DropdownItem';
import ModalLayout from '../ModalLayout';
import ConfirmText from '../ConfirmText';
import { FollowButton } from '../FollowButton/FollowButton';
import { PlayListForm } from '../PlayListForm/PlayListForm';

export const PlayListCard = ({ playListId }) => {
  const { playLists } = useSelector(playListSelector);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDeletePlayList, setIsDeletePlayList] = useState(false);
  const [isEditPlayList, setIsEditPlayList] = useState(false);
  const {
    currentUser: { _id: userId },
  } = useSelector(authSelector);
  // Falta mostrar si es publica
  const { title, followedBy, owner, type, _id, isPublic } = playLists[
    playListId
  ];

  // const handlePlayPlayList = () => {
  //   dispatch(playPlayList(_id));
  // };

  const handlePlayListEdit = () => {
    setIsEditPlayList(!isEditPlayList);
  };

  const handleRemovePlayList = () => {
    dispatch(deletePlayList(_id));
  };

  const handleSubmitEditForm = (formValues) => {
    dispatch(editMySong({ ...formValues, playListId: _id }));
  };

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleConfirmDeletePlayList = () => {
    setIsDeletePlayList(!isDeletePlayList);
  };

  const handleAddToQueque = () => {};

  return (
    <section className="p-2">
      <div className="p-4 flex space-x-4 card-song">
        {/* <button
          type="button"
          className="w-24 h-24 image-container"
          onClick={handlePlayPlayList}
        >
          <div className="flex items-center justify-center absolute w-24 h-24 img-play">
            <i className="bx bx-play text-4xl" />
          </div>
          <img
            src={image}
            alt=""
            className="w-24 h-24 rounded-4 object-cover "
          />
        </button> */}
        <div className="pr-20 info-container truncate">
          <h2 className="text-lg font-semibold text-light mb-0.5 ">{title}</h2>
          <div className="flex-none w-full mt-0.5 font-normal">
            <dt className="sr-only">Owner</dt>
            <dd>{owner}</dd>
          </div>
          <dl className="flex flex-wrap items-center text-sm font-medium whitespace-pre">
            <div className="pr-4">
              <dt className="sr-only">Type</dt>
              <dd>{type}</dd>
            </div>
            <div className="pr-4">
              <dt className="sr-only">Public</dt>
              <dd>Public</dd>
            </div>
            <div className="pr-4">
              <dt className="sr-only">Follow</dt>
              <dd>{followedBy.length} Followed</dd>
            </div>
            <FollowButton
              followedBy={followedBy}
              playListId={_id}
              text={false}
            />
          </dl>
        </div>

        <button type="button" onClick={handleDropdown}>
          <i className="bx bx-dots-vertical-rounded text-2xl" />
        </button>
        {dropdownOpen && (
          <Dropdown handleClose={handleDropdown} styleNav="dropdown">
            <>
              {owner === userId && (
                <DropdownItem
                  isButton
                  icon="bx-edit-alt"
                  text="Edit"
                  action={handlePlayListEdit}
                />
              )}
              {owner === userId && (
                <DropdownItem
                  isButton
                  icon="bx-trash"
                  text="Remove"
                  action={handleConfirmDeletePlayList}
                />
              )}
              <FollowButton followedBy={followedBy} playListId={_id} text />
              <DropdownItem
                isButton
                icon="bx-list-plus"
                text="Add to queqe"
                action={handleAddToQueque}
              />
            </>
          </Dropdown>
        )}
      </div>
      <ModalLayout isOpen={isEditPlayList} handleClose={handlePlayListEdit}>
        <PlayListForm
          handleSubmit={handleSubmitEditForm}
          playListTitle={title}
          playistType={type}
          playListPublic={isPublic}
        />
      </ModalLayout>
      <ModalLayout
        isOpen={isDeletePlayList}
        handleClose={handleConfirmDeletePlayList}
      >
        <ConfirmText
          handleRemoveSong={handleRemovePlayList}
          onCancel={handleConfirmDeletePlayList}
          title={title}
        />
      </ModalLayout>
    </section>
  );
};

PlayListCard.propTypes = {
  playListId: PropTypes.string.isRequired,
};
