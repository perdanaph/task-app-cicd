import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { authenticate } from '../middlewares/auth';
import { taskRepository } from '../../infrastructure/repositories/repositoryInstance';

const router = Router();
const taskController = new TaskController(taskRepository);

router.use(authenticate);

router.get('/', (req, res) => taskController.getAll(req as any, res));
router.post('/', (req, res) => taskController.create(req as any, res));
router.patch('/:id', (req, res) => taskController.update(req as any, res));
router.delete('/:id', (req, res) => taskController.delete(req as any, res));

export default router;