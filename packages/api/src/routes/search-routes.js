const Router = require('express').Router;

const { authMiddleware } = require('../middlewares');
const { searchController } = require('../controllers');

const searchRouter = Router();

searchRouter.use(authMiddleware);

searchRouter.post('/songs', searchController.searchSongs);
searchRouter.post('/playlists', searchController.searchPlayLists);

module.exports = {
  searchRouter: searchRouter,
};
