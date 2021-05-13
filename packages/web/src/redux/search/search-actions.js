import * as SearchTypes from './search-types';
import * as auth from '../../services/auth';
import api from '../../api';
import { signOutSuccess } from '../auth/auth-actions';
import {
  normalizePlayLists,
  normalizeSongs,
  normalizeUsers,
} from '../../utils/normalizrSchema/schema';
import { loadSongs } from '../song/song-actions';
import { loadPlayList } from '../playList/playList-actions';
import { loadUsers } from '../user/user-actions';

export const searchSongsRequest = () => ({
  type: SearchTypes.SEARCH_SONG_REQUEST,
});
export const searchSongsSuccess = (songs) => ({
  type: SearchTypes.SEARCH_SONG_SUCCESS,
  payload: songs,
});
export const searchSongsError = (message) => ({
  type: SearchTypes.SEARCH_SONG_ERROR,
  payload: message,
});
export const resetSearch = () => ({
  type: SearchTypes.SEARCH_RESET,
});

export const searchSongs = (value) => {
  return async function searchSongThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(searchSongsRequest());
    try {
      const { errorMessage, data: response } = await api.searchSongs(
        {
          Authorization: `Bearer ${token}`,
        },
        { value },
      );
      if (errorMessage || response.error) {
        return dispatch(searchSongsError(errorMessage || response.error));
      }

      const { result, entities } = normalizeSongs(response.data);

      dispatch(loadSongs(entities.songs));
      return dispatch(searchSongsSuccess(result));
    } catch (error) {
      return dispatch(searchSongsError(error.message));
    }
  };
};

export const searchPlayListsRequest = () => ({
  type: SearchTypes.SEARCH_PLAYLIST_REQUEST,
});
export const searchPlayListsSuccess = (playlists) => ({
  type: SearchTypes.SEARCH_PLAYLIST_SUCCESS,
  payload: playlists,
});
export const searchPlayListsError = (message) => ({
  type: SearchTypes.SEARCH_PLAYLIST_ERROR,
  payload: message,
});

export const searchPlayLists = (value) => {
  return async function searchPlayListsThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(searchPlayListsRequest());
    try {
      const { errorMessage, data: response } = await api.searchPlayLists(
        {
          Authorization: `Bearer ${token}`,
        },
        { value },
      );
      if (errorMessage || response.error) {
        return dispatch(searchPlayListsError(errorMessage || response.error));
      }

      const { result, entities } = normalizePlayLists(response.data);

      dispatch(loadPlayList(entities.playLists));
      return dispatch(searchPlayListsSuccess(result));
    } catch (error) {
      return dispatch(searchPlayListsError(error.message));
    }
  };
};

export const searchUsersRequest = () => ({
  type: SearchTypes.SEARCH_USER_REQUEST,
});
export const searchUsersSuccess = (users) => ({
  type: SearchTypes.SEARCH_USER_SUCCESS,
  payload: users,
});
export const searchUsersError = (message) => ({
  type: SearchTypes.SEARCH_USER_ERROR,
  payload: message,
});

export const searchUsers = (value) => {
  return async function searchUsersThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(searchUsersRequest());
    try {
      const { errorMessage, data: response } = await api.searchUsers(
        {
          Authorization: `Bearer ${token}`,
        },
        { value },
      );
      if (errorMessage || response.error) {
        return dispatch(searchUsersError(errorMessage || response.error));
      }

      const { result, entities } = normalizeUsers(response.data);

      dispatch(loadUsers(entities.users));
      return dispatch(searchUsersSuccess(result));
    } catch (error) {
      return dispatch(searchUsersError(error.message));
    }
  };
};
