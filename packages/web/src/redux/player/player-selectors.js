import { createSelector } from 'reselect';

export const selectPlayerState = (state) => state.ui.player;

export const playerSelector = createSelector(
  [selectPlayerState],
  (player) => player,
);
