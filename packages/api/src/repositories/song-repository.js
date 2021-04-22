const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class SongRepository {
  create(options) {
    return normalizeDBQuery(db.Song.create(options));
  }

  findOwnSongs(options) {
    return normalizeDBQuery(
      db.Song.find(options).select({
        __v: 0,
        active: 0,
        createdAt: 0,
        updatedAt: 0,
      }),
    );
  }
}

module.exports = new SongRepository();
