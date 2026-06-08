import { Priority, Task } from '../../domain/entities/Task';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository';

interface UpdateTaskInput {
  title?: string;
  description?: string;
  priority?: Priority;
  done?: boolean;
}

export class UpdateTask {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: string, userId: string, updates: UpdateTaskInput) {
    const task = await this.taskRepository.findById(id);
    if (!task) throw new Error('Task not found');
    if (task.userId !== userId) throw new Error('Unauthorized');

    if (updates.title !== undefined) {
      Task.validateTitle(updates.title);
      task.title = updates.title;
    }
    if (updates.description !== undefined) task.description = updates.description;
    if (updates.priority !== undefined) {
      Task.validatePriority(updates.priority);
      task.priority = updates.priority;
    }
    if (updates.done !== undefined) task.done = updates.done;

    await this.taskRepository.save(task);
    return task.toJSON();
  }
}