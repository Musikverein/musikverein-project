const Router = require('express').Router;

const {
  authMiddleware,
  validateUpdateUser,
  validateCreateUser,
  recaptchaMiddleware,
  findIdMiddleware,
} = require('../middlewares');
const { userController } = require('../controllers');

const userRouter = Router();

userRouter.use(authMiddleware);

userRouter.post('/sign-up', validateCreateUser, userController.signUp);
userRouter.post('/sign-out', userController.signOut);
userRouter.patch(
  '/update',
  recaptchaMiddleware,
  validateUpdateUser,
  userController.update,
);
userRouter.get('/:userId', userController.getUser);
userRouter.get('/followedBy/:userId', userController.getUserFollowedPopulate);
userRouter.get('/following/:userId', userController.getUserFollowingPopulate);
userRouter.patch('/follow', findIdMiddleware, userController.followUser);

module.exports = {
  userRouter: userRouter,
};
