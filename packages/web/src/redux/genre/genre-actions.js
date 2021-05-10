import * as auth from '../../services/auth';
import { signOutSuccess } from '../auth/auth-actions';
import * as GenreTypes from './genre-types';
import api from '../../api';
import { normalizeGenres } from '../../utils/normalizrSchema/schema';

export const getGenresRequest = () => ({
  type: GenreTypes.GET_GENRE_REQUEST,
});
export const getGenresSuccess = ({ genres, genreIds }) => ({
  type: GenreTypes.GET_GENRE_SUCCESS,
  payload: { genres, genreIds },
});
export const getGenresError = (message) => ({
  type: GenreTypes.GET_GENRE_ERROR,
  payload: message,
});

export const getGenres = () => {
  return async function getGenresThunk(dispatch) {
    const token = await auth.getCurrentUserToken();

    if (!token) {
      return dispatch(signOutSuccess());
    }

    dispatch(getGenresRequest());
    try {
      const { errorMessage, data: response } = await api.getGenres({
        Authorization: `Bearer ${token}`,
      });
      if (errorMessage) {
        return dispatch(getGenresError(errorMessage));
      }

      const { result, entities } = normalizeGenres(response.data);

      return dispatch(
        getGenresSuccess({ genres: entities.genres, genreIds: result }),
      );
    } catch (error) {
      return dispatch(getGenresError(error.message));
    }
  };
};
