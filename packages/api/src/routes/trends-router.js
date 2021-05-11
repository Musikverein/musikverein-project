const Router = require('express').Router;

const { authMiddleware } = require('../middlewares');
const { trendsController } = require('../controllers');

const trendsRouter = Router();

trendsRouter.use(authMiddleware);

trendsRouter.get('/songs', trendsController.getTrendSongs);
trendsRouter.get('/playlists', trendsController.getTrendPlayLists);
trendsRouter.get('/users', trendsController.getTrendUsers);
trendsRouter.get('/played', trendsController.getTrendPlayed);

module.exports = {
  trendsRouter: trendsRouter,
};
