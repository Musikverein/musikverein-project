import * as PlayerTypes from './player-types';

export const play = (song) => ({
  type: PlayerTypes.PLAYER_PLAY,
  payload: song,
});

export const saveIndexPlaylist = (index) => ({
  type: PlayerTypes.PLAYER_CURRENT_INDEX_PLAYLIST,
  payload: index,
});
