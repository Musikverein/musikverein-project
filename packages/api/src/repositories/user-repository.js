const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class UserRepository {
  create(options) {
    return normalizeDBQuery(db.User.create(options));
  }

  findOne(query) {
    return normalizeDBQuery(
      db.User.findOne(query).select(
        'userName firstName lastName email image following followedBy',
      ),
    );
  }

  findOneAndUpdate(queryFind, querySet, queryOptions) {
    return normalizeDBQuery(
      db.User.findOneAndUpdate(queryFind, querySet, queryOptions),
    );
  }
}

module.exports = new UserRepository();
