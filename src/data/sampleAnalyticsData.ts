// src/data/sampleAnalyticsData.ts
// AIXSHOP.APP — Page 13: Analytics & Intelligence Performance Workspace Data
// Authoritative representative dataset for AeroPulse Athletics
// Strictly maintains canonical metrics from Pages 05, 07, 09, 10, and 12.
// Every record has data_state = 'REPRESENTATIVE_PREVIEW'.

import {
  CANONICAL_PRODUCT_ID,
  CANONICAL_PRODUCT_GTIN,
  CANONICAL_PRODUCT_SKU,
  CANONICAL_PRODUCT_NAME,
  CANONICAL_TELEMETRY_FUNNEL
} from './canonicalCatalog';
import {
  AnalyticsSummaryKPIs,
  IntelligenceCoverageProgressionPoint,
  CoverageDimensionItem,
  EvidenceDistributionItem,
  EvidenceTrendPoint,
  ConflictAnalyticsBreakdown,
  IssueLifecycleDistribution,
  RecoveryPerformanceMetrics,
  ChangeDiagnosisConversion,
  MonitoringCategoryItem,
  OfferAnalyticsSummary,
  BuyerIntentAnalyticsItem,
  IntentGapItem,
  DiscoverySurfaceAnalyticsItem,
  DiscoveryReadinessTrendPoint,
  SourceCategoryContribution,
  SourceHealthDimensionItem,
  DataQualityFunnelStage,
  TopIntelligenceRiskItem,
  ProductLevelAnalyticsProfile,
  AnalyticsInsightItem,
  MetricDefinition,
  ExportAnalyticsRecord
} from '../types/analytics';
import { sampleIssuesMetrics } from './sampleIssuesData';
import { sampleMonitoringMetrics } from './sampleMonitoringData';

export const sampleAnalyticsKPIs: AnalyticsSummaryKPIs = {
  productsAnalyzed: 24,
  intelligenceCoveragePercentage: 78,
  evidenceCompletenessPercentage: 70,
  openIssuesCount: sampleIssuesMetrics.openIssues,
  conflictsCount: 6,
  recoveryResolutionPercentage: 50,
  dataState: 'REPRESENTATIVE_PREVIEW',
  periodLabel: 'Representative Period (Preview Mode)'
};

export const sampleMetricDefinitions: MetricDefinition[] = [
  {
    id: 'kpi-coverage',
    name: 'Intelligence Coverage',
    definition: 'Representative proportion of modeled product intelligence dimensions currently populated with usable, machine-readable evidence.',
    ruleOfTruth: 'A dimension is only counted as covered if evidence is OBSERVED, DERIVED, or MERCHANT VERIFIED. Missing states do not contribute.',
    whyItMatters: 'Higher coverage ensures downstream search engines and AI commerce agents receive comprehensive product specifications rather than ungrounded assumptions.'
  },
  {
    id: 'kpi-completeness',
    name: 'Evidence Completeness',
    definition: 'Coverage of product facts grounded in verified, observed, or authoritative provenance records.',
    ruleOfTruth: 'Evidence completeness separates ungrounded marketing prose from deterministic, citeable product assertions.',
    whyItMatters: 'Grounded assertions avoid AI hallucinations and prevent conflicting product claims across retailer channels.'
  },
  {
    id: 'kpi-conflicts',
    name: 'Intelligence Conflicts',
    definition: 'Count of active discrepancies where two or more authoritative or observed sources provide incompatible factual values.',
    ruleOfTruth: 'A conflict remains a conflict until evidence establishes a valid resolution. Sources cannot be arbitrarily trusted without verification.',
    whyItMatters: 'Conflicts in identifiers (like GTIN) or physical specifications break automated syndication and confuse shopper search intents.'
  },
  {
    id: 'kpi-issues',
    name: 'Open Intelligence Issues',
    definition: 'Diagnosed catalog anomalies that degrade discovery readiness, violate schema constraints, or produce buyer confusion.',
    ruleOfTruth: 'Not all detected changes are issues. An event is only promoted to an issue when it impacts transactional confidence or discovery integrity.',
    whyItMatters: 'Resolving high-priority issues directly repairs merchant visibility across AI answer engines and structured marketplace feeds.'
  },
  {
    id: 'kpi-recovery',
    name: 'Recovery Resolution Rate',
    definition: 'Proportion of diagnosed intelligence issues that have advanced to validated resolution or merchant-confirmed recovery.',
    ruleOfTruth: 'Measures workflow outcomes in the AIXSHOP intelligence model. Does not imply external merchant backends were autonomously edited.',
    whyItMatters: 'Tracking recovery progress demonstrates how rapidly catalog integrity issues are remediated and locked down against regression.'
  },
  {
    id: 'kpi-discovery',
    name: 'Discovery Readiness',
    definition: 'Diagnostic evaluation of whether product intelligence meets the structural requirements for traditional, AI, and feed discovery.',
    ruleOfTruth: 'Diagnostic readiness is NOT a search ranking. It reflects schema syntax validity, evidence grounding, and variant clarity.',
    whyItMatters: 'High discovery readiness ensures products appear reliably in generative search summaries and multi-channel catalogs.'
  }
];

