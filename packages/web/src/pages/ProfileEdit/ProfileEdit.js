import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { resetUpdate, updateProfile } from '../../redux/auth/auth-actions';
import { authSelector } from '../../redux/auth/auth-selectors';

import { useImgPreview } from '../../hooks/useImgPreview';
import { useForm } from '../../hooks/useForm';
import { validationSchema } from '../../utils/validation/validationSchema';

import ImgEdit from '../../components/ImgEdit';
import ROUTES from '../../routers/routes';
import Spinner from '../../components/Spinner';

export const ProfileEdit = () => {
  const { currentUser, isUpdating, updatedSuccess } = useSelector(authSelector);
  const dispatch = useDispatch();
  const history = useHistory();
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
    updatedSuccess && history.goBack();
    return () => {
      dispatch(resetUpdate());
    };
  }, [updatedSuccess, history, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid(validationSchema.userProfile)) {
      dispatch(updateProfile({ userName, firstName, lastName, file }));
    }
  };

  return (
    <>
      <Link to={ROUTES.PROFILE} className="bx bxs-chevron-left text-4xl" />
      <div className="animate__animated animate__slideInUp">
        <div className="flex justify-center my-8 ">
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
          <form onSubmit={handleSubmit} className="px-8 text-center">
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
              className="rounded-4 button-secundary"
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
