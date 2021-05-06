import api from '../../api';
import * as auth from '../../services/auth';
import * as UserViewTypes from './userView-types';
import { signOutSuccess } from '../auth/auth-actions';
import {
  normalizePlayLists,
  normalizeSongs,
  normalizeUsers,
} from '../../utils/normalizrSchema/schema';
import { loadUsers } from '../user/user-actions';
import { loadSongs } from '../song/song-actions';
import { loadPlayList } from '../playList/playList-actions';

export const getUserViewRequest = () => ({
  type: UserViewTypes.USER_VIEW_GET_REQUEST,
});
export const getUserViewSuccess = () => ({
  type: UserViewTypes.USER_VIEW_GET_SUCCESS,
});
export const getUserViewError = (message) => ({
  type: UserViewTypes.USER_VIEW_GET_ERROR,
  payload: message,
});

export const getUserView = ({ userId }) => {
  return async function getUserViewThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(getUserViewRequest());
    try {
      const { errorMessage, data: response } = await api.getUserView(
        { Authorization: `Bearer ${token}` },
        { userId },
      );
      if (errorMessage) {
        return dispatch(getUserViewError(errorMessage));
      }
      const { entities } = normalizeUsers([response.data]);
      dispatch(loadUsers(entities.users));
      return dispatch(getUserViewRequest());
    } catch (error) {
      return dispatch(getUserViewError(error.message));
    }
  };
};

export const getUserViewSongsRequest = () => ({
  type: UserViewTypes.USER_VIEW_GET_SONGS_REQUEST,
});
export const getUserViewSongsSuccess = (songs) => ({
  type: UserViewTypes.USER_VIEW_GET_SONGS_SUCCESS,
  payload: songs,
});
export const getUserViewSongsError = (message) => ({
  type: UserViewTypes.USER_VIEW_GET_SONGS_ERROR,
  payload: message,
});

export const getUserViewSongs = ({ userId }) => {
  return async function getUserViewSongsThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(getUserViewSongsRequest());
    try {
      const { errorMessage, data: response } = await api.getUserViewSongs(
        { Authorization: `Bearer ${token}` },
        { userId },
      );
      if (errorMessage) {
        return dispatch(getUserViewSongsError(errorMessage));
      }
      const { entities, result } = normalizeSongs(response.data);
      dispatch(loadSongs(entities.songs));
      return dispatch(getUserViewSongsSuccess(result));
    } catch (error) {
      return dispatch(getUserViewSongsError(error.message));
    }
  };
};

export const getUserViewPlayListsRequest = () => ({
  type: UserViewTypes.USER_VIEW_GET_PLAYLISTS_REQUEST,
});
export const getUserViewPlayListsSuccess = (playlists) => ({
  type: UserViewTypes.USER_VIEW_GET_PLAYLISTS_SUCCESS,
  payload: playlists,
});
export const getUserViewPlayListsError = (message) => ({
  type: UserViewTypes.USER_VIEW_GET_PLAYLISTS_ERROR,
  payload: message,
});

export const getUserViewPlayLists = ({ userId }) => {
  return async function getUserViewPlayListsThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(getUserViewPlayListsRequest());
    try {
      const { errorMessage, data: response } = await api.getUserViewPlayLists(
        { Authorization: `Bearer ${token}` },
        { userId },
      );
      if (errorMessage) {
        return dispatch(getUserViewPlayListsError(errorMessage));
      }
      const { entities, result } = normalizePlayLists(response.data);
      dispatch(loadPlayList(entities.playLists));
      return dispatch(getUserViewPlayListsSuccess(result));
    } catch (error) {
      return dispatch(getUserViewPlayListsError(error.message));
    }
  };
};

export const getUserViewFollowedRequest = () => ({
  type: UserViewTypes.USER_VIEW_GET_FOLLOWEDBY_REQUEST,
});
export const getUserViewFollowedSuccess = () => ({
  type: UserViewTypes.USER_VIEW_GET_FOLLOWEDBY_SUCCESS,
});
export const getUserViewFollowedError = (message) => ({
  type: UserViewTypes.USER_VIEW_GET_FOLLOWEDBY_ERROR,
  payload: message,
});

export const getUserViewFollowed = ({ userId }) => {
  return async function getUserViewThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(getUserViewFollowedRequest());
    try {
      const { errorMessage, data: response } = await api.getUserViewFollowed(
        { Authorization: `Bearer ${token}` },
        { userId },
      );
      if (errorMessage) {
        return dispatch(getUserViewFollowedError(errorMessage));
      }
      const { entities, result } = normalizeUsers(response.data.folloedBy);
      dispatch(loadUsers(entities.users));
      dispatch(
        loadUsers({
          [response.data._id]: { ...response.data, folloedBy: result },
        }),
      );
      return dispatch(getUserViewFollowedRequest());
    } catch (error) {
      return dispatch(getUserViewFollowedError(error.message));
    }
  };
};

export const getUserViewFollowingRequest = () => ({
  type: UserViewTypes.USER_VIEW_GET_FOLLOWING_REQUEST,
});
export const getUserViewFollowingSuccess = () => ({
  type: UserViewTypes.USER_VIEW_GET_FOLLOWING_SUCCESS,
});
export const getUserViewFollowingError = (message) => ({
  type: UserViewTypes.USER_VIEW_GET_FOLLOWING_ERROR,
  payload: message,
});

export const getUserViewFollowing = ({ userId }) => {
  return async function getUserViewThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(getUserViewFollowingRequest());
    try {
      const { errorMessage, data: response } = await api.getUserViewFollowing(
        { Authorization: `Bearer ${token}` },
        { userId },
      );
      if (errorMessage) {
        return dispatch(getUserViewFollowingError(errorMessage));
      }
      const { entities, result } = normalizeUsers(response.data.following);
      dispatch(loadUsers(entities.users));
      dispatch(
        loadUsers({
          [response.data._id]: { ...response.data, following: result },
        }),
      );
      return dispatch(getUserViewFollowingRequest());
    } catch (error) {
      return dispatch(getUserViewFollowingError(error.message));
    }
  };
};