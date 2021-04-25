import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import './SongCard.scss';

import { play } from '../../redux/player/player-actions';

import { deleteSong } from '../../redux/song/song-actions';
import LikeButton from '../LikeButton';
import ROUTES from '../../routers/routes';

export const SongCard = ({
  title,
  artist,
  duration,
  genre,
  image,
  likedBy,
  url,
  _id,
}) => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

  const handlePlaySong = () => {
    dispatch(
      play({ title, artist, duration, genre, image, likedBy, url, _id }),
    );
  };

  const handleSongMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleRemoveSong = () => {
    dispatch(deleteSong(_id));
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

        <button type="button" onClick={handleSongMenu}>
          <i className="bx bx-dots-vertical-rounded text-2xl" />
        </button>
        <nav
          className={
            menuOpen
              ? 'absolute flex flex-col nav-song shadow-xl'
              : 'hidden absolute'
          }
        >
          <Link to={ROUTES.SONG_EDIT}>Edit</Link>
          <button type="button" onClick={handleRemoveSong}>
            Remove
          </button>
          <LikeButton likedBy={likedBy} songId={_id} />
          <button type="button">Add to queqe</button>
        </nav>
      </div>
    </section>
  );
};

SongCard.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  genre: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  likedBy: PropTypes.array.isRequired,
  url: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
};
