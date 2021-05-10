const Joi = require('joi');

const updateSongSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  artist: Joi.string().min(3).max(150).required(),
  genre: Joi.string().min(9).required(),
});

async function validateUpdateSong(req, res, next) {
  const { title, artist, genre } = req.body;

  try {
    const { error } = updateSongSchema.validate({
      title,
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

module.exports = { validateUpdateSong };