export const sampleCoverageProgression: IntelligenceCoverageProgressionPoint[] = [
  { period: 'T - 4 Weeks', coveragePercentage: 72, changeRationale: 'Initial catalog baseline: 24 products ingested via Shopify Storefront connector with basic attribute modeling.' },
  { period: 'T - 3 Weeks', coveragePercentage: 74, changeRationale: 'Merchant Google Merchant Center XML feed linked; technical specifications enriched.' },
  { period: 'T - 2 Weeks', coveragePercentage: 75, changeRationale: 'JSON-LD schema structured crawler integrated; variant barcode mappings linked.' },
  { period: 'T - 1 Week', coveragePercentage: 77, changeRationale: 'Lab specification sheets ingested for footwear cushioning geometry and carbon plate attributes.' },
  { period: 'Representative Current', coveragePercentage: 78, changeRationale: 'Merchant ground-truth verification applied across return policies and GTIN arbitration.' }
];

export const sampleCoverageDimensions: CoverageDimensionItem[] = [
  {
    id: 'dim-identity',
    name: 'Product Identity',
    coveragePercentage: 99.4,
    status: 'Strong',
    modeledElementsCount: 192,
    groundedElementsCount: 191,
    rationale: 'Core SKU identifiers, brand names, product titles, and handles are grounded across 24 products.'
  },
  {
    id: 'dim-specs',
    name: 'Specifications',
    coveragePercentage: 70.0,
    status: 'Good',
    modeledElementsCount: 240,
    groundedElementsCount: 168,
    rationale: 'Physical biomechanics, stack height, heel drop, and upper mesh materials populated from lab specs.'
  },
  {
    id: 'dim-evidence',
    name: 'Evidence Grounding',
    coveragePercentage: 68.0,
    status: 'Needs Attention',
    modeledElementsCount: 183,
    groundedElementsCount: 124,
    rationale: '17 evidence gaps identified where critical consumer assertions rely on unverified DOM copy.'
  },
  {
    id: 'dim-variants',
    name: 'Variants & SKUs',
    coveragePercentage: 82.0,
    status: 'Good',
    modeledElementsCount: 68,
    groundedElementsCount: 56,
    rationale: 'Colorway and sizing matrix modeled across 68 variants; 2 GTIN collisions require merchant arbitration.'
  },
  {
    id: 'dim-offers',
    name: 'Offers & Commercials',
    coveragePercentage: 88.0,
    status: 'Strong',
    modeledElementsCount: 42,
    groundedElementsCount: 37,
    rationale: '42 multi-seller offers tracked across 18 products with observed prices, currency, and availability.'
  },
  {
    id: 'dim-intent',
    name: 'Buyer Intent Support',
    coveragePercentage: 73.0,
    status: 'Good',
    modeledElementsCount: 7,
    groundedElementsCount: 5,
    rationale: '7/7 buyer intent archetypes modeled; Specification (88%) is strongest, Trust (61%) has highest gap.'
  },
  {
    id: 'dim-discovery',
    name: 'Discovery Readiness',
    coveragePercentage: 79.0,
    status: 'Good',
    modeledElementsCount: 4,
    groundedElementsCount: 3,
    rationale: 'Search and marketplace feeds ready; generative AI engines constrained by return policy and variant evidence.'
  }
];

export const sampleEvidenceDistribution: EvidenceDistributionItem[] = [
  {
    state: 'OBSERVED',
    count: 112,
    percentage: 58.9,
    description: 'Extracted directly from authoritative structured feeds, APIs, and public DOM markup without inference.',
    ruleOfTruth: 'Unambiguous factual extraction from external systems.',
    colorClass: 'text-cyan-400',
    badgeBg: 'bg-cyan-500/15 border-cyan-500/30'
  },
  {
    state: 'DERIVED',
    count: 31,
    percentage: 16.3,
    description: 'Mathematically computed or normalized from multiple observed signals (e.g. unit conversions, price dispersion).',
    ruleOfTruth: 'Transparent, deterministic logic without black-box hallucination.',
    colorClass: 'text-indigo-400',
    badgeBg: 'bg-indigo-500/15 border-indigo-500/30'
  },
  {
    state: 'MERCHANT_VERIFIED',
    count: 24,
    percentage: 12.6,
    description: 'Explicitly reviewed, attested, or corrected by merchant operators through the AIXSHOP verification workspace.',
    ruleOfTruth: 'Highest grade of factual authority within the tenant catalog.',
    colorClass: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/15 border-emerald-500/30'
  },
  {
    state: 'MISSING',
    count: 17,
    percentage: 8.9,
    description: 'Required model dimensions where no source provides structured evidence. Prohibited from being fabricated.',
    ruleOfTruth: 'Unknown remains Unknown. Zero assumptions permitted.',
    colorClass: 'text-amber-400',
    badgeBg: 'bg-amber-500/15 border-amber-500/30'
  },
  {
    state: 'CONFLICT',
    count: 6,
    percentage: 3.3,
    description: 'Two or more active sources provide contradictory values that cannot be deterministically resolved without arbitration.',
    ruleOfTruth: 'Requires merchant intervention or authoritative GS1 verification.',
    colorClass: 'text-rose-400',
    badgeBg: 'bg-rose-500/15 border-rose-500/30'
  }
];

