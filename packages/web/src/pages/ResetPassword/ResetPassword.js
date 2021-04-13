import React, { useState, useEffect } from 'react';
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

  const [email, setEmail] = useState('');

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(sendPasswordResetEmail(email));
    setEmail('');
  }

  function handleSetEmail(e) {
    setEmail(e.target.value);
  }

  return (
    <>
      <main className="ResetPassword">
        <section className="Login__wrapper">
          <Logo />
          <form className="card mt-8" onSubmit={handleSubmit}>
            <input
              type="text"
              id="email"
              arial-label="Insert your email"
              className="form-input rounded-md"
              value={email}
              onChange={handleSetEmail}
              placeholder="Insert your email"
            />
            <button
              type="submit"
              className="btn w-full rounded-md button__primary mt-4 mb-0"
              disabled={isSendingPasswordReset || passwordResetSent}
            >
              {buttonText(isSendingPasswordReset, passwordResetSent)}
            </button>
          </form>
          {passwordResetError && (
            <section className="mt-4">{passwordResetError}</section>
          )}
        </section>
        <Link
          to={ROUTES.LOGIN}
          className="underline text-blue-gray-200 w-full text-center block"
        >
          Go back to Log in
        </Link>
      </main>
    </>
  );
}

export default ResetPassword;
