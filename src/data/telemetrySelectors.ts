// src/data/telemetrySelectors.ts
// Authoritative Telemetry Selectors and Shared Metric Calculators for AIXSHOP
// Consolidates metric derivations across Shopper, Merchant, and Admin surfaces.

import { 
  IssueItem, 
  IssuesMetricsSummary, 
  IssueRecoveryState 
} from '../types/issues';
import { EvidenceState } from '../types/landing';
import {
  CANONICAL_CATALOG_PRODUCTS,
  CANONICAL_MERCHANT,
  CANONICAL_TELEMETRY_FUNNEL,
  CANONICAL_SYSTEM_KPIS
} from './canonicalCatalog';

/**
 * Derives live issues metrics deterministically from an array of IssueItems.
 * Enforces a single source of truth for issue counts and lifecycle distributions.
 */
export function deriveIssuesMetrics(issues: IssueItem[]): IssuesMetricsSummary {
  const openIssuesList = issues.filter(i => i.recoveryState !== 'Resolved');
  const openCount = openIssuesList.length;
  const criticalCount = openIssuesList.filter(i => i.severity === 'Critical').length;
  const blockedCount = openIssuesList.filter(
    i => i.recoveryState === 'Blocked' || i.evidenceState === 'CONFLICT' || i.evidenceState === 'MISSING'
  ).length;
  const eligibleCount = openIssuesList.filter(i => i.recoveryEligibility === 'Eligible').length;
  const merchantCount = openIssuesList.filter(
    i => i.recoveryEligibility === 'Merchant Required' || i.recoveryState === 'Merchant Verification'
  ).length;
  const resolvedCount = issues.filter(i => i.recoveryState === 'Resolved').length;

  const dist: Record<IssueRecoveryState, number> = {
    Open: 0,
    Diagnosing: 0,
    'Recovery Proposed': 0,
    'Validation Required': 0,
    'Merchant Verification': 0,
    Resolved: 0,
    Blocked: 0
  };

  issues.forEach(i => {
    if (dist[i.recoveryState] !== undefined) {
      dist[i.recoveryState]++;
    }
  });

  return {
    openIssues: openCount,
    criticalIssues: criticalCount,
    evidenceBlocked: blockedCount,
    recoveryEligible: eligibleCount,
    merchantVerificationRequired: merchantCount,
    recentlyResolved: resolvedCount,
    stateDistribution: dist
  };
}

/**
 * Maps an authoritative EvidenceState to a context-specific human-readable UI presentation label.
 * Under no circumstances does the UI label replace the underlying domain EvidenceState enum.
 */
export function getEvidenceStatePresentationLabel(
  state: EvidenceState,
  context: 'shopper' | 'merchant' | 'admin' = 'merchant'
): string {
  if (context === 'shopper') {
    switch (state) {
      case 'OBSERVED':
        return 'Observed from source';
      case 'DERIVED':
        return 'Derived from verified information';
      case 'MERCHANT_VERIFIED':
        return 'Verified by merchant';
      case 'MISSING':
        return 'Not verified';
      case 'CONFLICT':
        return 'Sources disagree';
    }
  }

  switch (state) {
    case 'OBSERVED':
      return 'Observed';
    case 'DERIVED':
      return 'Derived';
    case 'MERCHANT_VERIFIED':
      return 'Merchant Verified';
    case 'MISSING':
      return 'Missing';
    case 'CONFLICT':
      return 'Conflict';
  }
}

/**
 * Returns the canonical catalog and telemetry funnel summary metrics.
 */
export function getCanonicalCatalogTelemetry() {
  return {
    catalogProductCount: CANONICAL_CATALOG_PRODUCTS.length,
    activeChildVariantsCount: CANONICAL_MERCHANT.activeChildVariants,
    activeCommercialOffersCount: CANONICAL_MERCHANT.activeCommercialOffers,
    telemetryFunnel: CANONICAL_TELEMETRY_FUNNEL,
    systemKpis: CANONICAL_SYSTEM_KPIS
  };
}
