import { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import { Task } from '../../domain/entities/Task';
import { pool } from '../database/db';

export class PostgresTaskRepository implements ITaskRepository {
  async save(task: Task): Promise<Task> {
    const existing = await this.findById(task.id);

    if (existing) {
      await pool.query(
        `UPDATE tasks SET title=$1, description=$2, priority=$3, done=$4 WHERE id=$5`,
        [task.title, task.description, task.priority, task.done, task.id]
      );
    } else {
      await pool.query(
        `INSERT INTO tasks (id, title, description, priority, done, user_id, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [task.id, task.title, task.description, task.priority,
         task.done, task.userId, task.createdAt]
      );
    }
    return task;
  }

  async findById(id: number): Promise<Task | null> {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) return null;
    return this._toTask(result.rows[0]);
  }

  async findByUserId(userId: number): Promise<Task[]> {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows.map(row => this._toTask(row));
  }

  async delete(id: number): Promise<void> {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  }

  // Helper — convert DB row ke Task entity
  private _toTask(row: any): Task {
    return new Task({
      id: parseInt(row.id),
      title: row.title,
      description: row.description,
      priority: row.priority,
      done: row.done,
      userId: parseInt(row.user_id),
      createdAt: row.created_at
    });
  }
}