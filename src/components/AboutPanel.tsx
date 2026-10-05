import { useState } from 'react';

export function AboutPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[#D8D6CE] rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-medium font-body text-[#191B22] hover:bg-[#F5F4F0] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3F4CE0] focus-visible:ring-inset"
        aria-expanded={open}
      >
        <span>About this simulator</span>
        <span className={`text-[#3F4CE0] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          ▾
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm font-body text-[#191B22]/70 leading-relaxed border-t border-[#D8D6CE] pt-4 space-y-2">
          <p>
            This simulator is based on a research chapter exploring coordination patterns in AI
            multi-agent collaboration systems. It demonstrates how different architectural
            topologies — from centralized orchestration to peer conversation — affect how
            agents divide work, communicate, and converge on results.
          </p>
          <p>
            The patterns here reflect real design decisions in production multi-agent frameworks,
            illustrating trade-offs in parallelism, communication overhead, and error recovery.
          </p>
          <a
            href="/abstract.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#3F4CE0] font-medium hover:underline"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2h7l3 3v7H2V2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
              <path d="M9 2v3h3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
            </svg>
            Read the abstract (PDF)
          </a>
        </div>
      )}
    </div>
  );
}
