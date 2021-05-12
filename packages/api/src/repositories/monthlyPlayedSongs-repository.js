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

  findSongsPlayed(query) {
    return normalizeDBQuery(
      db.MonthlyPlayedSong.aggregate([
        { $match: query },
        { $unwind: '$playbacks' },
        { $sort: { 'playbacks.reproductions': -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: db.Song.collection.name,
            localField: 'playbacks.song',
            foreignField: '_id',
            as: 'populate',
          },
        },
        { $match: { 'populate.active': true } },
        {
          $project: {
            'populate._id': 1,
            'populate.title': 1,
            'populate.artist': 1,
            'populate.duration': 1,
            'populate.owner': 1,
            'populate.likedBy': 1,
            'populate.url': 1,
            'populate.genre': 1,
            'populate.image': 1,
          },
        },
      ]),
    );
  }
}

module.exports = new MonthlyPlayedSongRepository();
