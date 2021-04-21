import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import './ProfileEdit.scss';

import { useForm } from '../../hooks/useForm';
import { resetUpdate, updateProfile } from '../../redux/auth/auth-actions';
import { authSelector } from '../../redux/auth/auth-selectors';
import ROUTES from '../../routers/routes';
import { validationSchema } from '../../utils/validation/validationSchema';

export const ProfileEdit = () => {
  const { currentUser, isUpdating, updatedSuccess } = useSelector(authSelector);
  const { formValues, handleInputChange, errors, isValid } = useForm({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    userName: currentUser.userName,
  });
  const [newImageProfile, setNewImageProfile] = useState({
    urlPreview: null,
    file: null,
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const { urlPreview, file } = newImageProfile;
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

  const handleProfileImage = () => {
    if (urlPreview) {
      document.querySelector('#imageProfile').value = '';
      setNewImageProfile({ file: null, urlPreview: null });
    } else {
      document.querySelector('#imageProfile').click();
    }
  };

  const handleImageProfileChange = (e) => {
    const currentFile = e.target.files[0];
    if (currentFile) {
      const reader = new FileReader();

      reader.addEventListener('load', function readerFiles() {
        setNewImageProfile({ file: currentFile, urlPreview: reader.result });
      });
      reader.readAsDataURL(currentFile);
    } else {
      setNewImageProfile({ file: null, urlPreview: null });
    }
  };

  return (
    <>
      <Link to={ROUTES.PROFILE} className="bx bxs-chevron-left text-4xl" />
      <div className="animate__animated animate__slideInUp">
        <div className="flex justify-center my-8 ">
          <div className="relative w-32 h-32">
            <button
              className="absolute bottom-0 right-0"
              type="button"
              onClick={handleProfileImage}
            >
              <span
                className={
                  urlPreview ? 'bx bx-x icon_edit' : 'bx bxs-pencil icon_edit'
                }
              />
            </button>
            <img
              src={urlPreview || currentUser.image}
              className="w-32 h-32 rounded-full border-2 border-mk-magenta object-cover "
              alt="profile"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-4">
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
          <input
            type="file"
            name="imageProfile"
            id="imageProfile"
            className="hidden"
            onChange={handleImageProfileChange}
            multiple={false}
          />
          <button
            type="submit"
            className="btn w-full rounded-md button__primary mt-8 mb-0"
            disabled={isUpdating}
          >
            Update profile
          </button>
        </form>
      </div>
    </>
  );
};
