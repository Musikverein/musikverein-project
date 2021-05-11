const { userRouter } = require('./user-routes');
const { recaptchaRouter } = require('./recaptcha-routes');
const { songRouter } = require('./song-routes');
const { playListRouter } = require('./playList-router');
const { searchRouter } = require('./search-routes');
const { genresRouter } = require('./genres-router');
const { playedRouter } = require('./played-router');

module.exports = {
  userRouter: userRouter,
  recaptchaRouter: recaptchaRouter,
  songRouter: songRouter,
  playListRouter: playListRouter,
  searchRouter: searchRouter,
  genresRouter: genresRouter,
  playedRouter: playedRouter,
};
