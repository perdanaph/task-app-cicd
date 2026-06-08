import { Task } from '../../src/domain/entities/Task';
import { describe, test, expect, beforeEach } from '@jest/globals';

describe('Task Entity', () => {
  test('creates task with defaults', () => {
    const task = new Task({ id: 1, title: 'Test', userId: 1 });
    expect(task.done).toBe(false);
    expect(task.priority).toBe('medium');
    expect(task.description).toBe('');
  });

  test('validateTitle throws if empty', () => {
    expect(() => Task.validateTitle('')).toThrow('required');
  });

  test('validatePriority throws if invalid', () => {
    expect(() => Task.validatePriority('urgent')).toThrow('low, medium, or high');
  });

  test('toJSON returns correct shape', () => {
    const task = new Task({ id: 1, title: 'Test', userId: 1 });
    const json = task.toJSON();
    expect(json.id).toBe(1);
    expect(json.title).toBe('Test');
    expect((json as any).password).toBeUndefined();
  });
});