import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TopologySelector } from './components/TopologySelector';
import { TaskSelector } from './components/TaskSelector';
import { SimulationControls } from './components/SimulationControls';
import { NodeGraph } from './components/NodeGraph';
import { LiveLogPanel } from './components/LiveLogPanel';
import { AboutPanel } from './components/AboutPanel';
import { useSimulation } from './hooks/useSimulation';
import type { TopologyId, TaskId } from './types';

export default function App() {
  const [topology, setTopology] = useState<TopologyId>('orchestrator');
  const [task, setTask] = useState<TaskId>('research');

  const sim = useSimulation(topology, task);

  const handleTopologyChange = (id: TopologyId) => {
    sim.reset();
    setTopology(id);
  };

  const handleTaskChange = (id: TaskId) => {
    sim.reset();
    setTask(id);
  };

  return (
    <div className="min-h-screen bg-[#F5F4F0] flex flex-col font-body">
      <Header />

      <main className="flex-1 px-4 md:px-10 py-8 max-w-7xl mx-auto w-full">
        {/* Controls strip */}
        <div className="space-y-5 mb-8">
          <section aria-labelledby="topology-label">
            <h2 id="topology-label" className="text-xs font-semibold uppercase tracking-widest text-[#191B22]/40 mb-2.5 font-body">
              Coordination Pattern
            </h2>
            <TopologySelector selected={topology} onChange={handleTopologyChange} />
          </section>

          <div className="flex flex-col sm:flex-row sm:items-end gap-5">
            <section aria-labelledby="task-label" className="flex-1">
              <h2 id="task-label" className="text-xs font-semibold uppercase tracking-widest text-[#191B22]/40 mb-2.5 font-body">
                Sample Task
              </h2>
              <TaskSelector selected={task} onChange={handleTaskChange} />
            </section>

            <div className="pb-0.5">
              <SimulationControls
                status={sim.status}
                onRun={sim.run}
                onReset={sim.reset}
              />
            </div>
          </div>
        </div>

        {/* Simulator stage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Node graph */}
          <div className="bg-white rounded-2xl border border-[#D8D6CE] p-4 flex items-center justify-center"
               style={{ minHeight: 320 }}>
            <NodeGraph
              topology={topology}
              nodeStates={sim.nodeStates}
              activeEdge={sim.activeEdge}
              chosenBranch={sim.chosenBranch}
            />
          </div>

          {/* Log panel */}
          <LiveLogPanel lines={sim.logLines} result={sim.result} />
        </div>

        {/* About */}
        <AboutPanel />
      </main>

      <Footer />
    </div>
  );
}
