import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';

import { useSelector } from 'react-redux';
import { songSelector } from '../../redux/song/song-selectors';

import { useImgPreview } from '../../hooks/useImgPreview';
import { useForm } from '../../hooks/useForm';
import { validationSchema } from '../../utils/validation/validationSchema';

import { ImgEdit } from '../ImgEdit/ImgEdit';

import Spinner from '../Spinner';

export const UploadSongForm = ({
  metaTitle,
  metaArtist,
  metaGenre,
  defaultImg,
  handleSubmit,
}) => {
  const { isUploadingSong, uploadSongSuccess, uploadSongError } = useSelector(
    songSelector,
  );
  const { stateImg, handleImageChange, handleImage, refId } = useImgPreview(
    'coverImage',
  );
  const { formValues, handleInputChange, errors, isValid } = useForm({
    title: metaTitle,
    artist: metaArtist,
    genre: metaGenre,
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
      {isUploadingSong ? (
        <Spinner />
      ) : (
        <form onSubmit={handlePreSubmit} className="w-2/3">
          <input
            className="input__edit"
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
            className="input__edit"
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
            className="input__edit"
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
            className="rounded-4 w-full mb-4 button-secundary"
            disabled={isUploadingSong}
          >
            Submit
          </button>
        </form>
      )}

      <ReCAPTCHA
        sitekey={process.env.REACT_APP_RECAPTCHA_WEB_KEY}
        size="invisible"
        ref={reRef}
      />
      {uploadSongSuccess && <p>Upload successful!</p>}
      {uploadSongError && <p>Upload error!</p>}
    </>
  );
};

UploadSongForm.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaArtist: PropTypes.string.isRequired,
  metaGenre: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  defaultImg: PropTypes.string.isRequired,
};
