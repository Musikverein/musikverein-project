const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class PlayListRepository {
  create(options) {
    return normalizeDBQuery(db.PlayList.create(options));
  }

  find(options) {
    return normalizeDBQuery(
      db.PlayList.find(options).select(
        'title owner type songs followedBy isPublic image',
      ),
    );
  }

  findOneAndDelete(options) {
    return normalizeDBQuery(
      db.PlayList.findOneAndDelete(options).select('_id'),
    );
  }

  findOne(options) {
    return normalizeDBQuery(db.PlayList.findOne(options));
  }

  findOneAndUpdate(queryFind, querySet, queryOptions) {
    return normalizeDBQuery(
      db.PlayList.findOneAndUpdate(queryFind, querySet, queryOptions),
    );
  }
}

module.exports = new PlayListRepository();
