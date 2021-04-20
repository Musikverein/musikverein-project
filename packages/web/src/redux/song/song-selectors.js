import { createSelector } from 'reselect';

export const selectSongState = (state) => state.song;

export const songSelector = createSelector([selectSongState], (song) => song);
