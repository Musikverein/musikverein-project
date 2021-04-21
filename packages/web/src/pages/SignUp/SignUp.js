import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

import './SignUp.scss';

import {
  resetAuthState,
  signUpWithEmailRequest,
  signUpWithGoogleRequest,
} from '../../redux/auth/auth-actions';
import { authSelector } from '../../redux/auth/auth-selectors';
import Logo from '../../components/Logo';
import InputPassword from '../../components/InputPassword';
import { useForm } from '../../hooks/useForm';
import { validationSchema } from '../../utils/validation/validationSchema';
import ROUTES from '../../routers/routes';

export const SignUp = () => {
  const dispatch = useDispatch();
  const { isSigningUp, signUpErrorMsg } = useSelector(authSelector);
  const reRef = useRef();
  const { formValues, handleInputChange, resetForm, errors, isValid } = useForm(
    {
      email: '',
      password: '',
      confirmPassword: '',
    },
  );

  const { email, password, confirmPassword } = formValues;

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  const handleLoginWithGoogle = (e) => {
    e.preventDefault();
    dispatch(signUpWithGoogleRequest());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValid(validationSchema.signup)) {
      const recaptchaToken = await reRef.current.executeAsync();
      reRef.current.reset();

      dispatch(signUpWithEmailRequest(email, password, recaptchaToken));
      resetForm();
    }
  };

  return (
    <>
      <main className="SignUp">
        <section className="Login__wrapper">
          <Logo size="m" titleLogo />
          <form onSubmit={handleSubmit}>
            <div className="card mt-8">
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
              <InputPassword
                className="form-input rounded-md mb-0"
                id="password"
                name="password"
                arial-label="Insert your password"
                value={password}
                onChange={handleInputChange}
                placeholder="Insert your password"
              />
              <span className="mb-2 p-2 block text-error">
                {errors.password ? errors.password : ''}
              </span>
              <InputPassword
                className="form-input rounded-md mb-0"
                name="confirmPassword"
                id="confirmPassword"
                arial-label="Repeat your password"
                value={confirmPassword}
                onChange={handleInputChange}
                placeholder="Repeat your password"
              />
              <span className="mb-2 p-2 block text-error">
                {errors.confirmPassword ? errors.confirmPassword : ''}
              </span>
              {signUpErrorMsg ? (
                <section className="mt-4 p-3 text-center text-error">
                  {signUpErrorMsg}
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
                className="btn w-full rounded-md bg__primary mt-8 mb-0"
                type="submit"
                disabled={isSigningUp}
              >
                Sign up
              </button>
            </div>
            <section className="mt-4 text-center">
              <p>Sign up with:</p>
              <button
                className="btn mt-4 rounded-md bg__secundary bx bxl-google"
                type="button"
                onClick={handleLoginWithGoogle}
                disabled={isSigningUp}
              />
            </section>
            <p className="text-sm text-gray-200 text-center">
              By clicking Sign Up, you agree to Musikverein&apos;s&nbsp;
              <Link className="text-sm underline" to={ROUTES.TOS}>
                Terms and Conditions of Use.
              </Link>
            </p>
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
};
