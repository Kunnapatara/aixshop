// src/data/sampleMonitoringData.ts
// Representative preview monitoring dataset for Page 09 — Monitoring Intelligence
// All events, metrics, and timestamps are explicitly labeled as representative preview data.

import {
  CANONICAL_CATALOG_PRODUCTS,
  CANONICAL_PRODUCT_ID,
  CANONICAL_PRODUCT_GTIN,
  CANONICAL_PRODUCT_SKU,
  CANONICAL_PRODUCT_NAME
} from './canonicalCatalog';
import { 
  MonitoringEvent, 
  MonitoredProductSummary, 
  MonitoringSummaryMetrics 
} from '../types/monitoring';

export const sampleMonitoringMetrics: MonitoringSummaryMetrics = {
  monitoredProducts: 24,
  changesDetected: 12,
  highPriority: 4,
  evidenceChanges: 7,
  offerChanges: 5,
  discoverySignalsChanged: 3,
  statusDistribution: {
    stable: 20,
    changed: 1,
    needsReview: 1,
    evidenceConflict: 2,
    staleUnknown: 0
  }
};

export const sampleMonitoringEvents: MonitoringEvent[] = [
  // 1. Price Change (VaporStride Carbon Elite)
  {
    id: 'evt-001',
    productId: CANONICAL_PRODUCT_ID,
    productName: CANONICAL_PRODUCT_NAME,
    productBrand: 'AeroPulse Athletics',
    productSku: CANONICAL_PRODUCT_SKU,
    productGtin: CANONICAL_PRODUCT_GTIN,
    offerId: 'off-ap-direct-01',
    sellerName: 'AeroPulse Direct',
    category: 'offer_intelligence',
    changeType: 'price',
    changeTitle: 'Commercial Offer Price Revised',
    attribute: 'Unit Price',
    previousValue: '$219.00 USD',
    currentValue: '$199.00 USD',
    difference: '-$20.00 USD (-9.1%)',
    source: 'AeroPulse Direct (Storefront JSON-LD)',
    detectedAt: '14 Sep 2026 · 08:42 UTC',
    detectedAtTimestamp: 1789461720000,
    validUntil: 'Unknown',
    evidenceState: 'OBSERVED',
    confidence: 96,
    impact: 'Offer Intelligence / Price Dispersion',
    priority: 'Medium',
    classification: 'REVIEW',
    status: 'needs_review',
    reason: 'Commercial offer price changed on primary direct store, but no evidence conflict was detected across other channels.',
    recommendedNextStep: 'Inspect offer intelligence to verify promotion alignment across secondary channels.',
    targetAction: 'view_offers',
    offerDimensions: {
      price: { previous: '$219.00 USD', current: '$199.00 USD', changed: true },
      availability: { previous: 'In Stock', current: 'In Stock', changed: false },
      promotion: { previous: 'None', current: 'None', changed: false },
      seller: { name: 'AeroPulse Direct', changed: false },
      shipping: { previous: 'Free Express', current: 'Free Express', changed: false },
      returns: { previous: '30-Day Policy', current: '30-Day Policy', changed: false },
      isolatedChangedDimension: 'Price only ($219 → $199)'
    }
  },

  // 2. Availability Change (VaporStride Carbon Elite)
  {
    id: 'evt-002',
    productId: CANONICAL_PRODUCT_ID,
    productName: CANONICAL_PRODUCT_NAME,
    productBrand: 'AeroPulse Athletics',
    productSku: CANONICAL_PRODUCT_SKU,
    productGtin: CANONICAL_PRODUCT_GTIN,
    offerId: 'off-marathon-01',
    sellerName: 'MarathonDepot',
    category: 'offer_intelligence',
    changeType: 'availability',
    changeTitle: 'Stock Level Constrained on Channel',
    attribute: 'Stock Availability',
    previousValue: 'In Stock',
    currentValue: 'Limited Stock (3 units)',
    difference: 'Depleted from normal inventory levels',
    source: 'MarathonDepot Marketplace Feed',
    detectedAt: '14 Sep 2026 · 07:15 UTC',
    detectedAtTimestamp: 1789456500000,
    validUntil: 'Unknown',
    evidenceState: 'OBSERVED',
    confidence: 91,
    impact: 'Offer Intelligence / Purchase Trust',
    priority: 'High',
    classification: 'HIGH IMPACT',
    status: 'needs_review',
    reason: 'High Priority because inventory scarcity on high-volume partner impacts purchase conversion and AI agent routing.',
    recommendedNextStep: 'Verify stock replenishment schedule with distributor feed.',
    targetAction: 'view_offers',
    offerDimensions: {
      price: { previous: '$209.00 USD', current: '$209.00 USD', changed: false },
      availability: { previous: 'In Stock', current: 'Limited Stock (3 units)', changed: true },
      promotion: { previous: 'None', current: 'None', changed: false },
      seller: { name: 'MarathonDepot', changed: false },
      shipping: { previous: '$4.99 Standard', current: '$4.99 Standard', changed: false },
      returns: { previous: '14-Day Store Credit', current: '14-Day Store Credit', changed: false },
      isolatedChangedDimension: 'Availability only (In Stock → Limited)'
    }
  },

  // 3. Evidence Disappearance (VaporStride Carbon Elite)
  {
    id: 'evt-003',
    productId: CANONICAL_PRODUCT_ID,
    productName: CANONICAL_PRODUCT_NAME,
    productBrand: 'AeroPulse Athletics',
    productSku: CANONICAL_PRODUCT_SKU,
    productGtin: CANONICAL_PRODUCT_GTIN,
    category: 'evidence_integrity',
    changeType: 'evidence',
    changeTitle: 'Return Policy Claim Disappeared',
    attribute: 'Return Policy & Warranty Claim',
    previousValue: 'OBSERVED (30-day wear-test warranty verified on merchant PDP)',
    currentValue: 'MISSING (DOM element removed from partner listing)',
    difference: 'Authoritative evidence lost',
    source: 'FleetRunners Marketplace Crawler',
    detectedAt: '14 Sep 2026 · 06:30 UTC',
    detectedAtTimestamp: 1789453800000,
    validUntil: 'Unknown',
    evidenceState: 'MISSING',
    confidence: 88,
    impact: 'Trust / Purchase / Buyer Intent',
    priority: 'High',
    classification: 'HIGH IMPACT',
    status: 'needs_review',
    reason: 'High Priority because evidence removal affecting purchase trust degrades discovery recommendation confidence.',
    recommendedNextStep: 'Review evidence claim and re-link merchant authoritative policy in Section 04.',
    targetAction: 'review_evidence'
  },

  // 4. Variant Conflict (VaporStride Carbon Elite)
  {
    id: 'evt-004',
    productId: CANONICAL_PRODUCT_ID,
    productName: CANONICAL_PRODUCT_NAME,
    productBrand: 'AeroPulse Athletics',
    productSku: CANONICAL_PRODUCT_SKU,
    productGtin: CANONICAL_PRODUCT_GTIN,
    category: 'variant_integrity',
    changeType: 'variant_identity',
    changeTitle: 'Variant GTIN Barcode Collision Detected',
    attribute: 'Variant Barcode Relationship (Size 10.5 vs 11.0)',
    previousValue: 'Consistent (Unique GS1 assigned to each SKU variant)',
    currentValue: 'CONFLICT (Both Size 10.5 and 11.0 map to GTIN 0084012398412)',
    difference: 'Identity ambiguity across 2 variants',
    source: 'Partner Catalog Ingestion Validator',
    detectedAt: '14 Sep 2026 · 05:45 UTC',
    detectedAtTimestamp: 1789451100000,
    validUntil: 'Unknown',
    evidenceState: 'CONFLICT',
    confidence: 99,
    impact: 'Canonical Identity / Order Fulfillment / Indexing',
    priority: 'Critical',
    classification: 'CRITICAL',
    status: 'conflict',
    reason: 'Critical Priority: Canonical identity conflict detected. Two distinct shoe sizes sharing the same GS1 GTIN barcode causes search ingestion failures.',
    recommendedNextStep: 'Open Products Workbench to assign unique GS1 barcodes to variants.',
    targetAction: 'view_product',
    conflictDetails: {
      sourceA: {
        name: 'Merchant Master Catalog',
        value: 'Size 10.5 (SKU: AP-VSC-105) -> GTIN: 0084012398412',
        observedAt: '14 Sep 2026 · 05:40 UTC'
      },
      sourceB: {
        name: 'Distributor Partner Feed',
        value: 'Size 11.0 (SKU: AP-VSC-110) -> GTIN: 0084012398412',
        observedAt: '14 Sep 2026 · 05:45 UTC'
      },
      attributeName: 'Variant GS1 GTIN',
      explanation: 'Two physical SKUs cannot legally share the same GS1 barcode identifier under commerce standards.',
      noAveragingNotice: 'Conflicts cannot be mathematically reconciled. A human merchant or authoritative registrar must assign correct unique numbers.'
    }
  },

  // 5. Specification Change (VaporStride Carbon Elite)
  {
    id: 'evt-005',
    productId: CANONICAL_PRODUCT_ID,
    productName: CANONICAL_PRODUCT_NAME,
    productBrand: 'AeroPulse Athletics',
    productSku: CANONICAL_PRODUCT_SKU,
    productGtin: CANONICAL_PRODUCT_GTIN,
    category: 'product_intelligence',
    changeType: 'attribute',
    changeTitle: 'Total Weight Specification Updated',
    attribute: 'Physical Weight (Men\'s US 9.0)',
    previousValue: '320g (11.29 oz)',
    currentValue: '325g (11.46 oz)',
    difference: '+5g (+1.6% variation)',
    source: 'AeroPulse Lab Spec Sheet v2.4',
    detectedAt: '13 Sep 2026 · 22:10 UTC',
    detectedAtTimestamp: 1789423800000,
    validUntil: 'Unknown',
    evidenceState: 'OBSERVED',
    confidence: 94,
    impact: 'Product Intelligence / Comparison Specs',
    priority: 'Medium',
    classification: 'REVIEW',
    status: 'needs_review',
    reason: 'Medium Priority: Manufacturer engineering spec sheet updated official weight value. Requires verification across secondary specs.',
    recommendedNextStep: 'Confirm sample shoe weight with QC team before updating global structured schema.',
    targetAction: 'view_product'
  },

  // 6. Promotion Change (VaporStride Carbon Elite)
  {
    id: 'evt-006',
    productId: CANONICAL_PRODUCT_ID,
    productName: CANONICAL_PRODUCT_NAME,
    productBrand: 'AeroPulse Athletics',
    productSku: CANONICAL_PRODUCT_SKU,
    productGtin: CANONICAL_PRODUCT_GTIN,
    offerId: 'off-ap-direct-01',
    sellerName: 'AeroPulse Direct',
    category: 'offer_intelligence',
    changeType: 'promotion',
    changeTitle: 'VIP Member Discount Code Activated',
    attribute: 'Commercial Promotion',
    previousValue: 'No Active Promotion',
    currentValue: '10% Member Promotion (RUN10)',
    difference: '10% discount applied at cart level',
    source: 'Direct Checkout Telemetry Observation',
    detectedAt: '13 Sep 2026 · 18:30 UTC',
    detectedAtTimestamp: 1789410600000,
    validUntil: '14 Oct 2026 · 23:59 UTC',
    evidenceState: 'OBSERVED',
    confidence: 89,
    impact: 'Offer Intelligence / Price Dispersion',
    priority: 'Medium',
    classification: 'REVIEW',
    status: 'needs_review',
    reason: 'Medium Priority: Cart-level promotion detected. Requires verification whether coupon is public or restricted to gated members.',
    recommendedNextStep: 'Inspect offer parameters and define coupon eligibility conditions.',
    targetAction: 'view_offers',
    offerDimensions: {
      price: { previous: '$199.00 USD', current: '$199.00 USD', changed: false },
      availability: { previous: 'In Stock', current: 'In Stock', changed: false },
      promotion: { previous: 'No Active Promotion', current: '10% Member Promotion (RUN10)', changed: true },
      seller: { name: 'AeroPulse Direct', changed: false },
      shipping: { previous: 'Free Express', current: 'Free Express', changed: false },
      returns: { previous: '30-Day Policy', current: '30-Day Policy', changed: false },
      isolatedChangedDimension: 'Promotion only (None → 10% Member Code)'
    }
  },

  // 7. Discovery Signal Degradation (VaporStride Carbon Elite)
  {
    id: 'evt-007',
    productId: CANONICAL_PRODUCT_ID,
    productName: CANONICAL_PRODUCT_NAME,
    productBrand: 'AeroPulse Athletics',
    productSku: CANONICAL_PRODUCT_SKU,
    productGtin: CANONICAL_PRODUCT_GTIN,
    category: 'discovery_readiness',
    changeType: 'discovery_signal',
    changeTitle: 'Variant Completeness Score Degraded',
    attribute: 'Variant Completeness Readiness',
    previousValue: '92% Structured Completeness',
    currentValue: '78% Structured Completeness',
    difference: '-14% degradation in readiness index',
    source: 'Discovery Signal Audit Engine',
    detectedAt: '13 Sep 2026 · 16:15 UTC',
    detectedAtTimestamp: 1789402500000,
    validUntil: 'Unknown',
    evidenceState: 'OBSERVED',
    confidence: 95,
    impact: 'Discovery Readiness / AI Answer Ingestion',
    priority: 'High',
    classification: 'HIGH IMPACT',
    status: 'needs_review',
    reason: 'High Priority: Variant completeness dropped from 92% to 78% due to GTIN collision between size variants, threatening answer engine parsing.',
    recommendedNextStep: 'Resolve variant GTIN collision to restore 90%+ discovery score.',
    targetAction: 'view_discovery'
  },

  // 8. Source Content Change (VaporStride Carbon Elite)
  {
    id: 'evt-008',
    productId: CANONICAL_PRODUCT_ID,
    productName: CANONICAL_PRODUCT_NAME,
    productBrand: 'AeroPulse Athletics',
    productSku: CANONICAL_PRODUCT_SKU,
    productGtin: CANONICAL_PRODUCT_GTIN,
    category: 'product_intelligence',
    changeType: 'source_content',
    changeTitle: 'Manufacturer Upstream Payload Revised',
    attribute: 'Source Document Payload',
    previousValue: 'Revision v2.3 (Clean parse)',
    currentValue: 'Revision v2.4 (Updated content)',
    difference: '3 attributes affected in document structure',
    source: 'Manufacturer Specification Feed (HTML DOM)',
    detectedAt: '13 Sep 2026 · 14:00 UTC',
    detectedAtTimestamp: 1789394400000,
    validUntil: 'Unknown',
    evidenceState: 'OBSERVED',
    confidence: 92,
    impact: 'Source Consistency / Attribute Extraction',
    priority: 'Medium',
    classification: 'REVIEW',
    status: 'needs_review',
    reason: 'Medium Priority: Upstream product payload changed, altering Weight, Upper Material, and Variant structure fields.',
    recommendedNextStep: 'Inspect extraction diff to verify which fields altered canonical specifications.',
    targetAction: 'inspect',
    affectedFields: ['Weight (320g → 325g)', 'Upper Material (Mesh ratio updated)', 'Variant Barcode definitions']
  },

  // 9. Stale Evidence (TrailCore X Mountain Shoe)
  {
    id: 'evt-009',
    productId: 'aix-prod-849201948913',
    productName: 'AeroPulse TrailCore X Mountain Shoe',
    productBrand: 'AeroPulse Athletics',
    productSku: 'AP-TCX-017',
    productGtin: '0084012398913',
    category: 'evidence_integrity',
    changeType: 'evidence',
    changeTitle: 'Price Evidence Freshness Expired',
    attribute: 'Marketplace Price Observation Freshness',
    previousValue: 'Fresh Observation (14 Sep 2026 · 02:15 UTC)',
    currentValue: 'Freshness cannot be guaranteed (Valid Until: Unknown)',
    difference: 'Observation age exceeded freshness confidence threshold',
    source: 'OutdoorGear Express Reseller API',
    detectedAt: '13 Sep 2026 · 11:45 UTC',
    detectedAtTimestamp: 1789386300000,
    validUntil: 'Unknown',
    evidenceState: 'MISSING',
    confidence: 62,
    impact: 'Evidence Integrity / Freshness',
    priority: 'Medium',
    classification: 'INFORMATIONAL',
    status: 'stale_unknown',
    reason: 'Validity expiration date is unknown; evidence cannot be verified as actively accurate without an updated feed sample.',
    recommendedNextStep: 'Re-observe source endpoint or obtain updated merchant confirmation.',
    targetAction: 'review_evidence'
  },

  // 10. Source Evidence Conflict (TrailCore X Mountain Shoe)
  {
    id: 'evt-010',
    productId: 'aix-prod-849201948913',
    productName: 'AeroPulse TrailCore X Mountain Shoe',
    productBrand: 'AeroPulse Athletics',
    productSku: 'AP-TCX-017',
    productGtin: '0084012398913',
    category: 'evidence_integrity',
    changeType: 'conflict',
    changeTitle: 'Upper Material Specification Conflict',
    attribute: 'Upper Construction Material',
    previousValue: 'Single claim: HydroGuard Weatherproof Mesh',
    currentValue: 'CONFLICT: Source A says HydroGuard Mesh vs Source B says Ripstop Cordura',
    difference: 'Contradictory technical durability claims across 2 sources',
    source: 'Multi-Source Comparative Telemetry',
    detectedAt: '13 Sep 2026 · 09:20 UTC',
    detectedAtTimestamp: 1789377600000,
    validUntil: 'Unknown',
    evidenceState: 'CONFLICT',
    confidence: 96,
    impact: 'Specification / Comparison / Durability Claim',
    priority: 'High',
    classification: 'HIGH IMPACT',
    status: 'conflict',
    reason: 'High Priority because material disagreement cannot be silently averaged (never average 320g vs 325g; never blend Cordura vs Mesh). Requires authoritative resolution.',
    recommendedNextStep: 'Open Evidence Review to designate the authoritative merchant material specification.',
    targetAction: 'review_evidence',
    conflictDetails: {
      sourceA: {
        name: 'Manufacturer Master Spec Sheet',
        value: 'HydroGuard Weatherproof Mesh w/ Sealed Seams',
        observedAt: '13 Sep 2026 · 09:15 UTC'
      },
      sourceB: {
        name: 'Retail Partner Catalog Feed',
        value: '100% Ballistic Ripstop Cordura Textile',
        observedAt: '13 Sep 2026 · 09:20 UTC'
      },
      attributeName: 'Upper Construction Material',
      explanation: 'Two respected catalog sources make mutually contradictory material assertions.',
      noAveragingNotice: 'AIXSHOP strictly forbids automatic blending or silent fallback. The dispute remains an explicit CONFLICT until an authorized merchant arbitrator signs off.'
    }
  },

  // 11. Offer Shipping Policy Change (TempoFlow Everyday Trainer)
  {
    id: 'evt-011',
    productId: 'aix-prod-849201948857',
    productName: 'AeroPulse TempoFlow Everyday Trainer',
    productBrand: 'AeroPulse Athletics',
    productSku: 'AP-TFT-015',
    productGtin: '0084012398857',
    offerId: 'off-fleet-02',
    sellerName: 'FleetRunners',
    category: 'offer_intelligence',
    changeType: 'price',
    changeTitle: 'Landed Shipping Fee Introduced',
    attribute: 'Landed Shipping Terms',
    previousValue: 'Free 2-Day Standard Shipping',
    currentValue: '$5.99 Flat Rate Ground Shipping',
    difference: '+$5.99 added to effective landed cost',
    source: 'FleetRunners Marketplace Terms Feed',
    detectedAt: '12 Sep 2026 · 17:40 UTC',
    detectedAtTimestamp: 1789321200000,
    validUntil: 'Unknown',
    evidenceState: 'OBSERVED',
    confidence: 90,
    impact: 'Offer Intelligence / Landed Cost',
    priority: 'Low',
    classification: 'INFORMATIONAL',
    status: 'changed',
    reason: 'Low Priority: Shipping policy change detected on partner marketplace. Does not threaten canonical product identity.',
    recommendedNextStep: 'Inform commercial team of third-party shipping surcharge.',
    targetAction: 'view_offers',
    offerDimensions: {
      price: { previous: '$145.00 USD', current: '$145.00 USD', changed: false },
      availability: { previous: 'In Stock', current: 'In Stock', changed: false },
      promotion: { previous: 'None', current: 'None', changed: false },
      seller: { name: 'FleetRunners', changed: false },
      shipping: { previous: 'Free 2-Day', current: '$5.99 Flat Rate', changed: true },
      returns: { previous: '30-Day Return', current: '30-Day Return', changed: false },
      isolatedChangedDimension: 'Shipping only (Free → $5.99)'
    }
  },

  // 12. Discovery Signal Degraded (Velocity Carbon Pro 5K/10K)
  {
    id: 'evt-012',
    productId: 'aix-prod-849201948880',
    productName: 'AeroPulse Velocity Carbon Pro 5K/10K',
    productBrand: 'AeroPulse Athletics',
    productSku: 'AP-VCP-016',
    productGtin: '0084012398880',
    category: 'discovery_readiness',
    changeType: 'discovery_signal',
    changeTitle: 'Structured Schema Warranty Loss',
    attribute: 'Structured Data Schema Readiness',
    previousValue: '88% Schema Audit Score',
    currentValue: '72% Schema Audit Score',
    difference: '-16% drop in machine-readable coverage',
    source: 'Product Schema Ingestion Auditor',
    detectedAt: '12 Sep 2026 · 13:10 UTC',
    detectedAtTimestamp: 1789305000000,
    validUntil: 'Unknown',
    evidenceState: 'OBSERVED',
    confidence: 93,
    impact: 'Discovery Readiness / Schema Validation',
    priority: 'High',
    classification: 'HIGH IMPACT',
    status: 'needs_review',
    reason: 'High Priority: Removal of verified merchant warranty claims reduced schema completeness below the 80% threshold required for Google rich snippet display.',
    recommendedNextStep: 'Reinstate warranty and returns schema properties in Product specification.',
    targetAction: 'view_discovery'
  }
];

