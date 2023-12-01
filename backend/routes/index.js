const rootRouter = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');

rootRouter.use('/users', userRouter);
rootRouter.use('/cards', cardRouter);

module.exports = rootRouter;
