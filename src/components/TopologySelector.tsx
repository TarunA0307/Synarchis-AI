import type { TopologyId } from '../types';
import { TOPOLOGIES } from '../data/topologies';

interface Props {
  selected: TopologyId;
  onChange: (id: TopologyId) => void;
}

export function TopologySelector({ selected, onChange }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Select topology">
        {TOPOLOGIES.map(t => (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium font-body border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
              selected === t.id
                ? 'bg-[#3F4CE0] text-white border-[#3F4CE0] shadow-sm'
                : 'bg-white text-[#191B22] border-[#D8D6CE] hover:border-[#3F4CE0] hover:text-[#3F4CE0]'
            }`}
            aria-pressed={selected === t.id}
          >
            {t.label}
          </button>
        ))}
      </div>
      <p className="text-sm text-[#191B22]/60 font-body leading-relaxed">
        {TOPOLOGIES.find(t => t.id === selected)?.description}
      </p>
    </div>
  );
}
