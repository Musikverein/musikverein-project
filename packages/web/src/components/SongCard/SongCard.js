import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { addToQueque, play } from '../../redux/player/player-actions';
import { authSelector } from '../../redux/auth/auth-selectors';
import { selectSongByIdState } from '../../redux/song/song-selectors';
import {
  deleteSong,
  editUserSong,
} from '../../redux/librarySongs/librarySong-actions';

import SongForm from '../SongForm';
import LikeButton from '../LikeButton';
import ModalLayout from '../ModalLayout';
import ConfirmText from '../ConfirmText';
import Dropdown from '../Dropdown';

import './SongCard.scss';
import DropdownItem from '../DropdownItem';
import AddToPlayList from '../AddToPlayList';

export const SongCard = ({ songId }) => {
  const song = useSelector(selectSongByIdState(songId));
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isEditSong, setIsEditSong] = useState(false);
  const [isDeleteSong, setIsDeleteSong] = useState(false);
  const [isAddSongToPlayList, setIsAddSongToPlayList] = useState(false);
  const {
    currentUser: { _id: userId },
  } = useSelector(authSelector);

  const { title, artist, genre, image, likedBy, _id, owner } = song;

  const handlePlaySong = () => {
    dispatch(play(_id));
  };

  const handleSongEdit = () => {
    setIsEditSong(!isEditSong);
  };
  const handleRemoveSong = () => {
    dispatch(deleteSong(_id));
  };

  const handleSubmitEditForm = (formValues) => {
    dispatch(editUserSong({ ...formValues, songId: _id }));
    setIsEditSong(false);
  };
  const handleConfirmDeleteSong = () => {
    setIsDeleteSong(!isDeleteSong);
  };

  const handleAddToQueque = () => {
    dispatch(addToQueque(_id));
  };

  const handleAddToPlayListModal = () => {
    setIsAddSongToPlayList(!isAddSongToPlayList);
  };

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <section className="p-2">
      <div className="p-4 flex space-x-4 card-song">
        <button
          type="button"
          className="w-24 h-24 image-container"
          onClick={handlePlaySong}
        >
          <div className="flex items-center justify-center absolute w-24 h-24 img-play">
            <i className="bx bx-play text-4xl" />
          </div>
          <img
            src={image}
            alt=""
            className="w-24 h-24 rounded-4 object-cover "
          />
        </button>
        <div className="pr-20 info-container truncate">
          <h2 className="text-lg font-semibold text-light mb-0.5 ">{title}</h2>
          <div className="flex-none w-full mt-0.5 font-normal">
            <dt className="sr-only">Artist</dt>
            <dd>{artist}</dd>
          </div>
          <dl className="flex flex-wrap items-center text-sm font-medium whitespace-pre">
            <div className="pr-4">
              <dt className="sr-only">Genre</dt>
              <dd>{genre}</dd>
            </div>

            <div className="pr-4">
              <dt className="sr-only">Likes</dt>
              <dd>{likedBy.length} Likes</dd>
            </div>
            <LikeButton likedBy={likedBy} songId={_id} text={false} />
          </dl>
        </div>
        {dropdownOpen && (
          <Dropdown handleClose={handleDropdown} styleNav="dropdown">
            <>
              {owner === userId && (
                <DropdownItem
                  isButton
                  icon="bx-edit-alt"
                  text="Edit"
                  action={handleSongEdit}
                />
              )}
              {owner === userId && (
                <DropdownItem
                  isButton
                  icon="bx-trash"
                  text="Remove"
                  action={handleConfirmDeleteSong}
                />
              )}
              <LikeButton likedBy={likedBy} songId={_id} text />
              <DropdownItem
                isButton
                icon="bx-list-plus"
                text="Add to queqe"
                action={handleAddToQueque}
              />
              <DropdownItem
                isButton
                icon="bx-list-plus"
                text="Add to playlist"
                action={handleAddToPlayListModal}
              />
            </>
          </Dropdown>
        )}

        <button type="button" onClick={handleDropdown}>
          <i className="bx bx-dots-vertical-rounded text-2xl" />
        </button>
      </div>
      <ModalLayout isOpen={isEditSong} handleClose={handleSongEdit}>
        <SongForm
          songTitle={title}
          songArtist={artist}
          songGenre={genre}
          defaultImg={image}
          handleSubmit={handleSubmitEditForm}
          handleCancel={handleSongEdit}
          isLoading={false}
        />
      </ModalLayout>
      <ModalLayout isOpen={isDeleteSong} handleClose={handleConfirmDeleteSong}>
        <ConfirmText
          handleRemoveSong={handleRemoveSong}
          onCancel={handleConfirmDeleteSong}
          title={title}
        />
      </ModalLayout>
      <ModalLayout
        isOpen={isAddSongToPlayList}
        handleClose={handleAddToPlayListModal}
      >
        <AddToPlayList title={title} image={image} songId={_id} />
      </ModalLayout>
    </section>
  );
};

SongCard.propTypes = {
  songId: PropTypes.string.isRequired,
};
