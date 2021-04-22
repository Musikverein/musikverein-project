import { imageUpload, songUpload } from '../../services/cloudinary';
import * as SongTypes from './song-types';
import * as auth from '../../services/auth';
import api from '../../api';
import { signOutSuccess } from '../auth/auth-actions';

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

export const getSongs = () => {
  return async function getSongsThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(getSongsError('Dont have a token'));
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
