import {
  CANONICAL_PRODUCT_ID,
  CANONICAL_PRODUCT_SKU,
  CANONICAL_PRODUCT_NAME
} from './canonicalCatalog';
import { sampleIssuesMetrics } from './sampleIssuesData';
import {
  CatalogSnapshotMetrics,
  PriorityActionItem,
  CatalogIntelligenceDimension,
  ProductHealthDistribution,
  RepresentativeProductItem,
  CatalogEvidenceHealthItem,
  CatalogOfferSnapshot,
  CatalogBuyerIntentCoverageItem,
  CatalogDiscoverySurface,
  CatalogRecentEvent,
  PriorityMatrixQuadrant
} from '../types/dashboard';

export const sampleCatalogSnapshot: CatalogSnapshotMetrics = {
  totalProducts: 24,
  intelligenceCoveragePercentage: 78,
  evidenceGapsCount: 17,
  conflictsCount: 6,
  offersObservedCount: 42,
  productsRequiringAttentionCount: sampleIssuesMetrics.openIssues
};

// Representative preview action items illustrating dashboard workflow recommendations.
// All items represent static illustrative scenarios (dataState: 'REPRESENTATIVE_PREVIEW') 
// rather than authoritative live telemetry derived from current catalog state.
export const samplePriorityActions: PriorityActionItem[] = [
  {
    id: 'act-01',
    orderNumber: '01',
    severity: 'Critical',
    title: '8 products have missing return-policy evidence',
    count: 8,
    affectedDimension: 'Offer & Commerce Microdata',
    impactArchetypes: 'Trust / Purchase',
    whyItMatters: 'Zero machine-readable return policy attributes detected in structured markup. Search engines and AI commerce agents de-prioritize or penalize checkout confidence when policy terms are absent.',
    recommendedStep: 'Attach authoritative 30-day merchant return policy schema or verify merchant-direct guarantee terms.',
    actionLabel: 'Review Products',
    targetFuturePage: 'Page 10 — Issues & Recovery',
    dataState: 'REPRESENTATIVE_PREVIEW',
    isRepresentativeScenario: true
  },
  {
    id: 'act-02',
    orderNumber: '02',
    severity: 'High',
    title: '6 variant groups contain GTIN conflicts',
    count: 6,
    affectedDimension: 'Product Identity & Variants',
    impactArchetypes: 'Identity / Commerce Feeds',
    whyItMatters: 'Discrepant barcodes between parent model and color/size variant SKUs disrupt Google Merchant Center syndication and cause AI agent identity fragmentation.',
    recommendedStep: 'Arbitrate conflicting GTIN-13/14 identifiers against GS1 authoritative registry or verify merchant packaging barcodes.',
    actionLabel: 'Review Conflicts',
    targetFuturePage: 'Page 06 — Products Management',
    dataState: 'REPRESENTATIVE_PREVIEW',
    isRepresentativeScenario: true
  },
  {
    id: 'act-03',
    orderNumber: '03',
    severity: 'High',
    title: '11 products have incomplete specification evidence',
    count: 11,
    affectedDimension: 'Physical & Technical Specifications',
    impactArchetypes: 'Specification / Comparison',
    whyItMatters: 'Critical comparative attributes (such as midsole stack height, carbon plate geometry, and waterproofing grade) are absent or only present in unparsed marketing prose.',
    recommendedStep: 'Extract and confirm structured technical specifications from laboratory spec sheets or verified product documentation.',
    actionLabel: 'Review Gaps',
    targetFuturePage: 'Page 10 — Issues & Recovery'
  },
  {
    id: 'act-04',
    orderNumber: '04',
    severity: 'Medium',
    title: '9 products have incomplete discovery attributes',
    count: 9,
    affectedDimension: 'Discovery Readiness',
    impactArchetypes: 'Discovery Readiness',
    whyItMatters: 'Missing structured audience tags, terrain classifications, and usage profiles weaken autonomous multi-attribute semantic query retrieval in AI answer engines.',
    recommendedStep: 'Enrich product models with verified buyer use-case context and semantic intent mapping.',
    actionLabel: 'Review Discovery Gaps',
    targetFuturePage: 'Page 08 — Discovery Intelligence'
  }
];

