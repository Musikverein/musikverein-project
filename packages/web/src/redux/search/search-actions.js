import * as SearchTypes from './search-types';
import * as auth from '../../services/auth';
import api from '../../api';
import { signOutSuccess } from '../auth/auth-actions';
import {
  normalizePlayLists,
  normalizeSongs,
} from '../../utils/normalizrSchema/schema';
import { loadSongs } from '../song/song-actions';
import { loadPlayList } from '../playList/playList-actions';

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
      if (errorMessage) {
        return dispatch(searchSongsError(errorMessage));
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
  type: SearchTypes.SEARCH_SONG_REQUEST,
});
export const searchPlayListsSuccess = (playlists) => ({
  type: SearchTypes.SEARCH_SONG_SUCCESS,
  payload: playlists,
});
export const searchPlayListsError = (message) => ({
  type: SearchTypes.SEARCH_SONG_ERROR,
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
      if (errorMessage) {
        return dispatch(searchPlayListsError(errorMessage));
      }

      const { result, entities } = normalizePlayLists(response.data);

      dispatch(loadPlayList(entities.playLists));
      return dispatch(searchPlayListsSuccess(result));
    } catch (error) {
      return dispatch(searchPlayListsError(error.message));
    }
  };
};
