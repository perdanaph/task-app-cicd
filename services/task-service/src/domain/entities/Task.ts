export type Priority = 'low' | 'medium' | 'high';

export interface TaskProps {
  id: string;        // ← string UUID
  title: string;
  description?: string;
  priority?: Priority;
  done?: boolean;
  userId: string;    // ← string UUID
  createdAt?: Date;
}

export class Task {
  readonly id: string;
  title: string;
  description: string;
  priority: Priority;
  done: boolean;
  readonly userId: string;
  readonly createdAt: Date;

  constructor(props: TaskProps) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description ?? '';
    this.priority = props.priority ?? 'medium';
    this.done = props.done ?? false;
    this.userId = props.userId;
    this.createdAt = props.createdAt ?? new Date();
  }

  static generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  static validateTitle(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new Error('Title is required');
    }
  }

  static validatePriority(priority: string): void {
    const valid: Priority[] = ['low', 'medium', 'high'];
    if (!valid.includes(priority as Priority)) {
      throw new Error('Priority must be low, medium, or high');
    }
  }

  toJSON(): TaskProps {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      priority: this.priority,
      done: this.done,
      userId: this.userId,
      createdAt: this.createdAt
    };
  }
}