const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const SongSchema = Schema(
  {
    title: {
      type: String,
      text: true,
      trim: true,
      required: [true, 'The title is required'],
    },
    duration: {
      type: Number,
      required: [true, 'The duration is required'],
    },
    genre: {
      type: String,
      trim: true,
      default: '',
    },
    url: {
      type: String,
      trim: true,
      required: [true, 'The url is required'],
    },
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/musikverein/image/upload/v1618918093/song-photo_s0wytx.svg',
    },
    artist: {
      type: String,
      default: 'Anonymous',
    },
    likedBy: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
      default: [],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'The owner is required'],
    },
    active: {
      type: Schema.Types.Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

SongSchema.index({ title: 'text' });
const Song = mongoose.model('song', SongSchema);

module.exports = Song;
