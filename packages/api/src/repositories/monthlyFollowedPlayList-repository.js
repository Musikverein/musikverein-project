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
}

module.exports = new MonthlyFollowedPlayListRepository();
