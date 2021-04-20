const Joi = require('joi');

const createUserSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'es'] },
    })
    .required(),
});

async function validateCreateUser(req, res, next) {
  const { email } = req.user;

  try {
    const { error } = createUserSchema.validate({
      email,
    });

    if (error) {
      res.status(401).send({ error: error, data: req.body });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { validateCreateUser };
