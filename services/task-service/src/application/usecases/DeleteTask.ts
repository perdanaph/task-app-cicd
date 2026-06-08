import { ITaskRepository } from '../../domain/repositories/ITaskRepository';

export class DeleteTask {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: number, userId: number): Promise<{ message: string }> {
    const task = await this.taskRepository.findById(id);
    if (!task) throw new Error('Task not found');
    if (task.userId !== userId) throw new Error('Unauthorized');

    await this.taskRepository.delete(id);
    return { message: 'Task deleted' };
  }
}