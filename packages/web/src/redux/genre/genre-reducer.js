import * as GenresTypes from './genre-types';

export const genresInitialState = {
  isGettingGenres: false,
  getGenresSuccess: false,
  getGenresError: null,
  genres: {},
  genreIds: [],
};

const GenresReducer = (state = genresInitialState, action) => {
  switch (action.type) {
    case GenresTypes.GET_GENRE_REQUEST: {
      return {
        ...state,
        isGettingGenres: true,
        getGenresSuccess: null,
        getGenresError: false,
      };
    }
    case GenresTypes.GET_GENRE_ERROR: {
      return {
        ...state,
        isGettingGenres: false,
        getGenresSuccess: false,
        getGenresError: action.payload,
      };
    }
    case GenresTypes.GET_GENRE_SUCCESS: {
      return {
        ...state,
        isGettingGenres: false,
        getGenresSuccess: true,
        getGenresError: null,
        genres: { ...state.genres, ...action.payload.genres },
        genreIds: [...state.genreIds, ...action.payload.genreIds],
      };
    }
    default:
      return state;
  }
};

export default GenresReducer;
