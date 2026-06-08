const User = require('../../domain/entities/User');
const bcrypt = require('bcryptjs');

class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ username, email, password }) {
    // Validasi di domain
    User.validateUsername(username);
    User.validateEmail(email);
    User.validatePassword(password);

    // Cek apakah email sudah ada
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new Error('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const user = new User({
      id: Date.now(),
      username,
      email,
      password: hashedPassword
    });

    // Simpan ke repository
    await this.userRepository.save(user);

    return user.toJSON();
  }
}

module.exports = RegisterUser;