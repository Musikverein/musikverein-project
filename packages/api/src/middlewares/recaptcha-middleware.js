const { config } = require('../config');
const fetch = require('isomorphic-fetch');

async function recaptchaMiddleware(req, res, next) {
  const { recaptchaToken } = req.body;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${config.recaptcha.key}&response=${recaptchaToken}`;

  fetch(url, { method: 'POST' })
    .then((response) => response.json())
    .then((googleResponse) => {
      if (googleResponse.success) {
        next();
      } else {
        res.status(400).send({ data: null, error: 'You are not human!' });
      }
    });
}

module.exports = { recaptchaMiddleware: recaptchaMiddleware };
