const rateLimit = require('express-rate-limit');
const config = require('../../infrastructure/config');

const rateLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: { error: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = { rateLimiter };