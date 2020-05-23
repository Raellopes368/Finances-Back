const jwt = require('jsonwebtoken');

function generateToken(id) {
  const secretKey = process.env.SECRET_KEY;
  const token = jwt.sign({ id }, secretKey);
  return token;
}

module.exports = generateToken;
