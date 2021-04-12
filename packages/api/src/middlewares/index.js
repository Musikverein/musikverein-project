const { authMiddleware } = require("./auth-middleware");
const { errorMiddleware } = require("./error-middleware");

module.exports = {
  authMiddleware: authMiddleware,
  errorMiddleware: errorMiddleware,
};
