import { Task } from "../entities/Task";

export interface ITaskRepository {
  save(task: Task): Promise<Task>;
  findById(id: string): Promise<Task | null>;
  findByUserId(userId: string): Promise<Task[]>;
  delete(id: string): Promise<void>;
}