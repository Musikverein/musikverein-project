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
    const query = `playbacks.${songId}.reproductions`;
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

  findByIdAndAddSong(documentId, songId) {
    const query = `playbacks.${songId}`;
    return normalizeDBQuery(
      db.MonthlyPlayedSong.findByIdAndUpdate(
        documentId,
        {
          [query]: { song: songId, reproductions: 1 },
        },
        {
          new: true,
        },
      ),
    );
  }
}

module.exports = new MonthlyPlayedSongRepository();
