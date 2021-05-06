const Router = require('express').Router;

const {
  authMiddleware,
  validateCreateSong,
  findIdMiddleware,
  recaptchaMiddleware,
  validateUpdateSong,
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
songRouter.patch('/like', songController.likeSong);
songRouter.delete('/', songController.deleteSong);
songRouter.patch(
  '/',
  recaptchaMiddleware,
  validateUpdateSong,
  songController.editSong,
);
songRouter.get('/:userId', songController.getSongs);

module.exports = {
  songRouter: songRouter,
};
