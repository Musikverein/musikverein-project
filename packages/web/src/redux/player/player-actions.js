import * as PlayerTypes from './player-types';

export const play = (song) => ({
  type: PlayerTypes.PLAYER_PLAY,
  payload: song,
});
