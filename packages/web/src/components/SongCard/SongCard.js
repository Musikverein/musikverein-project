import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { secondsToString } from '../../utils/utils';
import { play } from '../../redux/player/player-actions';

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

  const handlePlaySong = () => {
    dispatch(
      play({ title, artist, duration, genre, image, likedBy, url, _id }),
    );
  };

  return (
    <div className="p-4 flex space-x-4">
      <button type="button" className="w-36 h-36" onClick={handlePlaySong}>
        <div className="flex items-center justify-center absolute w-36 h-36 hover:bg-black hover:bg-opacity-25">
          <i className="bx bx-play text-4xl" />
        </div>
        <img src={image} alt="" className="w-36 h-36 rounded-lg object-cover" />
      </button>
      <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
        <h2 className="text-lg font-semibold text-light mb-0.5">{title}</h2>
        <div className="flex-none w-full mt-0.5 font-normal">
          <dt className="sr-only">Artist</dt>
          <dd>{artist}</dd>
        </div>
        <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
          <div className="pr-4">
            <dt className="sr-only">Genre</dt>
            <dd>{genre}</dd>
          </div>
          <div className="pr-4">
            <dt className="sr-only">Duration</dt>
            <dd>
              <abbr title={`${secondsToString(duration)} minutes`}>
                {secondsToString(duration)}m
              </abbr>
            </dd>
          </div>
          <div className="pr-4">
            <dt className="sr-only">Likes</dt>
            <dd>{likedBy.length}</dd>
          </div>
        </dl>
      </div>
    </div>
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
