// src/data/sampleAdminData.ts
// Canonical representative data for Page 15 — Admin Control Tower & Evidence Console

import {
  CANONICAL_PRODUCT_ID,
  CANONICAL_PRODUCT_GTIN,
  CANONICAL_PRODUCT_MPN,
  CANONICAL_PRODUCT_NAME,
  CANONICAL_TELEMETRY_FUNNEL,
  CANONICAL_SYSTEM_KPIS
} from './canonicalCatalog';
import { sampleIssuesMetrics } from './sampleIssuesData';
import {
  SystemPipelineStage,
  AdminSourceItem,
  AdminEvidenceRecord,
  AdminConflictRecord,
  AdminProductIdentityRecord,
  AdminObservationLedgerItem,
  AdminIssueRecord,
  BuyerIntentArchetypeItem,
  DiscoverySurfaceIntegrityItem,
  RiskRegisterItem,
  AdminAuditTrailItem
} from '../types/admin';

// 1. System Pipeline Stages (11 stages)
export const samplePipelineStages: SystemPipelineStage[] = [
  {
    id: 'source',
    name: 'Source Ingestion',
    shortDesc: 'Multi-source acquisition & rate-controlled pull',
    state: 'OPERATIONAL',
    recordsCount: 4,
    unresolvedCount: 0,
    confidenceScore: 98,
    lastSimulatedEvent: 'Shopify Storefront feed pulled (4m ago)',
    details: {
      description: 'Authorized data connections operating under least-privilege read access.',
      metrics: [
        { label: 'Active Ingestors', value: '4 Authorized' },
        { label: 'Ingestion Mode', value: 'Read-Only Pull' },
        { label: 'Average Ingest Cadence', value: 'Hourly' }
      ],
      governanceRule: 'External sources strictly isolated from write access unless explicitly authorized by merchant.'
    }
  },
  {
    id: 'observation',
    name: 'Observation Ledger',
    shortDesc: 'Raw attribute extractions & drift detection',
    state: 'OPERATIONAL',
    recordsCount: 384,
    unresolvedCount: 3,
    confidenceScore: 94,
    lastSimulatedEvent: 'Detected midsole spec update on RunRepeat (12m ago)',
    details: {
      description: 'Immutable historical record of all detected external attributes and timestamps.',
      metrics: [
        { label: 'Raw Observations', value: '384 points' },
        { label: 'Unprocessed Drift', value: '3 observations' },
        { label: 'Observation Cadence', value: 'Sub-minute' }
      ],
      governanceRule: 'Change does not equal an issue. Observations exist independently before judgment.'
    }
  },
  {
    id: 'normalization',
    name: 'Normalization',
    shortDesc: 'Schema.org & GS1 standard type casting',
    state: 'OPERATIONAL',
    recordsCount: 240,
    unresolvedCount: 1,
    confidenceScore: 96,
    lastSimulatedEvent: 'Normalized weight unit "oz" -> "g" (18m ago)',
    details: {
      description: 'Syntactic transformation of messy units, colors, and sizes into deterministic schemas.',
      metrics: [
        { label: 'Normalized Fields', value: '240 attributes' },
        { label: 'Format Anomalies', value: '1 pending review' },
        { label: 'Unit Schemas', value: 'Metric & Imperial' }
      ],
      governanceRule: 'Normalization preserves original raw strings alongside converted values.'
    }
  },
  {
    id: 'identity',
    name: 'Identity Resolution',
    shortDesc: 'Parent-child variation & GTIN clustering',
    state: 'REVIEW_REQUIRED',
    recordsCount: 92, // 24 products + 68 variants
    unresolvedCount: 1,
    confidenceScore: 89,
    lastSimulatedEvent: 'Variant GTIN disagreement on VaporStride (26m ago)',
    details: {
      description: 'Reconciles multi-source listings into canonical parent products and child variants.',
      metrics: [
        { label: 'Canonical Products', value: '24 Resolved' },
        { label: 'Resolved Variants', value: '68 SKUs' },
        { label: 'Identity Disagreements', value: '1 Critical' }
      ],
      governanceRule: 'Product identity and offer identity remain architecturally independent.'
    }
  },
  {
    id: 'evidence',
    name: 'Evidence Synthesis',
    shortDesc: 'Multi-tier provenance fact validation',
    state: 'OPERATIONAL',
    recordsCount: 194,
    unresolvedCount: 6,
    confidenceScore: 86,
    lastSimulatedEvent: 'Attested drop offset confirmed by brand (35m ago)',
    details: {
      description: 'Assigns verifiable evidence states (Observed, Derived, Merchant Verified, Missing, Conflict).',
      metrics: [
        { label: 'Fact Records', value: '194 records' },
        { label: 'Open Conflicts', value: '6 conflicts' },
        { label: 'Merchant Attested', value: '42 facts' }
      ],
      governanceRule: 'AIXSHOP never invents missing facts to fill empty attribute slots.'
    }
  },
  {
    id: 'intelligence',
    name: 'Product Intelligence',
    shortDesc: 'Canonical product truth model assembly',
    state: 'OPERATIONAL',
    recordsCount: 24,
    unresolvedCount: 2,
    confidenceScore: 91,
    lastSimulatedEvent: 'Canonical graph refresh completed (40m ago)',
    details: {
      description: 'The unified single source of truth for merchant product specifications.',
      metrics: [
        { label: 'Catalog Size', value: '24 Products' },
        { label: 'Intelligence Coverage', value: '78% Complete' },
        { label: 'Evidence Completeness', value: '70% Verified' }
      ],
      governanceRule: 'Every canonical fact must link back to one or more primary evidence records.'
    }
  },
  {
    id: 'discovery',
    name: 'Discovery Readiness',
    shortDesc: 'AI search, LLM & structured feed grounding',
    state: 'OPERATIONAL',
    recordsCount: 4,
    unresolvedCount: 2,
    confidenceScore: 79,
    lastSimulatedEvent: 'Evaluated Google Search schema compliance (48m ago)',
    details: {
      description: 'Assesses whether product intelligence satisfies criteria across 4 discovery surfaces.',
      metrics: [
        { label: 'Surfaces Monitored', value: '4 Canonical' },
        { label: 'Composite Readiness', value: '79% Score' },
        { label: 'Missing Schema Fields', value: '4 Blocks' }
      ],
      governanceRule: 'Discovery readiness evaluates eligibility; it never promises guaranteed search ranking.'
    }
  },
  {
    id: 'monitoring',
    name: 'Continuous Monitoring',
    shortDesc: 'Autonomous drift & price observation scans',
    state: 'OPERATIONAL',
    recordsCount: 42,
    unresolvedCount: 0,
    confidenceScore: 95,
    lastSimulatedEvent: 'Hourly drift scan completed: 0 unexpected shifts (54m ago)',
    details: {
      description: 'Hourly automated scans across authorized feeds detecting silent data drift.',
      metrics: [
        { label: 'Active Watches', value: '24 Products' },
        { label: 'Scanned Dimensions', value: '14 per product' },
        { label: 'Drift Alerts (24h)', value: '12 events' }
      ],
      governanceRule: 'Drift scans operate in read-only telemetry mode without modifying merchant stores.'
    }
  },
  {
    id: 'issues',
    name: 'Issue Governance',
    shortDesc: 'Triage queue for gaps, conflicts & drift',
    state: 'REVIEW_REQUIRED',
    recordsCount: 8,
    unresolvedCount: 8,
    confidenceScore: 82,
    lastSimulatedEvent: 'New high-severity issue: Missing Return Policy (1h ago)',
    details: {
      description: 'Deterministic triage lifecycle: Open -> Diagnosing -> Proposed -> Verification.',
      metrics: [
        { label: 'Open Issues', value: '8 Tracked' },
        { label: 'Critical Severity', value: '1 Item' },
        { label: 'High Severity', value: '3 Items' }
      ],
      governanceRule: 'Issues cannot be closed without verified evidence or explicit merchant attestation.'
    }
  },
  {
    id: 'recovery',
    name: 'Recovery Workflows',
    shortDesc: 'Class A, B & C remediation pipelines',
    state: 'OPERATIONAL',
    recordsCount: 4,
    unresolvedCount: 4,
    confidenceScore: 88,
    lastSimulatedEvent: 'Class A recovery proposal generated for drop offset (1h 10m ago)',
    details: {
      description: 'Class A Deterministic, Class B Evidence-Gated, and Class C Write-Back workflows.',
      metrics: [
        { label: 'Class A Proposals', value: '2 Ready' },
        { label: 'Class B Gated', value: '2 Waiting Evidence' },
        { label: 'Class C Write-Back', value: 'Standby / Preview' }
      ],
      governanceRule: 'External write-back strictly requires explicit merchant authorization and connection.'
    }
  },
  {
    id: 'verification',
    name: 'Attestation & Truth Lock',
    shortDesc: 'Immutable merchant verification checkpoint',
    state: 'OPERATIONAL',
    recordsCount: 42,
    unresolvedCount: 0,
    confidenceScore: 99,
    lastSimulatedEvent: 'Merchant verified carbon plate construction specs (1h 30m ago)',
    details: {
      description: 'The highest tier in the authority hierarchy: merchant ground-truth attestation.',
      metrics: [
        { label: 'Verified Facts', value: '42 records' },
        { label: 'Attestation Log', value: 'Immutable' },
        { label: 'Authority Rank', value: 'Tier 1' }
      ],
      governanceRule: 'Merchant verification overrides lower-tier feeds but remains subject to audit.'
    }
  }
];

