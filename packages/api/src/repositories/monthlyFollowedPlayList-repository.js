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
    const query = `followed.${playListId}.follows`;
    return normalizeDBQuery(
      db.MonthFollowedPlayList.findByIdAndUpdate(
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

  findByIdAndDecrement(documentId, playListId) {
    const query = `followed.${playListId}.follows`;
    return normalizeDBQuery(
      db.MonthFollowedPlayList.findByIdAndUpdate(
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

  findByIdAndAddPlayList(documentId, playListId) {
    const query = `followed.${playListId}`;
    return normalizeDBQuery(
      db.MonthFollowedPlayList.findByIdAndUpdate(
        documentId,
        {
          [query]: { playList: playListId, follows: 1 },
        },
        {
          new: true,
        },
      ),
    );
  }

  findByIdAndAddPlaytListWithDecrement(documentId, playListId) {
    const query = `followed.${playListId}`;
    return normalizeDBQuery(
      db.MonthFollowedPlayList.findByIdAndUpdate(
        documentId,
        {
          [query]: { playList: playListId, follows: 1 },
        },
        {
          new: true,
        },
      ),
    );
  }
}

module.exports = new MonthlyFollowedPlayListRepository();
