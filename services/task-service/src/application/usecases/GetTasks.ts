import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { TaskProps } from '../../domain/entities/Task';

export class GetTasks {
  constructor(private taskRepository: ITaskRepository) {}

  async executeByUser(userId: string): Promise<TaskProps[]> {
    const tasks = await this.taskRepository.findByUserId(userId);
    return tasks.map(t => t.toJSON());
  }

  async executeById(id: string, userId: string): Promise<TaskProps> {
    const task = await this.taskRepository.findById(id);
    if (!task) throw new Error('Task not found');
    if (task.userId !== userId) throw new Error('Unauthorized');
    return task.toJSON();
  }
}