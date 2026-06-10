import type { Task } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string, done: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export const TaskCard = ({ task, onToggle, onDelete, onEdit }: TaskCardProps) => {
  return (
    <div className={`
      flex items-start gap-4 p-4 rounded-xl border transition-all duration-150
      ${task.done
        ? 'bg-gray-50 border-gray-200 opacity-60'
        : 'bg-white border-gray-200 hover:border-indigo-200 hover:shadow-sm'
      }
    `}>
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id, !task.done)}
        className="mt-1 w-4 h-4 rounded accent-indigo-600 cursor-pointer"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className={`font-medium text-sm ${task.done ? 'line-through text-gray-400' : 'text-gray-900'}`}>
            {task.title}
          </p>
          <Badge variant={task.priority} />
        </div>
        {task.description && (
          <p className="text-xs text-gray-500 mt-1 truncate">{task.description}</p>
        )}
        <p className="text-xs text-gray-400 mt-1">
          {new Date(task.createdAt).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(task)}
          className="text-gray-400 hover:text-indigo-600"
        >
          ✏️
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-500"
        >
          🗑️
        </Button>
      </div>
    </div>
  );
};