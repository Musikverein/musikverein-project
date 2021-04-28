import api from '../../api';
import * as auth from '../../services/auth';
import { normalizePlaylists } from '../../utils/normalizrSchema/schema';
import { signOutSuccess } from '../auth/auth-actions';
import { loadPlayList } from '../playList/playList-actions';
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
  return async function createPlaylistThunk(dispatch) {
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

export const getUserPlaylistsRequest = () => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_GET_REQUEST,
});
export const getUserPlaylistsSuccess = (playlists) => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_GET_SUCCESS,
  payload: playlists,
});
export const getUserPlaylistsError = (message) => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_GET_ERROR,
  payload: message,
});

export const getUserPlaylists = (filter) => {
  return async function getUserPlaylistsThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(getUserPlaylistsRequest());
    try {
      const { errorMessage, data: response } =
        filter === LibraryPlayListTypes.USER_PLAYLIST_PATH_OWN_PLAYLIST
          ? await api.getUserPlaylists({
              Authorization: `Bearer ${token}`,
            })
          : await api.getFollowPlaylists({
              Authorization: `Bearer ${token}`,
            });
      if (errorMessage) {
        return dispatch(getUserPlaylistsError(errorMessage));
      }

      const { result, entities } = normalizePlaylists(response.data);

      dispatch(loadPlayList(entities.playlists));
      return dispatch(getUserPlaylistsSuccess(result));
    } catch (error) {
      return dispatch(getUserPlaylistsError(error.message));
    }
  };
};

export const setCurrentPath = (path) => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_SET_CURRENT_PATH,
  payload: path,
});
