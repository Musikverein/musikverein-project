import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { authSelector } from '../../redux/auth/auth-selectors';
import { validationSchema } from '../../utils/validation/validationSchema';

export const EditProfile = () => {
  const { currentUser } = useSelector(authSelector);
  const { formValues, handleInputChange, errors, isValid, resetForm } = useForm(
    {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
    },
  );
  const dispatch = useDispatch();

  const { firstName, lastName } = formValues;

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid(validationSchema.userProfile)) {
      dispatch();
      resetForm();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
      <input type="file" />
      <button type="submit">Update profile</button>
    </form>
  );
};
