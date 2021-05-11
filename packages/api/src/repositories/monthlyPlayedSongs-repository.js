const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class MonthlyPlayedSongRepository {
  create(options) {
    return normalizeDBQuery(db.MonthlyPlayedSong.create(options));
  }

  find(options) {
    return normalizeDBQuery(db.MonthlyPlayedSong.findOne(options));
  }

  findByIdAndIncrement(documentId, songId) {
    return normalizeDBQuery(
      db.MonthlyPlayedSong.findOneAndUpdate(
        { _id: documentId },
        {
          $inc: { 'playbacks.$[el].reproductions': 1 },
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
      db.MonthlyPlayedSong.findOneAndUpdate(
        { _id: documentId },
        {
          $push: { playbacks: { song: songId, reproductions: 1 } },
        },
        {
          new: true,
        },
      ),
    );
  }
}

module.exports = new MonthlyPlayedSongRepository();
