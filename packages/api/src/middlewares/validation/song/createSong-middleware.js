const Joi = require('joi');

const createSongSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  url: Joi.string().required(),
  duration: Joi.number().required(),
  artist: Joi.string().min(3).max(150).required(),
  genre: Joi.string().min(10).required(),
});

async function validateCreateSong(req, res, next) {
  const { title, url, duration, artist, genre } = req.body;

  try {
    const { error } = createSongSchema.validate({
      title,
      url,
      duration,
      artist,
      genre,
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
