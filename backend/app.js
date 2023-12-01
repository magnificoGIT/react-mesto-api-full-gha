require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { errors } = require('celebrate');
const { MONGO_URI } = require('./config');
const NotFoundError = require('./utils/errors/notFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
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

mongoose.connect(MONGO_URI, {
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

app.use(auth);

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.all('*', (req, res, next) => {
  next(new NotFoundError('Ошибка пути'));
});

app.use(errorLogger);

app.use(errors());

// Централизованный обработчик ошибок
app.use(require('./middlewares/centralizedErrorHandler'));

app.listen(PORT, () => {
  console.log(`Сервер запустился на порту ${PORT}`);
});