export const sampleEvidenceTrend: EvidenceTrendPoint[] = [
  { period: 'T - 4 Wks', missing: 17, conflicts: 6, merchantVerified: 12, observed: 95 },
  { period: 'T - 3 Wks', missing: 15, conflicts: 6, merchantVerified: 16, observed: 100 },
  { period: 'T - 2 Wks', missing: 14, conflicts: 5, merchantVerified: 19, observed: 104 },
  { period: 'T - 1 Wk', missing: 12, conflicts: 5, merchantVerified: 22, observed: 108 },
  { period: 'Current', missing: 10, conflicts: 4, merchantVerified: 24, observed: 112 }
];

export const sampleConflictAnalytics: ConflictAnalyticsBreakdown = {
  totalConflicts: 6,
  criticalConflicts: 3,
  variantConflicts: 2,
  attributeConflicts: 3,
  offerConflicts: 1,
  rationale: 'A conflict remains a conflict until evidence establishes a valid resolution. Credibility weighting does not replace verified proof.'
};

export const sampleIssueLifecycleDistribution: IssueLifecycleDistribution = {
  open: 3,
  diagnosing: 1,
  recoveryProposed: 2,
  validationRequired: 1,
  merchantVerification: 5,
  resolved: 4,
  blocked: 2
};

export const sampleRecoveryPerformance: RecoveryPerformanceMetrics = {
  issuesDetected: sampleIssuesMetrics.openIssues,
  recoveryEligible: sampleIssuesMetrics.recoveryEligible,
  evidenceGated: sampleIssuesMetrics.evidenceBlocked,
  merchantVerificationRequired: sampleIssuesMetrics.merchantVerificationRequired,
  validationPassed: 2,
  resolved: sampleIssuesMetrics.recentlyResolved,
  blocked: 2,
  operationalNotes: 'Recovery performance measures deterministic workflow progression in the intelligence layer. External merchant commerce databases are not altered autonomously.'
};

export const sampleChangeDiagnosisConversion: ChangeDiagnosisConversion = {
  changesDetected: sampleMonitoringMetrics.changesDetected,
  diagnosedAsIssues: sampleIssuesMetrics.openIssues,
  remainedInformational: Math.max(0, sampleMonitoringMetrics.changesDetected - sampleIssuesMetrics.openIssues),
  rationale: 'Change ≠ Issue. Routine catalog updates (such as minor price revisions or image hash changes) remain informational unless they break schema validity or introduce factual conflicts.'
};

export const sampleMonitoringCategories: MonitoringCategoryItem[] = [
  { category: 'product_intelligence', label: 'Product Intelligence', count: 3, page09CategoryKey: 'product_intelligence', description: 'Specification adjustments and material attribute modifications detected.' },
  { category: 'variant_integrity', label: 'Variant Integrity', count: 2, page09CategoryKey: 'variant_integrity', description: 'Variant barcode discrepancies and colorway handle changes.' },
  { category: 'offer_intelligence', label: 'Offer Intelligence', count: 5, page09CategoryKey: 'offer_intelligence', description: 'Marketplace price movements, discount expirations, and stock updates.' },
  { category: 'evidence_integrity', label: 'Evidence Integrity', count: 7, page09CategoryKey: 'evidence_integrity', description: 'Schema.org JSON-LD structural drifts and DOM element changes.' },
  { category: 'discovery_readiness', label: 'Discovery Readiness', count: 3, page09CategoryKey: 'discovery_readiness', description: 'Search bot crawlability signals and feed format compliance updates.' }
];

export const sampleOfferAnalytics: OfferAnalyticsSummary = {
  observedOffersCount: 42,
  productsWithOffersCount: 18,
  priceConflictsCount: 4,
  availabilityConflictsCount: 3,
  missingOfferEvidenceCount: 7,
  promotionsDetectedCount: 6,
  distinctSellersCount: 5,
  medianPriceUsd: 189.00,
  lowestPriceUsd: 149.00,
  highestPriceUsd: 229.00,
  rationale: 'Strict separation of Product Identity (24 products, 68 variants) from Seller Conditions (42 observed offers across 18 products). Product ≠ Offer.'
};

