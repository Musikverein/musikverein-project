const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class MonthlyFollowedUserRepository {
  create(options) {
    return normalizeDBQuery(db.MonthFollowedUser.create(options));
  }

  find(options) {
    return normalizeDBQuery(db.MonthFollowedUser.findOne(options));
  }

  findByIdAndIncrement(documentId, userId) {
    const query = `followed.${userId}.follows`;
    return normalizeDBQuery(
      db.MonthFollowedUser.findByIdAndUpdate(
        documentId,
        {
          $inc: { [query]: 1 },
        },
        {
          new: true,
        },
      ),
    );
  }

  findByIdAndDecrement(documentId, userId) {
    const query = `followed.${userId}.follows`;
    return normalizeDBQuery(
      db.MonthFollowedUser.findByIdAndUpdate(
        documentId,
        {
          $inc: { [query]: -1 },
        },
        {
          new: true,
        },
      ),
    );
  }

  findByIdAndAddUser(documentId, userId) {
    const query = `followed.${userId}`;
    return normalizeDBQuery(
      db.MonthFollowedUser.findByIdAndUpdate(
        documentId,
        {
          [query]: { user: userId, follows: 1 },
        },
        {
          new: true,
        },
      ),
    );
  }

  findByIdAndAddUserWithDecrement(documentId, userId) {
    const query = `followed.${userId}`;
    return normalizeDBQuery(
      db.MonthFollowedUser.findByIdAndUpdate(
        documentId,
        {
          [query]: { user: userId, follows: 1 },
        },
        {
          new: true,
        },
      ),
    );
  }
}

module.exports = new MonthlyFollowedUserRepository();
