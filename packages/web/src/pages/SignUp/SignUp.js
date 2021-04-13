import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import './SignUp.scss';

import * as ROUTES from '../../routes';

import {
  resetAuthState,
  signUpError,
  signUpWithEmailRequest,
  signUpWithGoogleRequest,
} from '../../redux/auth/auth-actions';

import { authSelector } from '../../redux/auth/auth-selectors';
import Logo from '../../components/Logo';
import InputPassword from '../../components/InputPassword';
import { useForm } from '../../hooks/useForm';
import { validationSchema } from '../../utils/validation/validationSchema';

function SignUp() {
  const dispatch = useDispatch();
  const { isSigningUp, signUpErrorMsg, isAuthenticated } = useSelector(
    authSelector,
  );

  const [formValues, handleInputChange, resetForm] = useForm({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { email, password, confirmPassword } = formValues;
  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  function handleLoginWithGoogle(e) {
    e.preventDefault();
    dispatch(signUpWithGoogleRequest());
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { error } = validationSchema.signup.validate(formValues);
    if (error) {
      dispatch(signUpError(error.message));
    } else {
      dispatch(signUpWithEmailRequest(email, password));
      resetForm();
    }
  }

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <>
      <main className="SignUp">
        <section className="Login__wrapper">
          <Logo size="m" />
          <form onSubmit={handleSubmit}>
            <div className="card mt-8">
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
              <InputPassword
                className="form-input rounded-md"
                name="confirmPassword"
                id="confirmPassword"
                arial-label="Repeat your password"
                value={confirmPassword}
                onChange={handleInputChange}
                placeholder="Repeat your password"
              />
              {signUpErrorMsg ? (
                <section className="mt-4 p-3 text-center">
                  {signUpErrorMsg}
                </section>
              ) : (
                <div className="mt-4 p-3" />
              )}
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
        </section>

        <Link
          to={ROUTES.LOGIN}
          className="underline text-blue-gray-200 w-full text-center block"
        >
          Have an account? Log in
        </Link>
      </main>
    </>
  );
}

export default SignUp;
