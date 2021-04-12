module.exports = {
  "packages/**/*.js": [
    "yarn run lint:js",
    "yarn run lint:format",
    "yarn run test:related",
  ],
  "*.{css,scss,html,md,json,yml,yaml}": ["yarn run lint:format"],
};
