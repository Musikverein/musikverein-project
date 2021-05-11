const Router = require('express').Router;
const { authMiddleware } = require('../middlewares');
const { playedController } = require('../controllers');

const playedRouter = Router();

playedRouter.use(authMiddleware);

playedRouter.post('/', playedController.addReproduction);

module.exports = {
  playedRouter: playedRouter,
};
