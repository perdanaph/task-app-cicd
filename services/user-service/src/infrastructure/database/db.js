const { Pool, types } = require('pg');

types.setTypeParser(20, (val) => parseInt(val));

const pool = process.env.NODE_ENV === 'test' ? null : new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'appuser',
  password: process.env.DB_PASSWORD || 'apppassword',
  database: process.env.DB_NAME || 'appdb',
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  allowExitOnIdle: false
});

if (pool) {
  pool.connect((err, client, release) => {
    if (err) {
      console.error('❌ PostgreSQL connection error:', err.message);
    } else {
      console.log('✅ PostgreSQL connected!');
      release();
    }
  });

  pool.on('error', (err) => {
    console.error('Unexpected PostgreSQL error:', err);
  });
}

module.exports = { pool };