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
    userName: Joi.string().min(3).max(20).required(),
    firstName: Joi.string().min(3).max(40).required(),
    lastName: Joi.string().min(3).max(80).required(),
  }).with('userName', ['firstName', 'lastName']),

  song: Joi.object({
    title: Joi.string().required(),
    artist: Joi.string().required(),
    genre: Joi.string().required(),
  }).with('title', ['artist', 'genre']),

  playList: Joi.object({
    title: Joi.string().required(),
    type: Joi.string().valid('Album', 'PlayList').required(),
    publicPlayList: Joi.bool().required(),
  }).with('title', ['type', 'publicPlayList']),
};
