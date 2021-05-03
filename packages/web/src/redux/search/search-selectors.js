import { createSelector } from 'reselect';

export const selectSearchState = (state) => state.ui.search;

export const searchSelector = createSelector(
  [selectSearchState],
  (search) => search,
);