// 2. Source Registry (Admin counterpart to Page 12)
export const sampleAdminSources: AdminSourceItem[] = [
  {
    id: 'SRC-SHOPIFY-01',
    name: 'Shopify Storefront Connector',
    category: 'First-Party Storefront',
    acquisitionMethod: 'Direct API Webhook',
    permissionModel: 'Read-Only (Least Privilege)',
    coverage: '24 Products / 68 Variants',
    evidenceContribution: 96,
    health: 'Healthy · Preview',
    freshness: 'Synchronized (4m ago)',
    lastObservation: '2026-09-15T09:12:00Z',
    state: 'Active',
    defaultAuthorityLevel: 2 // Official Brand / Authorized Source
  },
  {
    id: 'SRC-GMC-02',
    name: 'Google Merchant Center Primary Feed',
    category: 'Syndicated Merchant Feed',
    acquisitionMethod: 'Scheduled Feed Pull',
    permissionModel: 'Read-Only (Least Privilege)',
    coverage: '24 Products (Shopping Spec)',
    evidenceContribution: 48,
    health: 'Review Required · Preview',
    freshness: 'Updated 2h ago',
    lastObservation: '2026-09-15T07:22:00Z',
    state: 'Under Review',
    defaultAuthorityLevel: 3 // Structured Commerce Feed
  },
  {
    id: 'SRC-SCHEMA-03',
    name: 'Schema.org JSON-LD Microdata Ingestor',
    category: 'Structured Web Markup',
    acquisitionMethod: 'Headless Microdata Crawl',
    permissionModel: 'Public Read-Only',
    coverage: '18 Observed Offers',
    evidenceContribution: 32,
    health: 'Synchronized · Preview',
    freshness: 'Scanned 1h ago',
    lastObservation: '2026-09-15T08:05:00Z',
    state: 'Active',
    defaultAuthorityLevel: 5 // Permitted Public Observation
  },
  {
    id: 'SRC-VERIFIED-04',
    name: 'Merchant Attestation & Ground Truth',
    category: 'Merchant Ground Truth',
    acquisitionMethod: 'Merchant Attestation',
    permissionModel: 'Verified Attestation',
    coverage: 'Core Technical Specifications',
    evidenceContribution: 18,
    health: 'Healthy · Preview',
    freshness: 'Manual Verification',
    lastObservation: '2026-09-14T18:40:00Z',
    state: 'Active',
    defaultAuthorityLevel: 1 // Merchant Verified / Ground Truth
  }
];

// 3. Control-Tower KPI Metrics (derived from canonical catalog & telemetry truth)
export const sampleControlTowerKPIs = {
  merchantsObserved: '1 Representative',
  merchantName: 'AeroPulse Athletics, Inc.',
  productsInGraph: `${CANONICAL_SYSTEM_KPIS.totalCatalogProducts} Canonical`,
  activeSources: `${sampleAdminSources.length} Authorized`,
  evidenceRecords: `${CANONICAL_TELEMETRY_FUNNEL.provenanceEvidenceRecords} Provenance`,
  openConflicts: `${CANONICAL_SYSTEM_KPIS.totalPreservedConflicts} Preserved`,
  openIssues: `${sampleIssuesMetrics.openIssues} Triage`,
  recoveryWorkflows: `${sampleIssuesMetrics.recoveryEligible} Workflows`,
  evidenceBlockedItems: `${sampleIssuesMetrics.evidenceBlocked} Blocked`
};

// 4. Source Authority Hierarchy (Contextual)
export const sourceAuthorityTiers = [
  {
    level: 1,
    title: 'Merchant Verified / Ground Truth',
    authority: 'Highest Authority (Tier 1)',
    description: 'Direct attestations by authorized merchant product managers. Outranks external scrapers and synthetic inferences.',
    example: 'Exact drop offset confirmed with factory engineering specs.'
  },
  {
    level: 2,
    title: 'Official Brand / Authorized Storefront',
    authority: 'High Authority (Tier 2)',
    description: 'First-party ERP or primary ecommerce storefront data directly published by brand owner.',
    example: 'Shopify product title, parent SKU, and official MSRP.'
  },
  {
    level: 3,
    title: 'Structured Commerce Feed (GMC, GS1)',
    authority: 'Structured Feed (Tier 3)',
    description: 'Standardized feeds formatted for search aggregators. Authoritative for barcoding and categorization.',
    example: 'Google Merchant Center feed containing GTIN-13 and shipping weights.'
  },
  {
    level: 4,
    title: 'Authorized Marketplace Source',
    authority: 'Channel Authority (Tier 4)',
    description: 'Authorized retailer listings (e.g. REI, Fleet Feet). Highly authoritative for seller-specific prices and stock.',
    example: 'Retail partner inventory status and promo discounts.'
  },
  {
    level: 5,
    title: 'Permitted Public Observation',
    authority: 'Observational Authority (Tier 5)',
    description: 'Public Schema.org microdata, independent lab reviews (e.g. RunRepeat). Useful for third-party consensus.',
    example: 'Independent durometer foam hardness measurements.'
  },
  {
    level: 6,
    title: 'Derived Intelligence',
    authority: 'Inference Authority (Tier 6)',
    description: 'Computed values, synthetic buyer query alignments, and normalized metrics. Lowest raw evidence rank.',
    example: 'Calculated shoe stack height difference or buyer intent tag.'
  }
];

