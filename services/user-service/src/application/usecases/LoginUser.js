const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.jwtSecret = process.env.JWT_SECRET || 'secret123';
  }

  async execute({ email, password }) {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Cari user
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Cek password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      this.jwtSecret,
      { expiresIn: '24h' }
    );

    return { token, user: user.toJSON() };
  }
}

module.exports = LoginUser;