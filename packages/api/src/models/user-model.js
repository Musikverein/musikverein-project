const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserSchema = Schema(
  {
    firebaseId: {
      type: String,
      required: [true, 'The firebaseId is required'],
      unique: true,
    },
    userName: {
      type: String,
      trim: true,
      default: '',
    },
    firstName: {
      type: String,
      trim: true,
      default: '',
    },
    lastName: {
      type: String,
      trim: true,
      default: '',
    },
    email: {
      type: String,
      required: [true, 'The email is required'],
      trim: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/musikverein-project/image/upload/v1621345047/profile-photo_gqir6g.svg',
    },
    following: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'user',
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
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('user', UserSchema);

module.exports = User;
