import { CANONICAL_TELEMETRY_FUNNEL } from './canonicalCatalog';
import { 
  IntegrationSource, 
  IntegrationHistoryEvent, 
  SourceAuthorityItem, 
  FeedValidationRule,
  FeedConfigModel 
} from '../types/integrations';

export const sampleIntegrationsSummary = {
  get connectedSources() {
    return sampleIntegrationSources.filter(s => s.status === 'CONNECTED').length;
  },
  availableSources: 7,
  productsCovered: 24,
  lastObservation: '14m ago',
  permissionWarnings: 0,
  sourcesRequiringAttention: 1,
  totalEvidenceGenerated: CANONICAL_TELEMETRY_FUNNEL.provenanceEvidenceRecords,
  pipelineStats: {
    products: 24,
    variants: 68,
    offers: 42,
    images: 96,
    evidenceRecords: CANONICAL_TELEMETRY_FUNNEL.provenanceEvidenceRecords
  }
};

export const sampleIntegrationSources: IntegrationSource[] = [
  {
    id: 'src-shopify',
    name: 'Shopify Storefront & Catalog',
    slug: 'shopify',
    category: 'COMMERCE_PLATFORM',
    categoryLabel: 'Commerce Platform',
    status: 'NOT_CONNECTED',
    provider: 'Shopify Admin GraphQL API (OAuth)',
    connectionMethod: 'Authorized OAuth',
    scope: 'shop.aeropulse.com (24 Products / 68 Variants)',
    shortDescription: 'Merchant-owned canonical product catalog, variants, attributes, and stock levels.',
    detailedPurpose: 'Authoritative extraction of merchant catalog structure, SKU hierarchies, official images, and real-time inventory state directly from the primary storefront store.',
    whyNeeded: 'Establishes the foundational product catalog and variant taxonomy for AeroPulse Athletics. Enables AIXSHOP to match multi-seller offers against official merchant SKUs.',
    coverage: {
      productsCount: 24,
      variantsCount: 68,
      offersCount: 24,
      imagesCount: 96,
      evidenceRecordsCount: 78
    },
    readPermissions: [
      { name: 'Products & Collections', category: 'READ', description: 'Read titles, handles, descriptions, and categories', isGranted: true },
      { name: 'Product Variants & Options', category: 'READ', description: 'Read SKUs, barcodes (GTIN), sizes, and colors', isGranted: true },
      { name: 'Product Specifications & Metafields', category: 'READ', description: 'Read custom technical attributes and materials', isGranted: true },
      { name: 'Product Media & Imagery', category: 'READ', description: 'Access high-resolution official asset URLs', isGranted: true },
      { name: 'Inventory Quantities', category: 'READ', description: 'Observe stock availability status per variant', isGranted: true }
    ],
    writePermissions: [
      { name: 'Modify Product Data', category: 'WRITE', description: 'Prohibited by default. Cannot alter storefront listings.', isGranted: false, isDefaultOff: true },
      { name: 'Metafield Injection', category: 'WRITE', description: 'Prohibited without explicit merchant review step.', isGranted: false, isDefaultOff: true }
    ],
    customerDataStatus: 'Strictly Prohibited',
    ordersStatus: 'Strictly Prohibited',
    paymentsStatus: 'Strictly Prohibited',
    writeAccessEnabled: false,
    evidenceStatesContributed: ['OBSERVED'],
    lastObservation: 'Not Connected',
    observationFreshnessMinutes: 0,
    healthState: 'Unknown',
    healthDimensions: [
      { name: 'Authorization', status: 'Unknown', detail: 'No OAuth token provisioned (Preview mode)' },
      { name: 'Schema Compatibility', status: 'Healthy', detail: 'Shopify 2026-01 GraphQL schema validated' },
      { name: 'Catalog Coverage', status: 'Unknown', detail: 'Awaiting initial merchant authentication' },
      { name: 'Evidence Continuity', status: 'Unknown', detail: 'No historical sync session established' }
    ],
    previewLabel: 'Connection Model · Not Connected'
  },
  {
    id: 'src-google-merchant-center',
    name: 'Google Merchant Center Feed',
    slug: 'google-merchant-center',
    category: 'COMMERCE_FEED',
    categoryLabel: 'Commerce Feed',
    status: 'NOT_CONNECTED',
    provider: 'Content API for Shopping / Cloud Storage Feed',
    connectionMethod: 'Structured Feed',
    scope: 'Merchant ID: 894210948 (US / Global Feed)',
    shortDescription: 'Commercial feed representation, pricing, currency, and availability attributes.',
    detailedPurpose: 'Compares what the merchant submits to search engines against what independent third-party retailers list for the same GTINs.',
    whyNeeded: 'Detects feed validation rejections, pricing mismatches, and schema discrepancies before AI shopping engines penalize catalog visibility.',
    coverage: {
      productsCount: 24,
      variantsCount: 68,
      offersCount: 24,
      imagesCount: 24,
      evidenceRecordsCount: 44
    },
    readPermissions: [
      { name: 'Product Feeds & Items', category: 'READ', description: 'Read titles, GTIN, MPN, condition, and availability', isGranted: true },
      { name: 'Pricing & Promotional Attributes', category: 'READ', description: 'Read base price, sale price, and tax/shipping rules', isGranted: true },
      { name: 'Feed Quality & Rejection Diagnostics', category: 'READ', description: 'Read warnings, disclaimers, and attribute error reports', isGranted: true }
    ],
    writePermissions: [
      { name: 'Update Feed Records', category: 'WRITE', description: 'Disabled. AIXSHOP cannot modify commercial feeds.', isGranted: false, isDefaultOff: true }
    ],
    customerDataStatus: 'Strictly Prohibited',
    ordersStatus: 'Strictly Prohibited',
    paymentsStatus: 'Strictly Prohibited',
    writeAccessEnabled: false,
    evidenceStatesContributed: ['OBSERVED'],
    lastObservation: 'Not Connected',
    observationFreshnessMinutes: 0,
    healthState: 'Unknown',
    healthDimensions: [
      { name: 'Authorization', status: 'Unknown', detail: 'No feed credentials linked' },
      { name: 'Schema Compatibility', status: 'Healthy', detail: 'Google Shopping XML/TSV format supported' },
      { name: 'Observation Freshness', status: 'Unknown', detail: 'Awaiting feed configuration' }
    ],
    previewLabel: 'Connection Model · Not Connected',
    canConfigureFeed: true
  },
  {
    id: 'src-schema-org',
    name: 'Schema.org / JSON-LD Microdata',
    slug: 'schema-org',
    category: 'STRUCTURED_SOURCE',
    categoryLabel: 'Structured Product Source',
    status: 'CONNECTED',
    provider: 'Autonomous Extraction of Permitted Public JSON-LD',
    connectionMethod: 'Direct HTML/JSON-LD',
    scope: 'https://shop.aeropulse.com/products/*',
    shortDescription: 'Permitted public microdata extraction of canonical specs, GTIN, and offer markup.',
    detailedPurpose: 'Continuously validates that Schema.org Product, Offer, and AggregateRating metadata rendered to AI crawlers match merchant canonical ground truth.',
    whyNeeded: 'Serves as the primary public discovery surface analyzed by autonomous AI shopping engines (ChatGPT Search, Gemini, Perplexity).',
    coverage: {
      productsCount: 24,
      variantsCount: 68,
      offersCount: 24,
      imagesCount: 48,
      evidenceRecordsCount: 86
    },
    readPermissions: [
      { name: 'Public JSON-LD Scripts', category: 'READ', description: 'Read @context schema.org Product and AggregateOffer schemas', isGranted: true },
      { name: 'OpenGraph & Twitter Meta Tags', category: 'READ', description: 'Extract canonical social fallback titles and images', isGranted: true },
      { name: 'Robots.txt & Sitemap Compliance', category: 'READ', description: 'Verify crawl permissions and canonical link tags', isGranted: true }
    ],
    writePermissions: [
      { name: 'Modify Website Microdata', category: 'WRITE', description: 'Technically impossible via public HTML observer.', isGranted: false, isDefaultOff: true }
    ],
    customerDataStatus: 'Strictly Prohibited',
    ordersStatus: 'Strictly Prohibited',
    paymentsStatus: 'Strictly Prohibited',
    writeAccessEnabled: false,
    evidenceStatesContributed: ['OBSERVED'],
    lastObservation: '14 minutes ago',
    observationFreshnessMinutes: 14,
    healthState: 'Healthy',
    healthDimensions: [
      { name: 'Authorization', status: 'Healthy', detail: 'Public extraction permitted under robots.txt' },
      { name: 'Schema Compatibility', status: 'Healthy', detail: 'Valid Schema.org 2024 specifications' },
      { name: 'Catalog Coverage', status: 'Healthy', detail: '24 of 24 representative products scanned' },
      { name: 'Observation Freshness', status: 'Healthy', detail: 'Observed 14m ago (Continuous sentinel active)' }
    ],
    previewLabel: 'Representative Connection · Active Sentinel'
  },
  {
    id: 'src-brand-spec-sheet',
    name: 'AeroPulse Engineering Spec Sheet',
    slug: 'brand-spec-sheet',
    category: 'STRUCTURED_SOURCE',
    categoryLabel: 'Structured Product Source',
    status: 'CONNECTED',
    provider: 'Brand Technical Laboratory Specifications (JSON-LD Feed)',
    connectionMethod: 'Structured Feed',
    scope: 'AeroPulse Lab Technical Portal (Version 2026.4)',
    shortDescription: 'Laboratory-grade physical specifications (weight, stack height, carbon plate geometry).',
    detailedPurpose: 'Supplies high-fidelity scientific data directly from AeroPulse engineering blueprints to answer complex runner queries that standard retail feeds omit.',
    whyNeeded: 'Enables accurate answers for high-intent queries (e.g. "Is the plate full-length carbon?", "What is the stack height?", "Is it World Athletics legal?").',
    coverage: {
      productsCount: 24,
      variantsCount: 48,
      offersCount: 0,
      imagesCount: 24,
      evidenceRecordsCount: 64
    },
    readPermissions: [
      { name: 'Biomechanics & Geometry', category: 'READ', description: 'Read heel-toe drop, stack height, forefoot curvature', isGranted: true },
      { name: 'Material Chemistry', category: 'READ', description: 'Read foam compounding (PEBA vs EVA) and plate composition', isGranted: true },
      { name: 'Mass & Tolerances', category: 'READ', description: 'Read sample weight per standard size with scientific variance', isGranted: true }
    ],
    writePermissions: [
      { name: 'Alter Engineering Specifications', category: 'WRITE', description: 'Strictly disabled.', isGranted: false, isDefaultOff: true }
    ],
    customerDataStatus: 'Strictly Prohibited',
    ordersStatus: 'Strictly Prohibited',
    paymentsStatus: 'Strictly Prohibited',
    writeAccessEnabled: false,
    evidenceStatesContributed: ['OBSERVED'],
    lastObservation: '2 hours ago',
    observationFreshnessMinutes: 120,
    healthState: 'Needs Attention',
    attentionNotice: 'Detected weight discrepancy: Spec sheet states 204g (sample Men US 9), but third-party retailers list 235g.',
    healthDimensions: [
      { name: 'Authorization', status: 'Healthy', detail: 'Direct laboratory specification linkage active' },
      { name: 'Schema Compatibility', status: 'Healthy', detail: 'Technical attribute parser compliant' },
      { name: 'Evidence Continuity', status: 'Needs Attention', detail: 'Weight attribute generated CONFLICT against retail feeds' },
      { name: 'Observation Freshness', status: 'Healthy', detail: 'Synchronized 2h ago' }
    ],
    previewLabel: 'Representative Connection · Active'
  },
  {
    id: 'src-merchant-verification',
    name: 'Merchant Ground-Truth Verification Portal',
    slug: 'merchant-verification',
    category: 'MERCHANT_VERIFICATION',
    categoryLabel: 'Merchant Verification',
    status: 'CONNECTED',
    provider: 'AeroPulse Direct Merchant Operator Confirmation',
    connectionMethod: 'Internal Portal',
    scope: 'AeroPulse Athletics Brand Operators',
    shortDescription: 'Direct human operator arbitration resolving conflicting external evidence.',
    detailedPurpose: 'When two external data sources provide conflicting values for a critical attribute (e.g. 204g vs 235g, or synthetic vs mesh upper), the verified brand operator provides authoritative resolution.',
    whyNeeded: 'Transforms ambiguous OBSERVED data into conclusive MERCHANT_VERIFIED ground truth with full cryptographic audit trail.',
    coverage: {
      productsCount: 24,
      variantsCount: 68,
      offersCount: 0,
      imagesCount: 0,
      evidenceRecordsCount: 28
    },
    readPermissions: [
      { name: 'Operator Confirmations', category: 'READ', description: 'Read signed merchant verification records and audit notes', isGranted: true }
    ],
    writePermissions: [
      { name: 'External Storefront Write-Back', category: 'WRITE', description: 'Disabled. Merchant verification is an evidence state, not an external write-back.', isGranted: false, isDefaultOff: true }
    ],
    customerDataStatus: 'Strictly Prohibited',
    ordersStatus: 'Strictly Prohibited',
    paymentsStatus: 'Strictly Prohibited',
    writeAccessEnabled: false,
    evidenceStatesContributed: ['MERCHANT_VERIFIED'],
    lastObservation: '1 day ago',
    observationFreshnessMinutes: 1440,
    healthState: 'Healthy',
    healthDimensions: [
      { name: 'Authorization', status: 'Healthy', detail: 'Brand operator credentials confirmed' },
      { name: 'Evidence Quality', status: 'Healthy', detail: 'Signed verification with audit trail timestamp' },
      { name: 'Conflict Resolution Rate', status: 'Healthy', detail: '14 of 16 historical conflicts arbitrated' }
    ],
    previewLabel: 'Authoritative Evidence State · Active'
  },
  {
    id: 'src-woocommerce',
    name: 'WooCommerce Store Connector',
    slug: 'woocommerce',
    category: 'COMMERCE_PLATFORM',
    categoryLabel: 'Commerce Platform',
    status: 'NOT_CONNECTED',
    provider: 'WooCommerce REST API v3',
    connectionMethod: 'Authorized OAuth',
    scope: 'Secondary wholesale catalog / regional stores',
    shortDescription: 'Open-source commerce catalog sync for secondary stores or distributor partners.',
    detailedPurpose: 'Connects decentralized distributor storefronts to reconcile wholesale variant availability and regional currency pricing.',
    whyNeeded: 'Ensures distributed retailer networks maintain consistent GTIN mapping and accurate pricing boundaries.',
    coverage: {
      productsCount: 0,
      variantsCount: 0,
      offersCount: 0,
      imagesCount: 0,
      evidenceRecordsCount: 0
    },
    readPermissions: [
      { name: 'Product Catalog', category: 'READ', description: 'Read products, attributes, variations, and tags', isGranted: true },
      { name: 'Stock Status', category: 'READ', description: 'Read warehouse stock availability', isGranted: true }
    ],
    writePermissions: [
      { name: 'Product Updates', category: 'WRITE', description: 'Disabled. No write operations permitted.', isGranted: false, isDefaultOff: true }
    ],
    customerDataStatus: 'Strictly Prohibited',
    ordersStatus: 'Strictly Prohibited',
    paymentsStatus: 'Strictly Prohibited',
    writeAccessEnabled: false,
    evidenceStatesContributed: ['OBSERVED'],
    lastObservation: 'Not Connected',
    observationFreshnessMinutes: 0,
    healthState: 'Unknown',
    healthDimensions: [
      { name: 'Authorization', status: 'Unknown', detail: 'No consumer key / secret provisioned' }
    ],
    previewLabel: 'Connection Model · Not Connected'
  },
  {
    id: 'src-product-feed-custom',
    name: 'Custom Product Feed (CSV / XML / JSON)',
    slug: 'custom-feed',
    category: 'COMMERCE_FEED',
    categoryLabel: 'Commerce Feed',
    status: 'NOT_CONNECTED',
    provider: 'Merchant-Hosted HTTPS File Endpoint',
    connectionMethod: 'Structured Feed',
    scope: 'Direct CSV/XML/JSON feed URL',
    shortDescription: 'Universal structured product feed ingestion with deterministic field mapping.',
    detailedPurpose: 'Allows merchants without native platform plugins to upload or link periodic catalog exports for batch intelligence processing.',
    whyNeeded: 'Supports ERP, legacy catalog databases, and customized enterprise warehouse syndication systems.',
    coverage: {
      productsCount: 0,
      variantsCount: 0,
      offersCount: 0,
      imagesCount: 0,
      evidenceRecordsCount: 0
    },
    readPermissions: [
      { name: 'Feed File Ingestion', category: 'READ', description: 'HTTP GET download of scheduled export file', isGranted: true }
    ],
    writePermissions: [
      { name: 'Write to Remote Storage', category: 'WRITE', description: 'Strictly prohibited.', isGranted: false, isDefaultOff: true }
    ],
    customerDataStatus: 'Strictly Prohibited',
    ordersStatus: 'Strictly Prohibited',
    paymentsStatus: 'Strictly Prohibited',
    writeAccessEnabled: false,
    evidenceStatesContributed: ['OBSERVED'],
    lastObservation: 'Not Connected',
    observationFreshnessMinutes: 0,
    healthState: 'Unknown',
    healthDimensions: [
      { name: 'Endpoint Verification', status: 'Unknown', detail: 'Awaiting feed URL input' }
    ],
    previewLabel: 'Connection Model · Not Connected',
    canConfigureFeed: true
  },
  {
    id: 'src-authorized-marketplace-feed',
    name: 'Authorized Retailer & Marketplace Feed',
    slug: 'marketplace-feed',
    category: 'MARKETPLACE_SOURCE',
    categoryLabel: 'Authorized Marketplace Source',
    status: 'NOT_CONNECTED',
    provider: 'Permitted Partner Data Exchange / Verified Merchant Feeds',
    connectionMethod: 'Partner API',
    scope: 'Authorized Retail Partners (RunVelocity, MarathonDepot, PrimeSprint)',
    shortDescription: 'Permitted offer observation feed for third-party retailer price, stock, and shipping.',
    detailedPurpose: 'Tracks authorized multi-seller pricing dispersion, stock availability, return policies, and seller credibility without web scraping.',
    whyNeeded: 'Powers the public Shopper Offer Matrix (Page 11) and detects unauthorized price undercutters before consumer confusion occurs.',
    coverage: {
      productsCount: 24,
      variantsCount: 42,
      offersCount: 18,
      imagesCount: 0,
      evidenceRecordsCount: 38
    },
    readPermissions: [
      { name: 'Offer Pricing & Currency', category: 'READ', description: 'Read seller list price, promotional discount, and currency', isGranted: true },
      { name: 'Fulfillment & Returns', category: 'READ', description: 'Read shipping windows and return policy days', isGranted: true },
      { name: 'Seller Credentials', category: 'READ', description: 'Verify retailer business entity registration', isGranted: true }
    ],
    writePermissions: [
      { name: 'Modify Seller Listings', category: 'WRITE', description: 'Strictly prohibited.', isGranted: false, isDefaultOff: true }
    ],
    customerDataStatus: 'Strictly Prohibited',
    ordersStatus: 'Strictly Prohibited',
    paymentsStatus: 'Strictly Prohibited',
    writeAccessEnabled: false,
    evidenceStatesContributed: ['OBSERVED'],
    lastObservation: 'Not Connected',
    observationFreshnessMinutes: 0,
    healthState: 'Unknown',
    healthDimensions: [
      { name: 'Partner API Authorization', status: 'Unknown', detail: 'Partner network access agreement pending' }
    ],
    previewLabel: 'Connection Model · Not Connected'
  }
];

