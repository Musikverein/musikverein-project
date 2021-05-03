const Router = require('express').Router;

const {
  authMiddleware,
  findIdMiddleware,
  recaptchaMiddleware,
  validateCreatePlayList,
  validateUpdatePlayList,
} = require('../middlewares');
const { playListController } = require('../controllers');

const playListRouter = Router();

playListRouter.use(authMiddleware);
playListRouter.use(findIdMiddleware);

playListRouter.post('/', playListController.getPlaylist);
playListRouter.patch(
  '/',
  recaptchaMiddleware,
  validateUpdatePlayList,
  playListController.editPlayList,
);
playListRouter.post(
  '/create',
  recaptchaMiddleware,
  validateCreatePlayList,
  playListController.create,
);
playListRouter.post('/userPlaylists', playListController.getUserPlaylist);
playListRouter.delete('/userPlaylists', playListController.deletePlaylist);
playListRouter.post(
  '/userPlaylists/follow',
  playListController.getFollowPlaylist,
);
playListRouter.patch(
  '/userPlaylists/follow',
  playListController.followPlayList,
);
playListRouter.patch(
  '/userPlaylists/song',
  playListController.addSongToPlayList,
);
playListRouter.delete(
  '/userPlaylists/song',
  playListController.deleteSongFromPlayList,
);

playListRouter.patch(
  '/userPlaylists/order',
  playListController.updateOrderPlayList,
);

module.exports = {
  playListRouter: playListRouter,
};
