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
    return normalizeDBQuery(
      db.MonthFollowedUser.findOneAndUpdate(
        { _id: documentId },
        {
          $inc: { 'followed.$[el].follows': 1 },
        },
        {
          multi: false,
          arrayFilters: [{ 'el.user': userId }],
          new: true,
        },
      ),
    );
  }

  findByIdAndDecrement(documentId, userId) {
    return normalizeDBQuery(
      db.MonthFollowedUser.findOneAndUpdate(
        { _id: documentId },
        {
          $inc: { 'followed.$[el].follows': -1 },
        },
        {
          multi: false,
          arrayFilters: [{ 'el.user': userId }],
          new: true,
        },
      ),
    );
  }

  findByIdAndAddUser(documentId, userId) {
    return normalizeDBQuery(
      db.MonthFollowedUser.findOneAndUpdate(
        { _id: documentId },
        {
          $push: { followed: { user: userId, follows: 1 } },
        },
        {
          new: true,
        },
      ),
    );
  }

  findByIdAndAddUserWithDecrement(documentId, userId) {
    return normalizeDBQuery(
      db.MonthFollowedUser.findOneAndUpdate(
        { _id: documentId },
        {
          $push: { followed: { user: userId, follows: -1 } },
        },
        {
          new: true,
        },
      ),
    );
  }
}

module.exports = new MonthlyFollowedUserRepository();
