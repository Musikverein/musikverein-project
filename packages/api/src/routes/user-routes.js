const Router = require('express').Router;

const {
  authMiddleware,
  validateUpdateUser,
  validateCreateUser,
  findIdMiddleware,
} = require('../middlewares');
const { userController } = require('../controllers');

const userRouter = Router();

userRouter.use(authMiddleware);

userRouter.post('/sign-up', validateCreateUser, userController.signUp);
userRouter.post('/sign-out', userController.signOut);

userRouter.patch('/update', validateUpdateUser, userController.update);
userRouter.patch('/follow', findIdMiddleware, userController.followUser);

userRouter.get('/followedBy/:userId', userController.getUserFollowedPopulate);
userRouter.get('/following/:userId', userController.getUserFollowingPopulate);
userRouter.get('/:userId', userController.getUser);

module.exports = {
  userRouter: userRouter,
};