export const sampleBuyerIntentAnalytics: BuyerIntentAnalyticsItem[] = [
  { archetype: 'Discovery', coveragePercentage: 82, modeledDimensionsCount: 12, groundedDimensionsCount: 10, topGap: 'Variant colorway ambiguity on multi-tone shoes', buyerJourneyPhase: 'Exploration', impactLevel: 'High' },
  { archetype: 'Problem', coveragePercentage: 64, modeledDimensionsCount: 10, groundedDimensionsCount: 6, topGap: 'Pronation support & plantar relief evidence missing', buyerJourneyPhase: 'Need Recognition', impactLevel: 'Critical' },
  { archetype: 'Comparison', coveragePercentage: 71, modeledDimensionsCount: 14, groundedDimensionsCount: 10, topGap: 'Comparative stack-height vs competitor super-shoes', buyerJourneyPhase: 'Evaluation', impactLevel: 'High' },
  { archetype: 'Specification', coveragePercentage: 88, modeledDimensionsCount: 18, groundedDimensionsCount: 16, topGap: 'Lab durometer firmness measurement missing on 2 SKUs', buyerJourneyPhase: 'Technical Validation', impactLevel: 'Medium' },
  { archetype: 'Purchase', coveragePercentage: 76, modeledDimensionsCount: 12, groundedDimensionsCount: 9, topGap: 'Return shipping fee terms unverified in structured markup', buyerJourneyPhase: 'Decision', impactLevel: 'Critical' },
  { archetype: 'Use Case', coveragePercentage: 69, modeledDimensionsCount: 10, groundedDimensionsCount: 7, topGap: 'Marathon distance certification vs 5K/10K tempo ratings', buyerJourneyPhase: 'Contextual Fit', impactLevel: 'Medium' },
  { archetype: 'Trust', coveragePercentage: 61, modeledDimensionsCount: 8, groundedDimensionsCount: 5, topGap: '30-day merchant return policy schema missing on 8 products', buyerJourneyPhase: 'Commitment', impactLevel: 'Critical' }
];

export const sampleIntentGaps: IntentGapItem[] = [
  { id: 'gap-01', rank: 1, archetype: 'Trust', title: 'Return Policy Evidence Missing', issueDescription: '8 products lack machine-readable Schema.org MerchantReturnPolicy specifications.', evidenceState: 'MISSING', recommendedPage: 'Page 10', targetView: 'issues' },
  { id: 'gap-02', rank: 2, archetype: 'Comparison', title: 'Comparative Midsole Attributes Incomplete', issueDescription: '6 marathon products lack structured heel-toe drop and durometer hardness data.', evidenceState: 'MISSING', recommendedPage: 'Page 03', targetView: 'report' },
  { id: 'gap-03', rank: 3, archetype: 'Purchase', title: 'Offer Availability Evidence Ambiguous', issueDescription: '3 third-party marketplace offers show inconsistent backorder fulfillment lead-times.', evidenceState: 'CONFLICT', recommendedPage: 'Page 10', targetView: 'issues' },
  { id: 'gap-04', rank: 4, archetype: 'Discovery', title: 'Variant Barcode GTIN Discrepancy', issueDescription: '2 colorway variations show conflicting 12 vs 13 digit barcodes across feed channels.', evidenceState: 'CONFLICT', recommendedPage: 'Page 10', targetView: 'issues' }
];

export const sampleDiscoverySurfaces: DiscoverySurfaceAnalyticsItem[] = [
  {
    id: 'surf-search',
    surfaceName: 'Traditional Search Engines',
    surfaceType: 'Search',
    readinessPercentage: 84,
    modeledStatus: 'Modeled',
    evidenceStatus: 'Grounded',
    topConstraint: 'Minor image alt-text microdata gaps',
    testedSignalsCount: 38
  },
  {
    id: 'surf-ai',
    surfaceName: 'AI Search & Answer Engines',
    surfaceType: 'AI',
    readinessPercentage: 76,
    modeledStatus: 'Observed',
    evidenceStatus: 'Partial',
    topConstraint: 'Return policy & cushioning evidence missing; answers penalized for missing guarantees',
    testedSignalsCount: 42
  },
  {
    id: 'surf-feeds',
    surfaceName: 'Commerce Feeds & Marketplaces',
    surfaceType: 'Commerce',
    readinessPercentage: 82,
    modeledStatus: 'Modeled',
    evidenceStatus: 'Grounded',
    topConstraint: 'Variant GTIN arbitration required for 2 colorways',
    testedSignalsCount: 32
  },
  {
    id: 'surf-aixshop',
    surfaceName: 'AIXSHOP Native Discovery',
    surfaceType: 'AIXSHOP',
    readinessPercentage: 74,
    modeledStatus: 'Observed',
    evidenceStatus: 'Grounded',
    topConstraint: 'Multi-seller offer price dispersion requires consumer disclosure tag',
    testedSignalsCount: 48
  }
];

export const sampleDiscoveryTrend: DiscoveryReadinessTrendPoint[] = [
  { period: 'T - 4 Weeks', readinessPercentage: 71, milestoneNote: 'Initial catalog crawl; Schema.org syntax errors flagged on 14 products.' },
  { period: 'T - 3 Weeks', readinessPercentage: 73, milestoneNote: 'Schema.org JSON-LD structured blocks injected and validated via Google Rich Results syntax.' },
  { period: 'T - 2 Weeks', readinessPercentage: 75, milestoneNote: 'Specification coverage enriched; biomechanics attributes converted into structured properties.' },
  { period: 'T - 1 Week', readinessPercentage: 77, milestoneNote: 'Merchant arbitration resolved 2 variant SKU barcode collisions.' },
  { period: 'Representative Current', readinessPercentage: 79, milestoneNote: 'Diagnostic readiness is based on completeness, evidence grounding, variant clarity, and offer clarity.' }
];

