const songRepository = require('./song-repository');
const UserRepository = require('./user-repository');
const PlayListRepository = require('./playList-repository');
const GenreRepository = require('./genre-repository');
const MonthlyPlayedSongRepository = require('./monthlyPlayedSongs-repository');
const MonthlyLikedSongsRepository = require('./monthlyLikedSongs-repository');

module.exports = {
  UserRepo: UserRepository,
  SongRepo: songRepository,
  PlayListRepo: PlayListRepository,
  GenreRepo: GenreRepository,
  MonthlyPlayedSongRepo: MonthlyPlayedSongRepository,
  MonthlyLikedSongRepo: MonthlyLikedSongsRepository,
};
