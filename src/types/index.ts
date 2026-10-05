export type TopologyId = 'orchestrator' | 'sequential' | 'group' | 'state-machine';
export type TaskId = 'research' | 'review' | 'debug';
export type NodeState = 'idle' | 'active' | 'done';
export type SimStatus = 'idle' | 'running' | 'done';

export interface ScriptStep {
  nodeId: string;
  log: string;
  edgeFrom?: string;
  edgeTo?: string;
  delay: number; // ms after previous step
}

export interface Script {
  steps: ScriptStep[];
  result: string;
}

export interface NodeDef {
  id: string;
  label: string;
  x: number; // 0-100 percent of viewBox
  y: number;
  radius?: number;
}

export interface EdgeDef {
  id: string;
  from: string;
  to: string;
  dashed?: boolean;
}

export interface TopologyLayout {
  nodes: NodeDef[];
  edges: EdgeDef[];
}

export interface Topology {
  id: TopologyId;
  label: string;
  description: string;
  layout: TopologyLayout;
}

export interface Task {
  id: TaskId;
  label: string;
}
