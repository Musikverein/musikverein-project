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
songRouter.post('/userSongs', songController.getUserSongs);
songRouter.post('/userSongs/liked', songController.getLikedSongs);
songRouter.post('/like', songController.likeSong);
songRouter.post('/delete', songController.deleteSong);
songRouter.post('/edit', songController.editSong);

module.exports = {
  songRouter: songRouter,
};
