const { generateToken } = require('../helpers/jwt.helper');
let _userService = null;

class AuthService {
  constructor({ UserService }) {
    _userService = UserService;
  }

  /**
   * Crea un usuario
   * @returns Usuario creado
   */
  async signUp(user) {
    const { username } = user;
    const userExist = await _userService.getUserByUsername(username);
    if(userExist) {
      const error = new Error();
      error.status = 401;
      error.message = 'User already exist';
      throw error;
    }

    return await _userService.create(user);
  }

  async signIn(user) {
    const { username, password } = user;
    const userExist = await _userService.getUserByUsername(username);
    if(!userExist) {
      const error = new Error();
      error.status = 404;
      error.message = 'User does not exists';
      throw error;
    }

    const validPassword = userExist.comparePasswords(password);
    if(!validPassword) {
      const error = new Error();
      error.status = 401;
      error.message = 'Invalid Password';
      throw error;
    }

    const userToEncode = {
      username: userExist.username,
      id: userExist._id
    };

    const token = generateToken(userToEncode); // Genera el token con la información del usuario

    return { token, user: userExist };
  }
}

module.exports = AuthService;