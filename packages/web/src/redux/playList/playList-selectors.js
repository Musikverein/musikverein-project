import { createSelector } from 'reselect';

export const selectPlayListState = (state) => state.entities.playListStore;

export const playListSelector = createSelector(
  [selectPlayListState],
  (playList) => playList,
);

export const selectPlayListByIdState = (id) =>
  createSelector(
    (state) => state.entities.playListStore.playLists[id],
    (playListIds) => playListIds,
  );
