import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import taskRoutes from './interfaces/routes/taskRoutes';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'task-service',
    version: process.env.VERSION ?? '1.0.0'
  });
});

app.use('/tasks', taskRoutes);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT ?? 3002;
app.listen(PORT, () => {
  console.log(`📋 Task service (TypeScript) running on port ${PORT}`);
});

export default app;