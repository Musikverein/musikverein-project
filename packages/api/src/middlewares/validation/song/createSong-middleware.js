const Joi = require('joi');

const createSongSchema = Joi.object({
  title: Joi.string().min(3).max(20).required(),
  url: Joi.string().required(),
  duration: Joi.number().required(),
});

async function validateCreateSong(req, res, next) {
  const { title, url, duration } = req.body;

  try {
    const { error } = createSongSchema.validate({
      title,
      url,
      duration,
    });

    if (error) {
      res.status(401).send({ error: error, data: null });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { validateCreateSong };