export const sampleIntegrationHistory: IntegrationHistoryEvent[] = [
  {
    id: 'evt-1',
    timestamp: '2026-09-14 08:42:18 UTC',
    timeAgo: '14 minutes ago',
    sourceId: 'src-schema-org',
    sourceName: 'Schema.org / JSON-LD Microdata',
    eventType: 'OBSERVATION_RECEIVED',
    headline: 'Catalog Observation Synchronized',
    detail: 'Autonomous sentinel scanned 24 product URLs. Extracted 86 Schema.org specification attributes and 24 offer records.',
    recordsAffected: 86,
    evidenceGenerated: 'OBSERVED'
  },
  {
    id: 'evt-2',
    timestamp: '2026-09-14 08:40:02 UTC',
    timeAgo: '16 minutes ago',
    sourceId: 'src-schema-org',
    sourceName: 'Schema.org / JSON-LD Microdata',
    eventType: 'AUTH_CHECK',
    headline: 'Crawl Permissions & Robots.txt Verified',
    detail: 'Robots.txt header confirmed permitted access for AIXSHOP sentinel user-agent. Zero rate-limit flags detected.',
    recordsAffected: 0,
    evidenceGenerated: 'NONE'
  },
  {
    id: 'evt-3',
    timestamp: '2026-09-14 06:15:30 UTC',
    timeAgo: '2 hours ago',
    sourceId: 'src-brand-spec-sheet',
    sourceName: 'AeroPulse Engineering Spec Sheet',
    eventType: 'EVIDENCE_GENERATED',
    headline: 'Laboratory Specs Ingested (VaporStride Carbon Elite)',
    detail: 'Engineering blueprint ingested for GTIN 00849201948172. Midsole compound confirmed as Supercritical Nitrogen-Infused PEBA.',
    recordsAffected: 12,
    evidenceGenerated: 'OBSERVED'
  },
  {
    id: 'evt-4',
    timestamp: '2026-09-14 06:16:11 UTC',
    timeAgo: '2 hours ago',
    sourceId: 'src-brand-spec-sheet',
    sourceName: 'AeroPulse Engineering Spec Sheet',
    eventType: 'HEALTH_WARNING',
    headline: 'Evidence Conflict Flagged on Weight Attribute',
    detail: 'Engineering spec claims 204g (US 9), while third-party retailer listing claims 235g. Issue #ISSUE-8942 routed to Page 10 queue.',
    recordsAffected: 1,
    evidenceGenerated: 'OBSERVED'
  },
  {
    id: 'evt-5',
    timestamp: '2026-09-13 14:22:00 UTC',
    timeAgo: 'Yesterday',
    sourceId: 'src-merchant-verification',
    sourceName: 'Merchant Ground-Truth Verification Portal',
    eventType: 'EVIDENCE_GENERATED',
    headline: 'Merchant Verification Signed: Carbon Plate Geometry',
    detail: 'Brand engineer confirmed full-length carbon composite spoon geometry. State elevated from DERIVED to MERCHANT_VERIFIED.',
    recordsAffected: 1,
    evidenceGenerated: 'MERCHANT_VERIFIED'
  },
  {
    id: 'evt-6',
    timestamp: '2026-09-12 11:05:44 UTC',
    timeAgo: '2 days ago',
    sourceId: 'src-google-merchant-center',
    sourceName: 'Google Merchant Center Feed',
    eventType: 'SCHEMA_CHANGE',
    headline: 'Feed Structure Validation Evaluated',
    detail: 'Preliminary feed diagnostic evaluated 24 products against Google Shopping specifications. 23 PASS, 1 WARNING (missing color variant mapping).',
    recordsAffected: 24,
    evidenceGenerated: 'NONE'
  }
];

