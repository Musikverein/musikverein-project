const Router = require('express').Router;

const { authMiddleware } = require('../middlewares');
const { genresController } = require('../controllers');

const genresRouter = Router();

genresRouter.use(authMiddleware);

genresRouter.get('/', genresController.getGenres);

module.exports = {
  genresRouter: genresRouter,
};
