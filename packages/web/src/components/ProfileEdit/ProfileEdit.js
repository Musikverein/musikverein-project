import React, { useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { resetUpdate, updateProfile } from '../../redux/auth/auth-actions';
import { authSelector } from '../../redux/auth/auth-selectors';

import { useImgPreview } from '../../hooks/useImgPreview';
import { useForm } from '../../hooks/useForm';
import { validationSchema } from '../../utils/validation/validationSchema';

import ImgEdit from '../ImgEdit';
import Spinner from '../Spinner';

export const ProfileEdit = ({ handleClose }) => {
  const { currentUser, isUpdating, updatedSuccess } = useSelector(authSelector);
  const dispatch = useDispatch();
  const { formValues, handleInputChange, errors, isValid } = useForm({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    userName: currentUser.userName,
  });
  const { stateImg, handleImageChange, handleImage, refId } = useImgPreview(
    'imageProfile',
  );
  const reRef = useRef();

  const { urlPreview, file } = stateImg;
  const { firstName, lastName, userName } = formValues;

  useEffect(() => {
    updatedSuccess && handleClose();
    return () => {
      dispatch(resetUpdate());
    };
  }, [updatedSuccess, handleClose, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValid(validationSchema.userProfile)) {
      const recaptchaToken = await reRef.current.executeAsync();
      reRef.current.reset();
      dispatch(
        updateProfile({ userName, firstName, lastName, file, recaptchaToken }),
      );
    }
  };

  return (
    <>
      <div className="w-full h-3/4 flex flex-col items-center">
        <div className="flex justify-center">
          <ImgEdit
            handleImage={handleImage}
            handleImageChange={handleImageChange}
            urlPreview={urlPreview}
            refId={refId}
            defaultImg={currentUser.image}
            rounded
          />
        </div>

        {isUpdating ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit} className="p-4 w-3/4 text-center">
            <input
              type="text"
              id="userName"
              name="userName"
              arial-label="Insert your user name"
              className="input__edit"
              value={userName}
              onChange={handleInputChange}
              placeholder="Insert your user name"
            />
            <span className="mb-2 p-2 block text-error">
              {errors.userName ? errors.userName : ' '}
            </span>
            <input
              type="text"
              id="firstName"
              name="firstName"
              arial-label="Insert your first name"
              className="input__edit"
              value={firstName}
              onChange={handleInputChange}
              placeholder="Insert your first name"
            />
            <span className="mb-2 p-2 block text-error">
              {errors.firstName ? errors.firstName : ' '}
            </span>
            <input
              type="text"
              id="lastName"
              name="lastName"
              arial-label="Insert your last name"
              className="input__edit"
              value={lastName}
              onChange={handleInputChange}
              placeholder="Insert your last name"
            />
            <span className="mb-2 p-2 block text-error">
              {errors.lastName ? errors.lastName : ' '}
            </span>

            <button
              type="submit"
              className="btn w-full rounded-4 button-secundary"
              disabled={isUpdating}
            >
              Update profile
            </button>
          </form>
        )}
      </div>
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_RECAPTCHA_WEB_KEY}
        size="invisible"
        ref={reRef}
      />
    </>
  );
};

ProfileEdit.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
