import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { InMemoryTaskRepository } from './InMemoryTaskRepository';
import { PostgresTaskRepository } from './PostgresTaskRepository';

const createRepository = (): ITaskRepository => {
  if (process.env.NODE_ENV === 'test') {
    return new InMemoryTaskRepository();
  }
  return new PostgresTaskRepository();
};

export const taskRepository = createRepository();