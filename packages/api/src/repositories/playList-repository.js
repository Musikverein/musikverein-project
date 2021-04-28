const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class PlayListRepository {
  create(options) {
    return normalizeDBQuery(db.PlayList.create(options));
  }
  find(options) {
    return normalizeDBQuery(
      db.PlayList.find(options).select(
        'title owner type songs followedBy public',
      ),
    );
  }
  findOneAndDelete(options) {
    return normalizeDBQuery(
      db.PlayList.findOneAndDelete(options).select('_id'),
    );
  }
}

module.exports = new PlayListRepository();
