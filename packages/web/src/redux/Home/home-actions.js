import * as auth from '../../services/auth';
import { signOutSuccess } from '../auth/auth-actions';
import * as HomeTypes from './home-types';
import api from '../../api';
import {
  normalizePlayLists,
  normalizeSongs,
} from '../../utils/normalizrSchema/schema';
import { loadSongs } from '../song/song-actions';
import { loadPlayList } from '../playList/playList-actions';
import { loadUsers } from '../user/user-actions';

export const getTrendSongsRequest = () => ({
  type: HomeTypes.GET_TREND_SONG_REQUEST,
});
export const getTrendSongsSuccess = (songs) => ({
  type: HomeTypes.GET_TREND_SONG_SUCCESS,
  payload: songs,
});
export const getTrendSongsError = (message) => ({
  type: HomeTypes.GET_TREND_SONG_ERROR,
  payload: message,
});

export const getTrendSongs = () => {
  return async function getTrendSongsThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(getTrendSongsRequest());
    try {
      const { errorMessage, data: response } = await api.getTrendSongs({
        Authorization: `Bearer ${token}`,
      });
      if (errorMessage || response.error) {
        return dispatch(getTrendSongsError(errorMessage || response.error));
      }

      const { result, entities } = normalizeSongs(response.data);

      dispatch(loadSongs(entities.songs));
      return dispatch(getTrendSongsSuccess(result));
    } catch (error) {
      return dispatch(getTrendSongsError(error.message));
    }
  };
};

export const getTrendPlayListsRequest = () => ({
  type: HomeTypes.GET_TREND_PLAYLIST_REQUEST,
});
export const getTrendPlayListsSuccess = (playLists) => ({
  type: HomeTypes.GET_TREND_PLAYLIST_SUCCESS,
  payload: playLists,
});
export const getTrendPlayListsError = (message) => ({
  type: HomeTypes.GET_TREND_PLAYLIST_ERROR,
  payload: message,
});

export const getTrendPlayLists = () => {
  return async function getTrendPlayListsThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(getTrendPlayListsRequest());
    try {
      const { errorMessage, data: response } = await api.getTrendPlayLists({
        Authorization: `Bearer ${token}`,
      });
      if (errorMessage || response.error) {
        return dispatch(getTrendPlayListsError(errorMessage || response.error));
      }

      const { result, entities } = normalizePlayLists(response.data);

      dispatch(loadPlayList(entities.playLists));
      return dispatch(getTrendPlayListsSuccess(result));
    } catch (error) {
      return dispatch(getTrendPlayListsError(error.message));
    }
  };
};

export const getTrendUsersRequest = () => ({
  type: HomeTypes.GET_TREND_USER_REQUEST,
});
export const getTrendUsersSuccess = (users) => ({
  type: HomeTypes.GET_TREND_USER_SUCCESS,
  payload: users,
});
export const getTrendUsersError = (message) => ({
  type: HomeTypes.GET_TREND_USER_ERROR,
  payload: message,
});

export const getTrendUsers = () => {
  return async function getTrendUsersThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(getTrendUsersRequest());
    try {
      const { errorMessage, data: response } = await api.getTrendUsers({
        Authorization: `Bearer ${token}`,
      });
      if (errorMessage || response.error) {
        return dispatch(getTrendUsersError(errorMessage || response.error));
      }

      const { result, entities } = normalizePlayLists(response.data);

      dispatch(loadUsers(entities.users));
      return dispatch(getTrendUsersSuccess(result));
    } catch (error) {
      return dispatch(getTrendUsersError(error.message));
    }
  };
};

export const getTrendPlayedRequest = () => ({
  type: HomeTypes.GET_TREND_PLAYED_REQUEST,
});
export const getTrendPlayedSuccess = (songs) => ({
  type: HomeTypes.GET_TREND_PLAYED_SUCCESS,
  payload: songs,
});
export const getTrendPlayedError = (message) => ({
  type: HomeTypes.GET_TREND_PLAYED_ERROR,
  payload: message,
});

export const getTrendPlayed = () => {
  return async function getTrendPlayedThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(getTrendPlayedRequest());
    try {
      const { errorMessage, data: response } = await api.getTrendPlayed({
        Authorization: `Bearer ${token}`,
      });
      if (errorMessage || response.error) {
        return dispatch(getTrendPlayedError(errorMessage || response.error));
      }

      const { result, entities } = normalizePlayLists(response.data);

      dispatch(loadSongs(entities.songs));
      return dispatch(getTrendPlayedSuccess(result));
    } catch (error) {
      return dispatch(getTrendPlayedError(error.message));
    }
  };
};
