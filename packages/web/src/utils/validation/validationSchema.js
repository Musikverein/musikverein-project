import Joi from 'joi';

export const validationSchema = {
  login: Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'es'] },
      })
      .required(),
    password: Joi.string().min(6).max(20).required(),
  }).with('email', 'password'),

  signup: Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'es'] },
      })
      .required(),
    password: Joi.string().min(6).max(20).required(),
    confirmPassword: Joi.ref('password'),
  }).with('email', ['password', 'confirmPassword']),

  resetPassword: Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'es'] },
      })
      .required(),
  }),

  userProfile: Joi.object({
    userName: Joi.string().min(3).max(10).required(),
    firstName: Joi.string().min(3).max(15).required(),
    lastName: Joi.string().min(3).max(20).required(),
  }).with('userName', ['firstName', 'lastName']),
};
