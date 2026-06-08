const config = require('../../infrastructure/config');

class HealthController {
  check(req, res) {
    res.json({
      status: 'ok',
      service: 'api-gateway',
      version: process.env.VERSION || '1.0.0',
      timestamp: new Date().toISOString(),
      services: {
        user: config.services.user,
        task: config.services.task
      }
    });
  }
}

module.exports = HealthController;