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
