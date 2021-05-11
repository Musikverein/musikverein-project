const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const LikedSongsSchema = Schema(
  {
    yearMonth: {
      type: String,
      required: [true, 'yearMonth key is required'],
    },
    liked: {
      type: Map,
      of: {
        song: {
          type: Schema.Types.ObjectId,
          ref: 'song',
        },
        likes: {
          type: Number,
        },
      },
    },
  },
  {
    timestamps: false,
  },
);

const MonthlyLikedSong = mongoose.model('likedSong', LikedSongsSchema);

module.exports = MonthlyLikedSong;
