const { userRouter } = require('./user-routes');
const { recaptchaRouter } = require('./recaptcha-router');

module.exports = {
  userRouter: userRouter,
  recaptchaRouter: recaptchaRouter,
};
