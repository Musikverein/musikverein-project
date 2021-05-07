import { normalize, schema } from 'normalizr';

const song = new schema.Entity(
  'songs',
  {},
  {
    idAttribute: '_id',
  },
);

export function normalizeSongs(songs) {
  return normalize(songs, [song]);
}

const playList = new schema.Entity(
  'playLists',
  {},
  {
    idAttribute: '_id',
  },
);

export function normalizePlayLists(playLists) {
  return normalize(playLists, [playList]);
}

const user = new schema.Entity(
  'users',
  {},
  {
    idAttribute: '_id',
  },
);

export function normalizeUsers(users) {
  return normalize(users, [user]);
}