export const sampleSourceContributions: SourceCategoryContribution[] = [
  {
    id: 'sc-commerce-platform',
    categoryName: 'Commerce Platform',
    sourcesCount: 2,
    productRecordsCount: 24,
    variantRecordsCount: 68,
    offerObservationsCount: 24,
    evidenceRecordsCount: 78,
    conflictsContributedCount: 1,
    primaryProvider: 'Shopify Storefront REST & GraphQL v2024-07',
    connectionMethod: 'Authorized OAuth'
  },
  {
    id: 'sc-commerce-feed',
    categoryName: 'Commerce Feed',
    sourcesCount: 2,
    productRecordsCount: 24,
    variantRecordsCount: 68,
    offerObservationsCount: 24,
    evidenceRecordsCount: 44,
    conflictsContributedCount: 2,
    primaryProvider: 'Google Merchant Center XML & Custom Feed',
    connectionMethod: 'Structured Feed'
  },
  {
    id: 'sc-structured-source',
    categoryName: 'Structured Source',
    sourcesCount: 2,
    productRecordsCount: 24,
    variantRecordsCount: 68,
    offerObservationsCount: 24,
    evidenceRecordsCount: 86,
    conflictsContributedCount: 1,
    primaryProvider: 'Schema.org / JSON-LD HTML Ingestion',
    connectionMethod: 'Direct HTML / JSON-LD Ingestion'
  },
  {
    id: 'sc-marketplace-source',
    categoryName: 'Marketplace Source',
    sourcesCount: 1,
    productRecordsCount: 24,
    variantRecordsCount: 42,
    offerObservationsCount: 18,
    evidenceRecordsCount: 38,
    conflictsContributedCount: 2,
    primaryProvider: 'Authorized Marketplace Feeds (Amazon/eBay/REI)',
    connectionMethod: 'Authorized Partner API'
  },
  {
    id: 'sc-merchant-verification',
    categoryName: 'Merchant Verification',
    sourcesCount: 1,
    productRecordsCount: 24,
    variantRecordsCount: 68,
    offerObservationsCount: 0,
    evidenceRecordsCount: 28,
    conflictsContributedCount: 0,
    primaryProvider: 'Merchant Operator Attestations & Lab Ground Truth',
    connectionMethod: 'Internal Attestation Portal'
  }
];

export const sampleSourceHealthDimensions: SourceHealthDimensionItem[] = [
  { dimensionName: 'Authorization', status: 'Healthy', description: 'OAuth tokens and API credentials valid with read-only scopes strictly enforced.' },
  { dimensionName: 'Data Availability', status: 'Healthy', description: 'All 8 configured endpoints responded within normal latency tolerances (<450ms).' },
  { dimensionName: 'Schema Compatibility', status: 'Healthy', description: 'Extracted payloads strictly parse against GS1 Web Vocabulary & Schema.org Product specifications.' },
  { dimensionName: 'Catalog Coverage', status: 'Healthy', description: '100% of 24 modeled catalog products mapped across at least 3 active sources.' },
  { dimensionName: 'Observation Freshness', status: 'Healthy', description: 'Active sources observed within the last 14–48 minutes; no stale pipelines detected.' },
  { dimensionName: 'Evidence Continuity', status: 'Needs Attention', description: 'Return policy structured evidence remains missing from primary storefront DOM.' }
];

export const sampleDataQualityFunnel: DataQualityFunnelStage[] = [
  { step: 1, label: 'Sources', count: 8, unit: 'Active Endpoints', description: 'Connected authorized platform APIs, structured XML feeds, and DOM crawlers.' },
  { step: 2, label: 'Raw Observations', count: CANONICAL_TELEMETRY_FUNNEL.rawObservations, unit: 'Raw Signals', description: 'Extracted price nodes, attribute key-values, and variant barcode declarations.', conversionRateFromPrevious: 100 },
  { step: 3, label: 'Normalized Facts', count: CANONICAL_TELEMETRY_FUNNEL.normalizedFacts, unit: 'Structured Records', description: 'Schema-conforming properties aligned with GS1 and Schema.org Product specifications.', conversionRateFromPrevious: 62.5 },
  { step: 4, label: 'Evidence Records', count: CANONICAL_TELEMETRY_FUNNEL.provenanceEvidenceRecords, unit: 'Attested Facts', description: 'Provenanced assertions backed by OBSERVED, DERIVED, or MERCHANT_VERIFIED records.', conversionRateFromPrevious: 80.8 },
  { step: 5, label: 'Resolved Products', count: CANONICAL_TELEMETRY_FUNNEL.resolvedProducts, unit: 'Core Products', description: 'Parent product models successfully unified across distributor and direct channels.', conversionRateFromPrevious: 12.4 },
  { step: 6, label: 'Actionable Issues', count: sampleIssuesMetrics.openIssues, unit: 'Diagnosed Issues', description: 'Anomalies and evidence gaps flagged for deterministic recovery workflows.', conversionRateFromPrevious: 33.3 },
  { step: 7, label: 'Verified Locks', count: CANONICAL_TELEMETRY_FUNNEL.verifiedLocks, unit: 'Locked Attestations', description: 'Authoritative merchant verifications locking ground truth with zero regressions.', conversionRateFromPrevious: 100 }
];

