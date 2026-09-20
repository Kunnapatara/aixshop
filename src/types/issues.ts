// src/types/issues.ts
// Type definitions for Page 10 — Issues & Recovery Intelligence Workspace

import { EvidenceState } from './landing';

export type IssueType = 
  | 'Evidence Missing'
  | 'Evidence Conflict'
  | 'Variant Identity'
  | 'Product Attribute'
  | 'Offer Integrity'
  | 'Availability'
  | 'Promotion'
  | 'Discovery Readiness'
  | 'Source Drift';

export type IssueSeverity = 
  | 'Critical'
  | 'High'
  | 'Medium'
  | 'Low'
  | 'Informational';

export type IssueEvidenceState = EvidenceState;

export type IssueRecoveryState = 
  | 'Open'
  | 'Diagnosing'
  | 'Recovery Proposed'
  | 'Validation Required'
  | 'Merchant Verification'
  | 'Resolved'
  | 'Blocked';

export type RecoveryClass = 
  | 'CLASS_A_DETERMINISTIC'
  | 'CLASS_B_EVIDENCE_GATED'
  | 'CLASS_C_EXTERNAL_WRITEBACK';

export type RecoveryEligibility = 
  | 'Eligible'
  | 'Evidence-Gated'
  | 'Merchant Required'
  | 'Blocked';

export type BuyerIntentArchetype = 
  | 'Discovery'
  | 'Problem'
  | 'Comparison'
  | 'Specification'
  | 'Purchase'
  | 'Use Case'
  | 'Trust';

export type BuyerIntentStatus = 
  | 'Affected'
  | 'Not Affected'
  | 'Evidence Blocked'
  | 'Unknown';

export interface BuyerIntentImpactItem {
  status: BuyerIntentStatus;
  explanation: string;
}

export type BuyerIntentImpactMap = Record<BuyerIntentArchetype, BuyerIntentImpactItem>;

export interface EvidenceRecord {
  value: string;
  source: string;
  detectedAt: string;
  validUntil: string;
  confidence: 'High' | 'Medium' | 'Low' | 'Unknown';
  state: IssueEvidenceState;
  sourceDetails?: {
    sourceA?: { name: string; value: string; detectedAt: string };
    sourceB?: { name: string; value: string; detectedAt: string };
  };
}

export interface DeterministicPriorityReasoning {
  score: number; // 0 - 100
  level: IssueSeverity;
  severityFactor: string;
  buyerImpactFactor: string;
  evidenceRiskFactor: string;
  recoveryUrgencyFactor: string;
  explanationBullets: string[];
}

export interface ValidationRuleResult {
  id: string;
  category: 'Identity' | 'Evidence' | 'Schema' | 'Discovery';
  ruleName: string;
  status: 'PASS' | 'FAIL' | 'BLOCKED';
  detail: string;
}

export interface DiffInspectionData {
  field: string;
  currentValue: string;
  currentEvidenceState: IssueEvidenceState;
  proposedValue: string;
  proposedEvidenceState: IssueEvidenceState;
  validationResult: 'PASS' | 'FAIL' | 'BLOCKED';
  validationReason: string;
}

export interface RecoveryWorkspaceData {
  recoveryClass: RecoveryClass;
  recoveryClassLabel: string;
  currentStateSummary: string;
  problemDescription: string;
  proposedRecoveryAction: string;
  evidenceRequirement: string;
  deterministicValidationRules: ValidationRuleResult[];
  verificationStatus: 'VERIFIED' | 'PARTIALLY VERIFIED' | 'BLOCKED';
  diff: DiffInspectionData;
}

export interface IssueHistoryEvent {
  stage: string;
  timestamp: string;
  title: string;
  description: string;
  state: IssueRecoveryState;
}

export type IssueScope = 'PRODUCT' | 'OFFER';

export interface ActionIntegrityNextStep {
  stepNumber: number;
  label: string;
  description: string;
  targetSystem: string;
}

export interface MerchantActionIntegrity {
  scope: IssueScope;
  problem: string;
  evidence: {
    source: string;
    observedValue: string;
    evidenceState: IssueEvidenceState;
    detectedAt: string;
    confidence: 'High' | 'Medium' | 'Low' | 'Unknown';
    sourceDetails?: {
      sourceA?: { name: string; value: string; detectedAt: string };
      sourceB?: { name: string; value: string; detectedAt: string };
    };
    expectedCondition: string;
  };
  reason: string;
  nextAction: {
    actionCode: 'REVIEW' | 'OPEN_SOURCE' | 'VERIFY' | 'RECHECK';
    actionLabel: string;
    summary: string;
    steps: ActionIntegrityNextStep[];
    canSimulateRecheck: boolean;
  };
  sourceOwnership: {
    sourceOfRecord: string;
    ownerType: 'Merchant' | 'Brand / Manufacturer' | 'Authorized Retailer' | 'External Registry';
    systemLocation: string;
    dataFieldToChange: string;
  };
  boundary: {
    aixshopCan: string[];
    merchantMust: string[];
    cannotClaim: string;
  };
}

export interface IssueItem {
  id: string;
  issueNumber: string; // e.g. "ISS-01"
  title: string;
  scope: IssueScope;
  productId: string;
  productName: string;
  productSku: string;
  productVariant?: string;
  issueType: IssueType;
  severity: IssueSeverity;
  evidenceState: IssueEvidenceState;
  whyItMatters: string;
  recoveryState: IssueRecoveryState;
  recoveryClass: RecoveryClass;
  recoveryEligibility: RecoveryEligibility;
  detectedAt: string;
  detectedAtTimestamp: number;
  deterministicPriority: DeterministicPriorityReasoning;
  diagnosticReason: string;
  evidenceRecord: EvidenceRecord;
  buyerImpacts: BuyerIntentImpactMap;
  recoveryWorkspace: RecoveryWorkspaceData;
  history: IssueHistoryEvent[];
  previewBadge: string;
  changeEventId?: string;
  isResolved?: boolean;
}

export interface IssuesMetricsSummary {
  openIssues: number;
  criticalIssues: number;
  evidenceBlocked: number;
  recoveryEligible: number;
  merchantVerificationRequired: number;
  recentlyResolved: number;
  stateDistribution: Record<IssueRecoveryState, number>;
}

export interface IssuesFilterState {
  issueType: IssueType | 'ALL';
  severity: IssueSeverity | 'ALL';
  evidenceState: IssueEvidenceState | 'ALL';
  recoveryState: IssueRecoveryState | 'ALL';
  buyerImpact: BuyerIntentArchetype | 'ALL';
  recoveryEligibility: RecoveryEligibility | 'ALL';
  searchQuery: string;
}

export type IssuesSortField = 
  | 'priority'
  | 'severity'
  | 'detected'
  | 'product'
  | 'recoveryState';

export type IssuesSortDirection = 'asc' | 'desc';
