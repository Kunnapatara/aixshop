import { EvidenceState, IntentArchetype } from './landing';

export interface CatalogSnapshotMetrics {
  totalProducts: number;
  intelligenceCoveragePercentage: number;
  evidenceGapsCount: number;
  conflictsCount: number;
  offersObservedCount: number;
  productsRequiringAttentionCount: number;
}

export type PrioritySeverity = 'Critical' | 'High' | 'Medium' | 'Low';

export interface PriorityActionItem {
  id: string;
  orderNumber: string;
  severity: PrioritySeverity;
  title: string;
  count: number;
  affectedDimension: string;
  impactArchetypes: string;
  whyItMatters: string;
  recommendedStep: string;
  actionLabel: string;
  targetFuturePage: string;
  /**
   * Phase 2.2A Semantic Contract:
   * Explicitly marks whether this item is an illustrative representative preview scenario
   * or dynamically derived from the live catalog telemetry pipeline.
   */
  dataState?: 'REPRESENTATIVE_PREVIEW' | 'CANONICAL_DERIVED';
  isRepresentativeScenario?: boolean;
}

export interface CatalogIntelligenceDimension {
  id: string;
  dimensionName: string;
  coveragePercentage: number;
  status: 'Strong' | 'Good' | 'Needs Attention' | 'Critical';
  coverageRationale: string;
  keyObservation: string;
  affectedProductsCount: number;
}

export interface ProductHealthDistribution {
  strongCount: number;
  needsAttentionCount: number;
  criticalCount: number;
  totalCatalogCount: number;
}

export interface RepresentativeProductItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  sku: string;
  status: 'Critical' | 'Needs Attention' | 'Strong';
  mainIssue: string;
  intelligenceCoverage: number;
  evidenceState: EvidenceState;
  suggestedAction: string;
  canonicalId?: string;
  isPrimaryExample?: boolean;
  samplePrice?: number;
  issueDimension?: string;
}

export interface CatalogEvidenceHealthItem {
  state: EvidenceState;
  percentage: number;
  count: number;
  title: string;
  description: string;
  ruleOfTruth: string;
  colorClass: string;
  badgeBg: string;
}

export interface CatalogOfferSnapshot {
  observedOffersCount: number;
  lowestPrice: number;
  highestPrice: number;
  medianPrice: number;
  outOfStockOffersCount: number;
  sellerDiscrepanciesCount: number;
  currency: string;
  snapshotTimestamp: string;
  disclaimer: string;
}

export interface CatalogBuyerIntentCoverageItem {
  archetype: IntentArchetype;
  coveragePercentage: number;
  testedQueriesCount: number;
  supportedQueriesCount: number;
  primaryGapExample: string;
  buyerJourneyPhase: string;
}

export interface CatalogDiscoverySurface {
  surfaceId: string;
  surfaceName: string;
  readinessStatus: 'Ready' | 'Gaps Detected' | 'Needs Attention';
  readinessPercentage: number;
  majorGap: string;
  affectedProductCount: number;
  diagnosticNotes: string;
  surfaceType: 'Search' | 'AI' | 'Commerce' | 'AIXSHOP';
}

export interface CatalogRecentEvent {
  id: string;
  time: string;
  title: string;
  target: string;
  type: 'identity' | 'conflict' | 'offer' | 'verification';
  detail: string;
  isRecent: boolean;
  provenanceSource: string;
}

export type MatrixQuadrantId = 
  | 'high-impact-low-conf' 
  | 'high-impact-high-conf' 
  | 'low-impact-low-conf' 
  | 'low-impact-high-conf';

export interface PriorityMatrixQuadrant {
  id: MatrixQuadrantId;
  impact: 'High' | 'Low';
  confidence: 'High' | 'Low';
  label: string;
  subtitle: string;
  recommendedAction: string;
  representativeItemsCount: number;
  sampleItems: string[];
  rationale: string;
}