export const sampleTopIntelligenceRisks: TopIntelligenceRiskItem[] = [
  {
    id: 'risk-01',
    dimension: 'Return Policy Evidence',
    impactArchetypes: 'Trust / Purchase',
    evidenceState: 'MISSING',
    severity: 'Critical',
    affectedProductTitle: 'AeroPulse VaporStride Carbon Elite',
    affectedProductId: CANONICAL_PRODUCT_ID,
    issueSummary: 'Zero machine-readable return policy attributes found. Causes AI answer engines to flag checkout terms as unverified.',
    targetPage: 'Page 10',
    targetView: 'issues'
  },
  {
    id: 'risk-02',
    dimension: 'Variant GTIN Conflict',
    impactArchetypes: 'Specification / Comparison / Discovery',
    evidenceState: 'CONFLICT',
    severity: 'Critical',
    affectedProductTitle: 'AeroPulse VaporStride Carbon Elite (Solar Flare, 10.5)',
    affectedProductId: CANONICAL_PRODUCT_ID,
    issueSummary: 'Discrepant 12 vs 13 digit barcodes between Shopify and Google Merchant Center feed disrupts product syndication.',
    targetPage: 'Page 10',
    targetView: 'issues'
  },
  {
    id: 'risk-03',
    dimension: 'Offer Availability Evidence',
    impactArchetypes: 'Purchase',
    evidenceState: 'MISSING',
    severity: 'High',
    affectedProductTitle: 'AeroStride Pulse 2.0',
    affectedProductId: 'prod-aerostride',
    issueSummary: 'Third-party retailer feed lists offer as InStock, but checkout link triggers 7-day fulfillment backorder.',
    targetPage: 'Page 10',
    targetView: 'issues'
  },
  {
    id: 'risk-04',
    dimension: 'Discovery Attribute Coverage',
    impactArchetypes: 'Discovery',
    evidenceState: 'MISSING',
    severity: 'Medium',
    affectedProductTitle: 'StrataMesh Carbon Racer',
    affectedProductId: 'prod-stratamesh',
    issueSummary: 'Upper mesh breathability rating and carbon plate stiffness durometer absent from structured JSON-LD.',
    targetPage: 'Page 03',
    targetView: 'report'
  }
];

export const sampleRepresentativeProductsList: ProductLevelAnalyticsProfile[] = [
  {
    id: CANONICAL_PRODUCT_ID,
    productId: CANONICAL_PRODUCT_ID,
    name: CANONICAL_PRODUCT_NAME,
    productName: CANONICAL_PRODUCT_NAME,
    sku: CANONICAL_PRODUCT_SKU,
    gtin: CANONICAL_PRODUCT_GTIN,
    brand: 'AeroPulse Athletics',
    category: 'Running Footwear / Marathon Racing',
    variantsCount: 3,
    intelligenceCoveragePercentage: 78,
    evidenceCompletenessPercentage: 70,
    evidenceBreakdown: {
      observed: 42,
      derived: 14,
      verified: 8,
      missing: 4,
      conflict: 2
    },
    openIssuesCount: 3,
    issuesCount: 3,
    conflictsCount: 2,
    observedOffersCount: 4,
    discoveryReadinessPercentage: 76,
    topBuyerIntent: 'Specification (92%)',
    weakestBuyerIntent: 'Trust (58%)',
    recentMonitoringEventsCount: 3,
    recoveryStatus: 'Merchant Verification Required',
    primaryRiskNote: 'Return policy evidence missing and colorway GTIN conflict pending operator arbitration.'
  },
  {
    id: 'prod-aerostride',
    productId: 'AP-ASP-002',
    name: 'AeroStride Pulse 2.0',
    productName: 'AeroStride Pulse 2.0',
    sku: 'AP-ASP-002',
    gtin: '0084012398450',
    brand: 'AeroPulse Athletics',
    category: 'Running Footwear / Daily Trainer',
    variantsCount: 4,
    intelligenceCoveragePercentage: 84,
    evidenceCompletenessPercentage: 82,
    evidenceBreakdown: {
      observed: 46,
      derived: 12,
      verified: 10,
      missing: 2,
      conflict: 1
    },
    openIssuesCount: 2,
    issuesCount: 2,
    conflictsCount: 1,
    observedOffersCount: 3,
    discoveryReadinessPercentage: 82,
    topBuyerIntent: 'Comparison (85%)',
    weakestBuyerIntent: 'Use Case (68%)',
    recentMonitoringEventsCount: 2,
    recoveryStatus: 'Validation Required',
    primaryRiskNote: 'Third-party retailer backorder lead-time discrepant with direct store.'
  },
  {
    id: 'prod-stratamesh',
    productId: 'AP-SMR-003',
    name: 'StrataMesh Carbon Racer',
    productName: 'StrataMesh Carbon Racer',
    sku: 'AP-SMR-003',
    gtin: '0084012398481',
    brand: 'AeroPulse Athletics',
    category: 'Road Racing / Ultra-Lightweight',
    variantsCount: 3,
    intelligenceCoveragePercentage: 72,
    evidenceCompletenessPercentage: 66,
    evidenceBreakdown: {
      observed: 38,
      derived: 10,
      verified: 6,
      missing: 6,
      conflict: 1
    },
    openIssuesCount: 2,
    issuesCount: 2,
    conflictsCount: 1,
    observedOffersCount: 2,
    discoveryReadinessPercentage: 74,
    topBuyerIntent: 'Specification (88%)',
    weakestBuyerIntent: 'Problem (54%)',
    recentMonitoringEventsCount: 4,
    recoveryStatus: 'Diagnosing',
    primaryRiskNote: 'Lab spec sheets for carbon plate thickness need re-grounding against physical SKU.'
  },
  {
    id: 'prod-apextrail',
    productId: 'AP-ATG-004',
    name: 'ApexTrail Pro GORE-TEX',
    productName: 'ApexTrail Pro GORE-TEX',
    sku: 'AP-ATG-004',
    gtin: '0084012398511',
    brand: 'AeroPulse Athletics',
    category: 'Trail Running / All-Weather',
    variantsCount: 2,
    intelligenceCoveragePercentage: 86,
    evidenceCompletenessPercentage: 88,
    evidenceBreakdown: {
      observed: 50,
      derived: 16,
      verified: 12,
      missing: 1,
      conflict: 0
    },
    openIssuesCount: 1,
    issuesCount: 1,
    conflictsCount: 0,
    observedOffersCount: 3,
    discoveryReadinessPercentage: 85,
    topBuyerIntent: 'Use Case (89%)',
    weakestBuyerIntent: 'Purchase (72%)',
    recentMonitoringEventsCount: 1,
    recoveryStatus: 'Recovery Proposed',
    primaryRiskNote: 'Waterproof breathability CFM rating confirmed; pricing dispersion across 2 partner stores.'
  }
];

