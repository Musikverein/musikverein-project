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

  findUsers(query) {
    return normalizeDBQuery(
      db.MonthFollowedUser.aggregate([
        { $match: query },
        { $unwind: '$followed' },
        { $sort: { 'followed.follows': -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: db.User.collection.name,
            localField: 'followed.user',
            foreignField: '_id',
            as: 'populate',
          },
        },
        {
          $project: {
            'populate._id': 1,
            'populate.userName': 1,
            'populate.firstName': 1,
            'populate.lastName': 1,
            'populate.image': 1,
            'populate.following': 1,
            'populate.followedBy': 1,
          },
        },
      ]),
    );
  }
}

module.exports = new MonthlyFollowedUserRepository();
