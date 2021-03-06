const { UserService } = require('../../../src/services');
const { UserRepositoryMock } = require('../../mocks');
const { UserModelMock: { user, users } } = require('../../mocks');

describe('User Service Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpia todos los mocks cada vez que se ejecuta cada test
  });

  it('Should find a user by id', async () => {
    const UserRepository = UserRepositoryMock;
    // Se le indica a la función get que el valor que va a retornar la función, va ser
    // lo que se le está pasando en mockReturnValue ->'user'
    UserRepository.get.mockReturnValue(user);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.get(user._id);
    expect(expected).toMatchObject(user);
  });

  it('Should find a user by username', async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.getUserByUsername.mockReturnValue(user);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.getUserByUsername(user.username);
    expect(expected).toMatchObject(user);
  });

  it('Should return a user collection', async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.getAll.mockReturnValue(users);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.getAll();
    expect(expected).toMatchObject(users);
  });

  it('Should update a user by id', async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.update.mockReturnValue(user);

    const _userService = new UserService({ UserRepository });
    const expected = await _userService.update(user._id, user);
    expect(expected).toMatchObject(user);
  });

  it('Should delete a user by id', async () => {
    const UserRepository = UserRepositoryMock;
    UserRepository.delete.mockReturnValue(true);

    const _userService = new UserService({ UserRepository });

    const expected = await _userService.delete(user._id);
    expect(expected).toEqual(true);
  });
});
