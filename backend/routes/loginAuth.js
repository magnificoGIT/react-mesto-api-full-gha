const { celebrate, Joi } = require('celebrate');
const loginAuthRouter = require('express').Router();
const { login, createUser } = require('../controllers/users');
const { urlValidationPattern } = require('../utils/constants');

loginAuthRouter.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(urlValidationPattern),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

loginAuthRouter.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

module.exports = loginAuthRouter;
