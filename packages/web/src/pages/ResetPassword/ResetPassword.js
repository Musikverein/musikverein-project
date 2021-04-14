import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './ResetPassword.scss';
import * as ROUTES from '../../routes';

import {
  sendPasswordResetEmail,
  resetAuthState,
} from '../../redux/auth/auth-actions';
import { authSelector } from '../../redux/auth/auth-selectors';
import Logo from '../../components/Logo';
import { useForm } from '../../hooks/useForm';
import { validationSchema } from '../../utils/validation/validationSchema';

function buttonText(loading, sent) {
  if (loading) {
    return 'Sending...';
  }

  if (sent) {
    return 'Email Sent!';
  }

  return 'Send password reset email';
}

function ResetPassword() {
  const dispatch = useDispatch();
  const {
    isSendingPasswordReset,
    passwordResetError,
    passwordResetSent,
  } = useSelector(authSelector);

  const { formValues, handleInputChange, resetForm, errors, isValid } = useForm(
    {
      email: '',
    },
  );

  const { email } = formValues;

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isValid(validationSchema.resetPassword)) {
      dispatch(sendPasswordResetEmail(email));
      resetForm();
    }
  }

  return (
    <>
      <main className="ResetPassword">
        <section className="Login__wrapper">
          <Logo size="m" titleLogo />
          <form className="card mt-8" onSubmit={handleSubmit}>
            <input
              type="text"
              id="email"
              name="email"
              arial-label="Insert your email"
              className="form-input rounded-md mb-0"
              value={email}
              onChange={handleInputChange}
              placeholder="Insert your email"
            />
            <span className="mb-2 p-2 block text-error">
              {errors.email ? errors.email : ''}
            </span>
            {passwordResetError ? (
              <section className="mt-4 p-3 text-center text-error">
                {passwordResetError}
              </section>
            ) : (
              <div className="m-2" />
            )}
            <button
              type="submit"
              className="btn w-full rounded-md button__primary mt-4 mb-0"
              disabled={isSendingPasswordReset || passwordResetSent}
            >
              {buttonText(isSendingPasswordReset, passwordResetSent)}
            </button>
          </form>
        </section>
        <Link
          to={ROUTES.LOGIN}
          className="underline text-blue-gray-200 w-full text-center block"
        >
          Log in
        </Link>
      </main>
    </>
  );
}

export default ResetPassword;
