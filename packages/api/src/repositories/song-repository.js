const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class SongRepository {
  create(options) {
    return normalizeDBQuery(db.Song.create(options));
  }
}

module.exports = new SongRepository();
