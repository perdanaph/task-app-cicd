const User = require('../../src/domain/entities/User');

describe('User Entity', () => {
  test('creates user with correct properties', () => {
    const user = new User({
      id: '550e8400-e29b-41d4-a716-446655440000',
      username: 'john',
      email: 'john@example.com',
      password: 'hashed'
    });
    expect(user.username).toBe('john');
    expect(user.email).toBe('john@example.com');
  });

  test('toJSON excludes password', () => {
    const user = new User({
      id: '550e8400-e29b-41d4-a716-446655440000', 
      username: 'john',
      email: 'john@example.com',
      password: 'hashed'
    });
    const json = user.toJSON();
    expect(json.password).toBeUndefined();
    expect(json.username).toBe('john');
  });

  test('validateEmail throws on invalid email', () => {
    expect(() => User.validateEmail('invalid')).toThrow('Invalid email format');
  });

  test('validatePassword throws if too short', () => {
    expect(() => User.validatePassword('123')).toThrow('at least 6 characters');
  });

  test('validateUsername throws if empty', () => {
    expect(() => User.validateUsername('')).toThrow('required');
  });
});