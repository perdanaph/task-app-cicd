const RegisterUser = require('../../src/application/usecases/RegisterUser');
const InMemoryUserRepository = require('../../src/infrastructure/repositories/InMemoryUserRepository');

describe('RegisterUser Use Case', () => {
  let registerUser;
  let userRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    registerUser = new RegisterUser(userRepository);
  });

  test('registers user successfully', async () => {
    const result = await registerUser.execute({
      username: 'john',
      email: 'john@example.com',
      password: 'password123'
    });
    expect(result.username).toBe('john');
    expect(result.password).toBeUndefined();
    expect(result.id).toMatch(/^[0-9a-f-]{36}$/i);
  });

  test('throws if email already registered', async () => {
    await registerUser.execute({
      username: 'john',
      email: 'john@example.com',
      password: 'password123'
    });

    await expect(registerUser.execute({
      username: 'john2',
      email: 'john@example.com',
      password: 'password123'
    })).rejects.toThrow('already registered');
  });

  test('throws if email invalid', async () => {
    await expect(registerUser.execute({
      username: 'john',
      email: 'invalid',
      password: 'password123'
    })).rejects.toThrow('Invalid email');
  });
});