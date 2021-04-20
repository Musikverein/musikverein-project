const Router = require('express').Router;

const {
  authMiddleware,
  validateCreateSong,
  findIdMiddleware,
  recaptchaMiddleware,
} = require('../middlewares');
const { songController } = require('../controllers');

const songRouter = Router();

songRouter.use(authMiddleware);
songRouter.use(findIdMiddleware);

songRouter.post(
  '/upload',
  recaptchaMiddleware,
  validateCreateSong,
  songController.createSong,
);

module.exports = {
  songRouter: songRouter,
};
