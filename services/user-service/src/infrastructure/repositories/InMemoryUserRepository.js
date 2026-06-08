const IUserRepository = require('../../domain/repositories/IUserRepository');
const User = require('../../domain/entities/User');

class InMemoryUserRepository extends IUserRepository {
  constructor() {
    super();
    this.users = [];
  }

  async save(user) {
    const existing = this.users.findIndex(u => u.id === user.id);
    if (existing >= 0) {
      this.users[existing] = user;
    } else {
      this.users.push(user);
    }
    return user;
  }

  async findById(id) {
    const user = this.users.find(u => u.id === parseInt(id));
    if (!user) return null;
    return new User(user);
  }

  async findByEmail(email) {
    const user = this.users.find(u => u.email === email);
    if (!user) return null;
    return new User(user);
  }

  async findAll() {
    return this.users.map(u => new User(u));
  }
}

module.exports = InMemoryUserRepository;