const { verifyAuthToken } = require("./verify-auth-token");
const { getAuthToken } = require("./get-auth-token");
const { login } = require("./login");
const { signOut } = require("./sign-out");

module.exports = {
  verifyAuthToken: verifyAuthToken,
  getAuthToken: getAuthToken,
  login: login,
  signOut: signOut,
};
