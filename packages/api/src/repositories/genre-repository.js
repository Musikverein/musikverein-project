const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class GenreRepository {
  create(options) {
    return normalizeDBQuery(db.Genre.create(options));
  }

  find() {
    return normalizeDBQuery(db.Genre.find({}).select({ __v: 0 }));
  }

  clear() {
    return normalizeDBQuery(db.Genre.deleteMany({}));
  }
}

module.exports = new GenreRepository();
