import { createSelector } from 'reselect';

export const selectUserSongState = (state) => state.ui.librarySongs;

export const librarySongSelector = createSelector(
  [selectUserSongState],
  (librarySong) => librarySong,
);
