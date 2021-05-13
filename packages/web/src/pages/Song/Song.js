import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Dropdown from '../../components/Dropdown';
import DropdownItem from '../../components/DropdownItem';
import Header from '../../components/Header';
import { HeaderGoBack } from '../../components/HeaderGoBack/HeaderGoBack';
import LikeButton from '../../components/LikeButton';
import Spinner from '../../components/Spinner';
import { authSelector } from '../../redux/auth/auth-selectors';
import { genreSelector } from '../../redux/genre/genre-selectors';
import { getSong } from '../../redux/librarySongs/librarySong-actions';
import { addToQueue, play } from '../../redux/player/player-actions';
import { selectSongByIdState } from '../../redux/song/song-selectors';
import { selectUserByIdState } from '../../redux/user/user-selectors';
import ROUTES from '../../routers/routes';
import { secondsToString } from '../../utils/utils';

import './Song.scss';

export const Song = () => {
  const { songId } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(authSelector);
  const state = useSelector(selectSongByIdState(songId));
  const { userName } = useSelector(selectUserByIdState(state?.owner)) || {};
  const { genres } = useSelector(genreSelector);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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

  return (
    <>
      <Header isHidden />
      <section className="main-container">
        <HeaderGoBack>
          <div className="relative">
            {dropdownOpen && (
              <Dropdown handleClose={handleDropdown} styleNav="dropdown-song">
                <>
                  {owner === currentUser && (
                    <DropdownItem
                      isButton
                      icon="bx-edit-alt"
                      text="Edit"
                      action={handleSongEdit}
                    />
                  )}
                  {owner === currentUser && (
                    <DropdownItem
                      isButton
                      icon="bx-trash"
                      text="Remove"
                      action={handleConfirmDeleteSong}
                    />
                  )}
                  <LikeButton likedBy={likedBy} songId={songId} text={false} />
                  <DropdownItem
                    isButton
                    icon="bx-list-plus"
                    text="Add to queue"
                    action={handleaddToQueue}
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
              <i className="bx bx-dots-vertical-rounded text-2xl pl-4" />
            </button>
          </div>
        </HeaderGoBack>
        <div className="song-interation">
          <button
            type="button"
            className="btn button-secondary m-0 mr-4"
            onClick={handlePlaySong}
          >
            Play
          </button>
          <LikeButton songId={songId} likedBy={likedBy} text={false} />
        </div>
        <div className="flex flex-col mt-4 mb-2 items-center song-info">
          <img src={image} alt="cover-song" className="song-info-img" />
          <h2 className="text-lg font-semibold text-light pt-4 pt-2">
            {title}
          </h2>
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
      </section>
    </>
  );
};
