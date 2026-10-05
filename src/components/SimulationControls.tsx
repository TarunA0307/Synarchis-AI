import type { SimStatus } from '../types';

interface Props {
  status: SimStatus;
  onRun: () => void;
  onReset: () => void;
}

export function SimulationControls({ status, onRun, onReset }: Props) {
  return (
    <div className="flex gap-3 items-center">
      <button
        onClick={onRun}
        disabled={status === 'running'}
        className="px-6 py-2.5 rounded-lg text-sm font-semibold font-body bg-[#3F4CE0] text-white
                   hover:bg-[#3040c4] disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all duration-200 shadow-sm
                   focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3F4CE0] focus-visible:ring-offset-2"
        aria-label={status === 'done' ? 'Replay simulation' : 'Run simulation'}
      >
        {status === 'done' ? '↺ Replay' : status === 'running' ? 'Running…' : '▶ Run simulation'}
      </button>

      {status !== 'idle' && (
        <button
          onClick={onReset}
          className="px-5 py-2.5 rounded-lg text-sm font-medium font-body bg-white text-[#191B22]
                     border border-[#D8D6CE] hover:border-[#191B22] transition-all duration-200
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-[#191B22] focus-visible:ring-offset-2"
        >
          Reset
        </button>
      )}
    </div>
  );
}
