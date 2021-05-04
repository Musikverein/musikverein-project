const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class PlayListRepository {
  createPlayList(options) {
    return normalizeDBQuery(db.PlayList.create(options));
  }

  findPlayLists(options) {
    return normalizeDBQuery(
      db.PlayList.find(options).select(
        'title owner type songs followedBy isPublic image',
      ),
    );
  }

  findPlayListAndDelete(options) {
    return normalizeDBQuery(
      db.PlayList.findOneAndDelete(options).select('_id'),
    );
  }

  findPlayList(options) {
    return normalizeDBQuery(db.PlayList.findOne(options));
  }

  findPlayListAndUpdate(queryFind, querySet) {
    return normalizeDBQuery(
      db.PlayList.findOneAndUpdate(queryFind, querySet, {
        new: true,
        select: 'title owner type songs followedBy isPublic image',
      }),
    );
  }

  findPlayListAndPopulate(options) {
    return normalizeDBQuery(
      db.PlayList.findOne(options)
        .populate({
          path: 'songs',
          select: { __v: 0, active: 0, createdAt: 0, updatedAt: 0 },
        })
        .select('title owner type followedBy isPublic image'),
    );
  }

  findPlayListAndPushSong(queryFind, querySet) {
    return normalizeDBQuery(
      db.PlayList.findOneAndUpdate(
        queryFind,
        {
          $push: querySet,
        },
        {
          new: true,
          select: 'title owner type songs followedBy isPublic image',
        },
      ),
    );
  }

  searchPlayLists({ value }) {
    return normalizeDBQuery(
      db.PlayList.find({
        title: { $regex: value, $options: 'i' },
        isPublic: true,
      })
        .limit(10)
        .select({
          __v: 0,
          active: 0,
          createdAt: 0,
          updatedAt: 0,
        }),
    );
  }
}

module.exports = new PlayListRepository();
