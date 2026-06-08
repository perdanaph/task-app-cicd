import { Task, Priority } from '../../domain/entities/Task';
import { ITaskRepository } from '../../domain/repositories/ITaskRepository';

interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: Priority;
  userId: number;
}

export class CreateTask {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(input: CreateTaskInput): Promise<ReturnType<Task['toJSON']>> {
    Task.validateTitle(input.title);
    if (input.priority) Task.validatePriority(input.priority);

    const task = new Task({
      id: Date.now(),
      title: input.title,
      description: input.description,
      priority: input.priority,
      userId: input.userId
    });

    await this.taskRepository.save(task);
    return task.toJSON();
  }
}