const Router = require('express').Router;

const { authMiddleware } = require('../middlewares');
const { searchController } = require('../controllers');

const searchRouter = Router();

searchRouter.use(authMiddleware);

searchRouter.get('/songs/:value', searchController.searchSongs);
searchRouter.get('/playlists/:value', searchController.searchPlayLists);
searchRouter.get('/user/:value', searchController.searchUsers);

module.exports = {
  searchRouter: searchRouter,
};
