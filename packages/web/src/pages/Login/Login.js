import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

import './Login.scss';

import {
  resetAuthState,
  signInWithEmailRequest,
  signUpWithGoogleRequest,
} from '../../redux/auth/auth-actions';

import { authSelector } from '../../redux/auth/auth-selectors';
import InputPassword from '../../components/InputPassword';
import Logo from '../../components/Logo';
import { useForm } from '../../hooks/useForm';
import { validationSchema } from '../../utils/validation/validationSchema';
import ROUTES from '../../routers/routes';

export const Login = () => {
  const dispatch = useDispatch();
  const { isSigningUp, signUpErrorMsg } = useSelector(authSelector);
  const reRef = useRef();

  const { formValues, handleInputChange, resetForm, errors, isValid } = useForm(
    {
      email: '',
      password: '',
    },
  );

  const { email, password } = formValues;

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  function handleLoginWithGoogle(e) {
    e.preventDefault();
    dispatch(signUpWithGoogleRequest());
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (isValid(validationSchema.login)) {
      const recaptchaToken = await reRef.current.executeAsync();
      reRef.current.reset();

      dispatch(signInWithEmailRequest(email, password, recaptchaToken));
      resetForm();
    }
  }

  return (
    <>
      <main className="Login">
        <section className="Login__wrapper">
          <Logo size="m" titleLogo />
          <div className="text-center my-8">
            <h2 className="text-xl font-bold">Looking to listen to music?</h2>
            <p className="text-xm">Save your songs</p>
          </div>
          <div className="card">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                id="email"
                name="email"
                arial-label="Insert your email"
                className="form-input rounded-4 mb-0"
                value={email}
                onChange={handleInputChange}
                placeholder="Insert your email"
              />
              <span className="mb-2 p-2 block text-error">
                {errors.email ? errors.email : ' '}
              </span>
              <InputPassword
                className="form-input rounded-4 mb-0"
                id="password"
                name="password"
                arial-label="Insert your password"
                value={password}
                onChange={handleInputChange}
                placeholder="Insert your password"
              />
              <span className="mb-2 p-2 block text-error">
                {errors.password ? errors.password : ' '}
              </span>
              {signUpErrorMsg ? (
                <section className="mt-4 p-3 text-center text-error">
                  {signUpErrorMsg}
                </section>
              ) : (
                <div className="mt-4 p-3 text-error text-center" />
              )}
              <Link
                to={ROUTES.RESET_PASSWORD}
                className="underline text-blue-gray-200 w-full text-center block"
              >
                Forgot your password?
              </Link>
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_WEB_KEY}
                size="invisible"
                ref={reRef}
              />
              <button
                className="btn w-full rounded-4 bg__primary mt-8 mb-0"
                type="submit"
                disabled={isSigningUp}
              >
                Log in
              </button>
            </form>
          </div>

          <section className="mt-4 text-center">
            <p>Log in with:</p>
            <button
              className="btn mt-4 rounded-4 bg__secundary bx bxl-google"
              type="button"
              onClick={handleLoginWithGoogle}
              disabled={isSigningUp}
            />
            <p className="text-sm text-gray-200 text-center">
              By clicking Log in, you agree to Musikverein&apos;s&nbsp;
              <Link className="text-sm underline" to={ROUTES.TOS}>
                Terms and Conditions of Use.
              </Link>
            </p>
            <Link
              to={ROUTES.SIGN_UP}
              className="underline text-blue-gray-200 w-full text-center block"
            >
              Don&#8216;t have an account? Sign Up
            </Link>
          </section>
        </section>
      </main>
    </>
  );
};
