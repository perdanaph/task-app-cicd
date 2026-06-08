require('dotenv').config();
const express = require('express');
const cors = require('cors');
const config = require('./src/infrastructure/config');
const { rateLimiter } = require('./src/interfaces/middlewares/rateLimiter');
const { requestLogger } = require('./src/interfaces/middlewares/requestLogger');
const { errorHandler } = require('./src/interfaces/middlewares/errorHandler');
const proxyRoutes = require('./src/interfaces/routes/proxyRoutes');
const healthRoutes = require('./src/interfaces/routes/healthRoutes');

const app = express();

app.use(cors());
app.use(requestLogger);
app.use(rateLimiter);

app.use('/health', healthRoutes);
app.use('/api', proxyRoutes);

app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚪 API Gateway running on port ${PORT}`);
  console.log(`   → User Service: ${config.services.user}`);
  console.log(`   → Task Service: ${config.services.task}`);
});

module.exports = app;