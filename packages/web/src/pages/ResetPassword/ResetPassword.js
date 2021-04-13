import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './ResetPassword.scss';
import * as ROUTES from '../../routes';

import {
  sendPasswordResetEmail,
  resetAuthState,
  sendPasswordResetEmailError,
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

  const [formValues, handleInputChange, resetForm] = useForm({
    email: '',
  });

  const { email } = formValues;

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();

    const { error } = validationSchema.resetPassword.validate(formValues);
    if (error) {
      dispatch(sendPasswordResetEmailError(error.message));
    } else {
      dispatch(sendPasswordResetEmail(email));
      resetForm();
    }
  }

  return (
    <>
      <main className="ResetPassword">
        <section className="Login__wrapper">
          <Logo size="m" />
          <form className="card mt-8" onSubmit={handleSubmit}>
            <input
              type="text"
              id="email"
              name="email"
              arial-label="Insert your email"
              className="form-input rounded-md"
              value={email}
              onChange={handleInputChange}
              placeholder="Insert your email"
            />
            {passwordResetError ? (
              <section className="mt-4 p-3 text-center">
                {passwordResetError}
              </section>
            ) : (
              <div className="mt-4 p-3" />
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
