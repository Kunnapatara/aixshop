// src/types/admin.ts
// Type definitions for Page 15 — Admin Control Tower & Evidence Console

import { EvidenceState } from './landing';
import { IssueSeverity, IssueRecoveryState, RecoveryClass } from './issues';

export type SystemPipelineStageId = 
  | 'source'
  | 'observation'
  | 'normalization'
  | 'identity'
  | 'evidence'
  | 'intelligence'
  | 'discovery'
  | 'monitoring'
  | 'issues'
  | 'recovery'
  | 'verification';

export interface SystemPipelineStage {
  id: SystemPipelineStageId;
  name: string;
  shortDesc: string;
  state: 'OPERATIONAL' | 'REVIEW_REQUIRED' | 'ACTIVE';
  recordsCount: number;
  unresolvedCount: number;
  confidenceScore: number;
  lastSimulatedEvent: string;
  details: {
    description: string;
    metrics: { label: string; value: string }[];
    governanceRule: string;
  };
}

export type SourceAuthorityLevel = 
  | 1 // Merchant Verified / Ground Truth
  | 2 // Official Brand / Authorized Source
  | 3 // Structured Commerce Feed
  | 4 // Authorized Marketplace Source
  | 5 // Permitted Public Observation
  | 6; // Derived Intelligence

export interface AdminSourceItem {
  id: string;
  name: string;
  category: 'First-Party Storefront' | 'Syndicated Merchant Feed' | 'Structured Web Markup' | 'Merchant Ground Truth';
  acquisitionMethod: 'Direct API Webhook' | 'Scheduled Feed Pull' | 'Headless Microdata Crawl' | 'Merchant Attestation';
  permissionModel: 'Read-Only (Least Privilege)' | 'Verified Attestation' | 'Public Read-Only';
  coverage: string;
  evidenceContribution: number; // records contributed
  health: 'Healthy · Preview' | 'Review Required · Preview' | 'Synchronized · Preview';
  freshness: string;
  lastObservation: string;
  state: 'Active' | 'Under Review' | 'Standby';
  defaultAuthorityLevel: SourceAuthorityLevel;
}

export interface AdminEvidenceRecord {
  id: string;
  productId: string;
  productName: string;
  attribute: string;
  value: string;
  sourceId: string;
  sourceName: string;
  detectedAt: string;
  validUntil: string;
  confidence: number; // 0 to 100
  state: EvidenceState;
  authorityLevel: SourceAuthorityLevel;
  authorityReason: string;
  lastChange: string;
  confidenceReason: string;
  changeHistory: {
    timestamp: string;
    previousValue: string;
    newValue: string;
    source: string;
    trigger: string;
  }[];
  conflictId?: string;
  relatedBuyerIntents: string[];
  relatedDiscoverySurfaces: string[];
}

export interface AdminConflictRecord {
  id: string;
  category: 
    | 'Product Attribute Conflict'
    | 'Variant Identity Conflict'
    | 'GTIN/MPN Conflict'
    | 'Offer Price Conflict'
    | 'Availability Conflict'
    | 'Evidence Authority Conflict'
    | 'Discovery Attribute Conflict';
  productId: string;
  productName: string;
  attribute: string;
  sourceA: {
    name: string;
    value: string;
    timestamp: string;
    authorityLevel: SourceAuthorityLevel;
    confidence: number;
  };
  sourceB: {
    name: string;
    value: string;
    timestamp: string;
    authorityLevel: SourceAuthorityLevel;
    confidence: number;
  };
  affectedBuyerIntents: string[];
  affectedDiscoverySurfaces: string[];
  resolutionState: 'Preserved · Unresolved' | 'Awaiting Merchant Attestation' | 'Deterministic Arbitration Blocked';
  whyNotAutoMerged: string;
}

export interface AdminProductIdentityRecord {
  id: string;
  canonicalId: string;
  productName: string;
  brand: string;
  mpn: string;
  gtin: string;
  variantCount: number;
  status: 'Resolved' | 'Review Required' | 'Potential Duplicate';
  confidence: number;
  statusReason: string;
  variants: {
    variantId: string;
    sku: string;
    size: string;
    color: string;
    gtinAgreement: boolean;
  }[];
}

export interface AdminObservationLedgerItem {
  id: string;
  timestamp: string;
  source: string;
  entity: string;
  observation: string;
  previousValue: string;
  newValue: string;
  evidenceState: EvidenceState;
  impact: 'Critical' | 'High' | 'Medium' | 'Low' | 'Benign';
  isIssueTriggered: boolean;
  status: 'Logged' | 'Triaged' | 'Monitored';
}

export interface AdminIssueRecord {
  id: string;
  title: string;
  productId: string;
  productName: string;
  severity: IssueSeverity;
  rootCause: string;
  evidenceState: EvidenceState;
  buyerImpact: string;
  recoveryEligibility: 'Eligible' | 'Evidence-Gated' | 'Manual-Only';
  recoveryClass: RecoveryClass;
  currentState: IssueRecoveryState;
}

export interface BuyerIntentArchetypeItem {
  archetypeNumber: number;
  name: string;
  question: string;
  evidenceDependencies: string[];
  coveragePercentage: number;
  missingEvidenceCount: number;
  conflictsCount: number;
  affectedProductsCount: number;
}

export interface DiscoverySurfaceIntegrityItem {
  surfaceId: string;
  id?: string;
  name: string;
  dataReadiness: number; // percentage
  evidenceReadiness: number;
  structuredDataReadiness: number;
  readinessScore?: number;
  targetAudience?: string;
  keyDependencies?: string[];
  blockerCount?: number;
  modeledState: 'High Integrity · Modeled' | 'Attention Required · Modeled' | 'Gaps Detected · Modeled';
  unresolvedBlockers: string[];
}

export interface RiskRegisterItem {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  evidenceConfidence: number;
  buyerImpact: string;
  affectedProductsCount: number;
  affectedSurfacesCount: number;
  recoveryEligibility: string;
  deterministicPriorityReason: string;
}

export interface AdminAuditTrailItem {
  id: string;
  timestamp: string;
  action: string;
  entity: string;
  actorType: 'System' | 'Merchant' | 'Admin' | 'Preview';
  previousState: string;
  newState: string;
  traceHash: string;
}
