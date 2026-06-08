import { Task } from "../entities/Task";

export interface ITaskRepository {
  save(task: Task): Promise<Task>;
  findById(id: number): Promise<Task | null>;
  findByUserId(userId: number): Promise<Task[]>;
  delete(id: number): Promise<void>;
}