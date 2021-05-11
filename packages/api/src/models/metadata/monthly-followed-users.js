const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const FolloedUsersSchema = Schema(
  {
    yearMonth: {
      type: String,
      required: [true, 'yearMonth key is required'],
    },
    followed: {
      type: Map,
      of: {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        },
        follows: {
          type: Number,
        },
      },
    },
  },
  {
    timestamps: false,
  },
);

const MonthFollowedUser = mongoose.model('followedUser', FolloedUsersSchema);

module.exports = MonthFollowedUser;
