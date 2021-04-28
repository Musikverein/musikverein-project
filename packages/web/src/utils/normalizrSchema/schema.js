import { normalize, schema } from 'normalizr';

const song = new schema.Entity(
  'playlists',
  {},
  {
    idAttribute: '_id',
  },
);

export function normalizeSongs(songs) {
  return normalize(songs, [song]);
}

const playlist = new schema.Entity(
  'playlists',
  {},
  {
    idAttribute: '_id',
  },
);

export function normalizePlaylists(playlists) {
  return normalize(playlists, [playlist]);
}
