import { toast } from 'react-toastify';
import api from '../../api';
import * as auth from '../../services/auth';
import { imageUpload } from '../../services/cloudinary';
import {
  normalizePlayLists,
  normalizeSongs,
  normalizeUsers,
} from '../../utils/normalizrSchema/schema';
import { signOutSuccess } from '../auth/auth-actions';
import { playPlayList } from '../player/player-actions';
import { loadPlayList, removePlayList } from '../playList/playList-actions';
import { loadSongs } from '../song/song-actions';
import { loadUsers } from '../user/user-actions';
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

      if (errorMessage || response.error) {
        toast.error('🔥 Something went wrong!');
        return dispatch(createPlayListError(errorMessage || response.error));
      }

      const { entities, result } = normalizePlayLists([response.data]);
      dispatch(loadPlayList(entities.playLists));
      toast.dark('🚀 Create playlist correctly!');
      return dispatch(createPlayListSuccess(result[0]));
    } catch (error) {
      toast.error('🔥 Something went wrong!');
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
      if (errorMessage || response.error) {
        return dispatch(getUserPlayListsError(errorMessage || response.error));
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
      if (errorMessage || response.error) {
        toast.error('🔥 Something went wrong!');
        return dispatch(deletePlayListError(errorMessage || response.error));
      }
      dispatch(deletePlayListSuccess(response.data));
      toast.dark('👌 Delete correctly!');
      return dispatch(removePlayList(response.data));
    } catch (error) {
      toast.error('🔥 Something went wrong!');
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
      if (errorMessage || response.error) {
        toast.error('🔥 Something went wrong!');
        return dispatch(followPlayListError(errorMessage || response.error));
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
      toast.error('🔥 Something went wrong!');
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
      if (errorMessage || response.error) {
        toast.error('🔥 Something went wrong!');
        return dispatch(editUserPlayListError(errorMessage || response.error));
      }
      const { entities } = normalizePlayLists([response.data]);
      dispatch(loadPlayList(entities.playLists));
      toast.dark('✌ Update Correctly!');
      return dispatch(editUserPlayListSuccess());
    } catch (error) {
      toast.error('🔥 Something went wrong!');
      return dispatch(editUserPlayListError(error.message));
    }
  };
};

export const addSongToPlayListRequest = () => ({
  type: LibraryPlayListTypes.ADD_SONG_TO_PLAYLIST_REQUEST,
});
export const addSongToPlayListSuccess = () => ({
  type: LibraryPlayListTypes.ADD_SONG_TO_PLAYLIST_SUCCESS,
});
export const addSongToPlayListError = (message) => ({
  type: LibraryPlayListTypes.ADD_SONG_TO_PLAYLIST_ERROR,
  payload: message,
});

export const addSongToPlayList = ({ songId, playListId }) => {
  return async function addSongToPlayListThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }
    dispatch(addSongToPlayListRequest());

    try {
      const { errorMessage, data: response } = await api.addSongToPlayList(
        {
          Authorization: `Bearer ${token}`,
        },
        { songId, playListId },
      );
      if (errorMessage || response.error) {
        toast.error('🔥 Something went wrong!');
        return dispatch(addSongToPlayListError(errorMessage || response.error));
      }
      const { entities } = normalizePlayLists([response.data]);
      dispatch(loadPlayList(entities.playLists));
      toast.dark('✌ Added Correctly!');
      return dispatch(addSongToPlayListSuccess());
    } catch (error) {
      toast.error('🔥 Something went wrong!');
      return dispatch(addSongToPlayListError(error.message));
    }
  };
};

export const getPlayListRequest = () => ({
  type: LibraryPlayListTypes.PLAYLIST_GET_REQUEST,
});
export const getPlayListSuccess = (playLists) => ({
  type: LibraryPlayListTypes.PLAYLIST_GET_SUCCESS,
  payload: playLists,
});
export const getPlayListError = (message) => ({
  type: LibraryPlayListTypes.PLAYLIST_GET_ERROR,
  payload: message,
});

export const getPlayList = (playListId) => {
  return async function getPlayListThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(getPlayListRequest());
    try {
      const { errorMessage, data: response } = await api.getPlayList(
        {
          Authorization: `Bearer ${token}`,
        },
        { playListId },
      );
      if (errorMessage || response.error) {
        return dispatch(getPlayListError(errorMessage || response.error));
      }

      const { entities: entitiesSong, result: resultSong } = normalizeSongs(
        response.data.songs,
      );
      const { entities: entitiesUser, result: resultUser } = normalizeUsers([
        response.data.owner,
      ]);

      dispatch(loadSongs(entitiesSong.songs));
      dispatch(loadUsers(entitiesUser.users));
      dispatch(
        loadPlayList({
          [playListId]: {
            ...response.data,
            songs: resultSong,
            owner: resultUser[0],
          },
        }),
      );
      return dispatch(getPlayListSuccess());
    } catch (error) {
      return dispatch(getPlayListError(error.message));
    }
  };
};

