const songRepository = require('./song-repository');
const UserRepository = require('./user-repository');
const PlayListRepository = require('./playList-repository');

module.exports = {
  UserRepo: UserRepository,
  SongRepo: songRepository,
  PlayListRepo: PlayListRepository,
};
