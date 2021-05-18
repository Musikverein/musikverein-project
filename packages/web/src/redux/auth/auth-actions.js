import { toast } from 'react-toastify';
import * as AuthTypes from './auth-types';
import api from '../../api';
import * as auth from '../../services/auth';
import { normalizeUsers } from '../../utils/normalizrSchema/schema';
import { loadUsers } from '../user/user-actions';

export const resetStoreAndLogOut = () => ({
  type: AuthTypes.RESET_STORE_AND_LOG_OUT,
});

export const signUpRequest = () => ({
  type: AuthTypes.SIGN_UP_REQUEST,
});

export const signUpError = (message) => ({
  type: AuthTypes.SIGN_UP_ERROR,
  payload: message,
});

export function signUpWithGoogleRequest() {
  return async function signUpThunk(dispatch) {
    dispatch(signUpRequest());
    try {
      await auth.singInWithGoogle();
    } catch (error) {
      dispatch(signUpError(error.message));
    }
  };
}

export function signUpWithEmailRequest(email, password, recaptchaToken) {
  return async function signUpThunk(dispatch) {
    dispatch(signUpRequest());

    try {
      const { error, data: response } = await api.verifyRecaptchaToken(
        recaptchaToken,
      );

      if (response.data) {
        await auth.singUpWithEmailAndPassword(email, password);
      } else {
        dispatch(signUpError(error));
      }
    } catch (error) {
      dispatch(signUpError(error.message));
    }
  };
}

export function signInWithEmailRequest(email, password, recaptchaToken) {
  return async function signUpThunk(dispatch) {
    dispatch(signUpRequest());

    try {
      const { error, data: response } = await api.verifyRecaptchaToken(
        recaptchaToken,
      );

      if (response.data) {
        await auth.singInWithEmailAndPassword(email, password);
      } else {
        dispatch(signUpError(error));
      }
    } catch (error) {
      dispatch(signUpError(error.message));
    }
  };
}

export function syncSignIn() {
  return async function syncSignInThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    try {
      const { errorMessage, data: response } = await api.signUp({
        Authorization: `Bearer ${token}`,
      });

      if (errorMessage || response.error) {
        return dispatch(signUpError(errorMessage || response.error));
      }
      const { entities, result } = normalizeUsers([response.data]);
      dispatch(loadUsers(entities.users));
      return dispatch(signUpSuccess(result[0]));
    } catch (error) {
      return dispatch(signUpError(error.message));
    }
  };
}

export const signUpSuccess = (user) => ({
  type: AuthTypes.SIGN_UP_SUCCESS,
  payload: user,
});

export const signOutRequest = () => ({
  type: AuthTypes.SIGN_OUT_REQUEST,
});

export function signOut() {
  return async function signOutThunk(dispatch) {
    dispatch(signOutRequest());

    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    const { errorMessage } = await api.signOut({
      Authorization: `Bearer ${token}`,
    });

    if (errorMessage) {
      return dispatch(signOutError(errorMessage));
    }

    auth.signOut();

    return dispatch(signOutSuccess());
  };
}

export const signOutError = (message) => ({
  type: AuthTypes.SIGN_OUT_ERROR,
  payload: message,
});

export const signOutSuccess = () => ({
  type: AuthTypes.SIGN_OUT_SUCCESS,
});

export function sendPasswordResetEmail(email, recaptchaToken) {
  return async function sendPasswordResetEmailRequestThunk(dispatch) {
    dispatch(sendPasswordResetEmailRequest());

    try {
      const { error, data: response } = await api.verifyRecaptchaToken(
        recaptchaToken,
      );

      if (response.data) {
        const firebaseRespone = await auth.sendPasswordResetEmail(email);

        if (firebaseRespone?.error) {
          dispatch(sendPasswordResetEmailError(firebaseRespone.error.message));
        } else {
          toast.success('👌 Email sent!');
          dispatch(sendPasswordResetEmailSuccess());
        }
      } else {
        dispatch(sendPasswordResetEmailError(error));
      }
    } catch (error) {
      dispatch(sendPasswordResetEmailError(error.message));
    }
  };
}

export const sendPasswordResetEmailRequest = () => ({
  type: AuthTypes.SEND_PASSWORD_RESET_EMAIL_REQUEST,
});

export const sendPasswordResetEmailError = (errorMessage) => ({
  type: AuthTypes.SEND_PASSWORD_RESET_EMAIL_ERROR,
  payload: errorMessage,
});

export const sendPasswordResetEmailSuccess = () => ({
  type: AuthTypes.SEND_PASSWORD_RESET_EMAIL_SUCCESS,
});

export const resetAuthState = () => ({
  type: AuthTypes.RESET_AUTH_STATE,
});
