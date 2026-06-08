const User = require('../../domain/entities/User');
const bcrypt = require('bcryptjs');

class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ username, email, password }) {
    User.validateUsername(username);
    User.validateEmail(email);
    User.validatePassword(password);

    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      id: User.generateId(), // ← UUID sekarang
      username,
      email,
      password: hashedPassword
    });

    await this.userRepository.save(user);
    return user.toJSON();
  }
}

module.exports = RegisterUser;