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

  findOneAndPopulate(options) {
    return normalizeDBQuery(
      db.PlayList.findOne(options)
        .populate({
          path: 'songs',
          select: { __v: 0, active: 0, createdAt: 0, updatedAt: 0 },
        })
        .select('title owner type followedBy isPublic image'),
    );
  }
}

module.exports = new PlayListRepository();