export const sampleSourceAuthorityItems: SourceAuthorityItem[] = [
  {
    id: 'auth-gtin',
    attributeName: 'Global Trade Item Number (GTIN)',
    category: 'Product Identity',
    sourceName: 'Brand Engineering Spec & Schema.org',
    sourceType: 'Structured Source',
    observedValue: '00849201948172',
    evidenceState: 'MERCHANT_VERIFIED',
    confidence: 100,
    authorityContext: 'GS1 registered GTIN matches both brand packaging microdata and merchant catalog records.',
    conflictStatus: 'MERCHANT_CONFIRMED',
    resolutionNote: 'Authoritative primary barcode anchor. Unanimous match across all sources.'
  },
  {
    id: 'auth-weight',
    attributeName: 'Shoe Weight (Men US 9)',
    category: 'Physical Specifications',
    sourceName: 'Lab Spec (204g) vs Retailer Feed (235g)',
    sourceType: 'Multi-Source Observation',
    observedValue: '204g vs 235g',
    evidenceState: 'CONFLICT',
    confidence: 68,
    authorityContext: 'AeroPulse Lab states 204g for prototype sample; retail box measurement reported as 235g including inner laces.',
    conflictStatus: 'ACTIVE_CONFLICT',
    resolutionNote: 'Flagged as Active Conflict. AIXSHOP does not guess; awaiting final merchant physical scale verification.'
  },
  {
    id: 'auth-plate',
    attributeName: 'Carbon Propulsion Plate Structure',
    category: 'Biomechanics',
    sourceName: 'AeroPulse Lab Verification Portal',
    sourceType: 'Merchant Verification',
    observedValue: 'Full-length Carbon Composite Spoon Geometry',
    evidenceState: 'MERCHANT_VERIFIED',
    confidence: 100,
    authorityContext: 'Merchant operator directly validated CAD specifications against technical patent filing.',
    conflictStatus: 'RESOLVED',
    resolutionNote: 'Conclusive ground truth established via authenticated merchant verification.'
  },
  {
    id: 'auth-price',
    attributeName: 'Brand Official Listed Price (MSRP)',
    category: 'Commercial Offer',
    sourceName: 'Public Storefront Schema.org',
    sourceType: 'Permitted Public Extraction',
    observedValue: '$240.00 USD',
    evidenceState: 'OBSERVED',
    confidence: 99,
    authorityContext: 'Extracted directly from shop.aeropulse.com JSON-LD offer schema.',
    conflictStatus: 'SINGLE_SOURCE',
    resolutionNote: 'Baseline manufacturer price observed with timestamped cryptographic provenance.'
  }
];