// 24 Monitored Products Summary (consistent with Page 05, 06, 07)
/**
 * Authoritative 24 Monitored Products Summary
 * Derived directly from CANONICAL_CATALOG_PRODUCTS to enforce a single canonical domain
 * and eliminate secondary / divergent product universes.
 */
export const sampleMonitoredProducts: MonitoredProductSummary[] = CANONICAL_CATALOG_PRODUCTS.map(product => {
  if (product.id === CANONICAL_PRODUCT_ID) {
    return {
      id: CANONICAL_PRODUCT_ID,
      name: CANONICAL_PRODUCT_NAME,
      brand: 'AeroPulse Athletics',
      category: 'Running',
      sku: CANONICAL_PRODUCT_SKU,
      gtin: CANONICAL_PRODUCT_GTIN,
      canonicalId: CANONICAL_PRODUCT_ID,
      monitoringState: 'conflict',
      totalChanges: 6,
      evidenceChanges: 3,
      offerChanges: 2,
      discoveryChanges: 1,
      priority: 'Critical',
      priorityScore: 98,
      priorityRationale: 'Variant GTIN collision between sizes 10.5 & 11 and missing return evidence.',
      lastObservation: '14 Sep 2026 · 08:42 UTC',
      coverage: 70,
      dominantEvidenceState: 'CONFLICT',
      topIssue: 'Variant GTIN barcode collision and missing return policy evidence',
      eventsCount: 6
    };
  }

  if (product.id === 'aix-prod-849201948913') {
    // AeroPulse TrailCore X Mountain Shoe
    return {
      id: product.id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      sku: product.sku,
      gtin: product.gtin,
      canonicalId: product.id,
      monitoringState: 'conflict',
      totalChanges: 2,
      evidenceChanges: 2,
      offerChanges: 0,
      discoveryChanges: 0,
      priority: 'High',
      priorityScore: 88,
      priorityRationale: 'Upper material conflict (HydroGuard Mesh vs Cordura) and stale price evidence.',
      lastObservation: '13 Sep 2026 · 09:20 UTC',
      coverage: 74,
      dominantEvidenceState: 'CONFLICT',
      topIssue: 'Material specification conflict between manufacturer and reseller',
      eventsCount: 2
    };
  }

  if (product.id === 'aix-prod-849201948880') {
    // AeroPulse Velocity Carbon Pro 5K/10K
    return {
      id: product.id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      sku: product.sku,
      gtin: product.gtin,
      canonicalId: product.id,
      monitoringState: 'needs_review',
      totalChanges: 1,
      evidenceChanges: 0,
      offerChanges: 0,
      discoveryChanges: 1,
      priority: 'High',
      priorityScore: 84,
      priorityRationale: 'Structured schema audit score degraded to 72% following warranty loss.',
      lastObservation: '12 Sep 2026 · 13:10 UTC',
      coverage: 72,
      dominantEvidenceState: 'MISSING',
      topIssue: 'Missing warranty claims in machine-readable schema payload',
      eventsCount: 1
    };
  }

  if (product.id === 'aix-prod-849201948857') {
    // AeroPulse TempoFlow Everyday Trainer
    return {
      id: product.id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      sku: product.sku,
      gtin: product.gtin,
      canonicalId: product.id,
      monitoringState: 'changed',
      totalChanges: 1,
      evidenceChanges: 0,
      offerChanges: 1,
      discoveryChanges: 0,
      priority: 'Low',
      priorityScore: 52,
      priorityRationale: 'Landed shipping fee change observed on FleetRunners.',
      lastObservation: '12 Sep 2026 · 17:40 UTC',
      coverage: 86,
      dominantEvidenceState: 'OBSERVED',
      topIssue: 'Shipping fee variation ($5.99 flat rate introduced)',
      eventsCount: 1
    };
  }

  // All other canonical products: stable state
  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    category: product.category,
    sku: product.sku,
    gtin: product.gtin,
    canonicalId: product.id,
    monitoringState: 'stable',
    totalChanges: 0,
    evidenceChanges: 0,
    offerChanges: 0,
    discoveryChanges: 0,
    priority: 'Low',
    priorityScore: 20,
    priorityRationale: 'No telemetry drift detected. Specifications corroborated with partner feeds.',
    lastObservation: '14 Sep 2026 · 06:00 UTC',
    coverage: 92,
    dominantEvidenceState: 'MERCHANT_VERIFIED',
    topIssue: 'No active discrepancies — verified canonical specifications',
    eventsCount: 0
  };
});
