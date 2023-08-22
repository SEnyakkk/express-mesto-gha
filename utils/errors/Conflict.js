const { HTTP_STATUS_CONFLICT } = require('http2').constants;

class ConflictError extends Error {
  constructor(message = 'Конфликт данных') {
    super(message);
    this.statusCode = HTTP_STATUS_CONFLICT;
  }
}

module.exports = ConflictError;
