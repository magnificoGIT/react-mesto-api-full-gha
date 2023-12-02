const { STATUS_CONFLICT_409 } = require('../httpStatusConstants');

class StatusConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = STATUS_CONFLICT_409;
  }
}

module.exports = StatusConflictError;
