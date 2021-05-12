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

  findSongsLiked(query) {
    return normalizeDBQuery(
      db.MonthlyLikedSong.aggregate([
        { $match: query },
        { $unwind: '$liked' },
        { $sort: { 'liked.likes': -1 } },
        { $limit: 10 },
        {
          $lookup: {
            from: db.Song.collection.name,
            localField: 'liked.song',
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

module.exports = new MonthlyLikedSongRepository();
