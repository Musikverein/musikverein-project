import { createSelector } from 'reselect';

export const selectPlayerState = (state) => state.player;

export const playerSelector = createSelector(
  [selectPlayerState],
  (player) => player,
);
