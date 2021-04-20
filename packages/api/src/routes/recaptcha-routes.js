const Router = require('express').Router;

const { recaptchaMiddleware } = require('../middlewares');

const recaptchaRouter = Router();

recaptchaRouter.post('/', recaptchaMiddleware, (req, res) => {
  res.status(200).send({ data: true, error: null });
});

module.exports = { recaptchaRouter: recaptchaRouter };
