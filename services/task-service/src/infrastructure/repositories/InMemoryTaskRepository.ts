import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { Task } from '../../domain/entities/Task';

export class InMemoryTaskRepository implements ITaskRepository {
  private tasks: Task[] = [];

  async save(task: Task): Promise<Task> {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index >= 0) {
      this.tasks[index] = task;
    } else {
      this.tasks.push(task);
    }
    return task;
  }

  async findById(id: number): Promise<Task | null> {
    const task = this.tasks.find(t => t.id === id);
    return task ? new Task(task) : null;
  }

  async findByUserId(userId: number): Promise<Task[]> {
    return this.tasks
      .filter(t => t.userId === userId)
      .map(t => new Task(t));
  }

  async delete(id: number): Promise<void> {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index >= 0) this.tasks.splice(index, 1);
  }
}