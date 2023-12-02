require('dotenv').config();
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/unauthorized');
const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  // Реализовать потом
  // const tokenCookies = req.cookies.jwt;
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new UnauthorizedError('Вы не авторизованы'));
  }
  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnauthorizedError('Вы не авторизованы'));
  }
  req.user = payload;

  return next();
};
