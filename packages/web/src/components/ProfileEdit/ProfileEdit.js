import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import {
  resetUpdate,
  updateProfile,
} from '../../redux/userView/userView-actions';
import { authSelector } from '../../redux/auth/auth-selectors';

import { useImgPreview } from '../../hooks/useImgPreview';
import { useForm } from '../../hooks/useForm';
import { validationSchema } from '../../utils/validation/validationSchema';

import ImgEdit from '../ImgEdit';
import Spinner from '../Spinner';
import { selectUserByIdState } from '../../redux/user/user-selectors';
import { userViewSelector } from '../../redux/userView/userView-selectors';

export const ProfileEdit = ({ handleClose }) => {
  const { currentUser: currentUserId } = useSelector(authSelector);
  const { isUpdating, updatedSuccess } = useSelector(userViewSelector) || {};
  const currentUser = useSelector(selectUserByIdState(currentUserId)) || {};
  const dispatch = useDispatch();
  const { formValues, handleInputChange, errors, isValid } = useForm({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    userName: currentUser.userName,
  });
  const { stateImg, handleImageChange, handleImage, refId } = useImgPreview(
    'imageProfile',
  );

  const { urlPreview, file } = stateImg;
  const { firstName, lastName, userName } = formValues;

  useEffect(() => {
    updatedSuccess && handleClose();
    return () => {
      dispatch(resetUpdate());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedSuccess, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValid(validationSchema.userProfile)) {
      dispatch(updateProfile({ userName, firstName, lastName, file }));
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
            defaultImg={currentUser?.image}
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
              className="form__input"
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
              className="form__input"
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
              className="form__input"
              value={lastName}
              onChange={handleInputChange}
              placeholder="Insert your last name"
            />
            <span className="mb-2 p-2 block text-error">
              {errors.lastName ? errors.lastName : ' '}
            </span>

            <button
              type="submit"
              className="btn w-full rounded-4 button-secondary"
              disabled={isUpdating}
            >
              Update profile
            </button>
          </form>
        )}
      </div>
    </>
  );
};

ProfileEdit.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
