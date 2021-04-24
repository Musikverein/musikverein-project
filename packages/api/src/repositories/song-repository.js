const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class SongRepository {
  create(options) {
    return normalizeDBQuery(db.Song.create(options));
  }

  findOwned(options) {
    return normalizeDBQuery(
      db.Song.find(options).select({
        __v: 0,
        active: 0,
        createdAt: 0,
        updatedAt: 0,
      }),
    );
  }

  findLike(options) {
    return normalizeDBQuery(db.Song.find(options));
  }

  findOneAndUpdate(queryFind, querySet, queryOptions) {
    return normalizeDBQuery(
      db.Song.findOneAndUpdate(queryFind, querySet, queryOptions),
    );
  }
}

module.exports = new SongRepository();
