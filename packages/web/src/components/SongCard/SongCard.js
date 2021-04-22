import React from 'react';
import PropTypes from 'prop-types';
import { secondsToString } from '../../utils/utils';

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
  return (
    <div className="p-4 flex space-x-4">
      <img
        src={image}
        alt=""
        className="flex-none w-18 h-18 rounded-lg object-cover bg-gray-100"
        width="144"
        height="144"
      />
      <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20">
        <h2 className="text-lg font-semibold text-black mb-0.5">{title}</h2>
        <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
          <div>
            <dt className="sr-only">Artist</dt>
            <dd>{artist}</dd>
          </div>
          <div>
            <dt className="sr-only">Genre</dt>
            <dd>{genre}</dd>
          </div>
          <div>
            <dt className="sr-only">Duration</dt>
            <dd>
              <abbr title={`${secondsToString(duration)} minutes`}>
                {secondsToString(duration)} m
              </abbr>
            </dd>
          </div>
          <div>
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
