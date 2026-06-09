const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER || 'appuser',
  password: process.env.DB_PASSWORD || 'apppassword',
  database: process.env.DB_NAME || 'appdb',
  connectionTimeoutMillis: 10000
});

const migrations = [
  {
    version: 1,
    name: 'create_users_table',
    sql: `
      CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
      
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        username VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
      
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `
  },
  {
    version: 2,
    name: 'create_tasks_table',
    sql: `
      CREATE TABLE IF NOT EXISTS tasks (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        title VARCHAR(200) NOT NULL,
        description TEXT DEFAULT '',
        priority VARCHAR(10) DEFAULT 'medium',
        done BOOLEAN DEFAULT false,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);
    `
  }
];

const runMigrations = async () => {
  console.log('🚀 Starting database migrations...');

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version INTEGER PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP DEFAULT NOW()
      )
    `);

    const result = await pool.query(
      'SELECT version FROM schema_migrations ORDER BY version'
    );
    const executedVersions = result.rows.map(r => r.version);

    for (const migration of migrations) {
      if (executedVersions.includes(migration.version)) {
        console.log(`⏭️  Skipping migration ${migration.version}: ${migration.name} (already executed)`);
        continue;
      }

      console.log(`⚡ Running migration ${migration.version}: ${migration.name}`);
      
      await pool.query('BEGIN');
      try {
        await pool.query(migration.sql);
        await pool.query(
          'INSERT INTO schema_migrations (version, name) VALUES ($1, $2)',
          [migration.version, migration.name]
        );
        await pool.query('COMMIT');
        console.log(`✅ Migration ${migration.version} completed`);
      } catch (err) {
        await pool.query('ROLLBACK');
        throw err;
      }
    }

    console.log('🎉 All migrations completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

runMigrations();