/**
 * AIXSHOP — Canonical Readiness State Authority
 * Single authoritative source of truth for:
 * - Base readiness score and calculations
 * - Dynamic preview readiness staged from approved issues
 * - Recheck simulation state and deterministic verification evaluation
 * - Semantic truth boundary indicators (Preview Model vs External Platforms)
 * - Canonical discovery surface projections
 */

import { CANONICAL_SYSTEM_KPIS } from '../data/canonicalCatalog';
import { IssueItem } from '../types/issues';
import { getApprovedIssuesCount, getOpenIssuesCount } from './canonicalIssues';

/**
 * Baseline readiness constants from canonical system specifications.
 */
export const BASE_READINESS_SCORE = CANONICAL_SYSTEM_KPIS.discoveryReadinessPct; // 79
export const MAX_READINESS_SCORE = 99;
export const READINESS_BOOST_PER_APPROVED_ISSUE = 2.5;

/**
 * Authoritative Truth Boundary Definitions.
 * Guarantees that preview/staging states are never confused with external live feeds.
 */
export const READINESS_TRUTH_BOUNDARIES = {
  previewModel: 'Staged in AIXSHOP Preview Model',
  externalUnchanged: 'External feeds unchanged until published',
  simulationNotice: 'Representative preview simulation (SIMULATION ≠ ACTUAL AUDIT)',
  verificationNotice: 'Continuous validation rules evaluated against catalog specifications',
  channelBoundary: 'Changes staged in AIXSHOP; Google Shopping, Schema.org, and AI engine feeds remain untouched until publication export.'
} as const;

/**
 * Calculates the canonical readiness percentage based on the number of approved/resolved issues.
 * Formula: Math.min(99, Math.round(baseScore + (approvedCount * 2.5)))
 * Baseline (0 approved) = 79%
 * Fully resolved (8 approved) = 99%
 */
export function calculateReadinessScore(
  approvedCount: number, 
  baseScore: number = BASE_READINESS_SCORE
): number {
  const boost = approvedCount * READINESS_BOOST_PER_APPROVED_ISSUE;
  return Math.min(MAX_READINESS_SCORE, Math.round(baseScore + boost));
}

/**
 * Calculates the canonical readiness score directly from an array of IssueItems.
 */
export function calculateReadinessFromIssues(
  issues: IssueItem[],
  baseScore: number = BASE_READINESS_SCORE
): number {
  const approvedCount = getApprovedIssuesCount(issues);
  return calculateReadinessScore(approvedCount, baseScore);
}

/**
 * Canonical Discovery Surface Projections
 */
export interface SurfaceReadinessProjection {
  id: string;
  name: string;
  baseScore: number;
  currentScore: number;
  status: 'Ready' | 'Needs Attention' | 'Critical';
  statusColor: 'emerald' | 'amber' | 'rose';
  primaryBlocker: string;
}

/**
 * Computes surface-specific readiness projections based on resolved issues.
 */
export function deriveSurfaceReadinessProjections(
  issues: IssueItem[]
): SurfaceReadinessProjection[] {
  const approvedCount = getApprovedIssuesCount(issues);
  const boostFraction = Math.min(1, approvedCount / 8);

  return [
    {
      id: 'google-shopping',
      name: 'Google Shopping',
      baseScore: 84,
      currentScore: Math.min(99, Math.round(84 + (15 * boostFraction))),
      status: 'Ready',
      statusColor: 'emerald',
      primaryBlocker: approvedCount >= 2 
        ? 'None. All critical attributes resolved in preview model.' 
        : 'Minor missing shipping dimension on 2 secondary colorways.'
    },
    {
      id: 'ai-answer-engines',
      name: 'AI Answer Engines',
      baseScore: 68,
      currentScore: Math.min(98, Math.round(68 + (30 * boostFraction))),
      status: approvedCount >= 3 ? 'Ready' : 'Needs Attention',
      statusColor: approvedCount >= 3 ? 'emerald' : 'amber',
      primaryBlocker: approvedCount >= 3
        ? 'Resolved in preview model. Conflicting claims harmonized.'
        : 'Conflicting upper material claims between manufacturer and retailer catalog.'
    },
    {
      id: 'schema-org',
      name: 'Schema.org',
      baseScore: 88,
      currentScore: Math.min(99, Math.round(88 + (11 * boostFraction))),
      status: 'Ready',
      statusColor: 'emerald',
      primaryBlocker: approvedCount >= 4
        ? 'None. Full JSON-LD structured microdata corroborated.'
        : 'Missing aggregateRating schema on 4 newly introduced seasonal SKUs.'
    },
    {
      id: 'marketplace-search',
      name: 'Marketplace Search',
      baseScore: 76,
      currentScore: Math.min(99, Math.round(76 + (23 * boostFraction))),
      status: 'Ready',
      statusColor: 'emerald',
      primaryBlocker: approvedCount >= 6
        ? 'None. Barcodes and ASIN relationships validated.'
        : '6 secondary variant colorways feature GTIN checksum disparities.'
    }
  ];
}

/**
 * Recheck Simulation Result State
 */
export interface RecheckSimulationResult {
  success: boolean;
  score: number;
  message: string;
  timestamp: string;
  semanticLabel: string;
  ruleEvaluationSummary: string;
}

/**
 * Creates a deterministic recheck simulation result from the current issues state.
 */
export function createRecheckSimulationResult(
  issues: IssueItem[],
  baseScore: number = BASE_READINESS_SCORE
): RecheckSimulationResult {
  const approvedCount = getApprovedIssuesCount(issues);
  const score = calculateReadinessScore(approvedCount, baseScore);
  const totalOpen = getOpenIssuesCount(issues);

  return {
    success: true,
    score,
    timestamp: 'Just now',
    semanticLabel: READINESS_TRUTH_BOUNDARIES.previewModel,
    message: totalOpen === 0
      ? 'All catalog issues resolved and verified in preview model. Readiness at peak (99%).'
      : `Recheck simulation complete. ${approvedCount} fixes verified; ${totalOpen} items remain for review.`,
    ruleEvaluationSummary: READINESS_TRUTH_BOUNDARIES.verificationNotice
  };
}
