import type { Script, TopologyId, TaskId } from '../types';

type ScriptKey = `${TopologyId}:${TaskId}`;

export const SCRIPTS: Record<ScriptKey, Script> = {

  /* ─────────────────── ORCHESTRATOR-WORKER ─────────────────── */

  'orchestrator:research': {
    steps: [
      { nodeId: 'lead',   log: 'Lead: breaking the brief into 3 independent research angles...', delay: 0 },
      { nodeId: 'lead',   log: 'Lead: dispatching sub-tasks to Agent A, B, and C in parallel...', edgeFrom: 'lead', edgeTo: 'agentA', delay: 1400 },
      { nodeId: 'agentA', log: 'Agent A: surveying direct competitors...', delay: 900 },
      { nodeId: 'agentB', log: 'Agent B: analyzing pricing and positioning...', delay: 200 },
      { nodeId: 'agentC', log: 'Agent C: scanning recent funding and market news...', delay: 200 },
      { nodeId: 'lead',   log: 'Lead: reconciling findings into one briefing...', edgeFrom: 'agentA', edgeTo: 'lead', delay: 2200 },
    ],
    result: 'A three-part competitive briefing covering direct competitors, pricing position, and recent market movement.',
  },

  'orchestrator:review': {
    steps: [
      { nodeId: 'lead',   log: 'Lead: parsing document structure — splitting into 3 reviewable sections...', delay: 0 },
      { nodeId: 'lead',   log: 'Lead: assigning sections to Agent A, B, and C concurrently...', edgeFrom: 'lead', edgeTo: 'agentA', delay: 1400 },
      { nodeId: 'agentA', log: 'Agent A: reviewing contractual clauses for compliance gaps...', delay: 900 },
      { nodeId: 'agentB', log: 'Agent B: cross-referencing technical specs against requirements...', delay: 200 },
      { nodeId: 'agentC', log: 'Agent C: checking appendices and referenced standards...', delay: 200 },
      { nodeId: 'lead',   log: 'Lead: merging annotations and producing consolidated review report...', edgeFrom: 'agentB', edgeTo: 'lead', delay: 2200 },
    ],
    result: 'Consolidated review flagging 4 compliance gaps, 2 spec mismatches, and 1 outdated standard reference.',
  },

  'orchestrator:debug': {
    steps: [
      { nodeId: 'lead',   log: 'Lead: triaging the error report — isolating 3 candidate root causes...', delay: 0 },
      { nodeId: 'lead',   log: 'Lead: spinning up Agent A, B, and C on separate investigation tracks...', edgeFrom: 'lead', edgeTo: 'agentA', delay: 1400 },
      { nodeId: 'agentA', log: 'Agent A: tracing call stack and inspecting runtime logs...', delay: 900 },
      { nodeId: 'agentB', log: 'Agent B: reproducing the failure on a clean environment...', delay: 200 },
      { nodeId: 'agentC', log: 'Agent C: scanning recent commits for regressions...', delay: 200 },
      { nodeId: 'lead',   log: 'Lead: validating proposed patch against all three findings...', edgeFrom: 'agentC', edgeTo: 'lead', delay: 2200 },
    ],
    result: 'Root cause confirmed as a null-pointer regression in commit 3f9a2c1; one-line patch validated across all test tracks.',
  },

  /* ─────────────────── SEQUENTIAL HANDOFF ─────────────────── */

  'sequential:research': {
    steps: [
      { nodeId: 's1', log: 'Agent 1: querying databases and bookmarking 12 primary sources...', delay: 0 },
      { nodeId: 's1', log: 'Agent 1: handoff complete — passing raw source list to Agent 2...', edgeFrom: 's1', edgeTo: 's2', delay: 1800 },
      { nodeId: 's2', log: 'Agent 2: structuring sources into a thematic outline...', delay: 800 },
      { nodeId: 's2', log: 'Agent 2: handoff — passing structured outline to Agent 3...', edgeFrom: 's2', edgeTo: 's3', delay: 1800 },
      { nodeId: 's3', log: 'Agent 3: fact-checking key claims and flagging weak citations...', delay: 800 },
      { nodeId: 's3', log: 'Agent 3: handoff — passing verified outline to Agent 4...', edgeFrom: 's3', edgeTo: 's4', delay: 1800 },
      { nodeId: 's4', log: 'Agent 4: formatting final report with executive summary and references...', delay: 800 },
    ],
    result: 'A fully sourced, fact-checked research report with executive summary, thematic outline, and annotated bibliography.',
  },

  'sequential:review': {
    steps: [
      { nodeId: 's1', log: 'Agent 1: reading document end-to-end, flagging 7 potential issues...', delay: 0 },
      { nodeId: 's1', log: 'Agent 1: handoff — annotated draft passed to Agent 2...', edgeFrom: 's1', edgeTo: 's2', delay: 1800 },
      { nodeId: 's2', log: 'Agent 2: cross-referencing flagged clauses against regulatory standards...', delay: 800 },
      { nodeId: 's2', log: 'Agent 2: handoff — cross-reference notes passed to Agent 3...', edgeFrom: 's2', edgeTo: 's3', delay: 1800 },
      { nodeId: 's3', log: 'Agent 3: rewriting 3 flagged sections to meet compliance requirements...', delay: 800 },
      { nodeId: 's3', log: 'Agent 3: handoff — revised document passed to Agent 4...', edgeFrom: 's3', edgeTo: 's4', delay: 1800 },
      { nodeId: 's4', log: 'Agent 4: proofreading final draft; confirming no remaining compliance issues...', delay: 800 },
    ],
    result: 'Revised document with all 7 issues resolved, cross-referenced to applicable standards, and cleared by final proofread.',
  },

  'sequential:debug': {
    steps: [
      { nodeId: 's1', log: 'Agent 1: scanning logs — isolating error to a 40-line module boundary...', delay: 0 },
      { nodeId: 's1', log: 'Agent 1: handoff — fault map passed to Agent 2...', edgeFrom: 's1', edgeTo: 's2', delay: 1800 },
      { nodeId: 's2', log: 'Agent 2: tracing call stack frame-by-frame to the offending function...', delay: 800 },
      { nodeId: 's2', log: 'Agent 2: handoff — stack trace and variable dump passed to Agent 3...', edgeFrom: 's2', edgeTo: 's3', delay: 1800 },
      { nodeId: 's3', log: 'Agent 3: writing targeted fix; adding guard clause for null input...', delay: 800 },
      { nodeId: 's3', log: 'Agent 3: handoff — patched code passed to Agent 4...', edgeFrom: 's3', edgeTo: 's4', delay: 1800 },
      { nodeId: 's4', log: 'Agent 4: running full test suite — 148 tests passing, 0 regressions...', delay: 800 },
    ],
    result: 'Bug fixed with a null-guard patch; all 148 tests passing with no regressions introduced.',
  },

  /* ─────────────────── GROUP CONVERSATION ─────────────────── */

  'group:research': {
    steps: [
      { nodeId: 'g1',  log: 'Agent 1: proposing to anchor the research on academic literature first...', edgeFrom: 'g1', edgeTo: 'hub', delay: 0 },
      { nodeId: 'g2',  log: 'Agent 2: pushing back — industry reports more current for this topic...', edgeFrom: 'g2', edgeTo: 'hub', delay: 1600 },
      { nodeId: 'g3',  log: 'Agent 3: suggesting a two-track approach: academic base + industry overlay...', edgeFrom: 'g3', edgeTo: 'hub', delay: 1600 },
      { nodeId: 'g4',  log: 'Agent 4: agreeing with two-track; volunteering to handle the industry scan...', edgeFrom: 'g4', edgeTo: 'hub', delay: 1600 },
      { nodeId: 'g5',  log: 'Agent 5: flagging 3 key papers the group should not overlook...', edgeFrom: 'g5', edgeTo: 'hub', delay: 1600 },
      { nodeId: 'g1',  log: 'Agent 1: consensus reached — synthesizing two-track findings into final brief...', edgeFrom: 'g1', edgeTo: 'hub', delay: 1600 },
    ],
    result: 'A two-track research brief merging peer-reviewed foundations with current industry data, incorporating 3 key primary references.',
  },

  'group:review': {
    steps: [
      { nodeId: 'g1',  log: 'Agent 1: flagging ambiguous liability clause in section 4.2 — needs team input...', edgeFrom: 'g1', edgeTo: 'hub', delay: 0 },
      { nodeId: 'g2',  log: 'Agent 2: confirms issue; cites precedent in two prior contracts with same clause...', edgeFrom: 'g2', edgeTo: 'hub', delay: 1600 },
      { nodeId: 'g3',  log: 'Agent 3: proposing revised wording that limits exposure while keeping intent...', edgeFrom: 'g3', edgeTo: 'hub', delay: 1600 },
      { nodeId: 'g4',  log: 'Agent 4: raising a secondary issue — termination notice period is non-standard...', edgeFrom: 'g4', edgeTo: 'hub', delay: 1600 },
      { nodeId: 'g5',  log: 'Agent 5: cross-checking both issues against regulatory baseline — both require edits...', edgeFrom: 'g5', edgeTo: 'hub', delay: 1600 },
      { nodeId: 'g2',  log: 'Agent 2: group aligns on revised wording for both clauses; drafting final edits...', edgeFrom: 'g2', edgeTo: 'hub', delay: 1600 },
    ],
    result: 'Two critical clauses revised — liability language tightened and notice period standardized — with regulatory cross-check complete.',
  },

  'group:debug': {
    steps: [
      { nodeId: 'g1',  log: 'Agent 1: opening hypothesis — race condition in the async task queue...', edgeFrom: 'g1', edgeTo: 'hub', delay: 0 },
      { nodeId: 'g2',  log: 'Agent 2: countering — pattern matches a known memory leak, not a race condition...', edgeFrom: 'g2', edgeTo: 'hub', delay: 1600 },
      { nodeId: 'g3',  log: 'Agent 3: sharing reproduction steps — crash only occurs with 3+ concurrent users...', edgeFrom: 'g3', edgeTo: 'hub', delay: 1600 },
      { nodeId: 'g4',  log: 'Agent 4: narrowing scope — memory grows steadily on each request; leans toward leak...', edgeFrom: 'g4', edgeTo: 'hub', delay: 1600 },
      { nodeId: 'g5',  log: 'Agent 5: isolating the handler — event listener registered but never removed...', edgeFrom: 'g5', edgeTo: 'hub', delay: 1600 },
      { nodeId: 'g2',  log: 'Agent 2: group confirms root cause; proposing cleanup call in component unmount...', edgeFrom: 'g2', edgeTo: 'hub', delay: 1600 },
    ],
    result: 'Root cause confirmed as an event listener leak; fix is a cleanup call on component unmount — memory stabilizes under load.',
  },

  /* ─────────────────── GRAPH-BASED STATE MACHINE ─────────────────── */

  'state-machine:research': {
    steps: [
      { nodeId: 'start',  log: 'Start: initializing research task — loading configuration and scope...', delay: 0 },
      { nodeId: 'start',  log: 'Start: transitioning to Plan state...', edgeFrom: 'start', edgeTo: 'plan', delay: 1200 },
      { nodeId: 'plan',   log: 'Plan: decomposing topic into sub-queries; selecting Tool A (web search)...', delay: 800 },
      { nodeId: 'plan',   log: 'Plan: routing to Tool A — web search branch selected...', edgeFrom: 'plan', edgeTo: 'toolA', delay: 1400 },
      { nodeId: 'toolA',  log: 'Tool A: executing web search — 24 results retrieved, 9 high-relevance...', delay: 1000 },
      { nodeId: 'toolA',  log: 'Tool A: output ready — transitioning to Verify...', edgeFrom: 'toolA', edgeTo: 'verify', delay: 1400 },
      { nodeId: 'verify', log: 'Verify: checking source credibility and deduplicating retrieved content...', delay: 1000 },
      { nodeId: 'verify', log: 'Verify: quality gate passed — routing to End...', edgeFrom: 'verify', edgeTo: 'end', delay: 1400 },
      { nodeId: 'end',    log: 'End: research task complete — compiling final deliverable...', delay: 800 },
    ],
    result: 'Nine high-relevance verified sources compiled into a structured research brief via web-search branch.',
  },

  'state-machine:review': {
    steps: [
      { nodeId: 'start',  log: 'Start: initializing document review task — parsing input file...', delay: 0 },
      { nodeId: 'start',  log: 'Start: transitioning to Plan state...', edgeFrom: 'start', edgeTo: 'plan', delay: 1200 },
      { nodeId: 'plan',   log: 'Plan: classifying document as technical specification; selecting Tool B (schema validator)...', delay: 800 },
      { nodeId: 'plan',   log: 'Plan: routing to Tool B — schema validation branch selected...', edgeFrom: 'plan', edgeTo: 'toolB', delay: 1400 },
      { nodeId: 'toolB',  log: 'Tool B: running schema validation — 3 field-type mismatches detected...', delay: 1000 },
      { nodeId: 'toolB',  log: 'Tool B: validation report ready — transitioning to Verify...', edgeFrom: 'toolB', edgeTo: 'verify', delay: 1400 },
      { nodeId: 'verify', log: 'Verify: confirming mismatch locations against source schema v2.1...', delay: 1000 },
      { nodeId: 'verify', log: 'Verify: all issues confirmed — routing to End...', edgeFrom: 'verify', edgeTo: 'end', delay: 1400 },
      { nodeId: 'end',    log: 'End: review task complete — generating annotated diff report...', delay: 800 },
    ],
    result: 'Three schema mismatches confirmed via Tool B validation branch; annotated diff generated and ready for developer handoff.',
  },

  'state-machine:debug': {
    steps: [
      { nodeId: 'start',  log: 'Start: initializing debug task — loading error trace and environment context...', delay: 0 },
      { nodeId: 'start',  log: 'Start: transitioning to Plan state...', edgeFrom: 'start', edgeTo: 'plan', delay: 1200 },
      { nodeId: 'plan',   log: 'Plan: error classified as runtime exception; selecting Tool A (log analyzer)...', delay: 800 },
      { nodeId: 'plan',   log: 'Plan: routing to Tool A — log analysis branch selected...', edgeFrom: 'plan', edgeTo: 'toolA', delay: 1400 },
      { nodeId: 'toolA',  log: 'Tool A: scanning 2,400 log lines — exception pinpointed at request handler line 83...', delay: 1000 },
      { nodeId: 'toolA',  log: 'Tool A: analysis complete — transitioning to Verify...', edgeFrom: 'toolA', edgeTo: 'verify', delay: 1400 },
      { nodeId: 'verify', log: 'Verify: reproducing exception using isolated test harness — confirmed in 2 of 2 runs...', delay: 1000 },
      { nodeId: 'verify', log: 'Verify: reproduction confirmed — routing to End...', edgeFrom: 'verify', edgeTo: 'end', delay: 1400 },
      { nodeId: 'end',    log: 'End: debug task complete — generating patch and test case for CI pipeline...', delay: 800 },
    ],
    result: 'Runtime exception traced to request handler line 83; patch and regression test case generated for CI integration.',
  },
};
