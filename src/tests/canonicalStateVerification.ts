/**
 * AIXSHOP — Canonical State & Single-Authority Verification Suite
 * Phase 1 Implementation Verification:
 * 1. Canonical Issue Authority (lifecycle transitions, mutations, history, counts)
 * 2. Canonical Readiness Authority (calculations, boost, caps, truth boundaries)
 * 3. Cross-Surface State Synchronization (Home, Catalog, Issues, Readiness, Nav)
 * 4. Architectural Separation (No God Component, Modular Coordinators)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  INITIAL_CANONICAL_ISSUES,
  getOpenIssuesCount,
  getApprovedIssuesCount,
  getDismissedIssuesCount,
  approveIssue,
  dismissIssue,
  updateIssue,
  approveAllIssues,
  deriveCanonicalIssuesMetrics
} from '../state/canonicalIssues';
import { 
  BASE_READINESS_SCORE,
  MAX_READINESS_SCORE,
  calculateReadinessScore,
  calculateReadinessFromIssues,
  deriveSurfaceReadinessProjections,
  createRecheckSimulationResult,
  READINESS_TRUTH_BOUNDARIES
} from '../state/canonicalReadiness';
import { CANONICAL_SYSTEM_KPIS } from '../data/canonicalCatalog';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('======================================================');
console.log(' AIXSHOP SPRINT VERIFICATION: CANONICAL STATE CENTRALIZATION');
console.log('======================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${testName} ${detail ? `(${detail})` : ''}`);
  }
}

// 1. CANONICAL ISSUE AUTHORITY TESTS
console.log('--- 1. CANONICAL ISSUE AUTHORITY CONTRACT ---');

assert(Array.isArray(INITIAL_CANONICAL_ISSUES), 'INITIAL_CANONICAL_ISSUES is an array');
assert(INITIAL_CANONICAL_ISSUES.length === 12, 'Total canonical issues count is 12 (8 open, 4 resolved historical)', `found: ${INITIAL_CANONICAL_ISSUES.length}`);
assert(getOpenIssuesCount(INITIAL_CANONICAL_ISSUES) === 8, 'Initial open issues count is 8');
assert(getApprovedIssuesCount(INITIAL_CANONICAL_ISSUES) === 0, 'Initial approved issues count is 0');
assert(getDismissedIssuesCount(INITIAL_CANONICAL_ISSUES) === 0, 'Initial dismissed issues count is 0');

// Test Mutation: approveIssue
const sampleIssueId = INITIAL_CANONICAL_ISSUES[0].id;
const customProposedVal = 'Custom Authoritative Specification';
const approvedState = approveIssue(INITIAL_CANONICAL_ISSUES, sampleIssueId, customProposedVal);

assert(getApprovedIssuesCount(approvedState) === 1, 'Approving an issue increments approved count to 1');
assert(getOpenIssuesCount(approvedState) === 7, 'Approving an issue decrements open count to 7');

const targetedApproved = approvedState.find(i => i.id === sampleIssueId);
assert(targetedApproved?.isResolved === true, 'Approved issue has isResolved === true');
assert(targetedApproved?.recoveryState === 'Resolved', 'Approved issue has recoveryState === "Resolved"');
assert(targetedApproved?.recoveryWorkspace.verificationStatus === 'VERIFIED', 'Approved issue has verificationStatus === "VERIFIED"');
assert(targetedApproved?.recoveryWorkspace.diff.proposedValue === customProposedVal, 'Approved issue preserves custom proposed value');
assert(targetedApproved?.recoveryWorkspace.diff.validationResult === 'PASS', 'Approved issue has validationResult === "PASS"');

const lastApprovedHistory = targetedApproved?.history[targetedApproved.history.length - 1];
assert(lastApprovedHistory?.stage === 'MERCHANT_APPROVAL', 'Approved issue records MERCHANT_APPROVAL history event');
assert(lastApprovedHistory?.state === 'Resolved', 'Approved history event reflects Resolved state');

// Test Mutation: dismissIssue
const dismissedState = dismissIssue(INITIAL_CANONICAL_ISSUES, sampleIssueId, 'Merchant opted out of change');
const targetedDismissed = dismissedState.find(i => i.id === sampleIssueId);
assert(getDismissedIssuesCount(dismissedState) === 1, 'Dismissing an issue increments dismissed count to 1');
assert(targetedDismissed?.isResolved === false, 'Dismissed issue has isResolved === false');
assert(targetedDismissed?.recoveryState === 'Blocked', 'Dismissed issue has recoveryState === "Blocked"');

const lastDismissedHistory = targetedDismissed?.history[targetedDismissed.history.length - 1];
assert(lastDismissedHistory?.stage === 'MERCHANT_DISMISSAL', 'Dismissed issue records MERCHANT_DISMISSAL history event');

// Test Mutation: updateIssue
const updatedState = updateIssue(INITIAL_CANONICAL_ISSUES, sampleIssueId, { previewBadge: 'TEST_BADGE' });
const targetedUpdated = updatedState.find(i => i.id === sampleIssueId);
assert(targetedUpdated?.previewBadge === 'TEST_BADGE', 'updateIssue correctly merges partial attributes');

// Test Mutation: approveAllIssues
const batchApprovedState = approveAllIssues(INITIAL_CANONICAL_ISSUES);
assert(getApprovedIssuesCount(batchApprovedState) === 8, 'approveAllIssues resolves all 8 issues');
assert(getOpenIssuesCount(batchApprovedState) === 0, 'approveAllIssues leaves 0 open issues');

// Test Metric Derivation
const metrics = deriveCanonicalIssuesMetrics(INITIAL_CANONICAL_ISSUES);
assert(metrics.openIssues === 8, 'deriveCanonicalIssuesMetrics returns 8 open issues');
assert(metrics.criticalIssues === 3, 'deriveCanonicalIssuesMetrics returns 3 critical issues');

// 2. CANONICAL READINESS AUTHORITY TESTS
console.log('\n--- 2. CANONICAL READINESS AUTHORITY CONTRACT ---');

assert(BASE_READINESS_SCORE === CANONICAL_SYSTEM_KPIS.discoveryReadinessPct, 'BASE_READINESS_SCORE equals CANONICAL_SYSTEM_KPIS (79)');
assert(MAX_READINESS_SCORE === 99, 'MAX_READINESS_SCORE is capped at 99');

// Formula verification: 0 approved -> 79%
assert(calculateReadinessScore(0) === 79, '0 approved issues yields 79% baseline readiness');
// 1 approved -> 79 + 2.5 = 81.5 -> 82%
assert(calculateReadinessScore(1) === 82, '1 approved issue yields 82% readiness');
// 4 approved -> 79 + 10 = 89%
assert(calculateReadinessScore(4) === 89, '4 approved issues yields 89% readiness');
// 8 approved -> 79 + 20 = 99%
assert(calculateReadinessScore(8) === 99, '8 approved issues yields maximum 99% readiness');
// Overflow test: 20 approved still capped at 99
assert(calculateReadinessScore(20) === 99, 'Excessive approved issues capped at 99% maximum');

// calculateReadinessFromIssues verification
assert(calculateReadinessFromIssues(INITIAL_CANONICAL_ISSUES) === 79, 'Initial issues array calculates to 79% readiness');
assert(calculateReadinessFromIssues(approvedState) === 82, '1 approved issue array calculates to 82% readiness');
assert(calculateReadinessFromIssues(batchApprovedState) === 99, 'Batch approved issues array calculates to 99% readiness');

// Discovery Surface Projections
const projectionsInitial = deriveSurfaceReadinessProjections(INITIAL_CANONICAL_ISSUES);
assert(projectionsInitial.length === 4, 'Derives exactly 4 canonical discovery surfaces');
const googleInitial = projectionsInitial.find(p => p.id === 'google-shopping');
const aiInitial = projectionsInitial.find(p => p.id === 'ai-answer-engines');
assert(googleInitial?.baseScore === 84, 'Google Shopping base score is 84%');
assert(aiInitial?.baseScore === 68, 'AI Answer Engines base score is 68%');

// Recheck Simulation & Truth Boundaries
const recheckInitial = createRecheckSimulationResult(INITIAL_CANONICAL_ISSUES);
assert(recheckInitial.success === true, 'Recheck simulation returns success');
assert(recheckInitial.score === 79, 'Initial recheck simulation returns baseline 79%');
assert(recheckInitial.semanticLabel === READINESS_TRUTH_BOUNDARIES.previewModel, 'Recheck simulation carries preview model semantic label');

const recheckBatch = createRecheckSimulationResult(batchApprovedState);
assert(recheckBatch.score === 99, 'Batch approved recheck simulation returns 99%');
assert(recheckBatch.message.includes('Readiness at peak (99%)'), 'Batch approved recheck simulation message notes peak readiness');

// Verify Truth Boundary Strings
assert(READINESS_TRUTH_BOUNDARIES.previewModel.includes('Staged in AIXSHOP Preview Model'), 'Truth boundary declares Staged in AIXSHOP Preview Model');
assert(READINESS_TRUTH_BOUNDARIES.externalUnchanged.includes('External feeds unchanged'), 'Truth boundary declares External feeds unchanged');
assert(READINESS_TRUTH_BOUNDARIES.simulationNotice.includes('SIMULATION ≠ ACTUAL AUDIT'), 'Truth boundary declares SIMULATION ≠ ACTUAL AUDIT');

// 3. ARCHITECTURAL WIRING AUDIT
console.log('\n--- 3. ARCHITECTURAL WIRING & PROJECTION SYNC ---');

const useSessionPath = path.resolve(__dirname, '../state/useMerchantSession.ts');
assert(fs.existsSync(useSessionPath), 'useMerchantSession.ts exists');
const useSessionSrc = fs.readFileSync(useSessionPath, 'utf8');
assert(useSessionSrc.includes('canonicalIssues'), 'useMerchantSession imports canonicalIssues');
assert(useSessionSrc.includes('canonicalReadiness'), 'useMerchantSession imports canonicalReadiness');

const expPath = path.resolve(__dirname, '../components/merchant/MerchantExperience.tsx');
const expSrc = fs.readFileSync(expPath, 'utf8');
assert(expSrc.includes('useMerchantSession'), 'MerchantExperience uses useMerchantSession');
assert(!expSrc.includes('setReadinessScore(prev => Math.min(99, prev + 3))'), 'Removed duplicate hardcoded readiness formula from MerchantExperience');
assert(expSrc.includes('issues={issues}'), 'MerchantExperience passes canonical issues to views');
assert(expSrc.includes('onUpdateIssue={handleUpdateIssue}'), 'MerchantExperience passes onUpdateIssue to IssuesPage');
assert(expSrc.includes('readinessScore={readinessScore}'), 'MerchantExperience passes canonical readinessScore to views');

const issuesPagePath = path.resolve(__dirname, '../components/issues/IssuesPage.tsx');
const issuesPageSrc = fs.readFileSync(issuesPagePath, 'utf8');
assert(issuesPageSrc.includes('issues?: IssueItem[]'), 'IssuesPage accepts optional canonical issues prop');
assert(issuesPageSrc.includes('onUpdateIssue?:'), 'IssuesPage accepts onUpdateIssue callback prop');
assert(issuesPageSrc.includes('onUpdateIssue(issueId, updates)'), 'IssuesPage dispatches drawer updates to onUpdateIssue');

const actionCenterPath = path.resolve(__dirname, '../components/merchant/MerchantActionCenter.tsx');
const actionCenterSrc = fs.readFileSync(actionCenterPath, 'utf8');
assert(actionCenterSrc.includes('calculateReadinessScore'), 'MerchantActionCenter imports canonical calculateReadinessScore');
assert(actionCenterSrc.includes('useEffect'), 'MerchantActionCenter synchronizes reviewStates when canonical issues change');

const discoveryPagePath = path.resolve(__dirname, '../components/discovery/MerchantDiscoveryPage.tsx');
const discoveryPageSrc = fs.readFileSync(discoveryPagePath, 'utf8');
assert(discoveryPageSrc.includes('readinessScore?: number'), 'MerchantDiscoveryPage accepts canonical readinessScore prop');
assert(discoveryPageSrc.includes('READINESS_TRUTH_BOUNDARIES'), 'MerchantDiscoveryPage uses READINESS_TRUTH_BOUNDARIES');

console.log('\n======================================================');
console.log(` RESULTS: ${passedTests} passed, ${failedTests} failed out of ${totalTests} total tests`);
console.log('======================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('Canonical State & Single-Authority Verification PASSED cleanly!\n');
}
