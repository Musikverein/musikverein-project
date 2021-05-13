import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';
import { userPlayListSelector } from '../../redux/libraryPlayList/libraryPlayList-selectors';
import Spinner from '../Spinner';
import { validationSchema } from '../../utils/validation/validationSchema';
import { useForm } from '../../hooks/useForm';
import { ImgEdit } from '../ImgEdit/ImgEdit';
import { useImgPreview } from '../../hooks/useImgPreview';
import { playListReset } from '../../redux/libraryPlayList/libraryPlayList-actions';

export const PlayListForm = ({
  handleSubmit,
  playListTitle,
  playistType,
  playListPublic,
  defaultImg,
  handleClose,
}) => {
  const dispatch = useDispatch();
  const { formValues, handleInputChange, errors, isValid } = useForm({
    title: playListTitle,
    type: playistType,
    isPublic: playListPublic,
  });
  const { stateImg, handleImageChange, handleImage, refId } = useImgPreview(
    'playListImage',
  );

  const reRef = useRef();
  const {
    isCreatingPlayList,
    isEditPlayList,
    editPlayListSuccess,
    createPlayListSuccess,
  } = useSelector(userPlayListSelector);

  const { title, type, isPublic } = formValues;
  const { urlPreview, file } = stateImg;

  const handlePreSubmit = async (e) => {
    e.preventDefault();
    if (isValid(validationSchema.playList)) {
      const recaptchaToken = await reRef.current.executeAsync();
      reRef.current.reset();
      handleSubmit({
        title,
        type,
        isPublic,
        image: file || defaultImg,
        recaptchaToken,
      });
    }
  };
  useEffect(() => {
    if (editPlayListSuccess || createPlayListSuccess) {
      handleClose();
      dispatch(playListReset());
    }
  }, [createPlayListSuccess, dispatch, editPlayListSuccess, handleClose]);

  return (
    <>
      {isCreatingPlayList || isEditPlayList ? (
        <Spinner />
      ) : (
        <div className="w-full h-3/4 flex flex-col items-center">
          <ImgEdit
            handleImage={handleImage}
            handleImageChange={handleImageChange}
            urlPreview={urlPreview}
            refId={refId}
            defaultImg={
              defaultImg ||
              'https://res.cloudinary.com/musikverein/image/upload/v1620213731/playlist-photo_euxndm.svg'
            }
            rounded={false}
          />
          <form className="w-3/4 p-4 flex flex-col" onSubmit={handlePreSubmit}>
            <input
              type="text"
              className="form__input rounded-4"
              placeholder="Insert name:"
              name="title"
              onChange={handleInputChange}
              value={title}
            />
            <span className="mb-2 p-2 block text-error">
              {errors.title ? errors.title : ' '}
            </span>
            <select
              className="form__select mb-4"
              name="type"
              value={type}
              onChange={handleInputChange}
            >
              <option value="Album">Album</option>
              <option value="PlayList">PlayList</option>
            </select>

            <div className="py-1">
              <label htmlFor="isPublic" className="flex cursor-pointer">
                <input
                  type="checkbox"
                  id="isPublic"
                  name="isPublic"
                  className="form-checkbox rounded-4 cursor-pointer"
                  onChange={handleInputChange}
                  checked={isPublic}
                />
                <span className="ml-2 text-white">Public</span>
              </label>
            </div>

            <button
              type="submit"
              className="btn w-full button-secondary rounded-4"
            >
              Submit
            </button>
          </form>
        </div>
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
  handleClose: PropTypes.func.isRequired,
  playListTitle: PropTypes.string.isRequired,
  playistType: PropTypes.string.isRequired,
  playListPublic: PropTypes.bool.isRequired,
  defaultImg: PropTypes.string.isRequired,
};
