const Joi = require('joi');

const updateUserValidationSchema = Joi.object({
  userName: Joi.string().min(3).max(20).required(),
  firstName: Joi.string().min(3).max(40).required(),
  lastName: Joi.string().min(3).max(80).required(),
});

async function validateUpdateUser(req, res, next) {
  const { userName, firstName, lastName } = req.body;

  try {
    const { error } = updateUserValidationSchema.validate({
      userName,
      firstName,
      lastName,
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

module.exports = { validateUpdateUser };
