const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const PlayListSchema = Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'The title is required'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'The owner is required'],
    },
    type: {
      type: String,
      enum: ['Album', 'PlayList'],
      required: [true, 'The type is required'],
    },
    songs: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'song',
        },
      ],
      default: [],
    },
    followedBy: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
      default: [],
    },
    public: {
      type: Schema.Types.Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const PlayList = mongoose.model('playList', PlayListSchema);

module.exports = PlayList;
