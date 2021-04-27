import { createSelector } from 'reselect';

export const selectPlayListState = (state) => state.entities.playListStore;

export const playListSelector = createSelector(
  [selectPlayListState],
  (playList) => playList,
);
