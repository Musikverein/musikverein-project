const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class PlayListRepository {
  create(options) {
    return normalizeDBQuery(db.PlayList.create(options));
  }
}

module.exports = new PlayListRepository();
