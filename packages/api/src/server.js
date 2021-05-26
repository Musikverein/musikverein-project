const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const { json } = require('body-parser');
const cors = require('cors');

const { errorMiddleware } = require('./middlewares');
const {
  userRouter,
  recaptchaRouter,
  songRouter,
  playListRouter,
  searchRouter,
  genresRouter,
  playedRouter,
  trendsRouter,
} = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(json());
app.use(
  cors({
    origin: '*',
  }),
);

app.use('/user', userRouter);
app.use('/recaptcha', recaptchaRouter);
app.use('/songs', songRouter);
app.use('/playList', playListRouter);
app.use('/search', searchRouter);
app.use('/genres', genresRouter);
app.use('/played', playedRouter);
app.use('/trends', trendsRouter);

app.get('/', (req, res) => {
  res.status(200).send({
    data: 'hello-world',
  });
});

app.use(errorMiddleware);

module.exports = {
  app: app,
};
