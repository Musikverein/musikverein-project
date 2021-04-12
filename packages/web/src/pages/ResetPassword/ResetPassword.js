import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ResetPassword.scss";

import Header from "../../components/Header";

import {
  sendPasswordResetEmail,
  resetAuthState,
} from "../../redux/auth/auth-actions";
import { authSelector } from "../../redux/auth/auth-selectors";

function buttonText(loading, sent) {
  if (loading) {
    return "Sending...";
  }

  if (sent) {
    return "Email Sent!";
  }

  return "Send password reset email";
}

function ResetPassword() {
  const dispatch = useDispatch();
  const {
    isSendingPasswordReset,
    passwordResetError,
    passwordResetSent,
  } = useSelector(authSelector);

  const [email, setEmail] = useState("");

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(sendPasswordResetEmail(email));
    setEmail("");
  }

  function handleSetEmail(e) {
    setEmail(e.target.value);
  }

  return (
    <>
      <main className="ResetPassword">
        <Header />
        <section className="Login__wrapper">
          <h1 className="text-2xl font-bold mb-6">Password Reset</h1>
          <hr className="my-4" />
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="form-input"
              value={email}
              onChange={handleSetEmail}
            />
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSendingPasswordReset || passwordResetSent}
            >
              {buttonText(isSendingPasswordReset, passwordResetSent)}
            </button>
          </form>
          {passwordResetError && (
            <section className="mt-4">{passwordResetError}</section>
          )}
        </section>
      </main>
    </>
  );
}

export default ResetPassword;
