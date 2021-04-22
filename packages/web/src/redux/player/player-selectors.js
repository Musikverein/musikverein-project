import { createSelector } from 'reselect';

export const selectSongState = (state) => state.player;

export const playerSelector = createSelector(
  [selectSongState],
  (player) => player,
);
