import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectPlayListByIdState } from '../../redux/playList/playList-selectors';
import { authSelector } from '../../redux/auth/auth-selectors';
import {
  deletePlayList,
  editUserPlayList,
  getPlayListAndPlay,
} from '../../redux/libraryPlayList/libraryPlayList-actions';
import ModalLayout from '../ModalLayout';
import ConfirmText from '../ConfirmText';
import { FollowButton } from '../FollowButton/FollowButton';
import { PlayListForm } from '../PlayListForm/PlayListForm';
import ROUTES from '../../routers/routes';

import { selectUserByIdState } from '../../redux/user/user-selectors';
import ModalMenuOptionsItem from '../ModalMenuOptionsItem';
import ModalMenuOptions from '../ModalMenuOptions';

import './PlayListCard.scss';

export const PlayListCard = ({ playListId }) => {
  const playlist = useSelector(selectPlayListByIdState(playListId));
  const dispatch = useDispatch();
  const [menuOptionOpen, setMenuOptionOpen] = useState(false);
  const [isDeletePlayList, setIsDeletePlayList] = useState(false);
  const [isEditPlayList, setIsEditPlayList] = useState(false);
  const { currentUser } = useSelector(authSelector);
  const { _id: userId } = useSelector(selectUserByIdState(currentUser)) || {};

  const handlePlayListEdit = useCallback(() => {
    setIsEditPlayList((prevState) => !prevState);
  }, [setIsEditPlayList]);

  if (!playlist) {
    return null;
  }
  const { title, followedBy, owner, type, _id, isPublic, image } = playlist;

  const handlePlayPlayList = () => {
    dispatch(getPlayListAndPlay({ playListId }));
  };

  const handleRemovePlayList = () => {
    dispatch(deletePlayList(_id));
  };

  const handleSubmitEditForm = (formValues) => {
    dispatch(editUserPlayList({ ...formValues, playListId: _id }));
  };

  const handleMenuOption = () => {
    setMenuOptionOpen(!menuOptionOpen);
  };

  const handleConfirmDeletePlayList = () => {
    setIsDeletePlayList(!isDeletePlayList);
  };

  return (
    <section className="p-1">
      <div className="m-2 flex flex-col card-playlist">
        <button
          type="button"
          className="image-container card-playlist-cover relative"
          onClick={handlePlayPlayList}
        >
          <div className="flex items-center justify-center absolute card-playlist-cover-play">
            <i className="bx bx-play text-4xl" />
          </div>
          <img src={image} alt="" className="rounded-4 h-full object-cover" />
        </button>
        <div className="flex justify-between items-center">
          <Link
            to={`${ROUTES.PLAYLIST_WITHOUT_PARAM}${playListId}`}
            className="truncate"
          >
            <h2 className="text-l font-semibold text-light p-2">{title}</h2>
          </Link>

          <button type="button" onClick={handleMenuOption}>
            <i className="bx bx-dots-vertical-rounded text-2xl" />
          </button>
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
              <dd>{followedBy?.length} Followed</dd>
            </div>
            <FollowButton
              followedBy={followedBy}
              playListId={_id}
              text={false}
            />
          </dl>
        </div>
      </div>

      <ModalMenuOptions isOpen={menuOptionOpen} handleClose={handleMenuOption}>
        <>
          {owner === userId && (
            <ModalMenuOptionsItem
              isButton
              icon="bx-edit-alt"
              text="Edit"
              action={handlePlayListEdit}
              handleClose={handleMenuOption}
            />
          )}
          {owner === userId && (
            <ModalMenuOptionsItem
              isButton
              icon="bx-trash"
              text="Remove"
              action={handleConfirmDeletePlayList}
              handleClose={handleMenuOption}
            />
          )}
          {owner !== userId && (
            <FollowButton followedBy={followedBy} playListId={_id} text />
          )}
          <ModalMenuOptionsItem
            isButton
            icon="bx-list-plus"
            text="Add to queue"
            action={handlePlayPlayList}
            handleClose={handleMenuOption}
          />
        </>
      </ModalMenuOptions>

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
