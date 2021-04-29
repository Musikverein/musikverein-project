const Joi = require('joi');

const createPlayListSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  type: Joi.string().valid('PlayList', 'Album').required(),
  isPublic: Joi.bool().required(),
  image: Joi.string().required(),
});

async function validateUpdatePlayList(req, res, next) {
  const { title, type, isPublic, image } = req.body;

  try {
    const { error } = createPlayListSchema.validate({
      title,
      type,
      isPublic,
      image,
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

module.exports = { validateUpdatePlayList };