// 5. Representative Evidence Records (for Evidence Console)
export const sampleAdminEvidenceRecords: AdminEvidenceRecord[] = [
  {
    id: 'EVD-9841',
    productId: CANONICAL_PRODUCT_ID,
    productName: 'AeroPulse VaporStride Carbon Elite',
    attribute: 'Heel-to-Toe Drop',
    value: '8 mm',
    sourceId: 'SRC-VERIFIED-04',
    sourceName: 'Merchant Ground Truth',
    detectedAt: '2026-09-14 18:40 UTC',
    validUntil: '2027-09-14 UTC',
    confidence: 99,
    state: 'MERCHANT_VERIFIED',
    authorityLevel: 1,
    authorityReason: 'Attested by AeroPulse head of footwear engineering.',
    lastChange: 'Upgraded from OBSERVED to MERCHANT_VERIFIED',
    confidenceReason: 'Zero conflicting first-party claims; corroborated by technical spec sheet.',
    changeHistory: [
      { timestamp: '2026-09-12 10:00 UTC', previousValue: 'Unstated', newValue: '10 mm (Third-Party Feed)', source: 'SRC-GMC-02', trigger: 'Initial feed sync' },
      { timestamp: '2026-09-14 18:40 UTC', previousValue: '10 mm', newValue: '8 mm', source: 'SRC-VERIFIED-04', trigger: 'Merchant arbitration' }
    ],
    relatedBuyerIntents: ['Comparison', 'Specification'],
    relatedDiscoverySurfaces: ['AI Search / Answer Engines', 'Traditional Search']
  },
  {
    id: 'EVD-9842',
    productId: CANONICAL_PRODUCT_ID,
    productName: 'AeroPulse VaporStride Carbon Elite',
    attribute: 'Product Weight (Men US 9)',
    value: '198 g',
    sourceId: 'SRC-SHOPIFY-01',
    sourceName: 'Shopify Storefront',
    detectedAt: '2026-09-15 08:30 UTC',
    validUntil: '2026-12-31 UTC',
    confidence: 92,
    state: 'OBSERVED',
    authorityLevel: 2,
    authorityReason: 'Official direct brand storefront attribute.',
    lastChange: 'Re-verified during scheduled hourly sync',
    confidenceReason: 'Consistent across last 14 hourly observations.',
    changeHistory: [
      { timestamp: '2026-09-10 12:00 UTC', previousValue: '205 g', newValue: '198 g', source: 'SRC-SHOPIFY-01', trigger: 'Catalog revision' }
    ],
    relatedBuyerIntents: ['Comparison', 'Specification', 'Use Case'],
    relatedDiscoverySurfaces: ['Traditional Search', 'AI Search / Answer Engines']
  },
  {
    id: 'EVD-9843',
    productId: CANONICAL_PRODUCT_ID,
    productName: 'AeroPulse VaporStride Carbon Elite',
    attribute: 'Cushioning Classification',
    value: 'Maximum Responsive',
    sourceId: 'DERIVED-SYS',
    sourceName: 'AIXSHOP Derived Engine',
    detectedAt: '2026-09-15 04:12 UTC',
    validUntil: '2027-01-01 UTC',
    confidence: 84,
    state: 'DERIVED',
    authorityLevel: 6,
    authorityReason: 'Deterministic synthesis of stack height (39.5mm) and PEBA foam composition.',
    lastChange: 'Derived from stack measurements',
    confidenceReason: 'Derived via rule: Stack > 36mm + PEBA = Maximum Responsive.',
    changeHistory: [
      { timestamp: '2026-09-15 04:12 UTC', previousValue: 'Moderate', newValue: 'Maximum Responsive', source: 'DERIVED-SYS', trigger: 'Rule re-evaluation' }
    ],
    relatedBuyerIntents: ['Discovery', 'Problem', 'Comparison'],
    relatedDiscoverySurfaces: ['AI Search / Answer Engines', 'AIXSHOP Native Discovery']
  },
  {
    id: 'EVD-9844',
    productId: CANONICAL_PRODUCT_ID,
    productName: 'AeroPulse VaporStride Carbon Elite',
    attribute: 'GTIN-13 Barcode',
    value: '0840128491024 vs 0840128491099',
    sourceId: 'SRC-GMC-02',
    sourceName: 'Google Merchant Feed',
    detectedAt: '2026-09-15 07:22 UTC',
    validUntil: 'Urgent Action Required',
    confidence: 45,
    state: 'CONFLICT',
    authorityLevel: 3,
    authorityReason: 'Third-party syndication feed disagrees with first-party Shopify variant barcode.',
    lastChange: 'Conflict flagged by Identity Resolution engine',
    confidenceReason: 'Two conflicting authoritative feeds submitted incompatible barcodes for Size 10.5.',
    conflictId: 'CONF-001',
    changeHistory: [
      { timestamp: '2026-09-15 07:22 UTC', previousValue: '0840128491024', newValue: 'Disagreement detected', source: 'SRC-GMC-02', trigger: 'Barcode audit' }
    ],
    relatedBuyerIntents: ['Purchase', 'Specification'],
    relatedDiscoverySurfaces: ['Commerce Feeds / Marketplaces', 'Traditional Search']
  },
  {
    id: 'EVD-9845',
    productId: CANONICAL_PRODUCT_ID,
    productName: 'AeroPulse VaporStride Carbon Elite',
    attribute: 'Merchant Return Policy Window',
    value: 'Missing / Unspecified in Feed',
    sourceId: 'SRC-GMC-02',
    sourceName: 'Google Merchant Feed',
    detectedAt: '2026-09-15 02:00 UTC',
    validUntil: 'Pending Ingestion',
    confidence: 10,
    state: 'MISSING',
    authorityLevel: 3,
    authorityReason: 'Return window field is empty in structured schema.',
    lastChange: 'Flagged missing by Discovery audit',
    confidenceReason: 'Google Merchant feed lacks shippingDetails and returnFees fields.',
    changeHistory: [
      { timestamp: '2026-09-15 02:00 UTC', previousValue: 'None', newValue: 'Missing', source: 'SRC-GMC-02', trigger: 'Field check' }
    ],
    relatedBuyerIntents: ['Purchase', 'Trust'],
    relatedDiscoverySurfaces: ['Commerce Feeds / Marketplaces', 'Traditional Search']
  },
  {
    id: 'EVD-9846',
    productId: 'aix-prod-849201948450',
    productName: 'AeroPulse Horizon Trail Hydro',
    attribute: 'Waterproofing Membrane',
    value: 'eVent Bio-based 20k mm',
    sourceId: 'SRC-SHOPIFY-01',
    sourceName: 'Shopify Storefront',
    detectedAt: '2026-09-14 20:10 UTC',
    validUntil: '2027-01-01 UTC',
    confidence: 95,
    state: 'OBSERVED',
    authorityLevel: 2,
    authorityReason: 'Primary product description specification.',
    lastChange: 'Verified in Shopify sync',
    confidenceReason: 'Extracted from bulleted technical specs.',
    changeHistory: [],
    relatedBuyerIntents: ['Discovery', 'Specification', 'Use Case'],
    relatedDiscoverySurfaces: ['Traditional Search', 'AI Search / Answer Engines']
  },
  {
    id: 'EVD-9847',
    productId: 'aix-prod-849201948450',
    productName: 'AeroPulse Horizon Trail Hydro',
    attribute: 'Lug Depth Specification',
    value: '5 mm vs 6.5 mm',
    sourceId: 'SRC-SCHEMA-03',
    sourceName: 'RunRepeat Lab Microdata',
    detectedAt: '2026-09-15 06:15 UTC',
    validUntil: 'Conflict Active',
    confidence: 50,
    state: 'CONFLICT',
    authorityLevel: 5,
    authorityReason: 'Independent lab physical measurement differs from brand marketing copy.',
    lastChange: 'New measurement detected',
    confidenceReason: 'RunRepeat caliper reading indicates 6.5mm perimeter lugs vs 5mm center lugs.',
    conflictId: 'CONF-002',
    changeHistory: [],
    relatedBuyerIntents: ['Comparison', 'Specification'],
    relatedDiscoverySurfaces: ['AI Search / Answer Engines']
  },
  {
    id: 'EVD-9848',
    productId: 'aix-prod-849201948731',
    productName: 'AeroPulse AeroVent Seamless Singlet',
    attribute: 'Fabric Composition',
    value: '84% Recycled Poly / 16% Elastane',
    sourceId: 'SRC-VERIFIED-04',
    sourceName: 'Merchant Ground Truth',
    detectedAt: '2026-09-13 14:00 UTC',
    validUntil: '2027-06-30 UTC',
    confidence: 99,
    state: 'MERCHANT_VERIFIED',
    authorityLevel: 1,
    authorityReason: 'Care label bill-of-materials attestation by merchant.',
    lastChange: 'Attested by AeroPulse QA',
    confidenceReason: 'Direct manufacturer compliance audit certificate.',
    changeHistory: [],
    relatedBuyerIntents: ['Specification', 'Trust'],
    relatedDiscoverySurfaces: ['Traditional Search', 'AI Search / Answer Engines']
  }
];

