import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import './SongCard.scss';

import { play } from '../../redux/player/player-actions';

import { deleteSong, editMySong } from '../../redux/mySongs/mySong-actions';
import LikeButton from '../LikeButton';
import SongForm from '../SongForm';
import { songSelector } from '../../redux/song/song-selectors';

export const SongCard = ({ songId }) => {
  const { songs } = useSelector(songSelector);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditSong, setIsEditSong] = useState(false);

  const { title, artist, duration, genre, image, likedBy, url, _id } = songs[
    songId
  ];

  const handlePlaySong = () => {
    dispatch(
      play({ title, artist, duration, genre, image, likedBy, url, _id }),
    );
  };

  const handleSongEdit = () => {
    setIsEditSong(!isEditSong);
    setMenuOpen(!menuOpen);
  };
  const handleRemoveSong = () => {
    dispatch(deleteSong(_id));
  };

  const handleSubmitEditForm = (formValues) => {
    dispatch(editMySong({ ...formValues, songId: _id }));
    setIsEditSong(false);
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
            <LikeButton likedBy={likedBy} songId={_id} />
          </dl>
        </div>

        <button type="button" onClick={() => setMenuOpen(!menuOpen)}>
          <i className="bx bx-dots-vertical-rounded text-2xl" />
        </button>
        <nav
          className={
            menuOpen
              ? 'absolute flex flex-col nav-song shadow-xl'
              : 'hidden absolute'
          }
        >
          <button type="button" onClick={handleSongEdit}>
            Edit
          </button>
          <button type="button" onClick={handleRemoveSong}>
            Remove
          </button>
          <LikeButton likedBy={likedBy} songId={_id} />
          <button type="button">Add to queqe</button>
        </nav>
      </div>
      {isEditSong && (
        <SongForm
          songTitle={title}
          songArtist={artist}
          songGenre={genre}
          defaultImg={image}
          handleSubmit={handleSubmitEditForm}
          handleCancel={() => setIsEditSong(false)}
          isLoading={false}
        />
      )}
    </section>
  );
};

SongCard.propTypes = {
  songId: PropTypes.string.isRequired,
};
