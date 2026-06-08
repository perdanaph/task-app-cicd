import { Task } from '../../src/domain/entities/Task';
import { describe, test, expect, beforeEach } from '@jest/globals';

describe('Task Entity', () => {
  test('creates task with defaults', () => {
    const task = new Task({
      id: Task.generateId(),
      title: 'Test',
      userId: 'user-uuid-123'
    });
    expect(task.done).toBe(false);
    expect(task.priority).toBe('medium');
  });

  test('generateId returns valid UUID format', () => {
    const id = Task.generateId();
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    expect(id).toMatch(uuidRegex);
  });

  test('validateTitle throws if empty', () => {
    expect(() => Task.validateTitle('')).toThrow('required');
  });

  test('validatePriority throws if invalid', () => {
    expect(() => Task.validatePriority('urgent')).toThrow('low, medium, or high');
  });
});