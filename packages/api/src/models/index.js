const UserModel = require('./user-model');
const SongModel = require('./song-model');
const PlayListModel = require('./playList-model');
const Genre = require('./genre-model');
const MonthlyPlayedSong = require('./metadata/monthly-played-songs');
const MonthlyLikedSong = require('./metadata/monthly-liked-songs');
const MonthFollowedUser = require('./metadata/monthly-followed-users');

module.exports = {
  User: UserModel,
  Song: SongModel,
  PlayList: PlayListModel,
  Genre: Genre,
  MonthlyPlayedSong: MonthlyPlayedSong,
  MonthlyLikedSong: MonthlyLikedSong,
  MonthFollowedUser: MonthFollowedUser,
};
