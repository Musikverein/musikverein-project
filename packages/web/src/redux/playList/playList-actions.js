import * as PlayListTypes from './playList-types';

export const loadPlayList = (playList) => ({
  type: PlayListTypes.LOAD_PLAYLIST,
  payload: playList,
});

export const removePlayList = (playListId) => ({
  type: PlayListTypes.REMOVE_PLAYLIST,
  payload: playListId._id,
});
