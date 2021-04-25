import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

import './ResetPassword.scss';

import {
  sendPasswordResetEmail,
  resetAuthState,
} from '../../redux/auth/auth-actions';
import { authSelector } from '../../redux/auth/auth-selectors';
import Logo from '../../components/Logo';
import { useForm } from '../../hooks/useForm';
import { validationSchema } from '../../utils/validation/validationSchema';
import ROUTES from '../../routers/routes';
import Spinner from '../../components/Spinner';

function buttonText(loading, sent) {
  if (loading) {
    return 'Sending...';
  }

  if (sent) {
    return 'Email Sent!';
  }

  return 'Send password reset email';
}

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const {
    isSendingPasswordReset,
    passwordResetError,
    passwordResetSent,
  } = useSelector(authSelector);
  const reRef = useRef();
  const { formValues, handleInputChange, resetForm, errors, isValid } = useForm(
    {
      email: '',
    },
  );

  const { email } = formValues;

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValid(validationSchema.resetPassword)) {
      const recaptchaToken = await reRef.current.executeAsync();
      reRef.current.reset();

      dispatch(sendPasswordResetEmail(email, recaptchaToken));
      resetForm();
    }
  };

  return (
    <>
      <main className="ResetPassword">
        <section className="Login__wrapper">
          <Logo size="m" titleLogo />
          {isSendingPasswordReset ? (
            <Spinner />
          ) : (
            <form className="card mt-8" onSubmit={handleSubmit}>
              <input
                type="text"
                id="email"
                name="email"
                arial-label="Insert your email"
                className="form__input"
                value={email}
                onChange={handleInputChange}
                placeholder="Insert your email"
              />
              <span className="mb-2 p-2 block text-error">
                {errors.email ? errors.email : ''}
              </span>
              {passwordResetError ? (
                <section className="p-3 text-center text-error">
                  {passwordResetError}
                </section>
              ) : (
                <div className="m-2" />
              )}
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_WEB_KEY}
                size="invisible"
                ref={reRef}
              />
              <button
                type="submit"
                className="btn w-full button-secundary rounded-4 mt-4 mb-0"
                disabled={isSendingPasswordReset || passwordResetSent}
              >
                {buttonText(isSendingPasswordReset, passwordResetSent)}
              </button>
            </form>
          )}
        </section>
        <Link
          to={ROUTES.LOGIN}
          className="underline text-blue-gray-200 w-full text-center block"
        >
          Back to Log in
        </Link>
      </main>
    </>
  );
};
