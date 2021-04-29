import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';

import { useImgPreview } from '../../hooks/useImgPreview';
import { useForm } from '../../hooks/useForm';
import { validationSchema } from '../../utils/validation/validationSchema';

import { ImgEdit } from '../ImgEdit/ImgEdit';

import Spinner from '../Spinner';

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
    <>
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
        <form onSubmit={handlePreSubmit} className="w-2/3">
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
          <input
            className="form__input"
            placeholder="Genre:"
            type="text"
            value={genre}
            name="genre"
            id="genre"
            aria-label="Genre"
            onChange={handleInputChange}
          />
          <span className="mb-2 p-2 block text-error">
            {errors.genre ? errors.genre : ' '}
          </span>
          <button
            type="submit"
            className="rounded-4 w-full mb-4 button-secundary "
            disabled={isLoading}
          >
            Submit
          </button>
          <button
            type="button"
            className="rounded-4 w-full mb-4 button-secundary"
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
    </>
  );
};

SongForm.propTypes = {
  songTitle: PropTypes.string.isRequired,
  songArtist: PropTypes.string.isRequired,
  songGenre: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  defaultImg: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
