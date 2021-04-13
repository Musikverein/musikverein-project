import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import './Login.scss';

import * as ROUTES from '../../routes';

import {
  resetAuthState,
  signInWithEmailRequest,
  signUpError,
  signUpWithGoogleRequest,
} from '../../redux/auth/auth-actions';

import { authSelector } from '../../redux/auth/auth-selectors';
import InputPassword from '../../components/InputPassword';
import Logo from '../../components/Logo';
import { useForm } from '../../hooks/useForm';
import { validationSchema } from '../../utils/validation/validationSchema';

function Login() {
  const dispatch = useDispatch();
  const { isSigningUp, signUpErrorMsg, isAuthenticated } = useSelector(
    authSelector,
  );

  const [formValues, handleInputChange, resetForm] = useForm({
    email: '',
    password: '',
  });

  const { email, password } = formValues;

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  function handleLoginWithGoogle(e) {
    e.preventDefault();
    dispatch(signUpWithGoogleRequest());
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { error } = validationSchema.login.validate(formValues);
    if (error) {
      dispatch(signUpError(error.message));
    } else {
      dispatch(signInWithEmailRequest(email, password));
      resetForm();
    }
  }

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <>
      <main className="Login">
        <section className="Login__wrapper">
          <Logo size="m" />
          <div className="text-center my-8">
            <h2 className="text-xl font-bold">Looking to listen to music?</h2>
            <p className="text-xm">Save your songs</p>
          </div>
          <div className="card">
            <form onSubmit={handleSubmit}>
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
              <InputPassword
                className="form-input rounded-md"
                id="password"
                name="password"
                arial-label="Insert your password"
                value={password}
                onChange={handleInputChange}
                placeholder="Insert your password"
              />
              {signUpErrorMsg ? (
                <section className="mt-4 p-3 text-center">
                  {signUpErrorMsg}
                </section>
              ) : (
                <div className="mt-4 p-3" />
              )}
              <Link
                to={ROUTES.RESET_PASSWORD}
                className="underline text-blue-gray-200 w-full text-center block"
              >
                Forgot your password?
              </Link>
              <button
                className="btn w-full rounded-md button__primary mt-8 mb-0"
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
              className="btn mt-4 rounded-md button__secundary bx bxl-google"
              type="button"
              onClick={handleLoginWithGoogle}
              disabled={isSigningUp}
            />
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
}

export default Login;