export const removeSongFromPlayListRequest = () => ({
  type: LibraryPlayListTypes.REMOVE_SONG_FROM_PLAYLIST_REQUEST,
});
export const removeSongFromPlayListSuccess = () => ({
  type: LibraryPlayListTypes.REMOVE_SONG_FROM_PLAYLIST_SUCCESS,
});
export const removeSongFromPlayListError = (message) => ({
  type: LibraryPlayListTypes.REMOVE_SONG_FROM_PLAYLIST_ERROR,
  payload: message,
});

export const removeSongFromPlayList = ({ songId, playListId }) => {
  return async function removeSongFromPlayListThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }
    dispatch(removeSongFromPlayListRequest());

    try {
      const { errorMessage, data: response } = await api.removeSongFromPlayList(
        {
          Authorization: `Bearer ${token}`,
        },
        { songId, playListId },
      );
      if (errorMessage || response.error) {
        toast.error('🔥 Something went wrong!');
        return dispatch(
          removeSongFromPlayListError(errorMessage || response.error),
        );
      }
      const { entities } = normalizePlayLists([response.data]);
      dispatch(loadPlayList(entities.playLists));
      toast.dark('👌 Delete Correctly!');
      return dispatch(removeSongFromPlayListSuccess());
    } catch (error) {
      toast.error('🔥 Something went wrong!');
      return dispatch(removeSongFromPlayListError(error.message));
    }
  };
};

export const updateOrderPlayListRequest = () => ({
  type: LibraryPlayListTypes.UPDATE_ORDER_PLAYLIST_REQUEST,
});
export const updateOrderPlayListSuccess = () => ({
  type: LibraryPlayListTypes.UPDATE_ORDER_PLAYLIST_SUCCESS,
});
export const updateOrderPlayListError = (message) => ({
  type: LibraryPlayListTypes.UPDATE_ORDER_PLAYLIST_ERROR,
  payload: message,
});

export const updateOrderPlayList = ({ songs, playListId }) => {
  return async function updateOrderPlayListThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }
    dispatch(updateOrderPlayListRequest());

    try {
      const { errorMessage, data: response } = await api.updateOrderPlayList(
        {
          Authorization: `Bearer ${token}`,
        },
        { songs, playListId },
      );
      if (errorMessage || response.error) {
        toast.error('🔥 Something went wrong!');
        return dispatch(
          updateOrderPlayListError(errorMessage || response.error),
        );
      }
      const { entities } = normalizePlayLists([response.data]);
      dispatch(loadPlayList(entities.playLists));
      return dispatch(updateOrderPlayListSuccess());
    } catch (error) {
      toast.error('🔥 Something went wrong!');
      return dispatch(updateOrderPlayListError(error.message));
    }
  };
};

export const getPlayListAndPlayRequest = () => ({
  type: LibraryPlayListTypes.PLAYLIST_GET_REQUEST,
});
export const getPlayListAndPlaySuccess = () => ({
  type: LibraryPlayListTypes.PLAYLIST_GET_SUCCESS,
});
export const getPlayListAndPlayError = (message) => ({
  type: LibraryPlayListTypes.PLAYLIST_GET_ERROR,
  payload: message,
});

export const getPlayListAndPlay = ({ playListId, songId = null }) => {
  return async function getPlayListAndPlayThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(getPlayListAndPlayRequest());
    try {
      const { errorMessage, data: response } = await api.getPlayList(
        {
          Authorization: `Bearer ${token}`,
        },
        { playListId },
      );
      if (errorMessage || response.error) {
        return dispatch(
          getPlayListAndPlayError(errorMessage || response.error),
        );
      }

      const { entities: entitiesSong, result: resultSong } = normalizeSongs(
        response.data.songs,
      );
      const { entities: entitiesUser, result: resultUser } = normalizeUsers([
        response.data.owner,
      ]);

      dispatch(loadSongs(entitiesSong.songs));
      dispatch(loadUsers(entitiesUser.users));

      dispatch(
        loadPlayList({
          [playListId]: {
            ...response.data,
            songs: resultSong,
            owner: resultUser[0],
          },
        }),
      );

      const songIndex = songId ? resultSong.indexOf(songId) : 0;
      dispatch(playPlayList({ songs: resultSong, songIndex }));
      return dispatch(getPlayListAndPlaySuccess());
    } catch (error) {
      return dispatch(getPlayListAndPlayError(error.message));
    }
  };
};
