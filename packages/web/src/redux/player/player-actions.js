import * as PlayerTypes from './player-types';

export const play = (song) => ({
  type: PlayerTypes.PLAYER_PLAY,
  payload: song,
});

export const addToQueque = (song) => ({
  type: PlayerTypes.PLAYER_ADD_TO_QUEQUE,
  payload: song,
});

export const saveIndexPlaylist = (index) => ({
  type: PlayerTypes.PLAYER_CURRENT_INDEX_PLAYLIST,
  payload: index,
});

export const syncDelete = (song) => ({
  type: PlayerTypes.PLAYER_SYNC_DELETE,
  payload: song._id,
});
