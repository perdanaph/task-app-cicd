import { useState, useEffect, useCallback } from 'react';
import type { Task } from '../types';
import { taskService } from '../services/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = async (title: string, description: string, priority: string) => {
    const task = await taskService.create(title, description, priority);
    setTasks(prev => [task, ...prev]);
    return task;
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const updated = await taskService.update(id, updates);
    setTasks(prev => prev.map(t => t.id === id ? updated : t));
    return updated;
  };

  const deleteTask = async (id: string) => {
    await taskService.delete(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleTask = async (id: string, done: boolean) => {
    return updateTask(id, { done });
  };

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTask
  };
};