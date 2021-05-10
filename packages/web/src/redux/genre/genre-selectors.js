import { createSelector } from 'reselect';

export const selectGenreState = (state) => state.entities.genreStore;

export const genreSelector = createSelector(
  [selectGenreState],
  (genre) => genre,
);

export const selectGenreByIdState = (id) =>
  createSelector(
    (state) => state.entities.genreStore.genres[id],
    (genreIds) => genreIds,
  );
