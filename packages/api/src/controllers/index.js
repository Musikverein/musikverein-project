const userController = require('./user-controller');
const songController = require('./song-controller');
const playListController = require('./playList-contoller');
const searchController = require('./search-controller');
const genresController = require('./genre-controller');
const playedController = require('./played-controller');
const trendsController = require('./trend-controller');

module.exports = {
  userController: userController,
  songController: songController,
  playListController: playListController,
  searchController: searchController,
  genresController: genresController,
  playedController: playedController,
  trendsController: trendsController,
};
