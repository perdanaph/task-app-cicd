const PostgresUserRepository = require('./PostgresUserRepository');

const userRepository = new PostgresUserRepository();

module.exports = { userRepository };