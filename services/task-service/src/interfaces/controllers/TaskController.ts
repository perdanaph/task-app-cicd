import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { CreateTask } from '../../application/usecases/CreateTask';
import { GetTasks } from '../../application/usecases/GetTasks';
import { UpdateTask } from '../../application/usecases/UpdateTask';
import { DeleteTask } from '../../application/usecases/DeleteTask';

export class TaskController {
  private createTask: CreateTask;
  private getTasks: GetTasks;
  private updateTask: UpdateTask;
  private deleteTask: DeleteTask;

  constructor(taskRepository: ITaskRepository) {
    this.createTask = new CreateTask(taskRepository);
    this.getTasks = new GetTasks(taskRepository);
    this.updateTask = new UpdateTask(taskRepository);
    this.deleteTask = new DeleteTask(taskRepository);
  }

  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const task = await this.createTask.execute({
        ...req.body,
        userId: req.user!.id
      });
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  }

  async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const tasks = await this.getTasks.executeByUser(req.user!.id);
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  }

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const task = await this.updateTask.execute(
        Number(req.params.id),
        req.user!.id,
        req.body
      );
      res.status(200).json(task);
    } catch (err) {
      const message = (err as Error).message;
      const status = message === 'Unauthorized' ? 403
        : message === 'Task not found' ? 404 : 400;
      res.status(status).json({ error: message });
    }
  }

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const result = await this.deleteTask.execute(
        Number(req.params.id),
        req.user!.id
      );
      res.json(result);
    } catch (err) {
      const message = (err as Error).message;
      const status = message === 'Unauthorized' ? 403
        : message === 'Task not found' ? 404 : 400;
      res.status(status).json({ error: message });
    }
  }
}