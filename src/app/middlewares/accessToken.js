const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

// eslint-disable-next-line consistent-return
function accessToken(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) {
    return res
      .status(401)
      .json({ errror: 'Acesso negado, autorização não informada' });
  }
  const parts = auth.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ errror: 'Token de acesso mal formatado' });
  }
  const [bearer, token] = parts;

  if (!bearer.match(/^Bearer$/g)) {
    return res.status(401).json({ errror: 'Token de acesso mal formatado' });
  }
  // eslint-disable-next-line consistent-return
  jwt.verify(token, secretKey, (error, response) => {
    if (error) {
      return res.status(401).json({ errror: 'Token inválido' });
    }
    if (response) {
      return next();
    }
  });
}

module.exports = accessToken;
