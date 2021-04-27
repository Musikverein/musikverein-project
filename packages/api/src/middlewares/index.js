const { authMiddleware } = require('./auth-middleware');
const { errorMiddleware } = require('./error-middleware');
const {
  validateUpdateUser,
} = require('./validation/user/updateUser-middleware');
const { recaptchaMiddleware } = require('./recaptcha-middleware');
const {
  validateCreateUser,
} = require('./validation/user/createUser-middleware');
const { findIdMiddleware } = require('./findId-middleware');
const {
  validateCreateSong,
} = require('./validation/song/createSong-middleware');
const {
  validateCreatePlayList,
} = require('./validation/playList/createPlayList-middleware');

module.exports = {
  authMiddleware: authMiddleware,
  errorMiddleware: errorMiddleware,
  validateUpdateUser: validateUpdateUser,
  recaptchaMiddleware: recaptchaMiddleware,
  validateCreateUser: validateCreateUser,
  findIdMiddleware: findIdMiddleware,
  validateCreateSong: validateCreateSong,
  validateCreatePlayList: validateCreatePlayList,
};