// 6. Conflict Records (6 Canonical Open Conflicts)
export const sampleAdminConflicts: AdminConflictRecord[] = [
  {
    id: 'CONF-001',
    category: 'GTIN/MPN Conflict',
    productId: CANONICAL_PRODUCT_ID,
    productName: 'AeroPulse VaporStride Carbon Elite',
    attribute: 'GTIN-13 Barcode (Size 10.5 / Neon Frost)',
    sourceA: {
      name: 'Shopify Storefront Connector',
      value: '0840128491024',
      timestamp: '2026-09-15 08:30 UTC',
      authorityLevel: 2,
      confidence: 92
    },
    sourceB: {
      name: 'Google Merchant Center Primary Feed',
      value: '0840128491099',
      timestamp: '2026-09-15 07:22 UTC',
      authorityLevel: 3,
      confidence: 88
    },
    affectedBuyerIntents: ['Purchase', 'Specification'],
    affectedDiscoverySurfaces: ['Commerce Feeds / Marketplaces', 'Traditional Search'],
    resolutionState: 'Preserved · Unresolved',
    whyNotAutoMerged: 'Barcodes are strictly deterministic cryptographic identifiers. Guessing or averaging barcodes causes catalog rejection in Google Shopping.'
  },
  {
    id: 'CONF-002',
    category: 'Product Attribute Conflict',
    productId: 'aix-prod-849201948450',
    productName: 'AeroPulse Horizon Trail Hydro',
    attribute: 'Outsole Lug Depth',
    sourceA: {
      name: 'Official Shopify Product Spec',
      value: '5.0 mm uniform',
      timestamp: '2026-09-14 20:10 UTC',
      authorityLevel: 2,
      confidence: 90
    },
    sourceB: {
      name: 'RunRepeat Lab Microdata Observation',
      value: '6.5 mm perimeter / 4.8 mm center',
      timestamp: '2026-09-15 06:15 UTC',
      authorityLevel: 5,
      confidence: 85
    },
    affectedBuyerIntents: ['Comparison', 'Specification'],
    affectedDiscoverySurfaces: ['AI Search / Answer Engines'],
    resolutionState: 'Awaiting Merchant Attestation',
    whyNotAutoMerged: 'Technical specification discrepancy between marketing copy and physical lab dissection. Requires merchant clarification.'
  },
  {
    id: 'CONF-003',
    category: 'Variant Identity Conflict',
    productId: CANONICAL_PRODUCT_ID,
    productName: 'AeroPulse VaporStride Carbon Elite',
    attribute: 'Colorway Name vs Hex Mapping',
    sourceA: {
      name: 'Shopify Storefront',
      value: 'Solar Flare / Obsidian (#FF4500)',
      timestamp: '2026-09-15 08:30 UTC',
      authorityLevel: 2,
      confidence: 94
    },
    sourceB: {
      name: 'Syndicated Partner Catalog (Fleet Feet)',
      value: 'Orange / Dark Navy (#E63900)',
      timestamp: '2026-09-15 05:00 UTC',
      authorityLevel: 4,
      confidence: 82
    },
    affectedBuyerIntents: ['Discovery', 'Purchase'],
    affectedDiscoverySurfaces: ['Commerce Feeds / Marketplaces', 'Traditional Search'],
    resolutionState: 'Deterministic Arbitration Blocked',
    whyNotAutoMerged: 'Retail partners often normalize custom marketing colorways into generic buckets. Preserved as separate alias.'
  },
  {
    id: 'CONF-004',
    category: 'Offer Price Conflict',
    productId: CANONICAL_PRODUCT_ID,
    productName: 'AeroPulse VaporStride Carbon Elite',
    attribute: 'Current Selling Price (Authorized Channel)',
    sourceA: {
      name: 'Official D2C Store',
      value: '$250.00 USD (Firm MSRP)',
      timestamp: '2026-09-15 09:00 UTC',
      authorityLevel: 2,
      confidence: 99
    },
    sourceB: {
      name: 'Authorized Running Warehouse Listing',
      value: '$219.95 USD (Member Discount)',
      timestamp: '2026-09-15 08:45 UTC',
      authorityLevel: 4,
      confidence: 95
    },
    affectedBuyerIntents: ['Purchase', 'Comparison'],
    affectedDiscoverySurfaces: ['Commerce Feeds / Marketplaces', 'AIXSHOP Native Discovery'],
    resolutionState: 'Preserved · Unresolved',
    whyNotAutoMerged: 'Architectural separation: Prices belong to seller offers, not the permanent product specification. Both offers are kept distinct.'
  },
  {
    id: 'CONF-005',
    category: 'Availability Conflict',
    productId: 'aix-prod-849201948762',
    productName: 'AeroPulse StrataShield Windbreaker',
    attribute: 'Stock Availability (Size L / Black)',
    sourceA: {
      name: 'Shopify Inventory API',
      value: 'In Stock (Qty: 14)',
      timestamp: '2026-09-15 09:10 UTC',
      authorityLevel: 2,
      confidence: 98
    },
    sourceB: {
      name: 'Google Merchant Feed Cache',
      value: 'Out of Stock (Cached 6h ago)',
      timestamp: '2026-09-15 03:00 UTC',
      authorityLevel: 3,
      confidence: 60
    },
    affectedBuyerIntents: ['Purchase'],
    affectedDiscoverySurfaces: ['Commerce Feeds / Marketplaces'],
    resolutionState: 'Awaiting Merchant Attestation',
    whyNotAutoMerged: 'Stale feed latency. Ingestion freshness rule flags Google Merchant Center cache as out-of-date compared to live webhook.'
  },
  {
    id: 'CONF-006',
    category: 'Discovery Attribute Conflict',
    productId: CANONICAL_PRODUCT_ID,
    productName: 'AeroPulse VaporStride Carbon Elite',
    attribute: 'Target Buyer Pronation Profile',
    sourceA: {
      name: 'Brand Marketing Tagline',
      value: 'Neutral to Mild Overpronation',
      timestamp: '2026-09-14 12:00 UTC',
      authorityLevel: 2,
      confidence: 85
    },
    sourceB: {
      name: 'Expert Runner Consensus Review',
      value: 'Strictly Neutral (Narrow Midfoot)',
      timestamp: '2026-09-15 01:00 UTC',
      authorityLevel: 5,
      confidence: 88
    },
    affectedBuyerIntents: ['Problem', 'Comparison', 'Use Case'],
    affectedDiscoverySurfaces: ['AI Search / Answer Engines'],
    resolutionState: 'Preserved · Unresolved',
    whyNotAutoMerged: 'Subjective biomechanical classification. AIXSHOP surfaces the nuanced stability boundary rather than declaring false universality.'
  }
];

// 7. Product Identity Resolution Records
export const sampleAdminIdentities: AdminProductIdentityRecord[] = [
  {
    id: 'ID-01',
    canonicalId: CANONICAL_PRODUCT_ID,
    productName: CANONICAL_PRODUCT_NAME,
    brand: 'AeroPulse',
    mpn: CANONICAL_PRODUCT_MPN,
    gtin: CANONICAL_PRODUCT_GTIN,
    variantCount: 12,
    status: 'Review Required',
    confidence: 88,
    statusReason: 'Size 10.5 child SKU has conflicting GTIN-13 in Google Merchant Center feed.',
    variants: [
      { variantId: 'VAR-01', sku: 'AP-VS-M90-W', size: 'US 9.0', color: 'White / Cyan', gtinAgreement: true },
      { variantId: 'VAR-02', sku: 'AP-VS-M95-W', size: 'US 9.5', color: 'White / Cyan', gtinAgreement: true },
      { variantId: 'VAR-03', sku: 'AP-VS-M100-W', size: 'US 10.0', color: 'White / Cyan', gtinAgreement: true },
      { variantId: 'VAR-04', sku: 'AP-VS-M105-W', size: 'US 10.5', color: 'White / Cyan', gtinAgreement: false }
    ]
  },
  {
    id: 'ID-02',
    canonicalId: 'AER-TRL-002',
    productName: 'AeroPulse TrailBlazer Ultra Peak',
    brand: 'AeroPulse',
    mpn: 'AP-TB-U88',
    gtin: '0840128492000',
    variantCount: 8,
    status: 'Resolved',
    confidence: 97,
    statusReason: 'All 8 variants reconciled with zero barcode or MPN collisions across sources.',
    variants: [
      { variantId: 'VAR-05', sku: 'AP-TB-M90-O', size: 'US 9.0', color: 'Earth / Rust', gtinAgreement: true },
      { variantId: 'VAR-06', sku: 'AP-TB-M95-O', size: 'US 9.5', color: 'Earth / Rust', gtinAgreement: true }
    ]
  },
  {
    id: 'ID-03',
    canonicalId: 'AER-SNG-003',
    productName: 'AeroPulse AeroVent Seamless Singlet',
    brand: 'AeroPulse',
    mpn: 'AP-AV-S77',
    gtin: '0840128493000',
    variantCount: 6,
    status: 'Resolved',
    confidence: 99,
    statusReason: 'First-party Shopify and GS1 records align with 100% attribute parity.',
    variants: [
      { variantId: 'VAR-07', sku: 'AP-AV-S-BLK', size: 'S', color: 'Deep Black', gtinAgreement: true },
      { variantId: 'VAR-08', sku: 'AP-AV-M-BLK', size: 'M', color: 'Deep Black', gtinAgreement: true }
    ]
  }
];

// 8. Observation Ledger Items (showing Change != Issue)
export const sampleAdminObservations: AdminObservationLedgerItem[] = [
  {
    id: 'OBS-4819',
    timestamp: '2026-09-15 09:12 UTC',
    source: 'Shopify Storefront Connector',
    entity: 'AeroPulse VaporStride Carbon Elite',
    observation: 'Weight attribute updated in product metadata',
    previousValue: '205 g',
    newValue: '198 g',
    evidenceState: 'OBSERVED',
    impact: 'Benign',
    isIssueTriggered: false,
    status: 'Logged'
  },
  {
    id: 'OBS-4820',
    timestamp: '2026-09-15 08:45 UTC',
    source: 'Running Warehouse Listing Monitor',
    entity: 'AeroPulse VaporStride Carbon Elite',
    observation: 'Observed market offer price reduced',
    previousValue: '$249.95 USD',
    newValue: '$219.95 USD',
    evidenceState: 'OBSERVED',
    impact: 'Medium',
    isIssueTriggered: false, // Offer change is natural market activity, not a defect
    status: 'Monitored'
  },
  {
    id: 'OBS-4821',
    timestamp: '2026-09-15 07:22 UTC',
    source: 'Google Merchant Center Feed',
    entity: 'AeroPulse VaporStride (Size 10.5)',
    observation: 'Barcode mismatch detected during feed audit',
    previousValue: '0840128491024',
    newValue: '0840128491099',
    evidenceState: 'CONFLICT',
    impact: 'Critical',
    isIssueTriggered: true, // Becomes Issue #1
    status: 'Triaged'
  },
  {
    id: 'OBS-4822',
    timestamp: '2026-09-15 06:15 UTC',
    source: 'RunRepeat Lab Microdata Ingestor',
    entity: 'AeroPulse TrailBlazer Ultra Peak',
    observation: 'Independent outsole caliper measurement recorded',
    previousValue: '5.0 mm',
    newValue: '6.5 mm (Perimeter)',
    evidenceState: 'CONFLICT',
    impact: 'High',
    isIssueTriggered: true, // Becomes Issue #2
    status: 'Triaged'
  },
  {
    id: 'OBS-4823',
    timestamp: '2026-09-15 02:00 UTC',
    source: 'Google Merchant Center Feed Audit',
    entity: 'AeroPulse VaporStride Carbon Elite',
    observation: 'Return policy window schema missing from feed payload',
    previousValue: '30 Days (Merchant Site)',
    newValue: 'Empty / Null',
    evidenceState: 'MISSING',
    impact: 'High',
    isIssueTriggered: true, // Becomes Issue #3
    status: 'Triaged'
  },
  {
    id: 'OBS-4824',
    timestamp: '2026-09-14 18:40 UTC',
    source: 'Merchant Attestation Console',
    entity: 'AeroPulse VaporStride Carbon Elite',
    observation: 'Factory engineering drop offset verified by brand manager',
    previousValue: '10 mm (Third-party)',
    newValue: '8.0 mm (Official Fact)',
    evidenceState: 'MERCHANT_VERIFIED',
    impact: 'Low',
    isIssueTriggered: false, // Truth resolution event
    status: 'Logged'
  }
];

