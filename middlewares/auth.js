const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'JWT_SECRET' } = process.env;
const Unauthorized = require('../utils/errors/Unauthorized');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Unauthorized();
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Unauthorized();
  }
  req.user = payload;
  next();
};
