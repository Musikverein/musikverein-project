const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const FollowedPlayListSchema = Schema(
  {
    yearMonth: {
      type: String,
      required: [true, 'yearMonth key is required'],
    },
    followed: {
      type: [
        {
          playList: {
            type: Schema.Types.ObjectId,
            ref: 'playList',
          },
          follows: {
            type: Number,
          },
        },
      ],
    },
  },
  {
    timestamps: false,
  },
);

const MonthFollowedPlayList = mongoose.model(
  'followedPlayList',
  FollowedPlayListSchema,
);

module.exports = MonthFollowedPlayList;