export const sampleAnalyticsInsights: AnalyticsInsightItem[] = [
  {
    id: 'ins-01',
    category: 'Evidence',
    headline: 'Evidence completeness improved after operator attestation',
    explanation: 'Merchant verification of 8 laboratory specification documents increased grounded technical attributes from 64% to 70%.',
    underlyingMetric: '+6% Evidence Completeness (70% Current)',
    stateBadge: 'Observed Milestone'
  },
  {
    id: 'ins-02',
    category: 'Variants',
    headline: 'Variant identity remains the highest-risk unresolved dimension',
    explanation: '2 colorway variations with dual-barcode declarations create syndication drops on Google Merchant Center feeds.',
    underlyingMetric: '2 Variant GTIN Conflicts (Critical)',
    stateBadge: 'Action Required'
  },
  {
    id: 'ins-03',
    category: 'Offers',
    headline: 'Offer coverage increased, but availability evidence remains incomplete',
    explanation: '42 multi-seller offers are mapped across 18 products, but 3 partner retailer feeds fail to specify restock fulfillment intervals.',
    underlyingMetric: '42 Observed Offers / 3 Availability Conflicts',
    stateBadge: 'Diagnostic Status'
  },
  {
    id: 'ins-04',
    category: 'Discovery',
    headline: 'Discovery readiness is constrained by unverified return-policy terms',
    explanation: 'Generative AI search agents down-rank confidence scores when mandatory consumer return guarantees lack explicit schema provenance.',
    underlyingMetric: '79% Discovery Readiness (Trust Intent Gap)',
    stateBadge: 'Discovery Signal'
  }
];

