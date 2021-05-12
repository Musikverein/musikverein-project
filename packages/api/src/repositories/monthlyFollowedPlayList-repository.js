const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class MonthlyFollowedPlayListRepository {
  create(options) {
    return normalizeDBQuery(db.MonthFollowedPlayList.create(options));
  }

  find(options) {
    return normalizeDBQuery(db.MonthFollowedPlayList.findOne(options));
  }

  findByIdAndIncrement(documentId, playListId) {
    return normalizeDBQuery(
      db.MonthFollowedPlayList.findOneAndUpdate(
        { _id: documentId },
        {
          $inc: { 'followed.$[el].follows': 1 },
        },
        {
          multi: false,
          arrayFilters: [{ 'el.playList': playListId }],
          new: true,
        },
      ),
    );
  }

  findByIdAndDecrement(documentId, playListId) {
    return normalizeDBQuery(
      db.MonthFollowedPlayList.findOneAndUpdate(
        { _id: documentId },
        {
          $inc: { 'followed.$[el].follows': -1 },
        },
        {
          multi: false,
          arrayFilters: [{ 'el.playList': playListId }],
          new: true,
        },
      ),
    );
  }

  findByIdAndAddPlayList(documentId, playListId) {
    return normalizeDBQuery(
      db.MonthFollowedPlayList.findOneAndUpdate(
        { _id: documentId },
        {
          $push: { followed: { playList: playListId, follows: 1 } },
        },
        {
          new: true,
        },
      ),
    );
  }

  findByIdAndAddPlaytListWithDecrement(documentId, playListId) {
    return normalizeDBQuery(
      db.MonthFollowedPlayList.findOneAndUpdate(
        { _id: documentId },
        {
          $push: { followed: { playList: playListId, follows: -1 } },
        },
        {
          new: true,
        },
      ),
    );
  }

  findPlayLists(query) {
    return normalizeDBQuery(
      db.MonthFollowedPlayList.aggregate([
        { $match: query },
        { $unwind: '$followed' },
        { $sort: { 'followed.follows': -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: db.PlayList.collection.name,
            localField: 'followed.playList',
            foreignField: '_id',
            as: 'populate',
          },
        },
        { $match: { 'populate.isPublic': true } },
        {
          $project: {
            'populate._id': 1,
            'populate.title': 1,
            'populate.type': 1,
            'populate.songs': 1,
            'populate.owner': 1,
            'populate.followedBy': 1,
            'populate.isPublic': 1,
            'populate.image': 1,
          },
        },
      ]),
    );
  }
}

module.exports = new MonthlyFollowedPlayListRepository();
