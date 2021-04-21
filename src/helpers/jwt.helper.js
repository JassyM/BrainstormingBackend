const { sign } = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

// Se le agrega la variable generateToken por medio de Dot Notation
module.exports.generateToken = function(user) {
  /**
   * Se invoca el método sign, se le pasa el user en forma de objeto
   * se le pasa el JWT_SECRET (el token)
   * se pasa un options donde se indica el tiempo en el que expirará el token (4 horas)
   */
  return sign({ user }, JWT_SECRET, { expiresIn: '4h'});
};