// 9. Intelligence Issues (8 Canonical Issues)
export const sampleAdminIssues: AdminIssueRecord[] = [
  {
    id: 'ISSUE-01',
    title: 'Variant GTIN-13 Barcode Collision (Size 10.5)',
    productId: CANONICAL_PRODUCT_ID,
    productName: 'AeroPulse VaporStride Carbon Elite',
    severity: 'Critical',
    rootCause: 'Google Merchant Feed has legacy barcode payload while Shopify contains updated GS1 barcode.',
    evidenceState: 'CONFLICT',
    buyerImpact: 'Search feed rejection and failed 1-click cart fulfillment.',
    recoveryEligibility: 'Eligible',
    recoveryClass: 'CLASS_A_DETERMINISTIC',
    currentState: 'Validation Required'
  },
  {
    id: 'ISSUE-02',
    title: 'Outsole Lug Depth Marketing vs Lab Discrepancy',
    productId: 'aix-prod-849201948450',
    productName: 'AeroPulse Horizon Trail Hydro',
    severity: 'High',
    rootCause: 'Brand copy lists 5mm; independent lab measured 6.5mm on perimeter lugs.',
    evidenceState: 'CONFLICT',
    buyerImpact: 'Misleading technical answers on trail grip and rocky terrain suitability.',
    recoveryEligibility: 'Evidence-Gated',
    recoveryClass: 'CLASS_B_EVIDENCE_GATED',
    currentState: 'Diagnosing'
  },
  {
    id: 'ISSUE-03',
    title: 'Missing Structured Return Policy in Feed Payload',
    productId: CANONICAL_PRODUCT_ID,
    productName: 'AeroPulse VaporStride Carbon Elite',
    severity: 'High',
    rootCause: 'Schema.org merchantReturnDays microdata omitted during Shopify feed export.',
    evidenceState: 'MISSING',
    buyerImpact: 'AI purchase assistants refuse to recommend shoe due to unknown return terms.',
    recoveryEligibility: 'Eligible',
    recoveryClass: 'CLASS_A_DETERMINISTIC',
    currentState: 'Recovery Proposed'
  },
  {
    id: 'ISSUE-04',
    title: 'Fabric Composition Missing Recycled Content Ratio',
    productId: 'aix-prod-849201948731',
    productName: 'AeroPulse AeroVent Seamless Singlet',
    severity: 'Medium',
    rootCause: 'Feed contains generic "Synthetic Blend" instead of full GRS-certified breakdown.',
    evidenceState: 'MISSING',
    buyerImpact: 'Shoppers querying "sustainable recycled running singlet" cannot discover product.',
    recoveryEligibility: 'Eligible',
    recoveryClass: 'CLASS_A_DETERMINISTIC',
    currentState: 'Merchant Verification'
  },
  {
    id: 'ISSUE-05',
    title: 'Discontinued Colorway Listed in Partner Cache',
    productId: CANONICAL_PRODUCT_ID,
    productName: 'AeroPulse VaporStride Carbon Elite',
    severity: 'Medium',
    rootCause: 'Fleet Feet feed still serves "Neon Volt" which was retired in Season 2.',
    evidenceState: 'OBSERVED',
    buyerImpact: 'Ghost traffic driving shoppers to out-of-stock dealer pages.',
    recoveryEligibility: 'Evidence-Gated',
    recoveryClass: 'CLASS_B_EVIDENCE_GATED',
    currentState: 'Open'
  },
  {
    id: 'ISSUE-06',
    title: 'Pronation Stability Boundary Ambiguity',
    productId: CANONICAL_PRODUCT_ID,
    productName: 'AeroPulse VaporStride Carbon Elite',
    severity: 'Medium',
    rootCause: 'Marketing copy claims neutral-to-stability; biomechanics dictate strictly neutral.',
    evidenceState: 'CONFLICT',
    buyerImpact: 'Overpronating runners experience stability issues, increasing return rates.',
    recoveryEligibility: 'Evidence-Gated',
    recoveryClass: 'CLASS_B_EVIDENCE_GATED',
    currentState: 'Diagnosing'
  },
  {
    id: 'ISSUE-07',
    title: 'Weight Unit Disparity (Ounces vs Grams)',
    productId: 'aix-prod-849201948762',
    productName: 'AeroPulse StrataShield Windbreaker',
    severity: 'Low',
    rootCause: 'Syndicated feed exports imperial 5.2 oz while D2C site uses metric 148 g.',
    evidenceState: 'DERIVED',
    buyerImpact: 'Minor comparison sorting inaccuracies in metric shopping locales.',
    recoveryEligibility: 'Eligible',
    recoveryClass: 'CLASS_A_DETERMINISTIC',
    currentState: 'Recovery Proposed'
  },
  {
    id: 'ISSUE-08',
    title: 'Product Image Aspect Ratio Warning on GMC',
    productId: 'aix-prod-849201948512',
    productName: 'AeroPulse HydroVest 10L Pro',
    severity: 'Low',
    rootCause: 'Lifestyle hero image submitted instead of white-background product render.',
    evidenceState: 'OBSERVED',
    buyerImpact: 'Suppressed thumbnail ranking on Google Free Listings carousel.',
    recoveryEligibility: 'Manual-Only',
    recoveryClass: 'CLASS_C_EXTERNAL_WRITEBACK',
    currentState: 'Open'
  }
];

// Recovery Governance Classes configuration
export const recoveryClassGovernance = [
  {
    class: 'CLASS_A',
    name: 'Class A: Deterministic Rule Correction',
    activeCount: 4,
    permissionRequirement: 'Deterministic System Resolution',
    description: 'Unit conversion standardizations, unambiguous barcode GTIN-14 padding, and schema markup syntax formatting.',
    executionMechanism: 'Automated Rule Execution'
  },
  {
    class: 'CLASS_B',
    name: 'Class B: Evidence-Gated Merchant Attestation',
    activeCount: 3,
    permissionRequirement: 'Merchant Sign-Off Gate',
    description: 'Direct factual claims where external source disagreements require primary brand manager attestation.',
    executionMechanism: 'Attestation Workflow'
  },
  {
    class: 'CLASS_C',
    name: 'Class C: External Write-Back & Schema Deployment',
    activeCount: 1,
    permissionRequirement: 'Store Owner Scope & Token Verification',
    description: 'Mutating third-party merchant catalogs, modifying live storefront APIs, or pushing Google Merchant feeds.',
    executionMechanism: 'Admin Boundary Gate'
  }
];

