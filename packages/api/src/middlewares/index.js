const { authMiddleware } = require('./auth-middleware');
const { errorMiddleware } = require('./error-middleware');
const { validateUpdateUser } = require('./updateUser-middleware');
const { recaptchaMiddleware } = require('./recaptcha-middleware');

module.exports = {
  authMiddleware: authMiddleware,
  errorMiddleware: errorMiddleware,
  validateUpdateUser: validateUpdateUser,
  recaptchaMiddleware: recaptchaMiddleware,
};
