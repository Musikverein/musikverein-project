import * as AuthTypes from './auth-types';
import api from '../../api';
import * as auth from '../../services/auth';
import { imageUpload } from '../../services/cloudinary';

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

export function signUpWithEmailRequest(email, password) {
  return async function signUpThunk(dispatch) {
    dispatch(signUpRequest());
    try {
      await auth.singUpWithEmailAndPassword(email, password);
    } catch (error) {
      dispatch(signUpError(error.message));
    }
  };
}

export function signInWithEmailRequest(email, password) {
  return async function signUpThunk(dispatch) {
    dispatch(signUpRequest());
    try {
      await auth.singInWithEmailAndPassword(email, password);
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

    const { errorMessage, data: response } = await api.signUp({
      Authorization: `Bearer ${token}`,
    });

    if (errorMessage) {
      return dispatch(signUpError(errorMessage));
    }

    return dispatch(signUpSuccess(response.data));
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

export function sendPasswordResetEmail(email) {
  return async function sendPasswordResetEmailRequestThunk(dispatch) {
    dispatch(sendPasswordResetEmailRequest());
    try {
      await auth.sendPasswordResetEmail(email);
      dispatch(sendPasswordResetEmailSuccess());
    } catch (error) {
      dispatch(sendPasswordResetEmailError(error.message));
    }
    return dispatch(sendPasswordResetEmailSuccess());
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

export const updateProfile = ({ userName, firstName, lastName, file }) => {
  return async function updateProfileThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(updateProfileRequest());
    try {
      let image = null;

      if (file) {
        const fileUrl = await imageUpload(file);
        image = fileUrl;
      }

      const { errorMessage, data: response } = await api.updateProfile(
        {
          Authorization: `Bearer ${token}`,
        },
        { userName, firstName, lastName, image },
      );
      if (errorMessage) {
        return dispatch(updateProfileError(errorMessage));
      }

      return dispatch(updateProfileSuccess(response.data));
    } catch (error) {
      return dispatch(updateProfileError(error.message));
    }
  };
};

export const updateProfileRequest = () => ({
  type: AuthTypes.UPDATE_PROFILE_REQUEST,
});

export const updateProfileError = (errorMessage) => ({
  type: AuthTypes.UPDATE_PROFILE_ERROR,
  payload: errorMessage,
});

export const updateProfileSuccess = (user) => ({
  type: AuthTypes.UPDATE_PROFILE_SUCCESS,
  payload: user,
});

export const resetUpdate = () => ({
  type: AuthTypes.RESET_UPDATE_PROFILE,
});
