const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class GenreRepository {
  create(options) {
    return normalizeDBQuery(db.Genre.create(options));
  }

  find(query) {
    return normalizeDBQuery(db.Genre.find(query));
  }
}

module.exports = new GenreRepository();
