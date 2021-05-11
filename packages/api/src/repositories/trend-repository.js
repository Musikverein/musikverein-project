const db = require('../models');
const normalizeDBQuery = require('../utils/normalizeDBQuery');

class TrendRepository {
  findSongsLiked(query) {
    return normalizeDBQuery(
      db.MonthlyLikedSong.find(query).select('liked').sort().limit(10),
    );
  }

  findSongsPlayed(query) {
    return normalizeDBQuery(
      db.MonthlyPlayedSong.find(query).select({ __v: 0 }).sort().limit(10),
    );
  }

  findPlayLists(query) {
    return normalizeDBQuery(
      db.MonthFollowedPlayList.find(query).select({ __v: 0 }).sort().limit(10),
    );
  }

  findUsers(query) {
    return normalizeDBQuery(
      db.MonthFollowedUser.find(query).select({ __v: 0 }).sort().limit(10),
    );
  }
}

module.exports = new TrendRepository();
