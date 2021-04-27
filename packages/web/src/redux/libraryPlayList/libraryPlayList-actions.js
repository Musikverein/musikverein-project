import api from '../../api';
import * as auth from '../../services/auth';
import { signOutSuccess } from '../auth/auth-actions';
import * as LibraryPlayListTypes from './libraryPlayList-types';

export const createPlayListRequest = () => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_CREATE_REQUEST,
});
export const createPlayListSuccess = () => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_CREATE_SUCCESS,
});
export const createPlayListError = (message) => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_CREATE_ERROR,
  payload: message,
});

export const createPlayListReset = () => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_CREATE_RESET,
});

export const createPlayList = ({
  title,
  type,
  publicPlayList,
  recaptchaToken,
}) => {
  return async function uploadSongThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(createPlayListRequest());
    try {
      const { errorMessage } = await api.createPlayList(
        {
          Authorization: `Bearer ${token}`,
        },
        {
          title,
          type,
          public: publicPlayList,
          recaptchaToken,
        },
      );

      if (errorMessage) {
        return dispatch(createPlayListError(errorMessage));
      }

      return dispatch(createPlayListSuccess());
    } catch (error) {
      return dispatch(createPlayListError(error.message));
    }
  };
};
