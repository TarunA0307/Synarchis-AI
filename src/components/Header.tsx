export function Header() {
  return (
    <header className="py-6 px-6 md:px-10 flex items-baseline gap-4 border-b border-[#D8D6CE]">
      <div>
        <h1 className="font-heading text-xl font-bold text-[#191B22] tracking-tight leading-none">
          SYNARCHIS
          <span className="ml-2 text-xs font-body font-normal text-[#3F4CE0] uppercase tracking-widest align-middle">
            Coordination Lab
          </span>
        </h1>
        <p className="mt-1 text-sm font-body text-[#191B22]/55">
          Pick a topology and a task, then watch AI agents coordinate in real time.
        </p>
      </div>
    </header>
  );
}
