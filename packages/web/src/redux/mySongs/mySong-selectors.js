import { createSelector } from 'reselect';

export const selectMySongState = (state) => state.ui.mySongs;

export const mySongSelector = createSelector(
  [selectMySongState],
  (mySong) => mySong,
);
