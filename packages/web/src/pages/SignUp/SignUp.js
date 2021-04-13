import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import './SignUp.scss';

import * as ROUTES from '../../routes';

import {
  resetAuthState,
  signUpWithEmailRequest,
  signUpWithGoogleRequest,
} from '../../redux/auth/auth-actions';

import { authSelector } from '../../redux/auth/auth-selectors';
import Logo from '../../components/Logo';
import InputPassword from '../../components/InputPassword';

function SignUp() {
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

    dispatch(signUpWithEmailRequest(email, password));

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
      <main className="SignUp">
        <section className="Login__wrapper">
          <Logo />
          <form onSubmit={handleSubmit}>
            <div className="card mt-8">
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
              <InputPassword
                className="form-input rounded-md"
                id="confirmPassword"
                arial-label="Repeat your password"
                value={password}
                onChange={handleSetPassword}
                placeholder="Repeat your password"
              />
              <button
                className="btn w-full rounded-md button__primary mt-8 mb-0"
                type="submit"
                disabled={isSigningUp}
              >
                Sign up
              </button>
            </div>
            <section className="mt-4 text-center">
              <p>Sign up with:</p>
              <button
                className="btn mt-4 rounded-md button__secundary bx bxl-google"
                type="button"
                onClick={handleLoginWithGoogle}
                disabled={isSigningUp}
              />
            </section>
          </form>
          {signUpError && <section className="mt-4">{signUpError}</section>}
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

export default SignUp;