export const sampleExportAnalyticsData: ExportAnalyticsRecord[] = [
  { metric: 'products_analyzed', metric_type: 'count', product_id: 'catalog-all', dimension: 'catalog', value: 24, state: 'modeled', source: 'Shopify Storefront Connector', detected_at: '2026-09-15T00:00:00Z', period: 'representative_period', representative_flag: true, data_state: 'REPRESENTATIVE_PREVIEW' },
  { metric: 'intelligence_coverage', metric_type: 'percentage', product_id: 'catalog-all', dimension: 'overall_intelligence', value: 78.0, state: 'diagnostic', source: 'AIXSHOP Core Normalizer', detected_at: '2026-09-15T00:00:00Z', period: 'representative_period', representative_flag: true, data_state: 'REPRESENTATIVE_PREVIEW' },
  { metric: 'evidence_completeness', metric_type: 'percentage', product_id: 'catalog-all', dimension: 'evidence_grounding', value: 70.0, state: 'diagnostic', source: 'Provenance Validator', detected_at: '2026-09-15T00:00:00Z', period: 'representative_period', representative_flag: true, data_state: 'REPRESENTATIVE_PREVIEW' },
  { metric: 'open_issues', metric_type: 'count', product_id: 'catalog-all', dimension: 'issue_lifecycle', value: 8, state: 'active', source: 'Issue Detection Engine', detected_at: '2026-09-15T00:00:00Z', period: 'representative_period', representative_flag: true, data_state: 'REPRESENTATIVE_PREVIEW' },
  { metric: 'conflicts_total', metric_type: 'count', product_id: 'catalog-all', dimension: 'conflicts', value: 6, state: 'unresolved', source: 'Multi-Source Reconciler', detected_at: '2026-09-15T00:00:00Z', period: 'representative_period', representative_flag: true, data_state: 'REPRESENTATIVE_PREVIEW' },
  { metric: 'recovery_resolution_rate', metric_type: 'percentage', product_id: 'catalog-all', dimension: 'recovery_performance', value: 50.0, state: 'diagnostic', source: 'Recovery Workflow Manager', detected_at: '2026-09-15T00:00:00Z', period: 'representative_period', representative_flag: true, data_state: 'REPRESENTATIVE_PREVIEW' },
  { metric: 'evidence_observed', metric_type: 'count', product_id: 'catalog-all', dimension: 'evidence_states', value: 112, state: 'OBSERVED', source: 'Authorized Feeds & APIs', detected_at: '2026-09-15T00:00:00Z', period: 'representative_period', representative_flag: true, data_state: 'REPRESENTATIVE_PREVIEW' },
  { metric: 'evidence_derived', metric_type: 'count', product_id: 'catalog-all', dimension: 'evidence_states', value: 31, state: 'DERIVED', source: 'Deterministic Computation', detected_at: '2026-09-15T00:00:00Z', period: 'representative_period', representative_flag: true, data_state: 'REPRESENTATIVE_PREVIEW' },
  { metric: 'evidence_merchant_verified', metric_type: 'count', product_id: 'catalog-all', dimension: 'evidence_states', value: 24, state: 'MERCHANT_VERIFIED', source: 'Operator Attestation Portal', detected_at: '2026-09-15T00:00:00Z', period: 'representative_period', representative_flag: true, data_state: 'REPRESENTATIVE_PREVIEW' },
  { metric: 'evidence_missing', metric_type: 'count', product_id: 'catalog-all', dimension: 'evidence_states', value: 17, state: 'MISSING', source: 'Provenance Validator', detected_at: '2026-09-15T00:00:00Z', period: 'representative_period', representative_flag: true, data_state: 'REPRESENTATIVE_PREVIEW' },
  { metric: 'evidence_conflict', metric_type: 'count', product_id: 'catalog-all', dimension: 'evidence_states', value: 6, state: 'CONFLICT', source: 'Multi-Source Reconciler', detected_at: '2026-09-15T00:00:00Z', period: 'representative_period', representative_flag: true, data_state: 'REPRESENTATIVE_PREVIEW' },
  { metric: 'observed_offers_total', metric_type: 'count', product_id: 'catalog-all', dimension: 'commercial_offers', value: 42, state: 'observed', source: 'Storefront & Partner Ingestion', detected_at: '2026-09-15T00:00:00Z', period: 'representative_period', representative_flag: true, data_state: 'REPRESENTATIVE_PREVIEW' },
  { metric: 'products_with_offers', metric_type: 'count', product_id: 'catalog-all', dimension: 'commercial_offers', value: 18, state: 'observed', source: 'Offer Reconciler', detected_at: '2026-09-15T00:00:00Z', period: 'representative_period', representative_flag: true, data_state: 'REPRESENTATIVE_PREVIEW' },
  { metric: 'changes_detected', metric_type: 'count', product_id: 'catalog-all', dimension: 'monitoring', value: 12, state: 'detected', source: 'Continuous Monitoring Pipeline', detected_at: '2026-09-15T00:00:00Z', period: 'representative_period', representative_flag: true, data_state: 'REPRESENTATIVE_PREVIEW' },
  { metric: 'changes_diagnosed_issues', metric_type: 'count', product_id: 'catalog-all', dimension: 'monitoring', value: 8, state: 'actionable', source: 'Diagnosis Classifier', detected_at: '2026-09-15T00:00:00Z', period: 'representative_period', representative_flag: true, data_state: 'REPRESENTATIVE_PREVIEW' },
  { metric: 'discovery_readiness', metric_type: 'percentage', product_id: 'catalog-all', dimension: 'discovery', value: 79.0, state: 'diagnostic', source: 'Discovery Engine Auditor', detected_at: '2026-09-15T00:00:00Z', period: 'representative_period', representative_flag: true, data_state: 'REPRESENTATIVE_PREVIEW' }
];

export const sampleAnalyticsData = {
  summaryKPIs: sampleAnalyticsKPIs,
  coverageProgression: sampleCoverageProgression,
  coverageDimensions: sampleCoverageDimensions,
  evidenceDistribution: sampleEvidenceDistribution,
  evidenceTrend: sampleEvidenceTrend,
  conflicts: sampleConflictAnalytics,
  issueLifecycle: sampleIssueLifecycleDistribution,
  recovery: sampleRecoveryPerformance,
  changeDiagnosis: sampleChangeDiagnosisConversion,
  monitoringCategories: sampleMonitoringCategories,
  offers: sampleOfferAnalytics,
  buyerIntents: sampleBuyerIntentAnalytics,
  intentGaps: sampleIntentGaps,
  discoverySurfaces: sampleDiscoverySurfaces,
  discoveryTrend: sampleDiscoveryTrend,
  sourceContributions: sampleSourceContributions,
  sourceHealth: sampleSourceHealthDimensions,
  dataQualityFunnel: sampleDataQualityFunnel,
  intelligenceRisks: sampleTopIntelligenceRisks,
  productAnalytics: sampleRepresentativeProductsList,
  insights: sampleAnalyticsInsights,
  definitions: sampleMetricDefinitions,
  exportRecords: sampleExportAnalyticsData
};

