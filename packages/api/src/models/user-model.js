const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { isEmail } = require('validator');

const UserSchema = Schema(
  {
    _id: String,
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
      validate: {
        validator: (value) => isEmail(value),
        message: (props) => `The email ${props.value} is not valid`,
      },
    },
    image: {
      type: String,
      default: '',
    },
    following: {
      type: [
        {
          type: String,
          ref: 'user',
        },
      ],
      default: [],
    },
    followedBy: {
      type: [
        {
          type: String,
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
