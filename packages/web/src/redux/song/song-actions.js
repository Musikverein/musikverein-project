import { imageUpload, songUpload } from '../../services/cloudinary';
import * as SongTypes from './song-types';
import * as auth from '../../services/auth';
import api from '../../api';
import { signOutSuccess } from '../auth/auth-actions';

export const editSongRequest = () => ({
  type: SongTypes.SONG_EDIT_REQUEST,
});
export const editSongSuccess = (song) => ({
  type: SongTypes.SONG_EDIT_SUCCESS,
  payload: song,
});
export const editSongError = (message) => ({
  type: SongTypes.SONG_EDIT_ERROR,
  payload: message,
});

export const uploadSongRequest = () => ({
  type: SongTypes.SONG_UPLOAD_REQUEST,
});
export const uploadSongSuccess = (song) => ({
  type: SongTypes.SONG_UPLOAD_SUCCESS,
  payload: song,
});
export const uploadSongError = (message) => ({
  type: SongTypes.SONG_UPLOAD_ERROR,
  payload: message,
});

export const getSongsRequest = () => ({
  type: SongTypes.SONG_GET_REQUEST,
});
export const getSongsSuccess = (songs) => ({
  type: SongTypes.SONG_GET_SUCCESS,
  payload: songs,
});
export const getSongsError = (message) => ({
  type: SongTypes.SONG_GET_ERROR,
  payload: message,
});

export const likeSongRequest = () => ({
  type: SongTypes.SONG_LIKE_REQUEST,
});
export const likeSongSuccess = (song) => ({
  type: SongTypes.SONG_LIKE_SUCCESS,
  payload: song,
});
export const likeSongError = (message) => ({
  type: SongTypes.SONG_LIKE_ERROR,
  payload: message,
});

export const deleteSongRequest = () => ({
  type: SongTypes.SONG_DELETE_REQUEST,
});
export const deleteSongSuccess = (song) => ({
  type: SongTypes.SONG_DELETE_SUCCESS,
  payload: song,
});
export const deleteSongError = (message) => ({
  type: SongTypes.SONG_DELETE_ERROR,
  payload: message,
});

export const uploadSongReset = () => ({ type: SongTypes.SONG_UPLOAD_RESET });

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
      if (errorMessage) {
        return dispatch(uploadSongError(errorMessage));
      }
      return dispatch(uploadSongSuccess(response.data));
    } catch (error) {
      return dispatch(uploadSongError(error.message));
    }
  };
};

export const getSongs = () => {
  return async function getSongsThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(getSongsRequest());
    try {
      const { errorMessage, data: response } = await api.getSongs({
        Authorization: `Bearer ${token}`,
      });
      if (errorMessage) {
        return dispatch(getSongsError(errorMessage));
      }
      return dispatch(getSongsSuccess(response.data));
    } catch (error) {
      return dispatch(getSongsError(error.message));
    }
  };
};

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
      return dispatch(likeSongSuccess(response.data));
    } catch (error) {
      return dispatch(likeSongError(error.message));
    }
  };
};

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
      return dispatch(deleteSongSuccess(response.data));
    } catch (error) {
      return dispatch(deleteSongError(error.message));
    }
  };
};

export const editSong = ({ title, artist, genre, image, songId }) => {
  return async function editSongThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }
    dispatch(editSongRequest());

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
        return dispatch(editSongError(errorMessage));
      }
      return dispatch(editSongSuccess(response.data));
    } catch (error) {
      return dispatch(editSongError(error.message));
    }
  };
};
