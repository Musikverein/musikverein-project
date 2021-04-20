import { songUpload } from '../../services/cloudinary';
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

export const uploadSong = ({ song, title, recaptchaToken }) => {
  return async function uploadSongThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }
    dispatch(uploadSongRequest());
    try {
      const { secure_url: url, duration } = await songUpload(song);
      const { errorMessage, data: response } = await api.uploadSong(
        {
          Authorization: `Bearer ${token}`,
        },
        { recaptchaToken, title, duration, url },
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
