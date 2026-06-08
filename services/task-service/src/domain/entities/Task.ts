export type Priority = 'low' | 'medium' | 'high';

export interface TaskProps {
  id: number;
  title: string;
  description?: string;
  priority?: Priority;
  done?: boolean;
  userId: number;
  createdAt?: Date;
}

export class Task {
  readonly id: number;
  title: string;
  description: string;
  priority: Priority;
  done: boolean;
  readonly userId: number;
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