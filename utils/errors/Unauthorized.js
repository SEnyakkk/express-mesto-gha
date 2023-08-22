const { HTTP_STATUS_UNAUTHORIZED } = require('http2').constants;

class Unauthorized extends Error {
  constructor(message = 'Необходима авторизация') {
    super(message);
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
}

module.exports = Unauthorized;
