const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config'); // Para desencriptar el token, se require para tener el secret

module.exports = function(req, res, next) {
  const token = req.headers['authorization'];
  if(!token) {
    const error = new Error();
    error.message = 'Token must be sent';
    error.status = 400;
    throw error;
  }

  /**
   * Se valida el token con jwt (verify).
   * Se pasa el token.
   * Se pasa la secret key
   * decodedToken: información del token desencriptado
   */
  jwt.verify(token, JWT_SECRET, function(err, decodedToken) {
    if(err) {
      const error = new Error();
      error.message = 'Invalid token';
      error.status = 401;
      throw error;
    }

    req.user = decodedToken.user;
    // Se le pone el user al request de express para que en cada request
    // que realice un usuario, saber quién realmente está autenticado
    next();
  });
};