const AUTHORS = [
  'Tarun Anantha Kumar',
  'Sridharan T N',
  'Sharmika K S',
  'Rakshana S',
];

// Static mini node motif (non-animated)
function NodeMotif() {
  return (
    <svg width="48" height="32" viewBox="0 0 48 32" fill="none" opacity="0.35">
      <circle cx="24" cy="8"  r="5" stroke="#D8D6CE" strokeWidth="1.2" />
      <circle cx="8"  cy="26" r="4" stroke="#D8D6CE" strokeWidth="1.2" />
      <circle cx="40" cy="26" r="4" stroke="#D8D6CE" strokeWidth="1.2" />
      <line x1="24" y1="13" x2="8"  y2="22" stroke="#D8D6CE" strokeWidth="1" />
      <line x1="24" y1="13" x2="40" y2="22" stroke="#D8D6CE" strokeWidth="1" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#12141C] px-6 md:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <NodeMotif />
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
        {AUTHORS.map(name => (
          <span key={name} className="text-xs font-body text-white/40">
            {name}
          </span>
        ))}
      </div>
    </footer>
  );
}
