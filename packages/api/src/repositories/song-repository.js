const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class SongRepository {
  create(options) {
    return normalizeDBQuery(db.Song.create(options));
  }

  findOwned(options) {
    return normalizeDBQuery(
      db.Song.find(options).select({
        __v: 0,
        active: 0,
        createdAt: 0,
        updatedAt: 0,
      }),
    );
  }

  findSong(options) {
    return normalizeDBQuery(db.Song.findOne(options));
  }

  findSongAndDelete(queryFind, querySet) {
    return normalizeDBQuery(
      db.Song.findOneAndUpdate(queryFind, querySet, {
        new: true,
        select: '_id',
      }),
    );
  }

  findSongAndUpdate(queryFind, querySet) {
    return normalizeDBQuery(
      db.Song.findOneAndUpdate(queryFind, querySet, {
        new: true,
        select: 'title artist duration owner likedBy url genre image',
      }),
    );
  }

  find(options) {
    return normalizeDBQuery(
      db.Song.find(options).limit(10).select({
        __v: 0,
        active: 0,
        createdAt: 0,
        updatedAt: 0,
      }),
    );
  }

  searchSongs({ value }) {
    return normalizeDBQuery(
      db.Song.find({ title: { $regex: value, $options: 'i' }, active: true })
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

module.exports = new SongRepository();
