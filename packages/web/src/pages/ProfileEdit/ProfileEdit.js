import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { updateProfile } from '../../redux/auth/auth-actions';
import { authSelector } from '../../redux/auth/auth-selectors';
import ROUTES from '../../routes';
import { validationSchema } from '../../utils/validation/validationSchema';

export const ProfileEdit = () => {
  const { currentUser } = useSelector(authSelector);
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

  const { urlPreview, file } = newImageProfile;
  const { firstName, lastName, userName } = formValues;

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid(validationSchema.userProfile)) {
      console.log({ userName, firstName, lastName, image: file });
      /* dispatch(updateProfile({ userName, firstName, lastName, image: file })); */
    }
  }

  const handleProfileImage = () => {
    document.querySelector('#imageProfile').click();
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

      <img
        src={
          urlPreview ||
          currentUser.image ||
          'https://i.pinimg.com/originals/6e/ff/53/6eff53e82b80fb5dd7614d5ba054f144.jpg'
        }
        className="w-32 h-32 rounded-full mx-auto border-2 border-mk-magenta"
        alt="profile"
      />

      <button
        type="button"
        className="rounded-md px-4 border font-light text-sm border-mk-magenta mt-2"
        onClick={handleProfileImage}
      >
        Edit your profile image
      </button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="userName"
          name="userName"
          arial-label="Insert your user name"
          className="form-input rounded-md mb-0"
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
          className="form-input rounded-md mb-0"
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
          className="form-input rounded-md mb-0"
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
        />
        <button type="submit">Update profile</button>
      </form>
    </>
  );
};
