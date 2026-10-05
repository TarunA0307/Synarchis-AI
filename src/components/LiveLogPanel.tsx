import { useEffect, useRef } from 'react';

interface Props {
  lines: string[];
  result: string | null;
}

export function LiveLogPanel({ lines, result }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [lines, result]);

  return (
    <div
      className="bg-[#12141C] rounded-xl p-5 font-mono text-sm overflow-y-auto flex flex-col gap-1.5"
      style={{ minHeight: 280 }}
      aria-live="polite"
      aria-label="Simulation log"
    >
      {lines.length === 0 && (
        <span className="text-white/20 text-xs select-none">
          — log output will appear here —
        </span>
      )}
      {lines.map((line, i) => {
        const colonIdx = line.indexOf(':');
        const prefix = colonIdx > -1 ? line.slice(0, colonIdx + 1) : '';
        const rest   = colonIdx > -1 ? line.slice(colonIdx + 1) : line;
        return (
          <div
            key={i}
            className="log-line text-white/85 leading-relaxed"
            style={{ animationDelay: `${i * 30}ms` }}
          >
            {prefix && <span className="text-[#3F4CE0] font-semibold">{prefix}</span>}
            {rest}
          </div>
        );
      })}
      {result && (
        <div className="mt-3 pt-3 border-t border-white/10 log-line">
          <span className="text-[#16B8A6] font-semibold">Result:</span>
          <span className="text-white/90"> {result}</span>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
