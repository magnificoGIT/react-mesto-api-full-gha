const { INTERNAL_SERVER_500 } = require('../httpStatusConstants');

const internalServer = (err, res) => {
  const { statusCode = INTERNAL_SERVER_500, message } = err;

  res.status(statusCode).send({
    message: statusCode === INTERNAL_SERVER_500 ? 'На сервере произошла ошибка' : message,
  });
};

module.exports = internalServer;
