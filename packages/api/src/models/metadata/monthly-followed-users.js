const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const FollowedUsersSchema = Schema(
  {
    yearMonth: {
      type: String,
      required: [true, 'yearMonth key is required'],
    },
    followed: {
      type: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
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

const MonthFollowedUser = mongoose.model('followedUser', FollowedUsersSchema);

module.exports = MonthFollowedUser;
