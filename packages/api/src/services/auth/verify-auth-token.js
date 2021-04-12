const { verifyIdToken } = require("./auth-provider");

function verifyAuthToken(token) {
  return verifyIdToken(token);
}

module.exports = {
  verifyAuthToken: verifyAuthToken,
};
