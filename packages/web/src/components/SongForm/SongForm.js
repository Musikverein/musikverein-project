import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';

import { useSelector } from 'react-redux';
import { useImgPreview } from '../../hooks/useImgPreview';
import { useForm } from '../../hooks/useForm';
import { validationSchema } from '../../utils/validation/validationSchema';

import { ImgEdit } from '../ImgEdit/ImgEdit';

import Spinner from '../Spinner';
import { genreSelector } from '../../redux/genre/genre-selectors';

export const SongForm = ({
  songTitle,
  songArtist,
  songGenre,
  defaultImg,
  handleSubmit,
  handleCancel,
  isLoading,
}) => {
  const { stateImg, handleImageChange, handleImage, refId } = useImgPreview(
    'coverImage',
  );
  const { formValues, handleInputChange, errors, isValid } = useForm({
    title: songTitle,
    artist: songArtist,
    genre: songGenre,
  });
  const { genres, genreIds } = useSelector(genreSelector);
  const reRef = useRef();

  const { urlPreview, file } = stateImg;
  const { title, artist, genre } = formValues;

  const handlePreSubmit = async (e) => {
    e.preventDefault();
    if (isValid(validationSchema.song)) {
      const recaptchaToken = await reRef.current.executeAsync();
      reRef.current.reset();
      handleSubmit({
        title: title,
        artist: artist,
        genre: genre,
        image: file || defaultImg,
        recaptchaToken: recaptchaToken,
      });
    }
  };

  return (
    <div className="w-full h-3/4 flex flex-col items-center">
      <ImgEdit
        handleImage={handleImage}
        handleImageChange={handleImageChange}
        urlPreview={urlPreview}
        refId={refId}
        defaultImg={
          defaultImg ||
          'https://res.cloudinary.com/musikverein/image/upload/v1618918093/song-photo_s0wytx.svg'
        }
        rounded={false}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={handlePreSubmit} className="w-full px-4">
          <input
            className="form__input"
            placeholder="Title:"
            type="text"
            value={title}
            name="title"
            id="title"
            arial-label="Title"
            onChange={handleInputChange}
          />
          <span className="mb-2 p-2 block text-error">
            {errors.title ? errors.title : ' '}
          </span>
          <input
            className="form__input"
            placeholder="Artist:"
            type="text"
            value={artist}
            name="artist"
            id="artist"
            arial-label="Artist"
            onChange={handleInputChange}
          />
          <span className="mb-2 p-2 block text-error">
            {errors.artist ? errors.artist : ' '}
          </span>
          <select
            onChange={handleInputChange}
            value={genre}
            name="genre"
            className="form__input"
          >
            <option value="default">Select a genre</option>
            {genreIds.map((genreId) => (
              <option key={genreId} value={genreId}>
                {genres[genreId].genre}
              </option>
            ))}
          </select>
          <span className="mb-2 p-2 block text-error">
            {errors.genre ? errors.genre : ' '}
          </span>
          <button
            type="submit"
            className="rounded-4 w-full mb-4 btn button-secondary "
            disabled={isLoading}
          >
            Submit
          </button>
          <button
            type="button"
            className="rounded-4 w-full mb-4 btn button-secondary"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
        </form>
      )}

      <ReCAPTCHA
        sitekey={process.env.REACT_APP_RECAPTCHA_WEB_KEY}
        size="invisible"
        ref={reRef}
      />
    </div>
  );
};

SongForm.defaultProps = {
  songGenre: 'default',
};

SongForm.propTypes = {
  songTitle: PropTypes.string.isRequired,
  songArtist: PropTypes.string.isRequired,
  songGenre: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  defaultImg: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
