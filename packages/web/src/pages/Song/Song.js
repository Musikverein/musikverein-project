import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import AddToPlayList from '../../components/AddToPlayList';
import ConfirmText from '../../components/ConfirmText';
import Header from '../../components/Header';
import { HeaderGoBack } from '../../components/HeaderGoBack/HeaderGoBack';
import LikeButton from '../../components/LikeButton';
import ModalLayout from '../../components/ModalLayout';
import ModalMenuOptions from '../../components/ModalMenuOptions';
import ModalMenuOptionsItem from '../../components/ModalMenuOptionsItem';
import SongForm from '../../components/SongForm';
import Spinner from '../../components/Spinner';
import { authSelector } from '../../redux/auth/auth-selectors';
import { genreSelector } from '../../redux/genre/genre-selectors';
import {
  deleteSong,
  editUserSong,
  getSong,
} from '../../redux/librarySongs/librarySong-actions';
import { addToQueue, play } from '../../redux/player/player-actions';
import { playerSelector } from '../../redux/player/player-selectors';
import { selectSongByIdState } from '../../redux/song/song-selectors';
import { selectUserByIdState } from '../../redux/user/user-selectors';
import ROUTES from '../../routers/routes';
import { secondsToString } from '../../utils/utils';

import './Song.scss';

export const Song = () => {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(authSelector);
  const { playingNow } = useSelector(playerSelector) || {};
  const state = useSelector(selectSongByIdState(songId));
  const { userName } = useSelector(selectUserByIdState(state?.owner)) || {};
  const { genres } = useSelector(genreSelector);
  const [menuOptionOpen, setMenuOptionOpen] = useState(false);
  const [isEditSong, setIsEditSong] = useState(false);
  const [isDeleteSong, setIsDeleteSong] = useState(false);
  const [isAddSongToPlayList, setIsAddSongToPlayList] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (mounted) dispatch(getSong({ songId }));
    return () => {
      mounted = false;
    };
  }, [dispatch, songId]);

  if (!state) {
    return <Spinner />;
  }

  const { title, image, likedBy, duration, genre, artist, owner } = state || {};

  const handlePlaySong = () => {
    dispatch(play(songId));
  };
  const handleMenuOption = () => {
    setMenuOptionOpen(!menuOptionOpen);
  };
  const handleConfirmDeleteSong = () => {
    setIsDeleteSong(!isDeleteSong);
  };
  const handleSongEdit = () => {
    setIsEditSong(!isEditSong);
  };
  const handleaddToQueue = () => {
    dispatch(addToQueue(songId));
  };
  const handleAddToPlayListModal = () => {
    setIsAddSongToPlayList(!isAddSongToPlayList);
  };
  const handleRemoveSong = () => {
    dispatch(deleteSong(songId));
    history.goBack();
  };

  const handleSubmitEditForm = (formValues) => {
    dispatch(editUserSong({ ...formValues, songId: songId }));
    setIsEditSong(false);
  };

  return (
    <>
      <Header isHidden />
      <section className="main-container">
        <HeaderGoBack>
          <button type="button" onClick={handleMenuOption}>
            <i className="bx bx-dots-vertical-rounded text-2xl pl-4" />
          </button>
        </HeaderGoBack>
        <div className="song-interation">
          {playingNow !== songId && (
            <button
              type="button"
              className="btn button-secondary m-0 mr-4"
              onClick={handlePlaySong}
            >
              Play
            </button>
          )}
          <LikeButton songId={songId} likedBy={likedBy} text={false} />
        </div>
        <div className="flex flex-col mt-4 mb-2 items-center song-info">
          <img src={image} alt="cover-song" className="song-info-img" />
          <h2 className="text-title-h2 my-4 px-4">{title}</h2>
          <div className="flex justify-center text-sm text-gray-200">
            <div className="px-2">
              <span className="pr-4">{artist}</span>
              <span className="pr-4">{genres[genre].genre}</span>
              <span>{secondsToString(duration)}</span>
            </div>
          </div>
          <div className="pt-4">
            Upload by{' '}
            <Link
              to={`${ROUTES.USER_WITHOUT_PARAM}${owner}`}
              className="hover:underline"
            >
              {userName}
            </Link>
          </div>
        </div>

        <ModalMenuOptions
          isOpen={menuOptionOpen}
          handleClose={handleMenuOption}
        >
          <>
            {owner === currentUser && (
              <ModalMenuOptionsItem
                isButton
                icon="bx-edit-alt"
                text="Edit"
                action={handleSongEdit}
                handleClose={handleMenuOption}
              />
            )}
            {owner === currentUser && (
              <ModalMenuOptionsItem
                isButton
                icon="bx-trash"
                text="Remove"
                action={handleConfirmDeleteSong}
                handleClose={handleMenuOption}
              />
            )}
            <LikeButton likedBy={likedBy} songId={songId} text />
            <ModalMenuOptionsItem
              isButton
              icon="bx-list-plus"
              text="Add to queue"
              action={handleaddToQueue}
              handleClose={handleMenuOption}
            />
            <ModalMenuOptionsItem
              isButton
              icon="bx-list-plus"
              text="Add to playlist"
              action={handleAddToPlayListModal}
              handleClose={handleMenuOption}
            />
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

        <ModalLayout
          isOpen={isDeleteSong}
          handleClose={handleConfirmDeleteSong}
        >
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
          <AddToPlayList title={title} image={image} songId={songId} />
        </ModalLayout>
      </section>
    </>
  );
};
