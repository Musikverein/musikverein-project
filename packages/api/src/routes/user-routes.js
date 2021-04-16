const Router = require('express').Router;

const { authMiddleware, validateUpdateUser } = require('../middlewares');
const { userController } = require('../controllers');

const userRouter = Router();

userRouter.use(authMiddleware);

userRouter.post('/sign-up', userController.signUp);
userRouter.post('/sign-out', userController.signOut);
userRouter.patch('/update', validateUpdateUser, userController.update);

module.exports = {
  userRouter: userRouter,
};
