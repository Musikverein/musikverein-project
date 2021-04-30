import * as PlayerTypes from './player-types';

export const play = (song) => ({
  type: PlayerTypes.PLAYER_PLAY,
  payload: song,
});
export const playPlayList = ({ songs, songIndex }) => ({
  type: PlayerTypes.PLAYER_PLAY_PLAYLIST,
  payload: { songs, songIndex },
});

export const addToQueque = (song) => ({
  type: PlayerTypes.PLAYER_ADD_TO_QUEQUE,
  payload: song,
});

export const saveIndexPlayList = (index) => ({
  type: PlayerTypes.PLAYER_CURRENT_INDEX_PLAYLIST,
  payload: index,
});

export const syncSongDelete = (song) => ({
  type: PlayerTypes.PLAYER_SYNC_SONG_DELETE,
  payload: song._id,
});

export const syncPlayListDelete = (song) => ({
  type: PlayerTypes.PLAYER_SYNC_PLAYLIST_DELETE,
  payload: song._id,
});
