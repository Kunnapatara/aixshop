/**
 * AIXSHOP.APP — Data Types for Landing Page & Product Intelligence Model
 */

export type EvidenceState = 
  | 'OBSERVED' 
  | 'DERIVED' 
  | 'MERCHANT_VERIFIED' 
  | 'MISSING' 
  | 'CONFLICT';

export interface ProductFact {
  id: string;
  name: string;
  category: string;
  value: string;
  source: string;
  detectedAt: string;
  validUntil?: string;
  confidence: number; // 0 to 100
  state: EvidenceState;
  conflictDetails?: {
    sourceA: { name: string; value: string };
    sourceB: { name: string; value: string };
  };
  note?: string;
}

export interface SellerOffer {
  id: string;
  sellerName: string;
  sellerType: 'Official Store' | 'Authorized Retailer' | 'Third-Party Marketplace';
  price: number;
  currency: string;
  availability: 'In Stock' | 'Low Stock' | 'Pre-order' | 'Out of Stock' | string;
  shipping: string;
  returnPolicy: string;
  detectedAt: string;
  isOfficial?: boolean;
  buyUrl: string;
}

export type IntentArchetype = 
  | 'Discovery' 
  | 'Problem' 
  | 'Comparison' 
  | 'Specification' 
  | 'Purchase' 
  | 'Use Case' 
  | 'Trust';

export interface BuyerIntentItem {
  id: string;
  query: string;
  archetype: IntentArchetype;
  isSupported: boolean;
  matchedFact?: string;
  diagnosticNote: string;
}

export type FindingSeverity = 'CRITICAL' | 'WARNING' | 'INFORMATION';

export interface CriticalFindingItem {
  id: string;
  severity: FindingSeverity;
  title: string;
  summary: string;
  whatHappened: string;
  whyItMatters: string;
  evidenceState: EvidenceState;
  suggestedAction: string;
}

export interface AnalysisPipelineStage {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed';
  description: string;
}

export interface DiscoverySurfaceSignal {
  surfaceId: string;
  name: string;
  type: 'Search' | 'AI' | 'Commerce' | 'AIXSHOP';
  readinessStatus: 'Ready' | 'Gaps Detected' | 'Needs Attention';
  completenessPercentage: number;
  diagnosticFinding: string;
}

export interface ProductVariantItem {
  id: string;
  variantName: string;
  size: string;
  color: string;
  variantId: string;
  gtin: string;
  evidenceState: EvidenceState;
  availability: 'In Stock' | 'Low Stock' | 'Out of Stock';
  diagnosticNote?: string;
  price?: number;
}

export interface IntelligenceTimelineEvent {
  id: string;
  title: string;
  timestamp: string;
  type: 'identity' | 'specification' | 'conflict' | 'offer' | 'diagnostic';
  description: string;
  source: string;
}

export interface IntelligenceGapItem {
  id: string;
  category: 'Missing' | 'Conflict' | 'Needs Verification' | 'Complete';
  severity: 'Critical' | 'Warning' | 'Info';
  title: string;
  affectedEntity: string;
  currentState: EvidenceState;
  whyItMatters: string;
  evidenceNote: string;
}

export interface InspectedEvidenceAttribute {
  id: string;
  name: string;
  category: string;
  value: string;
  state: EvidenceState;
  source: string;
  detectedAt: string;
  confidence: 'High' | 'Medium' | 'Low' | 'Unverified';
  note: string;
  conflictDetails?: {
    sourceA: { name: string; value: string };
    sourceB: { name: string; value: string };
  };
}

export interface CanonicalProductPreview {
  id: string;
  brand: string;
  name: string;
  category: string;
  canonicalId: string;
  gtin: string;
  mpn: string;
  heroImage: string;
  summary: string;
  lowestObservedPrice: number;
  officialPrice: number;
  totalOffers: number;
  facts: ProductFact[];
  offers: SellerOffer[];
  intents: BuyerIntentItem[];
  surfaces: DiscoverySurfaceSignal[];
}