export const sampleFeedValidationRules: FeedValidationRule[] = [
  { field: 'Product Identity (Title & Brand)', status: 'PASS', detail: '24/24 items contain non-empty brand and title strings' },
  { field: 'Required Identifier (GTIN / Barcode)', status: 'PASS', detail: 'All 24 representative products possess valid 14-digit GS1 GTINs' },
  { field: 'Price Field & Formatting', status: 'PASS', detail: 'Decimal numbers formatted with period separator and 2 decimal places' },
  { field: 'Currency Specification (ISO-4217)', status: 'PASS', detail: 'Standard USD currency code declared across all offers' },
  { field: 'Stock Availability Status', status: 'PASS', detail: 'Matches Schema.org InStock / OutOfStock enumerated values' },
  { field: 'Variant Mapping (Color & Size)', status: 'WARNING', detail: 'SKU "AP-VSE-WHT-08" missing parent group_id linkage in preview model' },
  { field: 'Evidence Source Provenance', status: 'PASS', detail: 'Cryptographic SHA-256 digest calculated for incoming feed chunk' }
];

export const defaultFeedConfig: FeedConfigModel = {
  feedName: 'AeroPulse Primary US Product Feed',
  format: 'XML',
  feedUrl: 'https://shop.aeropulse.com/feeds/google-shopping-us.xml',
  refreshStrategy: 'Daily Polling',
  productIdentifier: 'GTIN',
  currency: 'USD',
  offerFieldsIncluded: ['id', 'title', 'description', 'link', 'image_link', 'availability', 'price', 'gtin', 'mpn', 'brand', 'condition'],
  status: 'PREVIEW_VALIDATED'
};
