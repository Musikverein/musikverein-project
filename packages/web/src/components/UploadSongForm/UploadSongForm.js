import React from 'react';
import PropTypes from 'prop-types';

export const UploadSongForm = ({ title, artist, genre, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Title:"
        type="text"
        value={title}
        name="title"
        id="title"
        arial-label="Title"
      />
      <input
        placeholder="Artist:"
        type="text"
        value={artist}
        name="artist"
        id="artist"
        arial-label="Artist"
      />
      <input
        placeholder="Genre:"
        type="text"
        value={genre}
        name="genre"
        id="genre"
        aria-label="Genre"
      />
    </form>
  );
};

UploadSongForm.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  genre: PropTypes.string.isRequired,
};
