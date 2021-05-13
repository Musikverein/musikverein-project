import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToQueue } from '../../redux/player/player-actions';
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

import AddToPlayList from '../AddToPlayList';
import { removeSongFromPlayList } from '../../redux/libraryPlayList/libraryPlayList-actions';
import { secondsToString } from '../../utils/utils';
import { playerSelector } from '../../redux/player/player-selectors';
import { selectUserByIdState } from '../../redux/user/user-selectors';

import ROUTES from '../../routers/routes';
import { genreSelector } from '../../redux/genre/genre-selectors';
import ModalMenuOptions from '../ModalMenuOptions';
import ModalMenuOptionsItem from '../ModalMenuOptionsItem';

import './SongCard.scss';

export const SongCard = ({
  songId,
  handlePlay,
  playListId,
  handleRemoveSongFromQueue,
}) => {
  const song = useSelector(selectSongByIdState(songId));
  const dispatch = useDispatch();
  const [menuOptionOpen, setMenuOptionOpen] = useState(false);
  const [isEditSong, setIsEditSong] = useState(false);
  const [isDeleteSong, setIsDeleteSong] = useState(false);
  const [isAddSongToPlayList, setIsAddSongToPlayList] = useState(false);
  const { currentUser } = useSelector(authSelector);
  const { _id: userId } = useSelector(selectUserByIdState(currentUser)) || {};
  const { playingNow } = useSelector(playerSelector);
  const { genres } = useSelector(genreSelector);

  if (!song) {
    return null;
  }
  const { title, artist, genre, image, likedBy, _id, owner, duration } = song;

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

  const handleaddToQueue = () => {
    dispatch(addToQueue(_id));
  };

  const handleAddToPlayListModal = () => {
    setIsAddSongToPlayList(!isAddSongToPlayList);
  };

  const handleMenuOption = () => {
    setMenuOptionOpen(!menuOptionOpen);
  };

  const handleRemoveFromPlayListModal = () => {
    dispatch(removeSongFromPlayList({ songId, playListId }));
  };

  return (
    <section className={playingNow === _id ? 'bg__terciary' : ''}>
      <div className="flex card-song px-4">
        <LikeButton likedBy={likedBy} songId={_id} text={false} />
        <button
          type="button"
          className="w-12 h-12 image-container px-4"
          onClick={handlePlay}
        >
          <div className="flex items-center justify-center absolute w-12 h-12 img-play">
            <i className="bx bx-play text-2xl" />
          </div>
          <img
            src={image}
            alt=""
            className="w-12 h-12 rounded-4 object-cover"
          />
        </button>

        <div className="pr-8 info-container truncate flex flex-col">
          <Link to={`${ROUTES.SONG_WITHOUT_PARAM}${songId}`}>
            <h4 className="text-title-h4">{title}</h4>
          </Link>
          <div className="flex w-full mt-0.5 font-normal">
            <dt className="sr-only">Artist</dt>
            <dd className="text-dd">{artist}</dd>

            <div className="info-hidden w-full">
              <dt className="sr-only">Genre</dt>
              <dd className="text-dd">{genres[genre].genre}</dd>

              <dt className="sr-only">Likes</dt>
              <dd className="text-dd">{likedBy?.length} Likes</dd>
            </div>
          </div>
        </div>

        <div className="info-hidden pr-1">
          <dt className="sr-only">Duration</dt>
          <dd>{secondsToString(duration)}</dd>
        </div>

        <button type="button" onClick={handleMenuOption}>
          <i className="bx bx-dots-vertical-rounded text-2xl" />
        </button>
      </div>
      <ModalMenuOptions isOpen={menuOptionOpen} handleClose={handleMenuOption}>
        <>
          {owner === userId && (
            <ModalMenuOptionsItem
              isButton
              icon="bx-edit-alt"
              text="Edit"
              action={handleSongEdit}
              handleClose={handleMenuOption}
            />
          )}
          {owner === userId && (
            <ModalMenuOptionsItem
              isButton
              icon="bx-trash"
              text="Remove"
              action={handleConfirmDeleteSong}
              handleClose={handleMenuOption}
            />
          )}
          <LikeButton likedBy={likedBy} songId={_id} text />
          {handleRemoveSongFromQueue ? (
            <ModalMenuOptionsItem
              isButton
              icon="bx-list-plus"
              text="Remove to queue"
              action={handleRemoveSongFromQueue}
              handleClose={handleMenuOption}
            />
          ) : (
            <ModalMenuOptionsItem
              isButton
              icon="bx-list-plus"
              text="Add to queue"
              action={handleaddToQueue}
              handleClose={handleMenuOption}
            />
          )}
          <ModalMenuOptionsItem
            isButton
            icon="bx-list-plus"
            text="Add to playlist"
            action={handleAddToPlayListModal}
            handleClose={handleMenuOption}
          />
          {owner === userId && playListId && (
            <ModalMenuOptionsItem
              isButton
              icon="bx-list-minus"
              text="Remove from playlist"
              action={handleRemoveFromPlayListModal}
              handleClose={handleMenuOption}
            />
          )}
        </>
      </ModalMenuOptions>

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
          handleRemove={handleRemoveSong}
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

SongCard.defaultProps = {
  handleRemoveSongFromQueue: false,
  playListId: '',
};
SongCard.propTypes = {
  songId: PropTypes.string.isRequired,
  handlePlay: PropTypes.func.isRequired,
  playListId: PropTypes.string,
  handleRemoveSongFromQueue: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
};
