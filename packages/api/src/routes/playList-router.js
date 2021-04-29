const Router = require('express').Router;

const {
  authMiddleware,
  findIdMiddleware,
  recaptchaMiddleware,
  validateCreatePlayList,
} = require('../middlewares');
const { playListController } = require('../controllers');

const playListRouter = Router();

playListRouter.use(authMiddleware);
playListRouter.use(findIdMiddleware);

playListRouter.post(
  '/create',
  recaptchaMiddleware,
  validateCreatePlayList,
  playListController.create,
);
playListRouter.post('/userPlaylists', playListController.getPlaylist);
playListRouter.post(
  '/userPlaylists/follow',
  playListController.getFollowPlaylist,
);
playListRouter.delete(
  '/userPlaylists/delete',
  playListController.deletePlaylist,
);
playListRouter.patch('/follow', playListController.followPlayList);

module.exports = {
  playListRouter: playListRouter,
};
