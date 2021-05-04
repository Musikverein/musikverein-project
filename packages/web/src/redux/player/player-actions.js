import * as PlayerTypes from './player-types';

export const play = (song) => ({
  type: PlayerTypes.PLAYER_PLAY,
  payload: song,
});
export const playPlayList = ({ songs, songIndex = 0 }) => ({
  type: PlayerTypes.PLAYER_PLAY_PLAYLIST,
  payload: { songs, songIndex },
});

export const addToQueue = (song) => ({
  type: PlayerTypes.PLAYER_ADD_TO_QUEUE,
  payload: song,
});

export const syncSongDelete = (song) => ({
  type: PlayerTypes.PLAYER_SYNC_SONG_DELETE,
  payload: song._id,
});

export const syncPlayListDelete = (song) => ({
  type: PlayerTypes.PLAYER_SYNC_PLAYLIST_DELETE,
  payload: song._id,
});

export const nextSong = () => ({
  type: PlayerTypes.PLAYER_NEXT,
});

export const prevSong = () => ({
  type: PlayerTypes.PLAYER_PREV,
});

export const reorderQueue = (songs) => ({
  type: PlayerTypes.PLAYER_REORDER_QUEUE,
  payload: songs,
});
