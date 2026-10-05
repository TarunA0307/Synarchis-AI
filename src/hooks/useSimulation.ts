import { useState, useCallback, useRef, useEffect } from 'react';
import type { TopologyId, TaskId, NodeState, SimStatus, ScriptStep } from '../types';
import { SCRIPTS } from '../data/scripts';

interface SimulationState {
  nodeStates: Record<string, NodeState>;
  activeEdge: { from: string; to: string } | null;
  logLines: string[];
  result: string | null;
  status: SimStatus;
  chosenBranch: 'A' | 'B' | null;
}

const INITIAL_STATE: SimulationState = {
  nodeStates: {},
  activeEdge: null,
  logLines: [],
  result: null,
  status: 'idle',
  chosenBranch: null,
};

export function useSimulation(topology: TopologyId, task: TaskId) {
  const [state, setState] = useState<SimulationState>(INITIAL_STATE);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reducedMotion = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const reset = useCallback(() => {
    clearTimeouts();
    setState(INITIAL_STATE);
  }, [clearTimeouts]);

  // Cleanup on unmount
  useEffect(() => () => clearTimeouts(), [clearTimeouts]);

  const run = useCallback(() => {
    clearTimeouts();
    const key = `${topology}:${task}` as `${TopologyId}:${TaskId}`;
    const script = SCRIPTS[key];
    if (!script) return;

    // In reduced-motion mode, we collapse all delays to near-zero
    const motionScale = reducedMotion.current ? 0.05 : 1;

    setState(prev => ({
      ...INITIAL_STATE,
      status: 'running',
      chosenBranch: prev.chosenBranch,
    }));

    // Determine chosen branch for state-machine topology
    const chosenBranch: 'A' | 'B' = Math.random() < 0.5 ? 'A' : 'B';

    setState(s => ({ ...s, chosenBranch }));

    let cumulativeDelay = 0;
    const allNodeIds = new Set(script.steps.map(s => s.nodeId));
    const nodesDone = new Set<string>();

    script.steps.forEach((step: ScriptStep, idx: number) => {
      cumulativeDelay += step.delay * motionScale;

      // Show edge animation slightly before node activation
      if (step.edgeFrom && step.edgeTo) {
        const edgeDelay = Math.max(0, cumulativeDelay - 400 * motionScale);
        const t0 = setTimeout(() => {
          setState(s => ({ ...s, activeEdge: { from: step.edgeFrom!, to: step.edgeTo! } }));
        }, edgeDelay);
        timeoutsRef.current.push(t0);
      }

      const t1 = setTimeout(() => {
        setState(s => {
          const prevActive = Object.entries(s.nodeStates)
            .filter(([, v]) => v === 'active')
            .map(([k]) => k);

          const updatedNodes = { ...s.nodeStates };

          // Mark previously active nodes as done (except hub in group conv)
          prevActive.forEach(id => {
            if (topology !== 'group' || id !== 'hub') {
              updatedNodes[id] = 'done';
            }
          });

          // Activate current node
          updatedNodes[step.nodeId] = 'active';

          return {
            ...s,
            nodeStates: updatedNodes,
            logLines: [...s.logLines, step.log],
            activeEdge: step.edgeFrom ? { from: step.edgeFrom, to: step.edgeTo! } : null,
          };
        });
      }, cumulativeDelay);
      timeoutsRef.current.push(t1);

      // Last step
      if (idx === script.steps.length - 1) {
        const finalDelay = cumulativeDelay + 1600 * motionScale;
        const t2 = setTimeout(() => {
          setState(s => {
            const updatedNodes = { ...s.nodeStates };
            allNodeIds.forEach(id => { updatedNodes[id] = 'done'; });
            return {
              ...s,
              nodeStates: updatedNodes,
              activeEdge: null,
              result: script.result,
              status: 'done',
            };
          });
        }, finalDelay);
        timeoutsRef.current.push(t2);
      }
    });
  }, [topology, task, clearTimeouts]);

  return { ...state, run, reset };
}