export const sampleCatalogDimensions: CatalogIntelligenceDimension[] = [
  {
    id: 'dim-identity',
    dimensionName: 'Product Identity',
    coveragePercentage: 96,
    status: 'Strong',
    coverageRationale: 'Canonical titles, brand ownership, and parent model identifiers are solidly established across 23 of 24 representative products.',
    keyObservation: 'High canonical coherence. Minor GTIN parity check required on 1 variant group.',
    affectedProductsCount: 1
  },
  {
    id: 'dim-specs',
    dimensionName: 'Specifications',
    coveragePercentage: 78,
    status: 'Needs Attention',
    coverageRationale: 'Core physical dimensions are recorded, but specialized laboratory metrics (carbon plate stiffness, drop measurements, weight) remain unverified in 11 products.',
    keyObservation: 'Unparsed marketing prose contains unverified claims not yet mapped to structured attributes.',
    affectedProductsCount: 11
  },
  {
    id: 'dim-evidence',
    dimensionName: 'Evidence',
    coveragePercentage: 72,
    status: 'Needs Attention',
    coverageRationale: '72% of modeled attributes have multi-source corroboration. 8% of catalog claims are in active CONFLICT and 10% are completely MISSING.',
    keyObservation: 'Upper material and waterproofing claims feature opposing public documentation values.',
    affectedProductsCount: 7
  },
  {
    id: 'dim-variants',
    dimensionName: 'Variants',
    coveragePercentage: 84,
    status: 'Good',
    coverageRationale: 'Size and colorway trees are structurally mapped. 6 variant groups require barcode reconciliation with GS1 standards.',
    keyObservation: 'Parent-to-child SKU mappings intact; barcode discrepancies isolated to secondary colorways.',
    affectedProductsCount: 6
  },
  {
    id: 'dim-offers',
    dimensionName: 'Offers',
    coveragePercentage: 91,
    status: 'Strong',
    coverageRationale: '42 active offers observed across 18 distinct sellers with price, currency, and availability snapshot tracking.',
    keyObservation: 'Product ≠ Offer boundary strictly maintained. Snapshot pricing reflects market variance.',
    affectedProductsCount: 3
  },
  {
    id: 'dim-discovery',
    dimensionName: 'Discovery Readiness',
    coveragePercentage: 69,
    status: 'Needs Attention',
    coverageRationale: 'Syntactic Schema.org microdata is largely present, but AI conversational answer engine readiness lags due to missing return policies and unresolved conflicts.',
    keyObservation: 'Diagnostic machine-readability signal indicates need for structured intent grounding.',
    affectedProductsCount: 9
  }
];

export const sampleHealthDistribution: ProductHealthDistribution = {
  strongCount: 10,
  needsAttentionCount: 9,
  criticalCount: 5,
  totalCatalogCount: 24
};

export const sampleRepresentativeProducts: RepresentativeProductItem[] = [
  {
    id: CANONICAL_PRODUCT_ID,
    name: CANONICAL_PRODUCT_NAME,
    brand: 'AeroPulse Athletics',
    category: 'Road Racing & Marathon Footwear',
    sku: CANONICAL_PRODUCT_SKU,
    status: 'Critical',
    mainIssue: 'Variant GTIN conflict & upper material disagreement',
    intelligenceCoverage: 70,
    evidenceState: 'CONFLICT',
    suggestedAction: 'Inspect Product Intelligence (Page 03)',
    canonicalId: 'aix-prod-849201948172',
    isPrimaryExample: true,
    samplePrice: 199.00,
    issueDimension: 'Variants & Evidence'
  },
  {
    id: 'aix-prod-849201948450',
    name: 'Horizon Trail Hydro Shoe',
    brand: 'AeroPulse Athletics',
    category: 'Trail Running & Wet Terrain',
    sku: 'AP-HTH-2026-04',
    status: 'Critical',
    mainIssue: 'Missing waterproof lab rating & membrane material conflict',
    intelligenceCoverage: 64,
    evidenceState: 'CONFLICT',
    suggestedAction: 'Arbitrate Material Conflict',
    canonicalId: 'aix-prod-849201948450',
    isPrimaryExample: false,
    samplePrice: 169.00,
    issueDimension: 'Specifications & Evidence'
  },
  {
    id: 'aix-prod-849201948577',
    name: 'ApexStride Pro Marathoner',
    brand: 'AeroPulse Athletics',
    category: 'High-Cadence Competition Road',
    sku: 'AP-ASP-2026-08',
    status: 'Needs Attention',
    mainIssue: 'Incomplete heel-to-toe drop specification & foam density',
    intelligenceCoverage: 76,
    evidenceState: 'MISSING',
    suggestedAction: 'Provide Laboratory Spec Sheet',
    canonicalId: 'aix-prod-849201948577',
    isPrimaryExample: false,
    samplePrice: 220.00,
    issueDimension: 'Specifications'
  },
  {
    id: 'aix-prod-849201948601',
    name: 'CloudDrift Daily Trainer v3',
    brand: 'AeroPulse Athletics',
    category: 'Neutral Daily Mileage',
    sku: 'AP-CDT-2026-12',
    status: 'Needs Attention',
    mainIssue: 'Return policy schema missing & out-of-stock offer conflict',
    intelligenceCoverage: 79,
    evidenceState: 'MISSING',
    suggestedAction: 'Attach Return Policy Microdata',
    canonicalId: 'aix-prod-849201948601',
    isPrimaryExample: false,
    samplePrice: 139.00,
    issueDimension: 'Offers & Trust'
  },
  {
    id: 'aix-prod-849201948634',
    name: 'AeroKnit Recovery Slide',
    brand: 'AeroPulse Athletics',
    category: 'Post-Race Recovery Footwear',
    sku: 'AP-ARS-2026-19',
    status: 'Needs Attention',
    mainIssue: 'Sizing scale discrepancy between US and EU retail partners',
    intelligenceCoverage: 81,
    evidenceState: 'CONFLICT',
    suggestedAction: 'Standardize Sizing Chart Scheme',
    canonicalId: 'aix-prod-849201948634',
    isPrimaryExample: false,
    samplePrice: 59.00,
    issueDimension: 'Variants'
  }
];

