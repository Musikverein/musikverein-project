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

playListRouter.post('/', playListController.getPlayList);
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
  playListController.createPlayList,
);
playListRouter.post('/userPlayLists', playListController.getUserPlayList);
playListRouter.delete('/userPlayLists', playListController.deletePlayList);
playListRouter.post(
  '/userPlayLists/follow',
  playListController.getFollowPlayList,
);
playListRouter.patch(
  '/userPlayLists/follow',
  playListController.followPlayList,
);
playListRouter.patch(
  '/userPlayLists/song',
  playListController.addSongToPlayList,
);
playListRouter.delete(
  '/userPlayLists/song',
  playListController.deleteSongFromPlayList,
);
playListRouter.patch(
  '/userPlayLists/order',
  playListController.updateOrderPlayList,
);
playListRouter.get('/byUser/:userId', playListController.getPlayListsByUser);

module.exports = {
  playListRouter: playListRouter,
};
