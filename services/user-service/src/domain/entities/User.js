class User {
  constructor({ id, username, email, password, createdAt }) {
    this.id = id;  // string UUID sekarang
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt || new Date();
  }

  static generateId() {
    // Generate UUID v4 tanpa library tambahan
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
  }

  static validatePassword(password) {
    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
  }

  static validateUsername(username) {
    if (!username || username.trim().length === 0) {
      throw new Error('Username is required');
    }
  }

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