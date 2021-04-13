import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import './Login.scss';

import * as ROUTES from '../../routes';

import {
  resetAuthState,
  signInWithEmailRequest,
  signUpWithGoogleRequest,
} from '../../redux/auth/auth-actions';

import { authSelector } from '../../redux/auth/auth-selectors';
import InputPassword from '../../components/InputPassword';
import Logo from '../../components/Logo';

function Login() {
  const dispatch = useDispatch();
  const { isSigningUp, signUpError, isAuthenticated } = useSelector(
    authSelector,
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  function handleLoginWithGoogle(e) {
    e.preventDefault();
    dispatch(signUpWithGoogleRequest());
  }

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(signInWithEmailRequest(email, password));

    setEmail('');
    setPassword('');
  }

  function handleSetEmail(e) {
    setEmail(e.target.value);
  }

  function handleSetPassword(e) {
    setPassword(e.target.value);
  }

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <>
      <main className="Login">
        <section className="Login__wrapper">
          <Logo />
          <div className="text-center my-8">
            <h2 className="text-xl font-bold">¿En busca de escuchar música?</h2>
            <p className="text-xm">Guarda tus canciones</p>
          </div>
          <div className="card">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="email"
                arial-label="Insert your email"
                className="form-input rounded-md"
                value={email}
                onChange={handleSetEmail}
                placeholder="Insert your email"
              />
              <InputPassword
                className="form-input rounded-md"
                id="password"
                arial-label="Insert your password"
                value={password}
                onChange={handleSetPassword}
                placeholder="Insert your password"
              />
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
                Login
              </button>
            </form>
          </div>

          {signUpError && <section className="mt-4">{signUpError}</section>}
          <section className="mt-4 text-center">
            <button
              className="btn rounded-md button__secundary bx bxl-google"
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
