import type { NodeState, EdgeDef, NodeDef } from '../../types';

const COLORS = {
  idle_fill: '#F5F4F0',
  idle_stroke: '#D8D6CE',
  active_fill: '#3F4CE0',
  active_stroke: '#3F4CE0',
  done_fill: '#16B8A6',
  done_stroke: '#16B8A6',
  edge: '#D8D6CE',
  dot: '#3F4CE0',
};

interface NodeProps {
  node: NodeDef;
  state: NodeState;
  vbWidth: number;
  vbHeight: number;
  r?: number;
}

export function GraphNode({ node, state, vbWidth, vbHeight, r = 28 }: NodeProps) {
  const cx = (node.x / 100) * vbWidth;
  const cy = (node.y / 100) * vbHeight;
  const isActive = state === 'active';
  const isDone = state === 'done';

  const fill = isDone ? COLORS.done_fill : isActive ? COLORS.active_fill : COLORS.idle_fill;
  const stroke = isDone ? COLORS.done_stroke : isActive ? COLORS.active_stroke : COLORS.idle_stroke;
  const textColor = isDone || isActive ? '#fff' : '#191B22';

  return (
    <g>
      {/* Pulse ring for active nodes */}
      {isActive && (
        <circle
          cx={cx}
          cy={cy}
          r={r + 8}
          fill="none"
          stroke={COLORS.active_fill}
          strokeWidth={1.5}
          opacity={0.3}
          className="animate-ping"
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      )}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        stroke={stroke}
        strokeWidth={isActive || isDone ? 0 : 1.5}
        style={{ transition: 'fill 0.4s, stroke 0.4s' }}
      />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={10}
        fontFamily="'IBM Plex Sans', sans-serif"
        fontWeight={600}
        fill={textColor}
        style={{ userSelect: 'none', pointerEvents: 'none' }}
      >
        {node.label}
      </text>
    </g>
  );
}

interface EdgeProps {
  edge: EdgeDef;
  nodes: NodeDef[];
  vbWidth: number;
  vbHeight: number;
  isActive: boolean;
  dimmed?: boolean;
}

export function GraphEdge({ edge, nodes, vbWidth, vbHeight, isActive, dimmed }: EdgeProps) {
  const from = nodes.find(n => n.id === edge.from);
  const to   = nodes.find(n => n.id === edge.to);
  if (!from || !to) return null;

  const x1 = (from.x / 100) * vbWidth;
  const y1 = (from.y / 100) * vbHeight;
  const x2 = (to.x / 100) * vbWidth;
  const y2 = (to.y / 100) * vbHeight;

  const len = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const r = 28;
  const ratio1 = r / len;
  const ratio2 = (len - r) / len;

  const sx = x1 + (x2 - x1) * ratio1;
  const sy = y1 + (y2 - y1) * ratio1;
  const ex = x1 + (x2 - x1) * ratio2;
  const ey = y1 + (y2 - y1) * ratio2;



  return (
    <g opacity={dimmed ? 0.25 : 1} style={{ transition: 'opacity 0.4s' }}>
      <line
        x1={sx} y1={sy} x2={ex} y2={ey}
        stroke={isActive ? COLORS.active_fill : COLORS.edge}
        strokeWidth={isActive ? 1.5 : 1}
        strokeDasharray={edge.dashed ? '5,4' : undefined}
        style={{ transition: 'stroke 0.3s' }}
      />
      {isActive && (
        <circle r={5} fill={COLORS.dot}>
          <animateMotion
            dur="0.7s"
            repeatCount="1"
            path={`M ${sx} ${sy} L ${ex} ${ey}`}
            fill="freeze"
          />
        </circle>
      )}
    </g>
  );
}
