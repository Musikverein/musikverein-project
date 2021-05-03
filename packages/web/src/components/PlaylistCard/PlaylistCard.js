import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { playListSelector } from '../../redux/playList/playList-selectors';
import { authSelector } from '../../redux/auth/auth-selectors';
import {
  deletePlayList,
  editUserPlayList,
} from '../../redux/libraryPlayList/libraryPlayList-actions';
import Dropdown from '../Dropdown';
import DropdownItem from '../DropdownItem';
import ModalLayout from '../ModalLayout';
import ConfirmText from '../ConfirmText';
import { FollowButton } from '../FollowButton/FollowButton';
import { PlayListForm } from '../PlayListForm/PlayListForm';
import ROUTES from '../../routers/routes';
import { playPlayList } from '../../redux/player/player-actions';

import './PlayListCard.scss';

export const PlayListCard = ({ playListId }) => {
  const { playLists } = useSelector(playListSelector);
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDeletePlayList, setIsDeletePlayList] = useState(false);
  const [isEditPlayList, setIsEditPlayList] = useState(false);
  const {
    currentUser: { _id: userId },
  } = useSelector(authSelector);

  const {
    title,
    followedBy,
    owner,
    type,
    _id,
    isPublic,
    image,
    songs,
  } = playLists[playListId];

  const handlePlayPlayList = () => {
    dispatch(playPlayList({ songs }));
  };

  const handlePlayListEdit = useCallback(() => {
    setIsEditPlayList((prevState) => !prevState);
  }, [setIsEditPlayList]);

  const handleRemovePlayList = () => {
    dispatch(deletePlayList(_id));
  };

  const handleSubmitEditForm = (formValues) => {
    dispatch(editUserPlayList({ ...formValues, playListId: _id }));
  };

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleConfirmDeletePlayList = () => {
    setIsDeletePlayList(!isDeletePlayList);
  };

  return (
    <section className="p-2">
      <div className="m-4 flex flex-col card-playlist">
        <button
          type="button"
          className="image-container card-playlist-cover relative"
          onClick={handlePlayPlayList}
        >
          <div className="flex items-center justify-center absolute card-playlist-cover-play">
            <i className="bx bx-play text-4xl" />
          </div>
          <img src={image} alt="" className="rounded-4 object-cover " />
        </button>
        <div className="flex justify-between">
          <Link to={`${ROUTES.PLAYLIST_WITHOUT_PARAM}${playListId}`}>
            <h2 className="text-l font-semibold text-light p-2">{title}</h2>
          </Link>
          <div className="relative">
            {dropdownOpen && (
              <Dropdown
                handleClose={handleDropdown}
                styleNav="dropdown-playlist"
              >
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
                    action={handlePlayPlayList}
                  />
                </>
              </Dropdown>
            )}
            <button type="button" onClick={handleDropdown}>
              <i className="bx bx-dots-vertical-rounded text-2xl" />
            </button>
          </div>
        </div>

        <div className="pr-20 info-container truncate hidden">
          <Link to={`${ROUTES.PLAYLIST_WITHOUT_PARAM}${playListId}`}>
            <h2 className="text-lg font-semibold text-light mb-0.5">{title}</h2>
          </Link>
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
              <dt className="sr-only">Privacity</dt>
              <dd>{isPublic ? 'Public' : 'Private'}</dd>
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
      </div>
      <ModalLayout isOpen={isEditPlayList} handleClose={handlePlayListEdit}>
        <PlayListForm
          handleSubmit={handleSubmitEditForm}
          playListTitle={title}
          playistType={type}
          playListPublic={isPublic}
          defaultImg={image}
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
    </section>
  );
};

PlayListCard.propTypes = {
  playListId: PropTypes.string.isRequired,
};
