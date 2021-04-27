import * as auth from '../../services/auth';
import * as MySongTypes from './mySong-types';
import { signOutSuccess } from '../auth/auth-actions';
import api from '../../api';
import { normalizeSongs } from '../../utils/normalizrSchema/schema';
import { loadSongs, removeSong } from '../song/song-actions';
import { imageUpload, songUpload } from '../../services/cloudinary';

export const getMySongsRequest = () => ({
  type: MySongTypes.MY_SONG_GET_REQUEST,
});
export const getMySongsSuccess = (songs) => ({
  type: MySongTypes.MY_SONG_GET_SUCCESS,
  payload: songs,
});
export const getMySongsError = (message) => ({
  type: MySongTypes.MY_SONG_GET_ERROR,
  payload: message,
});

export const getMySongs = () => {
  return async function getMySongsThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(getMySongsRequest());
    try {
      const { errorMessage, data: response } = await api.getSongs({
        Authorization: `Bearer ${token}`,
      });
      if (errorMessage) {
        return dispatch(getMySongsError(errorMessage));
      }

      const { result, entities } = normalizeSongs(response.data);

      dispatch(loadSongs(entities.songs));
      return dispatch(getMySongsSuccess(result));
    } catch (error) {
      return dispatch(getMySongsError(error.message));
    }
  };
};

export const editMySongRequest = () => ({
  type: MySongTypes.MY_SONG_EDIT_REQUEST,
});
export const editMySongSuccess = () => ({
  type: MySongTypes.MY_SONG_EDIT_SUCCESS,
});
export const editMySongError = (message) => ({
  type: MySongTypes.MY_SONG_EDIT_ERROR,
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
      return dispatch(editMySongSuccess());
    } catch (error) {
      return dispatch(editMySongError(error.message));
    }
  };
};

export const uploadSongRequest = () => ({
  type: MySongTypes.MY_SONG_UPLOAD_REQUEST,
});
export const uploadSongSuccess = () => ({
  type: MySongTypes.MY_SONG_UPLOAD_SUCCESS,
});
export const uploadSongError = (message) => ({
  type: MySongTypes.MY_SONG_UPLOAD_ERROR,
  payload: message,
});

export const uploadSongReset = () => ({
  type: MySongTypes.MY_SONG_UPLOAD_RESET,
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
      const { errorMessage, data: response } = await api.uploadSong(
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
      // TODO: check error message and request fail

      if (errorMessage) {
        return dispatch(uploadSongError(errorMessage));
      }
      if (response.error) {
        return dispatch(uploadSongError(response.error));
      }

      return dispatch(uploadSongSuccess());
    } catch (error) {
      return dispatch(uploadSongError(error.message));
    }
  };
};

export const likeSongRequest = () => ({
  type: MySongTypes.MY_SONG_LIKE_REQUEST,
});
export const likeSongSuccess = (song) => ({
  type: MySongTypes.MY_SONG_LIKE_SUCCESS,
  payload: song,
});
export const likeSongError = (message) => ({
  type: MySongTypes.MY_SONG_LIKE_ERROR,
  payload: message,
});

export const likeSong = (songId) => {
  return async function likeSongThunk(dispatch) {
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
      const { entities } = normalizeSongs([response.data]);

      dispatch(loadSongs(entities.songs));
      return dispatch(likeSongSuccess());
    } catch (error) {
      return dispatch(likeSongError(error.message));
    }
  };
};

export const deleteSongRequest = () => ({
  type: MySongTypes.MY_SONG_DELETE_REQUEST,
});
export const deleteSongSuccess = (song) => ({
  type: MySongTypes.MY_SONG_DELETE_SUCCESS,
  payload: song._id,
});
export const deleteSongError = (message) => ({
  type: MySongTypes.MY_SONG_DELETE_ERROR,
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
      console.log(response.data);
      dispatch(deleteSongSuccess(response.data));
      return dispatch(removeSong(response.data));
    } catch (error) {
      return dispatch(deleteSongError(error.message));
    }
  };
};
