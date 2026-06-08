const { Router } = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('../../infrastructure/config');

const router = Router();

const createProxy = (target, serviceName, pathRewrite) => createProxyMiddleware({
  target,
  changeOrigin: true,
  proxyTimeout: 30000,
  pathRewrite,
  on: {
    error: (err, req, res) => {
      console.error(`[PROXY ERROR] ${serviceName}: ${err.message}`);
      if (!res.headersSent) {
        res.status(503).json({ error: `${serviceName} is unavailable` });
      }
    },
    proxyReq: (proxyReq, req) => {
      console.log(`[PROXY] ${req.method} ${req.path} → ${target}${proxyReq.path}`);
    }
  }
});


router.use('/users', createProxy(
  config.services.user,
  'user-service',
  { '^/api/users': '/users' }
));


router.use('/tasks', createProxy(
  config.services.task,
  'task-service',
  { '^/api/tasks': '/tasks' }
));

module.exports = router;