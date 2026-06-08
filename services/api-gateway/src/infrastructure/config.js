require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  services: {
    user: process.env.USER_SERVICE_URL || 'http://localhost:3001',
    task: process.env.TASK_SERVICE_URL || 'http://localhost:3002'
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX || '100')
  }
};