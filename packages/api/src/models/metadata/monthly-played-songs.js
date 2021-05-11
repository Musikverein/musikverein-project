const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const PlayedSongsSchema = Schema(
  {
    yearMonth: {
      type: String,
      required: [true, 'yearMonth key is required'],
    },
    playbacks: {
      type: Map,
      of: {
        song: {
          type: Schema.Types.ObjectId,
          ref: 'song',
        },
        reproductions: {
          type: Number,
        },
      },
    },
  },
  {
    timestamps: false,
  },
);

const MonthlyPlayedSong = mongoose.model('playedSong', PlayedSongsSchema);

module.exports = MonthlyPlayedSong;
