module.exports = {
  hooks: {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
    "pre-commit": "yarn run precommit",
    "pre-push":
      "yarn run lint:js && yarn run lint:format:check && yarn run test:ci:all",
  },
};
