import { describe, test, expect, beforeEach } from '@jest/globals';
import { CreateTask } from '../../src/application/usecases/CreateTask';
import { InMemoryTaskRepository } from '../../src/infrastructure/repositories/InMemoryTaskRepository';

describe('CreateTask Use Case', () => {
  let createTask: CreateTask;

  beforeEach(() => {
    createTask = new CreateTask(new InMemoryTaskRepository());
  });

  test('creates task successfully', async () => {
    const task = await createTask.execute({
      title: 'Buy groceries',
      priority: 'high',
      userId: 1
    });
    expect(task.title).toBe('Buy groceries');
    expect(task.priority).toBe('high');
    expect(task.done).toBe(false);
  });

  test('throws if title empty', async () => {
    await expect(createTask.execute({ title: '', userId: 1 }))
      .rejects.toThrow('required');
  });

  test('throws if priority invalid', async () => {
    await expect(
      createTask.execute({ title: 'Test', priority: 'urgent' as any, userId: 1 })
    ).rejects.toThrow('low, medium, or high');
  });
});