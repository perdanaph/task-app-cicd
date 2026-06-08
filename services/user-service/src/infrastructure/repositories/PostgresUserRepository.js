const IUserRepository = require('../../domain/repositories/IUserRepository');
const User = require('../../domain/entities/User');
const { pool } = require('../database/db');

class PostgresUserRepository extends IUserRepository {
  async save(user) {
    const existing = await this.findById(user.id);

    if (existing) {
      // Update
      await pool.query(
        `UPDATE users SET username=$1, email=$2, password=$3 WHERE id=$4`,
        [user.username, user.email, user.password, user.id]
      );
    } else {
      // Insert
      await pool.query(
        `INSERT INTO users (id, username, email, password, created_at)
         VALUES ($1, $2, $3, $4, $5)`,
        [user.id, user.username, user.email, user.password, user.createdAt]
      );
    }
    return user;
  }

  async findById(id) {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) return null;
    return this._toUser(result.rows[0]);
  }

  async findByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    if (result.rows.length === 0) return null;
    return this._toUser(result.rows[0]);
  }

  async findAll() {
    const result = await pool.query(
      'SELECT * FROM users ORDER BY created_at DESC'
    );
    return result.rows.map(row => this._toUser(row));
  }

  // Helper — convert DB row ke User entity
  _toUser(row) {
    return new User({
      id: row.id,
      username: row.username,
      email: row.email,
      password: row.password,
      createdAt: row.created_at
    });
  }
}

module.exports = PostgresUserRepository;