// 10. Buyer Intent Archetypes (All 7 archetypes fully represented)
export const sampleBuyerIntentArchetypes: BuyerIntentArchetypeItem[] = [
  {
    archetypeNumber: 1,
    name: 'Discovery Intent',
    question: '"What are the best carbon-plated marathon race shoes with 8mm drop?"',
    evidenceDependencies: ['Plated Construction', 'Heel-to-Toe Drop', 'Intended Surface', 'Weight'],
    coveragePercentage: 86,
    missingEvidenceCount: 1,
    conflictsCount: 1,
    affectedProductsCount: 24
  },
  {
    archetypeNumber: 2,
    name: 'Problem Solving Intent',
    question: '"Will this shoe aggravate plantar fasciitis or Achilles tightness?"',
    evidenceDependencies: ['Drop Offset', 'Forefoot Rocker Radius', 'Arch Support Type', 'Foam Firmness'],
    coveragePercentage: 74,
    missingEvidenceCount: 2,
    conflictsCount: 1,
    affectedProductsCount: 18
  },
  {
    archetypeNumber: 3,
    name: 'Comparison Intent',
    question: '"How does the VaporStride compare to the Nike Alphafly 3 on weight and stack?"',
    evidenceDependencies: ['Weight (g)', 'Heel Stack (mm)', 'Forefoot Stack (mm)', 'Plate Material'],
    coveragePercentage: 92,
    missingEvidenceCount: 0,
    conflictsCount: 2,
    affectedProductsCount: 24
  },
  {
    archetypeNumber: 4,
    name: 'Specification Intent',
    question: '"What is the exact midsole foam compound, stack height, and outsole rubber thickness?"',
    evidenceDependencies: ['Foam Polymer', 'Stack Dimensions', 'Lug Depth', 'GTIN / MPN'],
    coveragePercentage: 84,
    missingEvidenceCount: 1,
    conflictsCount: 2,
    affectedProductsCount: 24
  },
  {
    archetypeNumber: 5,
    name: 'Purchase Intent',
    question: '"Where can I buy Size 10.5 in stock today with fastest free delivery?"',
    evidenceDependencies: ['Seller Identity', 'Stock Qty', 'Live Price', 'Shipping Speed', 'Return Terms'],
    coveragePercentage: 78,
    missingEvidenceCount: 1,
    conflictsCount: 1,
    affectedProductsCount: 24
  },
  {
    archetypeNumber: 6,
    name: 'Use Case Intent',
    question: '"Can this shoe handle wet asphalt, half marathons, and tempo track intervals?"',
    evidenceDependencies: ['Wet Traction Rating', 'Recommended Distance', 'Pace Range', 'Upper Breathability'],
    coveragePercentage: 72,
    missingEvidenceCount: 3,
    conflictsCount: 0,
    affectedProductsCount: 16
  },
  {
    archetypeNumber: 7,
    name: 'Trust & Provenance Intent',
    question: '"Is this seller an authorized AeroPulse retailer, and is the warranty valid?"',
    evidenceDependencies: ['Merchant Authorization', 'Manufacturer Warranty', 'Return Window', 'Serial/GTIN Verifiable'],
    coveragePercentage: 68,
    missingEvidenceCount: 2,
    conflictsCount: 1,
    affectedProductsCount: 24
  }
];

// Buyer Intent Dependencies mapping (for BuyerIntentAndDiscoverySection)
export const sampleBuyerIntentDependencies = [
  {
    id: 'INTENT-01',
    name: 'Discovery Intent ("Best marathon shoes with 8mm drop")',
    coverage: 86,
    readiness: 'HIGH',
    requiredEvidence: ['Plated Construction', 'Drop Offset', 'Intended Surface', 'Weight'],
    missingEvidenceCount: 1,
    conflictCount: 1
  },
  {
    id: 'INTENT-02',
    name: 'Problem Solving ("Plantar fasciitis / Achilles relief")',
    coverage: 74,
    readiness: 'MEDIUM',
    requiredEvidence: ['Drop Offset', 'Forefoot Rocker', 'Arch Support', 'Foam Firmness'],
    missingEvidenceCount: 2,
    conflictCount: 1
  },
  {
    id: 'INTENT-03',
    name: 'Comparison Intent ("VaporStride vs Alphafly 3")',
    coverage: 92,
    readiness: 'HIGH',
    requiredEvidence: ['Weight (g)', 'Heel Stack', 'Forefoot Stack', 'Plate Material'],
    missingEvidenceCount: 0,
    conflictCount: 2
  },
  {
    id: 'INTENT-04',
    name: 'Specification Intent ("Midsole foam, stack, outsole lugs")',
    coverage: 84,
    readiness: 'HIGH',
    requiredEvidence: ['Foam Polymer', 'Stack Dimensions', 'Lug Depth', 'GTIN / MPN'],
    missingEvidenceCount: 1,
    conflictCount: 2
  },
  {
    id: 'INTENT-05',
    name: 'Purchase Intent ("Size 10.5 in stock with fast delivery")',
    coverage: 78,
    readiness: 'MEDIUM',
    requiredEvidence: ['Seller Identity', 'Stock Qty', 'Live Price', 'Return Terms'],
    missingEvidenceCount: 1,
    conflictCount: 1
  },
  {
    id: 'INTENT-06',
    name: 'Use Case Intent ("Wet asphalt, tempo runs, half marathon")',
    coverage: 72,
    readiness: 'MEDIUM',
    requiredEvidence: ['Wet Traction', 'Recommended Distance', 'Pace Range', 'Breathability'],
    missingEvidenceCount: 3,
    conflictCount: 0
  },
  {
    id: 'INTENT-07',
    name: 'Trust & Provenance ("Authorized seller, valid warranty")',
    coverage: 68,
    readiness: 'ATTENTION',
    requiredEvidence: ['Merchant Authorization', 'Manufacturer Warranty', 'Return Window', 'Serial Verifiable'],
    missingEvidenceCount: 2,
    conflictCount: 1
  }
];

// 11. Discovery Surface Integrity (4 canonical surfaces)
export const sampleDiscoverySurfaces: DiscoverySurfaceIntegrityItem[] = [
  {
    surfaceId: 'surf-search',
    id: 'surf-traditional_search',
    name: 'Traditional Search (Google / Bing Organic)',
    dataReadiness: 84,
    evidenceReadiness: 80,
    structuredDataReadiness: 90,
    readinessScore: 84,
    targetAudience: 'Organic algorithmic indexers crawling Schema.org JSON-LD markup and title/meta anchors.',
    keyDependencies: ['Schema.org Product', 'Canonical URLs', 'Open Graph Spec'],
    blockerCount: 1,
    modeledState: 'High Integrity · Modeled',
    unresolvedBlockers: ['Missing return policy structured schema on 4 products']
  },
  {
    surfaceId: 'surf-ai',
    id: 'surf-ai_search',
    name: 'AI Search & Answer Engines (ChatGPT, Gemini, Perplexity)',
    dataReadiness: 76,
    evidenceReadiness: 74,
    structuredDataReadiness: 82,
    readinessScore: 76,
    targetAudience: 'Generative AI search synthesizers retrieving factual evidence for natural language shopping prompts.',
    keyDependencies: ['Attributed Proof', 'Biomechanical Specs', 'Verified Claims'],
    blockerCount: 2,
    modeledState: 'Attention Required · Modeled',
    unresolvedBlockers: [
      'Contradictory lug depth readings weaken citation confidence',
      'Missing GRS sustainability breakdown limits eco-prompt answers'
    ]
  },
  {
    surfaceId: 'surf-feeds',
    id: 'surf-commerce_feeds',
    name: 'Commerce Feeds & Marketplaces (Google Shopping, Meta)',
    dataReadiness: 72,
    evidenceReadiness: 68,
    structuredDataReadiness: 75,
    readinessScore: 72,
    targetAudience: 'Merchant center syndication pipelines with strict GTIN-13 and pricing/availability validation rules.',
    keyDependencies: ['GTIN-13 Barcode', 'Stock Status', 'Currency/Tax Specs'],
    blockerCount: 2,
    modeledState: 'Gaps Detected · Modeled',
    unresolvedBlockers: [
      'Critical GTIN-13 collision on Size 10.5 variant blocks free listings',
      'Image aspect ratio warnings on accessory items'
    ]
  },
  {
    surfaceId: 'surf-native',
    id: 'surf-native_graph',
    name: 'AIXSHOP Native Discovery Graph',
    dataReadiness: 88,
    evidenceReadiness: 86,
    structuredDataReadiness: 94,
    readinessScore: 88,
    targetAudience: 'The native zero-hallucination graph powering deterministic shopper answers and merchant trust cards.',
    keyDependencies: ['Deterministic Provenance', 'Verified Merchant Attestations', 'Audit Trails'],
    blockerCount: 0,
    modeledState: 'High Integrity · Modeled',
    unresolvedBlockers: ['2 evidence-gated recovery proposals pending merchant sign-off']
  }
];

// 12. Data Quality Funnel (Admin View - derived from canonical telemetry)
export const sampleDataQualityFunnel = [
  { stage: '1. Ingested Observations', count: `${CANONICAL_TELEMETRY_FUNNEL.rawObservations}`, note: 'Raw attribute extractions across 4 connectors' },
  { stage: '2. Normalized Fact Candidates', count: `${CANONICAL_TELEMETRY_FUNNEL.normalizedFacts}`, note: 'Standardized into GS1 and SI units' },
  { stage: '3. Evidence-Backed Facts', count: `${CANONICAL_TELEMETRY_FUNNEL.provenanceEvidenceRecords}`, note: 'Tied to verifiable source provenance' },
  { stage: '4. Preserved Open Conflicts', count: `${CANONICAL_SYSTEM_KPIS.totalPreservedConflicts}`, note: 'Isolated and unmerged to prevent synthetic bias' },
  { stage: '5. Canonical Product Graph', count: `${CANONICAL_SYSTEM_KPIS.totalCatalogProducts}`, note: `Unified parent products with ${CANONICAL_SYSTEM_KPIS.totalChildVariants} child variants` },
  { stage: '6. Verified Truth Locked', count: `${CANONICAL_TELEMETRY_FUNNEL.verifiedLocks}`, note: 'Direct merchant attestations with zero ambiguity' },
  { stage: '7. Discoverable Representations', count: `${CANONICAL_SYSTEM_KPIS.totalCatalogProducts}`, note: 'Fully structured for multi-surface AI ingestion' }
];

