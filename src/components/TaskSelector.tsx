import type { TaskId } from '../types';
import { TASKS } from '../data/tasks';

interface Props {
  selected: TaskId;
  onChange: (id: TaskId) => void;
}

export function TaskSelector({ selected, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Select task">
      {TASKS.map(task => (
        <button
          key={task.id}
          onClick={() => onChange(task.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium font-body border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
            selected === task.id
              ? 'bg-[#16B8A6] text-white border-[#16B8A6] shadow-sm'
              : 'bg-white text-[#191B22] border-[#D8D6CE] hover:border-[#16B8A6] hover:text-[#16B8A6]'
          }`}
          aria-pressed={selected === task.id}
        >
          {task.label}
        </button>
      ))}
    </div>
  );
}
