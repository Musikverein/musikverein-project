import { createSelector } from 'reselect';

export const selectUserPlayListState = (state) => state.ui.libraryPlayList;

export const userPlayListSelector = createSelector(
  [selectUserPlayListState],
  (libraryPlayList) => libraryPlayList,
);
