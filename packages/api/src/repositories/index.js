const songRepository = require('./song-repository');
const UserRepository = require('./user-repository');
const PlayListRepository = require('./playList-repository');
const GenreRepository = require('./genre-repository');
const MonthlyPlayedSongRepository = require('./monthlyPlayedSongs-repository');
const MonthlyLikedSongsRepository = require('./monthlyLikedSongs-repository');
const MonthlyFollowedUserRepository = require('./monthlyFollowedUsers-repository');
const monthlyFollowedPlayListRepository = require('./monthlyFollowedPlayList-repository');
const trendRepository = require('./trend-repository');

module.exports = {
  UserRepo: UserRepository,
  SongRepo: songRepository,
  PlayListRepo: PlayListRepository,
  GenreRepo: GenreRepository,
  MonthlyPlayedSongRepo: MonthlyPlayedSongRepository,
  MonthlyLikedSongRepo: MonthlyLikedSongsRepository,
  MonthlyFollowedUserRepo: MonthlyFollowedUserRepository,
  MonthlyFollowedPlayListRepo: monthlyFollowedPlayListRepository,
  TrendRepo: trendRepository,
};
