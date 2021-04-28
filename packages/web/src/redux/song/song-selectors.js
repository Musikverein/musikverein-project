import { createSelector } from 'reselect';

export const selectSongState = (state) => state.entities.songStore;

export const songSelector = createSelector([selectSongState], (song) => song);

export const selectSongByIdState = (id) =>
  createSelector(
    (state) => state.entities.songStore.songs[id],
    (songIds) => songIds,
  );