export const sampleEvidenceHealthItems: CatalogEvidenceHealthItem[] = [
  {
    state: 'OBSERVED',
    percentage: 52,
    count: 168,
    title: 'Observed Facts',
    description: 'Extracted directly from verifiable public structured markup, GS1 barcode records, or official technical tables without inference.',
    ruleOfTruth: 'Directly verified digital observation.',
    colorClass: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    badgeBg: 'bg-cyan-500'
  },
  {
    state: 'MERCHANT_VERIFIED',
    percentage: 18,
    count: 58,
    title: 'Merchant Verified',
    description: 'Directly confirmed or certified by the authoritative brand owner or authorized catalog engineering team.',
    ruleOfTruth: 'Authoritative merchant signature; overrides conflicting third-party scrapers.',
    colorClass: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    badgeBg: 'bg-emerald-500'
  },
  {
    state: 'DERIVED',
    percentage: 12,
    count: 39,
    title: 'Derived Facts',
    description: 'Synthesized mathematically or logically from multiple observed facts (e.g. heel drop calculated from stack heights).',
    ruleOfTruth: 'Derivations cite exact parent source facts; never synthesized out of thin air.',
    colorClass: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10',
    badgeBg: 'bg-indigo-500'
  },
  {
    state: 'CONFLICT',
    percentage: 8,
    count: 26,
    title: 'Evidence Conflicts',
    description: 'Two or more authoritative or merchant sources provide incompatible, mutually exclusive claims.',
    ruleOfTruth: 'AIXSHOP never guesses. Both claims are preserved and flagged for human arbitration.',
    colorClass: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
    badgeBg: 'bg-amber-500'
  },
  {
    state: 'MISSING',
    percentage: 10,
    count: 32,
    title: 'Missing Evidence',
    description: 'Required consumer decision or machine-discovery attributes that have zero grounding in available sources.',
    ruleOfTruth: 'Unknown remains Unknown. Never populated with generic hallucinations.',
    colorClass: 'text-rose-400 border-rose-500/30 bg-rose-500/10',
    badgeBg: 'bg-rose-500'
  }
];

export const sampleOfferSnapshot: CatalogOfferSnapshot = {
  observedOffersCount: 42,
  lowestPrice: 189.00,
  highestPrice: 260.00,
  medianPrice: 219.00,
  outOfStockOffersCount: 7,
  sellerDiscrepanciesCount: 3,
  currency: 'USD',
  snapshotTimestamp: 'Today at 08:17 UTC · Representative Snapshot',
  disclaimer: 'PRODUCT ≠ OFFER. These values represent a point-in-time observation of 42 marketplace offers. Commercial conditions are seller-dependent and do not define the intrinsic product.'
};

