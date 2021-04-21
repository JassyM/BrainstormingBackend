const { UserRepository } = require('../../../src/repositories');
const mockingoose = require('mockingoose');
const { User } = require('../../../src/models');
let { UserModelMock: { user, users } } = require('../../mocks');

describe('User Repository Tests', () => {
  beforeEach(() => { // Antes de que se ejecute cada test:
    mockingoose.resetAll(); // Resetear todos los mockings que hayan
    jest.clearAllMocks();
  });

  it('Should return a user by id', async () => {
    const _user =  {...user}; // Se usa el operador de propagación (Spread) 
    // para copiar la información de 'user' sin referencia
    delete _user.password;

    // Prepara el modelo 'User', indicando que cuando se use el método 'findOne'
    // retorne el objeto 'user'
    mockingoose(User).toReturn(user, 'findOne');
    // findOne equivale al findById

    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.get(_user._id); // Testear el método get

    // Se usa el método expect de jest para parsear el contenido de la variable expected,
    // obteniendo un objeto de javascript
    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
    // toMatchObject() Valida de que el contenido de la variable 'expected' sea igual a _user
  });

  it('Should return a user by username', async () => {
    const _user = {...user};
    delete _user.password;

    mockingoose(User).toReturn(user, 'findOne');

    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.getUserByUsername(_user.username);
    
    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
  });

  it('Should return a user collection', async () => {
    const _users = [...users];
    _users.map(user => {
      delete user.password;
      return user;
    });

    mockingoose(User).toReturn(users, 'find');

    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.getAll();

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_users);
  });

  it('Should update an especific user by id', async () => {
    const _user = {...user};
    delete _user.password;

    mockingoose(User).toReturn(user, 'findOneAndUpdate');

    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.update(_user._id, {
      name: 'Mar'
    });

    expect(JSON.parse(JSON.stringify(expected))).toMatchObject(_user);
  });

  it('Should delete an especific user by id', async () => {
    mockingoose(User).toReturn(user, 'findOneAndDelete');
    const _userRepository = new UserRepository({ User });
    const expected = await _userRepository.delete(user._id);
    expect(JSON.parse(JSON.stringify(expected))).toEqual(true);
  });
});