import { useState } from 'react';
import { Navbar } from '../components/layout/Navbar';
import { TaskCard } from '../components/task/TaskCard';
import { CreateTaskModal } from '../components/task/createTaskModal';
import { Button } from '../components/ui/Button';
import { useTasks } from '../hooks/useTasks';
import type { Task } from '../types';

export const DashboardPage = () => {
  const { tasks, loading, error, createTask, toggleTask, deleteTask } = useTasks();
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'done'>('all');
  const [editTask, setEditTask] = useState<Task | null>(null);

  const filtered = tasks.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  const stats = {
    total: tasks.length,
    done: tasks.filter(t => t.done).length,
    active: tasks.filter(t => !t.done).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, color: 'text-indigo-600' },
            { label: 'Active', value: stats.active, color: 'text-yellow-600' },
            { label: 'Done', value: stats.done, color: 'text-green-600' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {(['all', 'active', 'done'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`
                  px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors
                  ${filter === f
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-indigo-300'
                  }
                `}
              >
                {f}
              </button>
            ))}
          </div>

          <Button onClick={() => setShowModal(true)}>
            + New Task
          </Button>
        </div>

        {/* Task List */}
        {loading ? (
          <div className="text-center py-16 text-gray-400">
            <div className="animate-spin text-4xl mb-3">⚙️</div>
            <p>Loading tasks...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-400">
            <p className="text-4xl mb-3">⚠️</p>
            <p>{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-lg font-medium">No tasks yet</p>
            <p className="text-sm mt-1">Click "New Task" to get started</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={setEditTask}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <CreateTaskModal
          onClose={() => setShowModal(false)}
          onCreate={createTask}
        />
      )}
    </div>
  );
};