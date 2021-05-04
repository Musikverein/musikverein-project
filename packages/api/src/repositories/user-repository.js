const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class UserRepository {
  create(options) {
    return normalizeDBQuery(db.User.create(options));
  }

  findUser(query) {
    return normalizeDBQuery(
      db.User.findOne(query).select(
        'userName firstName lastName email image following followedBy',
      ),
    );
  }

  findUserAndUpdate(queryFind, querySet) {
    return normalizeDBQuery(
      db.User.findOneAndUpdate(queryFind, querySet, {
        new: true,
        select: 'firstName lastName userName image following followedBy',
      }),
    );
  }
}

module.exports = new UserRepository();