export const sampleBuyerIntentCoverage: CatalogBuyerIntentCoverageItem[] = [
  {
    archetype: 'Discovery',
    coveragePercentage: 82,
    testedQueriesCount: 34,
    supportedQueriesCount: 28,
    primaryGapExample: 'Broad marathon shoe category queries match; specific ultra-light trail filters lack grounding.',
    buyerJourneyPhase: 'Exploration & Category Browsing'
  },
  {
    archetype: 'Problem',
    coveragePercentage: 68,
    testedQueriesCount: 28,
    supportedQueriesCount: 19,
    primaryGapExample: 'Pronation support and plantar fasciitis relief context absent in 8 product descriptions.',
    buyerJourneyPhase: 'Pain Point & Injury Prevention Seeking'
  },
  {
    archetype: 'Comparison',
    coveragePercentage: 74,
    testedQueriesCount: 31,
    supportedQueriesCount: 23,
    primaryGapExample: 'Direct comparison against competitor carbon racers hindered by unparsed stack measurements.',
    buyerJourneyPhase: 'Head-to-Head Benchmark Evaluation'
  },
  {
    archetype: 'Specification',
    coveragePercentage: 88,
    testedQueriesCount: 40,
    supportedQueriesCount: 35,
    primaryGapExample: 'Shoe weight, carbon plate presence, and upper fabric mostly complete across models.',
    buyerJourneyPhase: 'Technical Fact Verification'
  },
  {
    archetype: 'Purchase',
    coveragePercentage: 91,
    testedQueriesCount: 36,
    supportedQueriesCount: 33,
    primaryGapExample: 'Pricing and retailer buy-links indexed accurately across official and partner stores.',
    buyerJourneyPhase: 'Transaction & Checkout Intent'
  },
  {
    archetype: 'Use Case',
    coveragePercentage: 63,
    testedQueriesCount: 30,
    supportedQueriesCount: 19,
    primaryGapExample: 'Wet asphalt versus muddy trail performance nuances missing structured machine tags.',
    buyerJourneyPhase: 'Environmental & Routine Suitability'
  },
  {
    archetype: 'Trust',
    coveragePercentage: 57,
    testedQueriesCount: 28,
    supportedQueriesCount: 16,
    primaryGapExample: 'Return policy duration, authenticity guarantees, and factory warranties lacking structured schema.',
    buyerJourneyPhase: 'Credibility & Risk Mitigation'
  }
];

export const sampleDiscoverySurfaces: CatalogDiscoverySurface[] = [
  {
    surfaceId: 'surf-search',
    surfaceName: 'Traditional Search',
    readinessStatus: 'Ready',
    readinessPercentage: 84,
    majorGap: 'Missing structured merchant return policy and breadcrumb microdata in 9 products.',
    affectedProductCount: 9,
    diagnosticNotes: 'Standard schema markup validates with minor warnings. Title and canonical URLs pass Google Rich Results tests.',
    surfaceType: 'Search'
  },
  {
    surfaceId: 'surf-ai',
    surfaceName: 'AI Search / Answer Engines',
    readinessStatus: 'Needs Attention',
    readinessPercentage: 68,
    majorGap: 'Unresolved upper material conflicts prevent AI conversational agents from forming confident attribute consensus.',
    affectedProductCount: 6,
    diagnosticNotes: 'Perplexity, Gemini, and ChatGPT citation indexing requires clear factual provenance to avoid hallucinated specs.',
    surfaceType: 'AI'
  },
  {
    surfaceId: 'surf-commerce',
    surfaceName: 'Commerce Feeds / Marketplaces',
    readinessStatus: 'Needs Attention',
    readinessPercentage: 63,
    majorGap: 'Variant GTIN-13/14 barcode formatting discrepancies cause feed rejections in secondary colorways.',
    affectedProductCount: 6,
    diagnosticNotes: 'Google Merchant Center and Shopify catalog feeds reject 6 variant SKUs due to checksum parity errors.',
    surfaceType: 'Commerce'
  },
  {
    surfaceId: 'surf-aixshop',
    surfaceName: 'AIXSHOP Product Discovery',
    readinessStatus: 'Ready',
    readinessPercentage: 79,
    majorGap: '11 products require structured technical specification grounding for deep comparative queries.',
    affectedProductCount: 11,
    diagnosticNotes: 'Native neural vector index maps 79% of catalog intents; remaining items require merchant evidence signoff.',
    surfaceType: 'AIXSHOP'
  }
];

