import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';
import { userPlayListSelector } from '../../redux/libraryPlayList/libraryPlayList-selectors';
import Spinner from '../Spinner';
import { validationSchema } from '../../utils/validation/validationSchema';
import { useForm } from '../../hooks/useForm';

export const PlayListForm = ({
  handleSubmit,
  playListTitle,
  playistType,
  playListPublic,
}) => {
  const { formValues, handleInputChange, errors, isValid } = useForm({
    title: playListTitle,
    type: playistType,
    isPublic: playListPublic,
  });

  const reRef = useRef();
  const { isCreatingPlayList, isEditingPlaylist } = useSelector(
    userPlayListSelector,
  );

  const { title, type, isPublic } = formValues;

  const handlePreSubmit = async (e) => {
    e.preventDefault();
    if (isValid(validationSchema.playList)) {
      const recaptchaToken = await reRef.current.executeAsync();
      reRef.current.reset();
      handleSubmit({
        title,
        type,
        isPublic,
        recaptchaToken,
      });
    }
  };

  return (
    <>
      {isCreatingPlayList || isEditingPlaylist ? (
        <Spinner />
      ) : (
        <>
          <form className="w-full p-4 flex flex-col" onSubmit={handlePreSubmit}>
            <input
              className="form__input rounded-4 "
              placeholder="Insert the name"
              name="title"
              onChange={handleInputChange}
              value={title}
            />
            <span className="mb-2 p-2 block text-error">
              {errors.title ? errors.title : ' '}
            </span>
            <label htmlFor="Type" className="my-4">
              Public
              <input
                value={isPublic}
                name="isPublic"
                className="mx-2"
                type="checkbox"
                onChange={handleInputChange}
              />
            </label>
            <select
              className="playlist-select mb-4"
              name="type"
              value={type}
              onChange={handleInputChange}
            >
              <option value="Album">Album</option>
              <option value="PlayList">PlayList</option>
            </select>

            <button type="submit" className="button-primary rounded-4">
              Submit
            </button>
          </form>
        </>
      )}
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_RECAPTCHA_WEB_KEY}
        size="invisible"
        ref={reRef}
      />
    </>
  );
};

PlayListForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  playListTitle: PropTypes.string.isRequired,
  playistType: PropTypes.string.isRequired,
  playListPublic: PropTypes.bool.isRequired,
};
