class User {
  constructor({ id, username, email, password, createdAt }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt || new Date();
  }

  // Business rule — email harus valid
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
  }

  // Business rule — password minimal 6 karakter
  static validatePassword(password) {
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
  }

  // Business rule — username tidak boleh kosong
  static validateUsername(username) {
    if (!username || username.trim().length === 0) {
      throw new Error('Username is required');
    }
  }

  // Return user tanpa password (untuk response API)
  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      createdAt: this.createdAt
    };
  }
}

module.exports = User;