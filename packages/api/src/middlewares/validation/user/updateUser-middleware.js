const Joi = require('joi');

const updateUserValidationSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(10).required(),
  firstName: Joi.string().alphanum().min(3).max(15).required(),
  lastName: Joi.string().alphanum().min(3).max(20).required(),
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
