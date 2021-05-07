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

playListRouter.patch(
  '/userPlayLists/follow',
  playListController.followPlayList,
);
playListRouter.patch(
  '/userPlayLists/song',
  playListController.addSongToPlayList,
);
playListRouter.patch(
  '/userPlayLists/order',
  playListController.updateOrderPlayList,
);

playListRouter.delete('/userPlayLists', playListController.deletePlayList);
playListRouter.delete(
  '/userPlayLists/song',
  playListController.deleteSongFromPlayList,
);

playListRouter.get(
  '/userPlayLists/follow',
  playListController.getFollowPlayList,
);
playListRouter.get('/userPlayLists', playListController.getUserPlayList);
playListRouter.get('/byUser/:userId', playListController.getPlayListsByUser);
playListRouter.get('/:playListId', playListController.getPlayList);

module.exports = {
  playListRouter: playListRouter,
};
