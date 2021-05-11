const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class MonthlyLikedSongRepository {
  create(options) {
    return normalizeDBQuery(db.MonthlyPlayedSong.create(options));
  }

  find(options) {
    return normalizeDBQuery(db.MonthlyPlayedSong.findOne(options));
  }

  findByIdAndIncrement(documentId, songId) {
    const query = `liked.${songId}.likes`;
    return normalizeDBQuery(
      db.MonthlyPlayedSong.findByIdAndUpdate(
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

  findByIdAndDecrement(documentId, songId) {
    const query = `liked.${songId}.likes`;
    return normalizeDBQuery(
      db.MonthlyPlayedSong.findByIdAndUpdate(
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

  findByIdAndAddSong(documentId, songId) {
    const query = `liked.${songId}`;
    return normalizeDBQuery(
      db.MonthlyPlayedSong.findByIdAndUpdate(
        documentId,
        {
          [query]: { song: songId, likes: 1 },
        },
        {
          new: true,
        },
      ),
    );
  }

  findByIdAndAddSongWithDecrement(documentId, songId) {
    const query = `liked.${songId}`;
    return normalizeDBQuery(
      db.MonthlyPlayedSong.findByIdAndUpdate(
        documentId,
        {
          [query]: { song: songId, likes: -1 },
        },
        {
          new: true,
        },
      ),
    );
  }
}

module.exports = new MonthlyLikedSongRepository();
