import { createSelector } from 'reselect';

export const selectSongState = (state) => state.entities.songStore;

export const songSelector = createSelector([selectSongState], (song) => song);
