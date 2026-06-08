require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/interfaces/routes/userRoutes');
const { pool } = require('./src/infrastructure/database/db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({
      status: 'ok',
      service: 'user-service',
      version: process.env.VERSION || '1.0.0',
      database: 'connected'
    });
  } catch (err) {
    res.status(503).json({
      status: 'error',
      database: 'disconnected',
      error: err.message
    });
  }
});

app.use('/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('✅ Database connection established');
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  }

  app.listen(PORT, () => {
    console.log(`👤 User service running on port ${PORT}`);
  });
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

module.exports = app;