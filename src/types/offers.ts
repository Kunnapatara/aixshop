import { EvidenceState } from './landing';

export type OfferEvidenceState = EvidenceState;

export type CommercialAvailability = 
  | 'In Stock'
  | 'Limited'
  | 'Out of Stock'
  | 'Unknown';

export type SellerType = 
  | 'Brand Direct'
  | 'Authorized Retailer'
  | 'Marketplace Seller'
  | 'Third-Party Reseller'
  | 'Unknown';

export type PriceCondition = 
  | 'Normal'
  | 'Promotional'
  | 'Clearance'
  | 'Member-Only'
  | 'Unknown';

export type OfferConfidence = 'High' | 'Medium' | 'Low' | 'Unknown';

export type OfferIssueSeverity = 'Critical' | 'High' | 'Medium' | 'Low' | 'None';

export interface CommercialClaim {
  id: string;
  attribute: 'Price' | 'Availability' | 'Shipping' | 'Returns' | 'Promotion' | 'Seller Authorization';
  value: string;
  source: string;
  detectedAt: string;
  validUntil: string;
  confidence: OfferConfidence;
  state: OfferEvidenceState;
  notes?: string;
}

export interface OfferIssue {
  id: string;
  type: 'Price Disagreement' | 'Availability Conflict' | 'Promotion Incomplete' | 'Missing Return Evidence' | 'Missing Shipping Policy' | 'Unverified Seller';
  severity: OfferIssueSeverity;
  description: string;
  suggestedAction: string;
}

export interface OfferPromotion {
  hasPromotion: boolean;
  type?: string;
  basePrice?: number;
  promotionalPrice?: number;
  conditionDescription?: string;
  verificationState: 'Verified' | 'Observed Condition Unverified' | 'Partial' | 'None';
}

export interface OfferShipping {
  state: OfferEvidenceState;
  summary: string;
  cost?: string;
  estimatedDelivery?: string;
  freeShippingThreshold?: string;
}

export interface OfferReturns {
  state: OfferEvidenceState;
  summary: string;
  returnWindowDays?: number;
  conditionNotes?: string;
}

export interface CommercialOffer {
  id: string;
  productId: string; // Foreign key: canonicalId for resolved products, or legacy identifier
  canonicalProductId?: string; // Authoritative canonical product ID when resolved
  mappingStatus?: 'RESOLVED_CANONICAL' | 'UNRESOLVED_MAPPING';
  productName: string;
  brand: string;
  category: string;
  sku: string;
  gtin: string;
  mpn: string;
  isPrimaryExample?: boolean;

  // Seller information
  seller: string;
  sellerType: SellerType;
  source: string;
  sellerAuthorization: OfferEvidenceState;

  // Commercial Core
  offerPrice: number | null;
  currency: string;
  priceCondition: PriceCondition;
  availability: CommercialAvailability;
  stockStateSummary: string;

  // Extended Commercial Conditions
  promotion: OfferPromotion;
  shipping: OfferShipping;
  returns: OfferReturns;

  // Evidence & Epistemic Attributes
  dominantEvidenceState: OfferEvidenceState;
  evidenceClaims: CommercialClaim[];
  observedAt: string;
  validUntil: string;
  confidence: OfferConfidence;

  // Issues
  issues: OfferIssue[];
  statusLabel: string;

  // Deep Diagnostic
  whatAIXShopKnows: string;
  whatAIXShopCannotVerify: string[];
  whyItMatters: {
    category: 'Purchase' | 'Comparison' | 'Trust' | 'Price Transparency';
    explanation: string;
  };
  recommendedNextStep: string;
}

export interface ProductOfferGroup {
  productId: string;
  canonicalProductId?: string;
  mappingStatus?: 'RESOLVED_CANONICAL' | 'UNRESOLVED_MAPPING';
  isCanonicalProduct?: boolean;
  productName: string;
  brand: string;
  category: string;
  gtin: string;
  sku: string;
  isPrimaryExample?: boolean;
  offers: CommercialOffer[];
  observedOffersCount: number;
  lowestPrice: number | null;
  highestPrice: number | null;
  spread: number | null;
  currency: string;
  hasPriceConflict: boolean;
  hasAvailabilityConflict: boolean;
  hasMissingEvidence: boolean;
  hasPromotion: boolean;
}

export type OfferSortField = 
  | 'product'
  | 'seller'
  | 'price'
  | 'observedAt'
  | 'confidence'
  | 'availability'
  | 'issueSeverity';

export type OfferSortDirection = 'asc' | 'desc';

export interface OfferFiltersState {
  searchQuery: string;
  seller: string;
  offerState: OfferEvidenceState | 'All';
  availability: CommercialAvailability | 'All';
  priceCondition: PriceCondition | 'All';
  confidence: OfferConfidence | 'All';
  issueStatus: 'All' | 'No Issue' | 'Needs Review' | 'Conflict' | 'Missing Evidence';
  minPrice?: number;
  maxPrice?: number;
  onlyPromotions: boolean;
  onlyConflicts: boolean;
}
