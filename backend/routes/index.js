const rootRouter = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');

rootRouter.use(auth);

rootRouter.use('/users', userRouter);
rootRouter.use('/cards', cardRouter);

module.exports = rootRouter;