// Data Quality Stages for Funnel component
export const sampleDataQualityStages = [
  {
    stage: 1,
    name: 'Ingested Observations',
    count: CANONICAL_TELEMETRY_FUNNEL.rawObservations,
    percentage: 100,
    dropOffNote: 'Raw observed signals received across Shopify, GMC, and lab microdata.'
  },
  {
    stage: 2,
    name: 'Syntactically Valid Attributes & Normalized Facts',
    count: CANONICAL_TELEMETRY_FUNNEL.normalizedFacts,
    percentage: 63,
    dropOffNote: 'Attributes standardized into conforming GS1 and Schema.org Product specifications.'
  },
  {
    stage: 3,
    name: 'Provenance-Anchored Evidence Records',
    count: CANONICAL_TELEMETRY_FUNNEL.provenanceEvidenceRecords,
    percentage: 51,
    dropOffNote: 'Evidence facts anchored to verifiable source provenance and audit trails.'
  },
  {
    stage: 4,
    name: 'Provenance-Anchored Facts',
    count: 175,
    percentage: 90,
    dropOffNote: '6 unverified claims marked as UNKNOWN (Rule 3: Unknown remains Unknown).'
  },
  {
    stage: 5,
    name: 'Conflict-Free Ground Truth',
    count: 169,
    percentage: 87,
    dropOffNote: '6 conflicting facts isolated in open conflict ledger (Rule 1: Conflicts preserved).'
  },
  {
    stage: 6,
    name: 'Identity-Resolved Variants',
    count: 164,
    percentage: 84,
    dropOffNote: '5 variant attributes gated pending barcode alignment on Size 10.5.'
  },
  {
    stage: 7,
    name: 'Discovery-Ready Knowledge Graph',
    count: 158,
    percentage: 81,
    dropOffNote: '6 claims awaiting Class B merchant attestation sign-off.'
  }
];

// Intelligence Risks for Risk Register component
export const sampleIntelligenceRisks = [
  {
    id: 'RISK-01',
    title: 'Variant GTIN Barcode Collision on Size 10.5',
    severity: 'CRITICAL',
    description: 'Third-party Google Merchant feed serves obsolete barcode, blocking 1-click cart fulfillment and triggering feed disapproval.',
    affectedProductsCount: 1,
    confidenceScore: 45,
    buyerImpact: 'Fails direct checkout routing on Google Shopping and search answer cards.'
  },
  {
    id: 'RISK-02',
    title: 'Missing Structured Return Policy Schema',
    severity: 'HIGH',
    description: 'Schema.org merchantReturnDays microdata omitted during feed export, causing AI shopping agents to withhold purchase recommendations.',
    affectedProductsCount: 4,
    confidenceScore: 10,
    buyerImpact: 'AI purchase agents flag "unknown return window" and prioritize competitor listings.'
  },
  {
    id: 'RISK-03',
    title: 'Biomechanical Lug Depth Discrepancy (5mm vs 6.5mm)',
    severity: 'HIGH',
    description: 'Brand marketing states 5mm lug depth while independent lab caliper readings measure 6.5mm on perimeter lugs.',
    affectedProductsCount: 1,
    confidenceScore: 50,
    buyerImpact: 'Contradictory technical answers weaken shopper trust on technical trail terrain queries.'
  },
  {
    id: 'RISK-04',
    title: 'Outdated Partner Dealer Pricing Cache',
    severity: 'MEDIUM',
    description: 'Secondary merchant connector serves retired promotional price ($219.95 vs current MSRP $249.95), creating offer volatility.',
    affectedProductsCount: 2,
    confidenceScore: 60,
    buyerImpact: 'Shoppers click through to dealer site expecting expired discount pricing.'
  }
];

// 13. System Risk Register
export const sampleRiskRegister: RiskRegisterItem[] = [
  {
    id: 'RISK-01',
    title: 'Variant GTIN Barcode Disagreement (Size 10.5)',
    severity: 'Critical',
    evidenceConfidence: 45,
    buyerImpact: 'High likelihood of Google Shopping feed suspension and lost purchase conversions.',
    affectedProductsCount: 1,
    affectedSurfacesCount: 2,
    recoveryEligibility: 'Class A Deterministic Available',
    deterministicPriorityReason: 'Cryptographic identifier collision directly invalidates syndicated listings.'
  },
  {
    id: 'RISK-02',
    title: 'Missing Structured Return Policy in Feed Payload',
    severity: 'High',
    evidenceConfidence: 10,
    buyerImpact: 'AI shopping assistants omit product from "risk-free trial" buyer comparisons.',
    affectedProductsCount: 4,
    affectedSurfacesCount: 3,
    recoveryEligibility: 'Class A Deterministic Available',
    deterministicPriorityReason: 'Affects 4 high-velocity products across both Search and AI answer surfaces.'
  },
  {
    id: 'RISK-03',
    title: 'Cross-Source Specification Discrepancy (Lug Depth)',
    severity: 'High',
    evidenceConfidence: 50,
    buyerImpact: 'AI answer engines deliver conflicting answers to technical trail runner inquiries.',
    affectedProductsCount: 1,
    affectedSurfacesCount: 2,
    recoveryEligibility: 'Class B Evidence-Gated',
    deterministicPriorityReason: 'Physical lab observation conflicts directly with published brand marketing.'
  },
  {
    id: 'RISK-04',
    title: 'Discovery Attribute Freshness Degradation (GMC Cache)',
    severity: 'Medium',
    evidenceConfidence: 60,
    buyerImpact: 'Temporary mismatch between live inventory and shopping ad availability badge.',
    affectedProductsCount: 2,
    affectedSurfacesCount: 1,
    recoveryEligibility: 'Automated Sync Pending',
    deterministicPriorityReason: 'Cache staleness resolved upon next scheduled feed pull.'
  },
  {
    id: 'RISK-05',
    title: 'Recycled Content Sustainability Proof Missing',
    severity: 'Medium',
    evidenceConfidence: 70,
    buyerImpact: 'Products excluded from eco-conscious and vegan runner discovery queries.',
    affectedProductsCount: 3,
    affectedSurfacesCount: 2,
    recoveryEligibility: 'Merchant Attestation Required',
    deterministicPriorityReason: 'Cannot be inferred from synthetic AI models without official certification.'
  }
];

// 14. Administrative Audit Trail
export const sampleAdminAuditTrail: AdminAuditTrailItem[] = [
  {
    id: 'AUD-901',
    timestamp: '2026-09-15 09:12:04 UTC',
    action: 'OBSERVATION_RECORDED',
    entity: 'aix-prod-849201948172 (Weight)',
    actorType: 'System',
    previousState: '205 g',
    newState: '198 g',
    traceHash: 'sha256:7f9a12c8b'
  },
  {
    id: 'AUD-902',
    timestamp: '2026-09-15 08:45:12 UTC',
    action: 'OFFER_DETECTED',
    entity: 'OFFER-RW-001 (Running Warehouse)',
    actorType: 'System',
    previousState: '$249.95 USD',
    newState: '$219.95 USD',
    traceHash: 'sha256:4b2c89d1a'
  },
  {
    id: 'AUD-903',
    timestamp: '2026-09-15 07:22:45 UTC',
    action: 'CONFLICT_DETECTED',
    entity: 'CONF-001 (GTIN Collision)',
    actorType: 'System',
    previousState: 'Consistent',
    newState: 'Preserved · Unresolved',
    traceHash: 'sha256:9d3e41b2c'
  },
  {
    id: 'AUD-904',
    timestamp: '2026-09-15 07:23:01 UTC',
    action: 'ISSUE_CREATED',
    entity: 'ISSUE-01 (Barcode Collision)',
    actorType: 'System',
    previousState: 'None',
    newState: 'Open (Validation Required)',
    traceHash: 'sha256:1a8f94c3d'
  },
  {
    id: 'AUD-905',
    timestamp: '2026-09-15 06:15:30 UTC',
    action: 'OBSERVATION_RECORDED',
    entity: 'AER-TRL-002 (Lug Depth)',
    actorType: 'System',
    previousState: '5.0 mm',
    newState: '6.5 mm (RunRepeat)',
    traceHash: 'sha256:3c7b2a9e1'
  },
  {
    id: 'AUD-906',
    timestamp: '2026-09-14 18:40:19 UTC',
    action: 'MERCHANT_ATTESTATION_VERIFIED',
    entity: 'EVD-9841 (Heel Drop 8mm)',
    actorType: 'Merchant',
    previousState: 'OBSERVED (10mm)',
    newState: 'MERCHANT_VERIFIED (8mm)',
    traceHash: 'sha256:5e1f98d4b'
  },
  {
    id: 'AUD-907',
    timestamp: '2026-09-14 18:41:00 UTC',
    action: 'RECOVERY_PROPOSED',
    entity: 'REC-001 (Drop Offset Rule)',
    actorType: 'System',
    previousState: 'Diagnosing',
    newState: 'Recovery Proposed (Class A)',
    traceHash: 'sha256:2d4c81a9f'
  },
  {
    id: 'AUD-908',
    timestamp: '2026-09-14 14:10:00 UTC',
    action: 'SOURCE_SYNC_COMPLETED',
    entity: 'SRC-SHOPIFY-01',
    actorType: 'System',
    previousState: 'Syncing',
    newState: 'Synchronized (24 products)',
    traceHash: 'sha256:8b3a19d2c'
  }
];

