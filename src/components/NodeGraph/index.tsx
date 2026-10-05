import type { NodeState, TopologyId } from '../../types';
import { TOPOLOGIES } from '../../data/topologies';
import { GraphNode, GraphEdge } from './Primitives';

const VBW = 300;
const VBH = 300;

interface Props {
  topology: TopologyId;
  nodeStates: Record<string, NodeState>;
  activeEdge: { from: string; to: string } | null;
  chosenBranch?: 'A' | 'B' | null;
}

export function NodeGraph({ topology, nodeStates, activeEdge, chosenBranch }: Props) {
  const topo = TOPOLOGIES.find(t => t.id === topology)!;
  const { nodes, edges } = topo.layout;

  const getNodeState = (id: string): NodeState => nodeStates[id] ?? 'idle';

  const isEdgeActive = (e: typeof edges[0]) =>
    activeEdge?.from === e.from && activeEdge?.to === e.to ||
    activeEdge?.from === e.to && activeEdge?.to === e.from;

  // State machine: dim un-chosen branch
  const isEdgeDimmed = (e: typeof edges[0]): boolean => {
    if (topology !== 'state-machine') return false;
    if (!chosenBranch) return false;
    if (chosenBranch === 'A') {
      return e.id === 'plan-toolB' || e.id === 'toolB-verify';
    }
    return e.id === 'plan-toolA' || e.id === 'toolA-verify';
  };

  return (
    <svg
      viewBox={`0 0 ${VBW} ${VBH}`}
      className="w-full h-full"
      aria-label={`${topo.label} node graph`}
      role="img"
    >
      {/* Edges first (behind nodes) */}
      {edges.map(edge => (
        <GraphEdge
          key={edge.id}
          edge={edge}
          nodes={nodes}
          vbWidth={VBW}
          vbHeight={VBH}
          isActive={isEdgeActive(edge)}
          dimmed={isEdgeDimmed(edge)}
        />
      ))}

      {/* Nodes */}
      {nodes.map(node => (
        <GraphNode
          key={node.id}
          node={node}
          state={getNodeState(node.id)}
          vbWidth={VBW}
          vbHeight={VBH}
          r={topology === 'group' && node.id === 'hub' ? 22 : 28}
        />
      ))}
    </svg>
  );
}
