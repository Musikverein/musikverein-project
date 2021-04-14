const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class UserRepository {
  create(options) {
    return normalizeDBQuery(
      db.User.create(options).select(
        'firstName lastName email image following followedBy',
      ),
    );
  }

  findOne(query) {
    return normalizeDBQuery(
      db.User.findOne(query).select(
        'firstName lastName email image following followedBy',
      ),
    );
  }
}

module.exports = new UserRepository();
