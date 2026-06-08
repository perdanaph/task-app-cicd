const InMemoryUserRepository = require('./InMemoryUserRepository');
const PostgresUserRepository = require('./PostgresUserRepository');

const createRepository = () => {
  if (process.env.NODE_ENV === 'test') {
    return new InMemoryUserRepository();
  }
  return new PostgresUserRepository();
};

const userRepository = createRepository();

module.exports = { userRepository };