// Audit logs for AuditTrailAndSecuritySection
export const sampleAuditLogs = [
  {
    id: 'sha256:7f9a12c8b',
    timestamp: '2026-09-15 09:12:04 UTC',
    actorType: 'SYSTEM',
    actor: 'Connector Worker',
    action: 'OBSERVATION_RECORDED',
    detail: 'Weight updated 205g -> 198g based on Shopify direct webhook',
    targetEntity: 'aix-prod-849201948172 (Weight)'
  },
  {
    id: 'sha256:4b2c89d1a',
    timestamp: '2026-09-15 08:45:12 UTC',
    actorType: 'SYSTEM',
    actor: 'Offer Observer',
    action: 'OFFER_PRICE_CHANGED',
    detail: 'Observed offer reduction from $249.95 to $219.95 on Running Warehouse',
    targetEntity: 'OFFER-RW-001'
  },
  {
    id: 'sha256:9d3e41b2c',
    timestamp: '2026-09-15 07:22:45 UTC',
    actorType: 'SYSTEM',
    actor: 'Identity Engine',
    action: 'CONFLICT_PRESERVED',
    detail: 'Isolated GTIN mismatch for Size 10.5 variant. Preserved unresolved without auto-merge',
    targetEntity: 'CONF-001'
  },
  {
    id: 'sha256:1a8f94c3d',
    timestamp: '2026-09-15 07:23:01 UTC',
    actorType: 'SYSTEM',
    actor: 'Triage Pipeline',
    action: 'ISSUE_CREATED',
    detail: 'Created critical issue for barcode collision affecting syndicated shopping feeds',
    targetEntity: 'ISSUE-01'
  },
  {
    id: 'sha256:5e1f98d4b',
    timestamp: '2026-09-14 18:40:19 UTC',
    actorType: 'MERCHANT',
    actor: 'admin@aeropulse.com',
    action: 'ATTESTATION_VERIFIED',
    detail: 'Signed official heel-to-toe drop offset of 8.0mm, upgrading evidence authority level',
    targetEntity: 'EVD-9841'
  },
  {
    id: 'sha256:2d4c81a9f',
    timestamp: '2026-09-14 18:41:00 UTC',
    actorType: 'ADMIN',
    actor: 'Rule Controller',
    action: 'RECOVERY_PROPOSED',
    detail: 'Generated Class A deterministic rule proposal to align product drop attributes',
    targetEntity: 'REC-001'
  }
];

// Security Guards for AuditTrailAndSecuritySection
export const sampleSecurityGuards = [
  {
    title: 'Zero PII / Customer Data Ingestion',
    status: 'ACTIVE',
    description: 'System ingestion pipelines strictly reject customer personal data, emails, payment cards, and shipping addresses.'
  },
  {
    title: 'Read-Only Least Privilege Connectors',
    status: 'ENFORCED',
    description: 'All storefront and feed adapters operate with scoped read-only tokens. Catalog write-back requires multi-party authorization.'
  },
  {
    title: 'Immutable Evidence Provenance Ledger',
    status: 'ENFORCED',
    description: 'Every observation, state transition, and attestation is recorded with SHA-256 integrity hashes that prevent historical tampering.'
  },
  {
    title: 'Deterministic Gate Priority',
    status: 'ENFORCED',
    description: 'Syntactic constraints and merchant attestations override AI inference models to prevent unverified model hallucinations.'
  }
];

// 15. The AIXSHOP Conflict Policy (10 Rules)
export const aixshopConflictPolicyRules = [
  { id: 1, rule: 'Conflicts are preserved.', explanation: 'Conflicting values are never discarded, hidden, or silenced. Both claims remain visible in the evidence graph.' },
  { id: 2, rule: 'Values are never averaged to manufacture certainty.', explanation: 'If Source A claims 8mm and Source B claims 10mm, AIXSHOP never records "9mm". Synthetic compromises destroy truth.' },
  { id: 3, rule: 'Unknown remains Unknown.', explanation: 'If an attribute has not been observed or verified, it is marked MISSING. The system never hallucinates filler specifications.' },
  { id: 4, rule: 'Source authority is contextual.', explanation: 'A source can be authoritative for pricing and weak for technical specs. Authority is evaluated per attribute category.' },
  { id: 5, rule: 'Merchant verification can upgrade evidence.', explanation: 'An explicit merchant attestation outranks third-party scraping feeds, creating a verified ground-truth checkpoint.' },
  { id: 6, rule: 'Deterministic rules execute before AI inference.', explanation: 'Syntactic conversions, mathematical comparisons, and schema checks always run before probabilistic LLM interpretation.' },
  { id: 7, rule: 'AI cannot override evidence without an explicit rule.', explanation: 'Machine learning suggestions cannot overwrite raw observed provenance without verified merchant sign-off.' },
  { id: 8, rule: 'Every resolution must preserve provenance.', explanation: 'When a conflict is resolved, the historical claims, timestamps, and sources remain permanently auditable.' },
  { id: 9, rule: 'Product identity and Offer identity remain separate.', explanation: 'A merchant or marketplace price is an offer observation, never a permanent physical product attribute.' },
  { id: 10, rule: 'Resolved does not mean "factually true forever."', explanation: 'Re-observation of source drift will re-open an issue if external feeds contradict previous resolution states.' }
];

// 16. The AIXSHOP Intelligence Contract (Final Conceptual Anchor)
export const aixshopIntelligenceContractStatements = [
  'AIXSHOP does not invent product facts.',
  'Evidence remains traceable to primary sources.',
  'Unknown remains Unknown until verified.',
  'Conflicts remain visible until resolved.',
  'Products and Offers remain architecturally separate.',
  'Merchant verification can upgrade evidence.',
  'Deterministic validation precedes AI inference.',
  'Discovery readiness evaluates eligibility, not guaranteed visibility.',
  'External write-back requires explicit authorization.',
  'Every important intelligence state must be explainable.'
];

export const intelligenceContractStatements = [
  { id: 1, principle: 'No Synthetic Facts', axiom: 'AIXSHOP does not invent product facts. All catalog specifications derive strictly from verifiable primary sources or deterministic transformations.' },
  { id: 2, principle: 'Provenance Traceability', axiom: 'Evidence remains traceable to primary sources with timestamped audit logs, source authority levels, and cryptographic hashes.' },
  { id: 3, principle: 'Preservation of Unknown', axiom: 'Unknown remains Unknown until verified. The system never hallucinates default filler specs to manufacture false completeness.' },
  { id: 4, principle: 'Preservation of Conflicts', axiom: 'Conflicts remain visible until resolved. Opposing values are preserved side-by-side rather than averaged into synthetic compromises.' },
  { id: 5, principle: 'Product ≠ Offer Separation', axiom: 'Products and Offers remain architecturally separate. Live retailer prices are transient observations, not permanent product attributes.' },
  { id: 6, principle: 'Merchant Attestation Upgrade', axiom: 'Merchant verification upgrades evidence authority. Authoritative first-party attestations supersede third-party scraping feeds.' },
  { id: 7, principle: 'Deterministic First', axiom: 'Deterministic validation precedes AI inference. Mathematical comparisons and schema validation execute before probabilistic LLM reasoning.' },
  { id: 8, principle: 'Readiness Over Ranking', axiom: 'Discovery readiness evaluates eligibility, not guaranteed visibility. AIXSHOP ensures facts are answerable, never promising rigged placement.' },
  { id: 9, principle: 'Scoped Write-Back Authorization', axiom: 'External write-back requires explicit authorization. System never mutates live store catalogs without merchant-signed permissions.' },
  { id: 10, principle: 'Explainable States', axiom: 'Every important intelligence state must be explainable. Every confidence score, warning, and flag cites its exact evidentiary basis.' }
];
