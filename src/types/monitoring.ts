// src/types/monitoring.ts
// Type definitions for Page 09 — Monitoring Intelligence

import { EvidenceState } from './landing';

export type MonitoringCategory = 
  | 'product_intelligence'
  | 'variant_integrity'
  | 'offer_intelligence'
  | 'evidence_integrity'
  | 'discovery_readiness';

export type MonitoringState = 
  | 'stable'
  | 'changed'
  | 'needs_review'
  | 'conflict'
  | 'stale_unknown';

export type MonitoringPriority = 
  | 'Critical'
  | 'High'
  | 'Medium'
  | 'Low';

export type MonitoringClassification = 
  | 'INFORMATIONAL'
  | 'REVIEW'
  | 'HIGH IMPACT'
  | 'CRITICAL';

export type MonitoringEvidenceState = EvidenceState;

export type ChangeType = 
  | 'price'
  | 'availability'
  | 'promotion'
  | 'evidence'
  | 'attribute'
  | 'variant_identity'
  | 'conflict'
  | 'discovery_signal'
  | 'source_content';

export interface ConflictDetails {
  sourceA: {
    name: string;
    value: string;
    observedAt: string;
  };
  sourceB: {
    name: string;
    value: string;
    observedAt: string;
  };
  attributeName: string;
  explanation: string;
  noAveragingNotice: string;
}

export interface OfferDimensionsBreakdown {
  price: {
    previous: string;
    current: string;
    changed: boolean;
  };
  availability: {
    previous: string;
    current: string;
    changed: boolean;
  };
  promotion: {
    previous: string;
    current: string;
    changed: boolean;
  };
  seller: {
    name: string;
    changed: boolean;
  };
  shipping: {
    previous: string;
    current: string;
    changed: boolean;
  };
  returns: {
    previous: string;
    current: string;
    changed: boolean;
  };
  isolatedChangedDimension: string;
}

export interface MonitoringEvent {
  id: string;
  productId: string;
  productName: string;
  productBrand: string;
  productSku: string;
  productGtin: string;
  offerId?: string;
  sellerName?: string;
  category: MonitoringCategory;
  changeType: ChangeType;
  changeTitle: string;
  attribute: string;
  previousValue: string;
  currentValue: string;
  difference?: string;
  source: string;
  detectedAt: string; // e.g. "14 Sep 2026 · 08:42 UTC"
  detectedAtTimestamp: number;
  validUntil: string; // "Unknown" or timestamp
  evidenceState: MonitoringEvidenceState;
  confidence: number; // 0 - 100
  impact: string;
  priority: MonitoringPriority;
  classification: MonitoringClassification;
  status: MonitoringState;
  reason: string;
  recommendedNextStep: string;
  targetAction: 'inspect' | 'view_product' | 'review_evidence' | 'view_offers' | 'view_discovery';
  conflictDetails?: ConflictDetails;
  offerDimensions?: OfferDimensionsBreakdown;
  affectedFields?: string[];
  isReviewed?: boolean;
}

export interface MonitoredProductSummary {
  id: string;
  name: string;
  brand: string;
  category: string;
  sku: string;
  gtin: string;
  canonicalId: string;
  monitoringState: MonitoringState;
  totalChanges: number;
  evidenceChanges: number;
  offerChanges: number;
  discoveryChanges: number;
  priority: MonitoringPriority;
  priorityScore: number;
  priorityRationale: string;
  lastObservation: string;
  coverage: number;
  dominantEvidenceState: MonitoringEvidenceState;
  topIssue: string;
  eventsCount: number;
}

export interface MonitoringSummaryMetrics {
  monitoredProducts: number; // 24
  changesDetected: number; // 12
  highPriority: number; // 4
  evidenceChanges: number; // 7
  offerChanges: number; // 5
  discoverySignalsChanged: number; // 3
  statusDistribution: {
    stable: number; // 12
    changed: number; // 5
    needsReview: number; // 4
    evidenceConflict: number; // 2
    staleUnknown: number; // 1
  };
}

export interface MonitoringFiltersState {
  category: 'ALL' | MonitoringCategory;
  priority: 'ALL' | MonitoringPriority;
  state: 'ALL' | MonitoringState;
  evidenceState: 'ALL' | MonitoringEvidenceState;
  searchQuery: string;
  viewMode: 'events' | 'products';
}

export type MonitoringSortField = 
  | 'priority'
  | 'detectedAt'
  | 'product'
  | 'changeType'
  | 'impact'
  | 'confidence';

export type MonitoringSortDirection = 'asc' | 'desc';
