import * as auth from '../../services/auth';
import * as LibrarySongTypes from './librarySong-types';
import { signOutSuccess } from '../auth/auth-actions';
import api from '../../api';
import { normalizeSongs } from '../../utils/normalizrSchema/schema';
import { loadSongs, removeSong } from '../song/song-actions';
import { imageUpload, songUpload } from '../../services/cloudinary';
import { syncSongDelete } from '../player/player-actions';

export const getUserSongsRequest = () => ({
  type: LibrarySongTypes.USER_SONG_GET_REQUEST,
});
export const getUserSongsSuccess = (songs) => ({
  type: LibrarySongTypes.USER_SONG_GET_SUCCESS,
  payload: songs,
});
export const getUserSongsError = (message) => ({
  type: LibrarySongTypes.USER_SONG_GET_ERROR,
  payload: message,
});

export const getUserSongs = (filter) => {
  return async function getUserSongsThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(getUserSongsRequest());
    try {
      const { errorMessage, data: response } =
        filter === LibrarySongTypes.USER_SONG_PATH_OWN_SONGS
          ? await api.getUserSongs({
              Authorization: `Bearer ${token}`,
            })
          : await api.getLikedSongs({
              Authorization: `Bearer ${token}`,
            });
      if (errorMessage) {
        return dispatch(getUserSongsError(errorMessage));
      }

      const { result, entities } = normalizeSongs(response.data);

      dispatch(loadSongs(entities.songs));
      return dispatch(getUserSongsSuccess(result));
    } catch (error) {
      return dispatch(getUserSongsError(error.message));
    }
  };
};

export const editMySongRequest = () => ({
  type: LibrarySongTypes.USER_SONG_EDIT_REQUEST,
});
export const editUserSongsuccess = () => ({
  type: LibrarySongTypes.USER_SONG_EDIT_SUCCESS,
});
export const editMySongError = (message) => ({
  type: LibrarySongTypes.USER_SONG_EDIT_ERROR,
  payload: message,
});

export const editMySong = ({ title, artist, genre, image, songId }) => {
  return async function editMySongThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }
    dispatch(editMySongRequest());

    try {
      let imgUrl = null;
      if (typeof image !== 'string') {
        imgUrl = await imageUpload(
          image,
          process.env.REACT_APP_CLOUDINARY_PRESET_COVERS,
        );
      } else {
        imgUrl = image;
      }
      const { errorMessage, data: response } = await api.editSong(
        {
          Authorization: `Bearer ${token}`,
        },
        { title, artist, genre, image: imgUrl, songId },
      );
      if (errorMessage) {
        return dispatch(editMySongError(errorMessage));
      }
      const { entities } = normalizeSongs([response.data]);
      dispatch(loadSongs(entities.songs));
      return dispatch(editUserSongsuccess());
    } catch (error) {
      return dispatch(editMySongError(error.message));
    }
  };
};

export const uploadSongRequest = () => ({
  type: LibrarySongTypes.USER_SONG_UPLOAD_REQUEST,
});
export const uploadSongSuccess = () => ({
  type: LibrarySongTypes.USER_SONG_UPLOAD_SUCCESS,
});
export const uploadSongError = (message) => ({
  type: LibrarySongTypes.USER_SONG_UPLOAD_ERROR,
  payload: message,
});

export const uploadSongReset = () => ({
  type: LibrarySongTypes.USER_SONG_UPLOAD_RESET,
});

export const uploadSong = ({
  song,
  title,
  artist,
  genre,
  image,
  recaptchaToken,
}) => {
  return async function uploadSongThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(uploadSongRequest());
    try {
      let imgUrl = null;
      if (image) {
        imgUrl = await imageUpload(
          image,
          process.env.REACT_APP_CLOUDINARY_PRESET_COVERS,
        );
      }
      const songResponse = await songUpload(song);
      const songUrl = songResponse.secure_url;
      const songDuration = songResponse.duration;
      const { errorMessage } = await api.uploadSong(
        {
          Authorization: `Bearer ${token}`,
        },
        {
          recaptchaToken,
          title,
          duration: songDuration,
          url: songUrl,
          artist,
          genre,
          image: imgUrl,
        },
      );

      if (errorMessage) {
        return dispatch(uploadSongError(errorMessage));
      }

      return dispatch(uploadSongSuccess());
    } catch (error) {
      return dispatch(uploadSongError(error.message));
    }
  };
};

export const likeSongRequest = () => ({
  type: LibrarySongTypes.USER_SONG_LIKE_REQUEST,
});
export const likeSongSuccess = (song) => ({
  type: LibrarySongTypes.USER_SONG_LIKE_SUCCESS,
  payload: song,
});
export const likeSongError = (message) => ({
  type: LibrarySongTypes.USER_SONG_LIKE_ERROR,
  payload: message,
});
export const syncLikeUserSongs = (songId) => ({
  type: LibrarySongTypes.USER_SONG_SYNC_LIKE,
  payload: songId,
});

export const likeSong = (songId) => {
  return async function likeSongThunk(dispatch, getState) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(likeSongRequest());
    try {
      const { errorMessage, data: response } = await api.likeSong(
        {
          Authorization: `Bearer ${token}`,
        },
        { songId },
      );
      if (errorMessage) {
        return dispatch(likeSongError(errorMessage));
      }
      const { entities, result } = normalizeSongs([response.data]);

      dispatch(loadSongs(entities.songs));
      const { currentPath } = getState().ui.librarySongs;
      if (currentPath === LibrarySongTypes.USER_SONG_PATH_LIKED_SONGS) {
        dispatch(syncLikeUserSongs(result[0]));
      }
      return dispatch(likeSongSuccess());
    } catch (error) {
      return dispatch(likeSongError(error.message));
    }
  };
};

export const deleteSongRequest = () => ({
  type: LibrarySongTypes.USER_SONG_DELETE_REQUEST,
});
export const deleteSongSuccess = (song) => ({
  type: LibrarySongTypes.USER_SONG_DELETE_SUCCESS,
  payload: song._id,
});
export const deleteSongError = (message) => ({
  type: LibrarySongTypes.USER_SONG_DELETE_ERROR,
  payload: message,
});

export const deleteSong = (songId) => {
  return async function deleteSongThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(deleteSongRequest());
    try {
      const { errorMessage, data: response } = await api.deleteSong(
        {
          Authorization: `Bearer ${token}`,
        },
        { songId },
      );
      if (errorMessage) {
        return dispatch(deleteSongError(errorMessage));
      }
      dispatch(deleteSongSuccess(response.data));
      dispatch(syncSongDelete(response.data));
      return dispatch(removeSong(response.data));
    } catch (error) {
      return dispatch(deleteSongError(error.message));
    }
  };
};

export const setCurrentPath = (path) => ({
  type: LibrarySongTypes.USER_SONG_SET_CURRENT_PATH,
  payload: path,
});
