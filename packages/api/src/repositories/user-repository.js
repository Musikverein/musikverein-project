const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class UserRepository {
  create(options) {
    return normalizeDBQuery(db.User.create(options));
  }

  findUser(query) {
    return normalizeDBQuery(
      db.User.findOne(query).select(
        'userName firstName lastName image following followedBy',
      ),
    );
  }

  searchUsers({ value }) {
    return normalizeDBQuery(
      db.User.find({
        userName: { $regex: value, $options: 'i' },
      }).select('userName firstName lastName image following followedBy'),
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

  getUserFollowedPopulate(options) {
    return normalizeDBQuery(
      db.User.findOne(options).populate({
        path: 'followedBy',
        select: 'userName firstName lastName image following followedBy',
      }),
    );
  }

  getUserFollowingPopulate(options) {
    return normalizeDBQuery(
      db.User.findOne(options).populate({
        path: 'following',
        select: 'userName firstName lastName image following followedBy',
      }),
    );
  }
}

module.exports = new UserRepository();
