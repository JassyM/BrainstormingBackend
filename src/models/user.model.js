const mongoose = require('mongoose');
const { Schema } = mongoose;
const { compareSync, hashSync, genSaltSync, hash } = require('bcryptjs');
/**
 * compareSync: Compara las contraseñas. Compara si es igual a la contraseña encriptada.
 * hashSync: Crea un hasg para la contraseña.
 * genSaltSync: Genera un salt que se agrega al hash de la contraseña
 */

const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
});

UserSchema.methods.toJSON = function() {
  // Cada vez que se lea un documento de tipo User, elimina el campo contraseña
  let user = this.toObject(); // Convierte el documento de mongo en un objeto de JavaScript
  delete user.password;
  return user;
}

UserSchema.methods.comparePasswords = function(password) {
  // Compara las contraseñas una vez se hayan encriptado
  return compareSync(password, this.password);
  // Compara con el password que se está enviado, con el this.password del documento
}

UserSchema.pre('save', async function(next) { // Se usa una function tradicional para que no se pierda el scope de Mongoose
  const user = this; // Este this hace referencia al usuario que se está guardando

  if (!user.isModified('password')) {
    // Validamos si no se está modificando la contraseña
    return next(); // Se avanza para que mongoose continue con el flujo.
  }

  // Si se está modificando la contraseña, se genera un salt de 10 caracteres
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(user.password, salt);
  user.password = hashedPassword;
  next();
});

module.exports = mongoose.model('user', UserSchema);