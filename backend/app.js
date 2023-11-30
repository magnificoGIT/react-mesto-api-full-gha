const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
const { errors } = require('celebrate');
const NotFoundError = require('./utils/errors/notFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, MONGO_URL } = process.env;
const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:3001',
      'https://mestomagnifico.nomoredomainsmonster.ru',
    ], // URL фронтенда
    credentials: true, // Разрешаем отправку куки и авторизационных заголовков
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', require('./routes/loginAuth'));

app.use('/', require('./routes/index'));

app.all('*', (req, res, next) => {
  next(new NotFoundError('Ошибка пути'));
});

app.use(errorLogger);

app.use(errors());
app.use(require('./middlewares/centralizedErrorHandler'));

app.listen(PORT, () => {
  console.log(`Сервер запустился на порту ${PORT}`);
});
