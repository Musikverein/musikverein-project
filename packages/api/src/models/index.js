const UserModel = require('./user-model');
const SongModel = require('./song-model');
const PlayListModel = require('./playList-model');
const Genre = require('./genre-model');

module.exports = {
  User: UserModel,
  Song: SongModel,
  PlayList: PlayListModel,
  Genre: Genre,
};
