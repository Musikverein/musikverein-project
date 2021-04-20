const { userRouter } = require('./user-routes');
const { recaptchaRouter } = require('./recaptcha-routes');
const { songRouter } = require('./song-routes');

module.exports = {
  userRouter: userRouter,
  recaptchaRouter: recaptchaRouter,
  songRouter: songRouter,

};
