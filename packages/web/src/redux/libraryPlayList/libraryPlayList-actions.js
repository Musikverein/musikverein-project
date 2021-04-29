import api from '../../api';
import * as auth from '../../services/auth';
import { imageUpload } from '../../services/cloudinary';
import { normalizePlayLists } from '../../utils/normalizrSchema/schema';
import { signOutSuccess } from '../auth/auth-actions';
import { syncPlayListDelete } from '../player/player-actions';
import { loadPlayList, removePlayList } from '../playList/playList-actions';
import * as LibraryPlayListTypes from './libraryPlayList-types';

export const createPlayListRequest = () => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_CREATE_REQUEST,
});
export const createPlayListSuccess = (playListId) => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_CREATE_SUCCESS,
  payload: playListId,
});
export const createPlayListError = (message) => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_CREATE_ERROR,
  payload: message,
});
export const playListReset = () => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_CREATE_RESET,
});

export const createPlayList = ({
  title,
  type,
  isPublic,
  recaptchaToken,
  image,
}) => {
  return async function createPlayListThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(createPlayListRequest());
    try {
      let imgUrl = null;
      if (typeof image !== 'string') {
        imgUrl = await imageUpload(
          image,
          process.env.REACT_APP_CLOUDINARY_PRESET_PLAYLIST,
        );
      } else {
        imgUrl = image;
      }
      const { errorMessage, data: response } = await api.createPlayList(
        {
          Authorization: `Bearer ${token}`,
        },
        {
          title,
          type,
          isPublic,
          image: imgUrl,
          recaptchaToken,
        },
      );

      if (errorMessage) {
        return dispatch(createPlayListError(errorMessage));
      }

      const { entities, result } = normalizePlayLists([response.data]);
      dispatch(loadPlayList(entities.playLists));
      return dispatch(createPlayListSuccess(result[0]));
    } catch (error) {
      return dispatch(createPlayListError(error.message));
    }
  };
};

export const getUserPlayListsRequest = () => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_GET_REQUEST,
});
export const getUserPlayListsSuccess = (playLists) => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_GET_SUCCESS,
  payload: playLists,
});
export const getUserPlayListsError = (message) => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_GET_ERROR,
  payload: message,
});

export const getUserPlayLists = (filter) => {
  return async function getUserPlayListsThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(getUserPlayListsRequest());
    try {
      const { errorMessage, data: response } =
        filter === LibraryPlayListTypes.USER_PLAYLIST_PATH_OWN_PLAYLIST
          ? await api.getUserPlayLists({
              Authorization: `Bearer ${token}`,
            })
          : await api.getFollowedPlayLists({
              Authorization: `Bearer ${token}`,
            });
      if (errorMessage) {
        return dispatch(getUserPlayListsError(errorMessage));
      }

      const { result, entities } = normalizePlayLists(response.data);

      dispatch(loadPlayList(entities.playLists));
      return dispatch(getUserPlayListsSuccess(result));
    } catch (error) {
      return dispatch(getUserPlayListsError(error.message));
    }
  };
};

export const setCurrentPath = (path) => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_SET_CURRENT_PATH,
  payload: path,
});
export const deletePlayListRequest = () => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_DELETE_REQUEST,
});
export const deletePlayListSuccess = (playList) => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_DELETE_SUCCESS,
  payload: playList._id,
});
export const deletePlayListError = (message) => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_DELETE_ERROR,
  payload: message,
});

export const deletePlayList = (playListId) => {
  return async function deletePlayListThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(deletePlayListRequest());
    try {
      const { errorMessage, data: response } = await api.deletePlayList(
        {
          Authorization: `Bearer ${token}`,
        },
        { playListId },
      );
      if (errorMessage) {
        return dispatch(deletePlayListError(errorMessage));
      }
      dispatch(deletePlayListSuccess(response.data));
      dispatch(syncPlayListDelete(response.data));
      return dispatch(removePlayList(response.data));
    } catch (error) {
      return dispatch(deletePlayListError(error.message));
    }
  };
};

export const followPlayListRequest = () => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_FOLLOW_REQUEST,
});
export const followPlayListSuccess = (playList) => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_FOLLOW_SUCCESS,
  payload: playList,
});
export const followPlayListError = (message) => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_FOLLOW_ERROR,
  payload: message,
});
export const syncFollowUserPlayLists = (playListId) => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_SYNC_FOLLOW,
  payload: playListId,
});

export const followPlayList = (playListId) => {
  return async function followSongThunk(dispatch, getState) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(followPlayListRequest());
    try {
      const { errorMessage, data: response } = await api.followPlayList(
        {
          Authorization: `Bearer ${token}`,
        },
        { playListId },
      );
      if (errorMessage) {
        return dispatch(followPlayListError(errorMessage));
      }
      const { entities, result } = normalizePlayLists([response.data]);

      dispatch(loadPlayList(entities.playLists));
      const { currentPath } = getState().ui.libraryPlayList;
      if (
        currentPath === LibraryPlayListTypes.USER_PLAYLIST_PATH_FOLLOW_PLAYLIST
      ) {
        dispatch(syncFollowUserPlayLists(result[0]));
      }
      return dispatch(followPlayListSuccess());
    } catch (error) {
      return dispatch(followPlayListError(error.message));
    }
  };
};

export const editUserPlayListRequest = () => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_EDIT_REQUEST,
});
export const editUserPlayListSuccess = () => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_EDIT_SUCCESS,
});
export const editUserPlayListError = (message) => ({
  type: LibraryPlayListTypes.USER_PLAYLIST_EDIT_ERROR,
  payload: message,
});

export const editUserPlayList = ({
  title,
  isPublic,
  type,
  playListId,
  image,
  recaptchaToken,
}) => {
  return async function editUserPlaylistThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }
    dispatch(editUserPlayListRequest());

    try {
      let imgUrl = null;
      if (typeof image !== 'string') {
        imgUrl = await imageUpload(
          image,
          process.env.REACT_APP_CLOUDINARY_PRESET_PLAYLIST,
        );
      } else {
        imgUrl = image;
      }
      const { errorMessage, data: response } = await api.editPlayList(
        {
          Authorization: `Bearer ${token}`,
        },
        { title, isPublic, type, playListId, recaptchaToken, image: imgUrl },
      );
      if (errorMessage) {
        return dispatch(editUserPlayListError(errorMessage));
      }
      const { entities } = normalizePlayLists([response.data]);
      dispatch(loadPlayList(entities.playLists));
      return dispatch(editUserPlayListSuccess());
    } catch (error) {
      return dispatch(editUserPlayListError(error.message));
    }
  };
};
