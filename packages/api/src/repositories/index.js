const songRepository = require('./song-repository');
const UserRepository = require('./user-repository');

module.exports = {
  UserRepo: UserRepository,
  SongRepo: songRepository,
};