export const sampleRecentEvents: CatalogRecentEvent[] = [
  {
    id: 'evt-01',
    time: '08:42 AM',
    title: 'Product identity resolved',
    target: 'VaporStride Carbon Elite',
    type: 'identity',
    detail: 'Canonical ID aix-prod-849201948172 verified with 99.4% cross-retailer cluster confidence.',
    isRecent: true,
    provenanceSource: 'Automated Identity Clustering Engine'
  },
  {
    id: 'evt-02',
    time: '08:31 AM',
    title: 'Evidence conflict detected',
    target: 'Upper Material (VaporStride)',
    type: 'conflict',
    detail: 'Manufacturer page specifies "Engineered Micro-Weave Jacquard" while Retailer B declares "Dual-Layer Poly Mesh". Conflict preserved.',
    isRecent: true,
    provenanceSource: 'Dual-Source Extraction Pipeline'
  },
  {
    id: 'evt-03',
    time: '08:17 AM',
    title: 'Offer observation updated',
    target: '3 representative sellers',
    type: 'offer',
    detail: 'Observed offers captured: $199.00 (AeroPulse Direct), $219.00 (FleetFeet Authorized), $240.00 (MarathonOutlet).',
    isRecent: true,
    provenanceSource: 'Marketplace Microdata Observer'
  },
  {
    id: 'evt-04',
    time: 'Yesterday 16:45',
    title: 'Variant GTIN verification required',
    target: '5 representative variants',
    type: 'verification',
    detail: 'Sizes 8.5 through 11.5 in Volt / Obsidian require barcode check against GS1 registry.',
    isRecent: false,
    provenanceSource: 'Catalog Feeds Diagnostic Linter'
  }
];

export const samplePriorityMatrixQuadrants: PriorityMatrixQuadrant[] = [
  {
    id: 'high-impact-low-conf',
    impact: 'High',
    confidence: 'Low',
    label: 'High Impact / Low Confidence',
    subtitle: 'Needs Merchant Verification',
    recommendedAction: 'Priority #1 for Merchant Arbitration. High buyer purchase influence but conflicting/unverified evidence.',
    representativeItemsCount: 14,
    sampleItems: [
      'Upper material conflict (VaporStride)',
      'Waterproofing grade missing (Horizon Trail)',
      'Return policy terms absent (8 products)'
    ],
    rationale: 'These fields directly impact buyer checkout decisions and AI recommendation trust. Because confidence is low or conflicting, automated heuristic guessing is prohibited.'
  },
  {
    id: 'high-impact-high-conf',
    impact: 'High',
    confidence: 'High',
    label: 'High Impact / High Confidence',
    subtitle: 'Deterministic Remediation',
    recommendedAction: 'Ready for automated merchant publish or 1-click structured schema deployment.',
    representativeItemsCount: 9,
    sampleItems: [
      'Weight: 215g (verified in 3 manufacturer tables)',
      'Carbon plate: Full-length curve (verified in technical schematic)',
      'Official brand retail price: $199.00'
    ],
    rationale: 'High customer importance backed by multiple authoritative, matching observations. Safe to formalize without human dispute.'
  },
  {
    id: 'low-impact-low-conf',
    impact: 'Low',
    confidence: 'Low',
    label: 'Low Impact / Low Confidence',
    subtitle: 'Monitor / Defer',
    recommendedAction: 'Keep logged in audit backlog; do not distract merchant attention from checkout-critical gaps.',
    representativeItemsCount: 7,
    sampleItems: [
      'Shoelace eyelet alloy composition',
      'Packaging box cardboard recycled percentage',
      'Insole factory batch color tone index'
    ],
    rationale: 'Peripheral attributes with conflicting or scarce mentions. Negligible impact on shopper discovery or purchase readiness.'
  },
  {
    id: 'low-impact-high-conf',
    impact: 'Low',
    confidence: 'High',
    label: 'Low Impact / High Confidence',
    subtitle: 'No Immediate Action',
    recommendedAction: 'Resolved and stable. No operational intervention required.',
    representativeItemsCount: 18,
    sampleItems: [
      'Colorway naming string: Volt / Obsidian Blue',
      'Manufacture country code: VN',
      'Product category taxonomy breadcrumb'
    ],
    rationale: 'Solid evidence backing non-critical taxonomy classifications. Documented in catalog record with complete stability.'
  }
];
