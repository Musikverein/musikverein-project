const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class MonthlyLikedSongRepository {
  create(options) {
    return normalizeDBQuery(db.MonthlyLikedSong.create(options));
  }

  find(options) {
    return normalizeDBQuery(db.MonthlyLikedSong.findOne(options));
  }

  findByIdAndIncrement(documentId, songId) {
    return normalizeDBQuery(
      db.MonthlyLikedSong.findOneAndUpdate(
        { _id: documentId },
        {
          $inc: { 'liked.$[el].likes': 1 },
        },
        {
          multi: false,
          arrayFilters: [{ 'el.song': songId }],
          new: true,
        },
      ),
    );
  }

  findByIdAndDecrement(documentId, songId) {
    return normalizeDBQuery(
      db.MonthlyLikedSong.findOneAndUpdate(
        { _id: documentId },
        {
          $inc: { 'liked.$[el].likes': -1 },
        },
        {
          multi: false,
          arrayFilters: [{ 'el.song': songId }],
          new: true,
        },
      ),
    );
  }

  findByIdAndAddSong(documentId, songId) {
    return normalizeDBQuery(
      db.MonthlyLikedSong.findOneAndUpdate(
        { _id: documentId },
        {
          $push: { liked: { song: songId, likes: 1 } },
        },
        {
          new: true,
        },
      ),
    );
  }

  findByIdAndAddSongWithDecrement(documentId, songId) {
    return normalizeDBQuery(
      db.MonthlyLikedSong.findOneAndUpdate(
        { _id: documentId },
        {
          $push: { liked: { song: songId, likes: -1 } },
        },
        {
          new: true,
        },
      ),
    );
  }
}

module.exports = new MonthlyLikedSongRepository();
