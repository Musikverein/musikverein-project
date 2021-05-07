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

songRouter.patch('/like', songController.likeSong);
songRouter.patch(
  '/',
  recaptchaMiddleware,
  validateUpdateSong,
  songController.editSong,
);

songRouter.delete('/', songController.deleteSong);

songRouter.get('/userSongs/liked', songController.getLikedSongs);
songRouter.get('/userSongs/:userId', songController.getSongs);
songRouter.get('/userSongs', songController.getUserSongs);
songRouter.get('/:songId', songController.getSongWithOwnerPopulate);

module.exports = {
  songRouter: songRouter,
};
