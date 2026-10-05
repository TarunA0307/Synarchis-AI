import type { Topology } from '../types';

export const TOPOLOGIES: Topology[] = [
  {
    id: 'orchestrator',
    label: 'Orchestrator-Worker',
    description:
      'A Lead agent breaks the task into parallel sub-tasks and dispatches them to workers, then synthesizes all results into one coherent output.',
    layout: {
      nodes: [
        { id: 'lead',    label: 'Lead',    x: 50, y: 15 },
        { id: 'agentA',  label: 'Agent A', x: 18, y: 65 },
        { id: 'agentB',  label: 'Agent B', x: 50, y: 72 },
        { id: 'agentC',  label: 'Agent C', x: 82, y: 65 },
      ],
      edges: [
        { id: 'lead-a', from: 'lead', to: 'agentA' },
        { id: 'lead-b', from: 'lead', to: 'agentB' },
        { id: 'lead-c', from: 'lead', to: 'agentC' },
      ],
    },
  },
  {
    id: 'sequential',
    label: 'Sequential Handoff',
    description:
      'Each agent completes its stage in full before passing output to the next — a strict pipeline where each step builds on the previous.',
    layout: {
      nodes: [
        { id: 's1', label: 'Agent 1', x: 13, y: 50 },
        { id: 's2', label: 'Agent 2', x: 38, y: 50 },
        { id: 's3', label: 'Agent 3', x: 63, y: 50 },
        { id: 's4', label: 'Agent 4', x: 88, y: 50 },
      ],
      edges: [
        { id: 's1-s2', from: 's1', to: 's2' },
        { id: 's2-s3', from: 's2', to: 's3' },
        { id: 's3-s4', from: 's3', to: 's4' },
      ],
    },
  },
  {
    id: 'group',
    label: 'Group Conversation',
    description:
      'Agents communicate through a shared thread, each contributing turns in a flexible order until the group converges on a consensus output.',
    layout: {
      nodes: [
        { id: 'hub',  label: 'Thread', x: 50, y: 50 },
        { id: 'g1',   label: 'Agent 1', x: 50, y: 12 },
        { id: 'g2',   label: 'Agent 2', x: 84, y: 31 },
        { id: 'g3',   label: 'Agent 3', x: 84, y: 69 },
        { id: 'g4',   label: 'Agent 4', x: 50, y: 88 },
        { id: 'g5',   label: 'Agent 5', x: 16, y: 50 },
      ],
      edges: [
        { id: 'hub-g1', from: 'hub', to: 'g1' },
        { id: 'hub-g2', from: 'hub', to: 'g2' },
        { id: 'hub-g3', from: 'hub', to: 'g3' },
        { id: 'hub-g4', from: 'hub', to: 'g4' },
        { id: 'hub-g5', from: 'hub', to: 'g5' },
      ],
    },
  },
  {
    id: 'state-machine',
    label: 'Graph-Based State Machine',
    description:
      'Execution follows a directed graph of states; conditional branches let the system route to different tools or sub-tasks based on intermediate results.',
    layout: {
      nodes: [
        { id: 'start',  label: 'Start',  x: 50, y: 8  },
        { id: 'plan',   label: 'Plan',   x: 50, y: 28 },
        { id: 'toolA',  label: 'Tool A', x: 22, y: 55 },
        { id: 'toolB',  label: 'Tool B', x: 78, y: 55 },
        { id: 'verify', label: 'Verify', x: 50, y: 78 },
        { id: 'end',    label: 'End',    x: 50, y: 95 },
      ],
      edges: [
        { id: 'start-plan',   from: 'start',  to: 'plan'   },
        { id: 'plan-toolA',   from: 'plan',   to: 'toolA'  },
        { id: 'plan-toolB',   from: 'plan',   to: 'toolB', dashed: true },
        { id: 'toolA-verify', from: 'toolA',  to: 'verify' },
        { id: 'toolB-verify', from: 'toolB',  to: 'verify', dashed: true },
        { id: 'verify-end',   from: 'verify', to: 'end'    },
      ],
    },
  },
];
