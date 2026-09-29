/**
 * AIXSHOP — Merchant Session Coordinator Hook
 * Coordinates session state and dispatches mutations to canonical authorities.
 * Architecture:
 *   Canonical State Authorities (canonicalIssues, canonicalReadiness)
 *                     ↓
 *        Merchant Session Coordinator (useMerchantSession)
 *                     ↓
 *             Page Projections
 */

import { useState, useMemo, useCallback } from 'react';
import { 
  IssueItem, 
  IssuesMetricsSummary 
} from '../types/issues';
import { 
  MerchantTab, 
  resolveMerchantTab 
} from '../components/merchant/merchantNavigationConfig';
import { 
  INITIAL_CANONICAL_ISSUES,
  approveIssue,
  dismissIssue,
  updateIssue,
  approveAllIssues,
  getOpenIssuesCount,
  getApprovedIssuesCount,
  getDismissedIssuesCount,
  deriveCanonicalIssuesMetrics
} from './canonicalIssues';
import { 
  calculateReadinessFromIssues,
  createRecheckSimulationResult,
  deriveSurfaceReadinessProjections,
  RecheckSimulationResult,
  SurfaceReadinessProjection
} from './canonicalReadiness';

export interface MerchantSession {
  // Navigation
  activeTab: MerchantTab;
  setActiveTab: (tab: MerchantTab) => void;
  
  // Canonical Issues State
  issues: IssueItem[];
  openIssuesCount: number;
  approvedIssuesCount: number;
  dismissedIssuesCount: number;
  metrics: IssuesMetricsSummary;

  // Canonical Readiness State
  readinessScore: number;
  surfaceProjections: SurfaceReadinessProjection[];
  
  // Recheck Simulation State
  isRechecking: boolean;
  recheckResult: RecheckSimulationResult | null;
  
  // Canonical Actions
  approveIssue: (issueId: string, customValue?: string) => void;
  dismissIssue: (issueId: string, reason?: string) => void;
  updateIssue: (issueId: string, updates: Partial<IssueItem>) => void;
  approveAllIssues: () => void;
  runRecheckSimulation: (onComplete?: (result: RecheckSimulationResult) => void) => void;
}

export function useMerchantSession(initialTab: MerchantTab | string = 'home'): MerchantSession {
  const [activeTab, setActiveTabState] = useState<MerchantTab>(resolveMerchantTab(initialTab));
  const [issues, setIssues] = useState<IssueItem[]>(INITIAL_CANONICAL_ISSUES);
  const [isRechecking, setIsRechecking] = useState(false);
  const [recheckResult, setRecheckResult] = useState<RecheckSimulationResult | null>(null);

  const setActiveTab = useCallback((tab: MerchantTab) => {
    setActiveTabState(resolveMerchantTab(tab));
  }, []);

  // Derived issue counts
  const openIssuesCount = useMemo(() => getOpenIssuesCount(issues), [issues]);
  const approvedIssuesCount = useMemo(() => getApprovedIssuesCount(issues), [issues]);
  const dismissedIssuesCount = useMemo(() => getDismissedIssuesCount(issues), [issues]);
  const metrics = useMemo(() => deriveCanonicalIssuesMetrics(issues), [issues]);

  // Derived canonical readiness
  const readinessScore = useMemo(() => {
    if (recheckResult?.score !== undefined) {
      return recheckResult.score;
    }
    return calculateReadinessFromIssues(issues);
  }, [issues, recheckResult]);

  const surfaceProjections = useMemo(() => {
    return deriveSurfaceReadinessProjections(issues);
  }, [issues]);

  // Canonical Mutations
  const handleApproveIssue = useCallback((issueId: string, customValue?: string) => {
    setIssues(prev => approveIssue(prev, issueId, customValue));
    // Clear old recheck result if new changes applied
    setRecheckResult(null);
  }, []);

  const handleDismissIssue = useCallback((issueId: string, reason?: string) => {
    setIssues(prev => dismissIssue(prev, issueId, reason));
    setRecheckResult(null);
  }, []);

  const handleUpdateIssue = useCallback((issueId: string, updates: Partial<IssueItem>) => {
    setIssues(prev => updateIssue(prev, issueId, updates));
    setRecheckResult(null);
  }, []);

  const handleApproveAll = useCallback(() => {
    setIssues(prev => approveAllIssues(prev));
    setRecheckResult(null);
  }, []);

  const handleRunRecheck = useCallback((onComplete?: (result: RecheckSimulationResult) => void) => {
    setIsRechecking(true);
    setRecheckResult(null);

    setTimeout(() => {
      const result = createRecheckSimulationResult(issues);
      setRecheckResult(result);
      setIsRechecking(false);
      if (onComplete) {
        onComplete(result);
      }
    }, 900);
  }, [issues]);

  return {
    activeTab,
    setActiveTab,
    issues,
    openIssuesCount,
    approvedIssuesCount,
    dismissedIssuesCount,
    metrics,
    readinessScore,
    surfaceProjections,
    isRechecking,
    recheckResult,
    approveIssue: handleApproveIssue,
    dismissIssue: handleDismissIssue,
    updateIssue: handleUpdateIssue,
    approveAllIssues: handleApproveAll,
    runRecheckSimulation: handleRunRecheck
  };
}
