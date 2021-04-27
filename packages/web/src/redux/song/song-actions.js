import * as SongTypes from './song-types';

export const loadSongs = (songs) => ({
  type: SongTypes.LOAD_SONGS,
  payload: songs,
});

export const removeSong = (songId) => ({
  type: SongTypes.REMOVE_SONG,
  payload: songId._id,
});
