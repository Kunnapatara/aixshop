// src/data/sampleIssuesData.ts
// Representative Issues & Recovery Intelligence Data for AeroPulse Athletics

import {
  CANONICAL_PRODUCT_ID,
  CANONICAL_PRODUCT_SKU,
  CANONICAL_PRODUCT_NAME
} from './canonicalCatalog';
import {
  IssueItem,
  IssuesMetricsSummary
} from '../types/issues';
import { deriveIssuesMetrics } from './telemetrySelectors';

export const sampleIssuesData: IssueItem[] = [
  {
    id: 'iss-001',
    issueNumber: 'ISS-01',
    scope: 'PRODUCT',
    title: 'Return Policy Evidence Missing',
    productId: CANONICAL_PRODUCT_ID,
    productName: CANONICAL_PRODUCT_NAME,
    productSku: CANONICAL_PRODUCT_SKU,
    issueType: 'Evidence Missing',
    severity: 'Critical',
    evidenceState: 'MISSING',
    whyItMatters: 'Return-policy intelligence cannot be safely represented as verified in downstream answer engines without authoritative merchant source confirmation.',
    recoveryState: 'Merchant Verification',
    recoveryClass: 'CLASS_B_EVIDENCE_GATED',
    recoveryEligibility: 'Merchant Required',
    detectedAt: '2 hours ago · Rep. Preview',
    detectedAtTimestamp: Date.now() - 2 * 60 * 60 * 1000,
    deterministicPriority: {
      score: 96,
      level: 'Critical',
      severityFactor: 'Direct consumer transaction blocker',
      buyerImpactFactor: 'Affects Purchase, Trust, and Comparison archetypes',
      evidenceRiskFactor: 'State is MISSING; ungrounded assertion prohibited',
      recoveryUrgencyFactor: 'Immediate verification required for checkout confidence',
      explanationBullets: [
        'Affects Purchase intent: buyers require verified return window before commitment',
        'Evidence state is MISSING: strict zero-hallucination mandate blocks assumed defaults',
        'Downstream AI answer engines penalize products lacking verified return guarantees',
        'Class B Recovery requires explicit merchant verification before resolution'
      ]
    },
    diagnosticReason: 'Automated crawler observed merchant checkout link but found no authoritative Schema.org MerchantReturnPolicy object or structured return window in PDP DOM. In accordance with immutable AIXSHOP principles, Unknown remains Unknown and cannot be inferred.',
    evidenceRecord: {
      value: 'MISSING (No MerchantReturnPolicy found)',
      source: 'Storefront DOM & Schema.org JSON-LD audit',
      detectedAt: 'Today, 09:14 AM (Preview)',
      validUntil: 'Unknown',
      confidence: 'High',
      state: 'MISSING'
    },
    buyerImpacts: {
      Discovery: { status: 'Evidence Blocked', explanation: 'AI shopping agents cannot index return assurance badges.' },
      Problem: { status: 'Not Affected', explanation: 'Product biomechanical utility is not altered by return policy.' },
      Comparison: { status: 'Affected', explanation: 'Comparative evaluation against competing carbon racers is disadvantaged.' },
      Specification: { status: 'Evidence Blocked', explanation: 'Policy clauses (30-day window, restocking fees) are unverified.' },
      Purchase: { status: 'Affected', explanation: 'Critical checkout friction point for prospective buyers.' },
      'Use Case': { status: 'Not Affected', explanation: 'Running performance characteristics remain unaffected.' },
      Trust: { status: 'Affected', explanation: 'High buyer risk perception without explicit merchant backing.' }
    },
    recoveryWorkspace: {
      recoveryClass: 'CLASS_B_EVIDENCE_GATED',
      recoveryClassLabel: 'Class B — Evidence-Gated Recovery',
      currentStateSummary: 'Return policy structured entity is completely absent from product schema and feeds.',
      problemDescription: 'Consumer-facing AI answer engines cannot confirm whether AeroPulse provides a 30-day trial or restocking fees.',
      proposedRecoveryAction: 'Inject structured MerchantReturnPolicy with merchant-authenticated 30-day return window and free return shipping.',
      evidenceRequirement: 'Authoritative Merchant confirmation of return days, return fees, and return method URL.',
      deterministicValidationRules: [
        { id: 'v-101', category: 'Schema', ruleName: 'MerchantReturnPolicy Entity Present', status: 'BLOCKED', detail: 'Awaiting verified merchant input string.' },
        { id: 'v-102', category: 'Evidence', ruleName: 'Source Provenance Grounded', status: 'PASS', detail: 'Authorized merchant user session confirmed.' },
        { id: 'v-103', category: 'Identity', ruleName: 'SKU Association Bound', status: 'PASS', detail: `Bound to SKU ${CANONICAL_PRODUCT_SKU}.` },
        { id: 'v-104', category: 'Discovery', ruleName: 'Answer Engine Indexability', status: 'BLOCKED', detail: 'Requires merchant verification step to complete.' }
      ],
      verificationStatus: 'BLOCKED',
      diff: {
        field: 'hasMerchantReturnPolicy',
        currentValue: 'null / undefined',
        currentEvidenceState: 'MISSING',
        proposedValue: 'MerchantReturnPolicy: 30-day window, FreeReturns, ReturnByMail',
        proposedEvidenceState: 'MERCHANT_VERIFIED',
        validationResult: 'BLOCKED',
        validationReason: 'Conflicting source evidence or unverified statement requires merchant confirmation before state upgrade.'
      }
    },
    history: [
      { stage: 'DETECT', timestamp: '09:14 AM', title: 'Return Policy Missing', description: 'DOM and JSON-LD crawl detected no structured return entity.', state: 'Open' },
      { stage: 'DIAGNOSE', timestamp: '09:15 AM', title: 'Intelligence Problem Classified', description: 'Deterministic engine classified as Critical Evidence Missing.', state: 'Diagnosing' },
      { stage: 'PROPOSE', timestamp: '09:16 AM', title: 'Class B Recovery Proposed', description: 'Generated structured MerchantReturnPolicy remediation block.', state: 'Recovery Proposed' },
      { stage: 'VALIDATE', timestamp: '09:16 AM', title: 'Validation Blocked', description: 'Deterministic rule blocked promotion: merchant verification missing.', state: 'Validation Required' },
      { stage: 'CURRENT', timestamp: '09:20 AM', title: 'Awaiting Merchant Verification', description: 'Standing in Merchant Verification queue.', state: 'Merchant Verification' }
    ],
    previewBadge: 'Representative Issue Preview · Preview Mode',
    changeEventId: 'evt-004'
  },
  {
    id: 'iss-002',
    issueNumber: 'ISS-02',
    scope: 'PRODUCT',
    title: 'Variant GTIN Conflict',
    productId: CANONICAL_PRODUCT_ID,
    productName: CANONICAL_PRODUCT_NAME,
    productSku: 'AP-VSE-BLK-10',
    productVariant: 'Size 10 / Volt Orange',
    issueType: 'Variant Identity',
    severity: 'Critical',
    evidenceState: 'CONFLICT',
    whyItMatters: 'Two authoritative product sources provide conflicting GTIN barcode identifiers for the same variant. Variant resolution and search disambiguation cannot safely occur while identity remains ambiguous.',
    recoveryState: 'Blocked',
    recoveryClass: 'CLASS_B_EVIDENCE_GATED',
    recoveryEligibility: 'Evidence-Gated',
    detectedAt: '3 hours ago · Rep. Preview',
    detectedAtTimestamp: Date.now() - 3 * 60 * 60 * 1000,
    deterministicPriority: {
      score: 98,
      level: 'Critical',
      severityFactor: 'Catalog identity integrity violation',
      buyerImpactFactor: 'Directly impacts Discovery, Specification, Comparison, and Trust',
      evidenceRiskFactor: 'State is CONFLICT; silent resolution strictly prohibited',
      recoveryUrgencyFactor: 'Blocks multi-channel sync and marketplace GTIN verification',
      explanationBullets: [
        'Affects Discovery: Google and ChatGPT cannot match the SKU to manufacturer barcode registry',
        'Evidence state is CONFLICT: Source A (00849201948172) disagrees with Source B (00849201948196)',
        'AIXSHOP strictly refuses to average or guess which barcode is correct',
        'Recovery is blocked until merchant confirms the physical box GS1 barcode'
      ]
    },
    diagnosticReason: 'Two authoritative sources disagree on GTIN14 for variant Size 10: Manufacturer JSON-LD specifies 00849201948172 while Merchant Catalog Feed specifies 00849201948196. Under AIXSHOP non-averaging principle, state remains CONFLICT.',
    evidenceRecord: {
      value: '00849201948172 vs 00849201948196',
      source: 'Manufacturer JSON-LD vs Merchant Catalog Feed',
      detectedAt: 'Today, 08:32 AM (Preview)',
      validUntil: 'Unknown',
      confidence: 'High',
      state: 'CONFLICT',
      sourceDetails: {
        sourceA: { name: 'Manufacturer JSON-LD (GS1 Direct)', value: '00849201948172', detectedAt: '08:30 AM' },
        sourceB: { name: 'Merchant Shopify Catalog Feed', value: '00849201948196', detectedAt: '08:32 AM' }
      }
    },
    buyerImpacts: {
      Discovery: { status: 'Affected', explanation: 'AI shopping engines cannot reliably index or match variant to search queries.' },
      Problem: { status: 'Not Directly Affected' as any, explanation: 'Footwear performance remains unchanged.' },
      Comparison: { status: 'Affected', explanation: 'Price comparison engines split the variant into two disparate products.' },
      Specification: { status: 'Affected', explanation: 'Official GS1 barcode attribute in specification table is contradictory.' },
      Purchase: { status: 'Affected', explanation: 'Risk of buyer receiving wrong warehouse variant upon fulfillment.' },
      'Use Case': { status: 'Not Directly Affected' as any, explanation: 'Marathon racing use case remains unchanged.' },
      Trust: { status: 'Affected', explanation: 'Contradictory identifiers erode trust with AI recommendation crawlers.' }
    },
    recoveryWorkspace: {
      recoveryClass: 'CLASS_B_EVIDENCE_GATED',
      recoveryClassLabel: 'Class B — Evidence-Gated Recovery',
      currentStateSummary: 'Two conflicting GTIN values exist simultaneously in ingested feeds.',
      problemDescription: 'Variant identity is ambiguous. Without resolution, marketplace feeds reject the product and answer engines cannot link reviews.',
      proposedRecoveryAction: 'Present both values to merchant with source timestamps; prompt for physical packaging GS1 confirmation.',
      evidenceRequirement: 'Merchant verification of authoritative barcode from warehouse box or GS1 Certificate.',
      deterministicValidationRules: [
        { id: 'v-201', category: 'Identity', ruleName: 'GS1 GTIN-14 Checksum Valid', status: 'PASS', detail: 'Both candidate strings have valid Modulo 10 check digits.' },
        { id: 'v-202', category: 'Evidence', ruleName: 'Conflict Extermination', status: 'BLOCKED', detail: 'Single authoritative source not yet selected.' },
        { id: 'v-203', category: 'Schema', ruleName: 'ProductModel Unique ID Bound', status: 'BLOCKED', detail: 'Must be singular non-conflicting string.' },
        { id: 'v-204', category: 'Discovery', ruleName: 'Entity Disambiguation Match', status: 'BLOCKED', detail: 'Resolution required.' }
      ],
      verificationStatus: 'BLOCKED',
      diff: {
        field: 'gtin14',
        currentValue: 'CONFLICT: [00849201948172 | 00849201948196]',
        currentEvidenceState: 'CONFLICT',
        proposedValue: '00849201948172 (Pending physical confirmation)',
        proposedEvidenceState: 'MERCHANT_VERIFIED',
        validationResult: 'BLOCKED',
        validationReason: 'Conflicting source evidence remains unresolved. AIXSHOP refuses to manufacture certainty.'
      }
    },
    history: [
      { stage: 'DETECT', timestamp: '08:32 AM', title: 'GTIN Discrepancy Detected', description: 'Observed different barcodes across GS1 and Shopify feeds.', state: 'Open' },
      { stage: 'DIAGNOSE', timestamp: '08:33 AM', title: 'Deterministic Conflict Declared', description: 'Deterministic rule flagged barcode mismatch for variant Size 10.', state: 'Diagnosing' },
      { stage: 'CLASSIFY', timestamp: '08:34 AM', title: 'Class B Evidence-Gated', description: 'Marked as unresolvable by automated heuristics.', state: 'Recovery Proposed' },
      { stage: 'VALIDATE', timestamp: '08:35 AM', title: 'Validation Engine Run', description: 'Rules evaluated: Conflict state detected -> BLOCKED.', state: 'Validation Required' },
      { stage: 'CURRENT', timestamp: '08:40 AM', title: 'Halted at Evidence Gate', description: 'Awaiting merchant arbitration between Source A and Source B.', state: 'Blocked' }
    ],
    previewBadge: 'Representative Issue Preview · Preview Mode',
    changeEventId: 'evt-002'
  },
  {
    id: 'iss-003',
    issueNumber: 'ISS-03',
    scope: 'PRODUCT',
    title: 'Upper Material Conflict',
    productId: CANONICAL_PRODUCT_ID,
    productName: CANONICAL_PRODUCT_NAME,
    productSku: CANONICAL_PRODUCT_SKU,
    issueType: 'Product Attribute',
    severity: 'High',
    evidenceState: 'CONFLICT',
    whyItMatters: 'Conflicting technical textile specifications create contradictory claims in buyer specification queries and comparative reviews.',
    recoveryState: 'Merchant Verification',
    recoveryClass: 'CLASS_B_EVIDENCE_GATED',
    recoveryEligibility: 'Merchant Required',
    detectedAt: '4 hours ago · Rep. Preview',
    detectedAtTimestamp: Date.now() - 4 * 60 * 60 * 1000,
    deterministicPriority: {
      score: 84,
      level: 'High',
      severityFactor: 'Substantive specification discrepancy',
      buyerImpactFactor: 'Affects Specification, Comparison, and Trust archetypes',
      evidenceRiskFactor: 'State is CONFLICT between Brand Spec and Retail Feed',
      recoveryUrgencyFactor: 'High priority to prevent misleading AI product answers',
      explanationBullets: [
        'Affects Specification: AI engines extract conflicting fiber matrix compositions',
        'Evidence state is CONFLICT: Brand official spec says "AeroWeave Bio-Matrix", retailer feed says "Engineered Mesh Poly-Blend"',
        'Requires merchant verification to certify true textile formulation',
        'Cannot be auto-merged by AI synthesis'
      ]
    },
    diagnosticReason: 'Brand technical spec sheet states upper textile is "AeroWeave Bio-Matrix Monofilament" while wholesale retailer feed lists "Engineered Breathable Mesh Poly-Blend". Deterministic attribute classifier identified semantic conflict.',
    evidenceRecord: {
      value: '"AeroWeave Bio-Matrix Monofilament" vs "Engineered Breathable Mesh Poly-Blend"',
      source: 'Brand Official Tech Spec vs Wholesale Retail Feed',
      detectedAt: 'Today, 07:15 AM (Preview)',
      validUntil: 'Unknown',
      confidence: 'Medium',
      state: 'CONFLICT',
      sourceDetails: {
        sourceA: { name: 'Brand Tech Spec (PDF Upload)', value: 'AeroWeave Bio-Matrix Monofilament', detectedAt: '07:10 AM' },
        sourceB: { name: 'Wholesale Retail Partner Feed', value: 'Engineered Breathable Mesh Poly-Blend', detectedAt: '07:15 AM' }
      }
    },
    buyerImpacts: {
      Discovery: { status: 'Evidence Blocked', explanation: 'Material-specific semantic searches cannot confirm bio-textile badge.' },
      Problem: { status: 'Not Affected', explanation: 'Breathability performance remains intact.' },
      Comparison: { status: 'Affected', explanation: 'Cannot be accurately benchmarked against competitor monofilament uppers.' },
      Specification: { status: 'Affected', explanation: 'Direct conflict in material composition specification.' },
      Purchase: { status: 'Not Affected', explanation: 'Rarely a primary impulse checkout blocker.' },
      'Use Case': { status: 'Not Affected', explanation: 'Road racing use case verified.' },
      Trust: { status: 'Affected', explanation: 'Contradictory technical specifications damage brand authority.' }
    },
    recoveryWorkspace: {
      recoveryClass: 'CLASS_B_EVIDENCE_GATED',
      recoveryClassLabel: 'Class B — Evidence-Gated Recovery',
      currentStateSummary: 'Two conflicting material descriptions ingested from authoritative documentation.',
      problemDescription: 'Downstream synthetic summaries oscillate between proprietary monofilament and standard engineered mesh.',
      proposedRecoveryAction: 'Set material attribute to verified brand engineering formulation with patent identifier.',
      evidenceRequirement: 'Merchant verification selecting authoritative brand terminology.',
      deterministicValidationRules: [
        { id: 'v-301', category: 'Schema', ruleName: 'material Attribute Format Valid', status: 'PASS', detail: 'String complies with Schema.org material specifications.' },
        { id: 'v-302', category: 'Evidence', ruleName: 'Single Provenance Established', status: 'BLOCKED', detail: 'Currently two conflicting sources.' },
        { id: 'v-303', category: 'Discovery', ruleName: 'Textile Terminology Grounding', status: 'PASS', detail: 'Vocabulary recognized in sports footwear ontology.' }
      ],
      verificationStatus: 'BLOCKED',
      diff: {
        field: 'material',
        currentValue: 'CONFLICT: [AeroWeave Bio-Matrix vs Engineered Mesh]',
        currentEvidenceState: 'CONFLICT',
        proposedValue: 'AeroWeave Bio-Matrix Monofilament (100% Recycled)',
        proposedEvidenceState: 'MERCHANT_VERIFIED',
        validationResult: 'BLOCKED',
        validationReason: 'Merchant confirmation required to authenticate brand spec over partner catalog.'
      }
    },
    history: [
      { stage: 'DETECT', timestamp: '07:15 AM', title: 'Textile Spec Disagreement', description: 'Detected semantic collision between spec sheet and wholesale feed.', state: 'Open' },
      { stage: 'DIAGNOSE', timestamp: '07:16 AM', title: 'Attribute Conflict Logged', description: 'Deterministic engine marked attribute as CONFLICT.', state: 'Diagnosing' },
      { stage: 'VALIDATE', timestamp: '07:18 AM', title: 'Validation Evaluated', description: 'Rules evaluated: Multi-source conflict blocked automatic resolution.', state: 'Validation Required' },
      { stage: 'CURRENT', timestamp: '07:25 AM', title: 'Pending Merchant Input', description: 'Standing in Merchant Verification queue.', state: 'Merchant Verification' }
    ],
    previewBadge: 'Representative Issue Preview · Preview Mode',
    changeEventId: 'evt-008'
  },
  {
    id: 'iss-004',
    issueNumber: 'ISS-04',
    scope: 'OFFER',
    title: 'Observed Offer Price Changed',
    productId: 'aix-prod-849201948857',
    productName: 'AeroPulse TempoFlow Everyday Trainer',
    productSku: 'AP-TFT-015',
    issueType: 'Offer Integrity',
    severity: 'Medium',
    evidenceState: 'OBSERVED',
    whyItMatters: 'Observed offer price changed from $129.00 to $119.00. Under AIXSHOP principles, a change is NOT automatically an issue; this is diagnosed as an issue only because merchant feed continues broadcasting $129.00, creating checkout price variance.',
    recoveryState: 'Open',
    recoveryClass: 'CLASS_A_DETERMINISTIC',
    recoveryEligibility: 'Eligible',
    detectedAt: '5 hours ago · Rep. Preview',
    detectedAtTimestamp: Date.now() - 5 * 60 * 60 * 1000,
    deterministicPriority: {
      score: 68,
      level: 'Medium',
      severityFactor: 'Feed vs storefront offer desynchronization',
      buyerImpactFactor: 'Affects Purchase and Comparison archetypes',
      evidenceRiskFactor: 'State is OBSERVED; feed lags live storefront price',
      recoveryUrgencyFactor: 'Should be resolved before external shopping agents cache stale price',
      explanationBullets: [
        'Affects Purchase: Customers clicking external search ads may observe unexpected discount or mismatch',
        'A price change is NOT automatically an issue; the problem is feed-storefront desync',
        'Storefront DOM: $119.00 (Active Sale); Merchant Feed: $129.00 (Stale)',
        'Class A Recovery can deterministically synchronize schema feed from live offer'
      ]
    },
    diagnosticReason: 'Live storefront observation recorded price drop to $119.00. Deterministic diagnostic rule flagged an issue because merchant Google Shopping feed continues broadcasting $129.00. The change itself is legitimate; the feed divergence is the issue.',
    evidenceRecord: {
      value: '$119.00 (Storefront) vs $129.00 (Export Feed)',
      source: 'Storefront DOM Crawler vs Google Shopping Merchant Feed',
      detectedAt: 'Today, 06:45 AM (Preview)',
      validUntil: 'Until next scheduled feed sync',
      confidence: 'High',
      state: 'OBSERVED'
    },
    buyerImpacts: {
      Discovery: { status: 'Not Affected', explanation: 'Product remains fully discoverable.' },
      Problem: { status: 'Not Affected', explanation: 'Workout pacing utility remains unchanged.' },
      Comparison: { status: 'Affected', explanation: 'Price comparison engines show outdated $129.00 valuation.' },
      Specification: { status: 'Not Affected', explanation: 'Weight, stack height, and drop are unchanged.' },
      Purchase: { status: 'Affected', explanation: 'Price discrepancy creates checkout hesitation.' },
      'Use Case': { status: 'Not Affected', explanation: 'Daily tempo running application remains valid.' },
      Trust: { status: 'Affected', explanation: 'Price mismatch across channels diminishes merchant transparency.' }
    },
    recoveryWorkspace: {
      recoveryClass: 'CLASS_A_DETERMINISTIC',
      recoveryClassLabel: 'Class A — Deterministic Recovery',
      currentStateSummary: 'Storefront DOM offers item at $119.00 while Merchant Feed outputs $129.00.',
      problemDescription: 'Feed divergence triggers Google Merchant Center price mismatch warnings if unaddressed.',
      proposedRecoveryAction: 'Recompute Schema.org Offer.price to $119.00 and regenerate structured feed payload.',
      evidenceRequirement: 'Authoritative storefront DOM snapshot verified with cryptographic timestamp.',
      deterministicValidationRules: [
        { id: 'v-401', category: 'Schema', ruleName: 'Offer.price ISO Currency Compliant', status: 'PASS', detail: 'USD formatted correctly with decimal precision.' },
        { id: 'v-402', category: 'Evidence', ruleName: 'Storefront DOM Snapshot Grounded', status: 'PASS', detail: 'Snapshot confirmed at 06:45 AM.' },
        { id: 'v-403', category: 'Identity', ruleName: 'Product ≠ Offer Separation Preserved', status: 'PASS', detail: 'Offer entity modified without altering immutable Product entity.' }
      ],
      verificationStatus: 'VERIFIED',
      diff: {
        field: 'offers[0].price',
        currentValue: '129.00 USD (Feed)',
        currentEvidenceState: 'OBSERVED',
        proposedValue: '119.00 USD (Synchronized with Storefront DOM)',
        proposedEvidenceState: 'MERCHANT_VERIFIED',
        validationResult: 'PASS',
        validationReason: 'Deterministic synchronization rule validated against verified live DOM snapshot.'
      }
    },
    history: [
      { stage: 'DETECT', timestamp: '06:45 AM', title: 'Price Change Observed', description: 'Storefront DOM observed at $119.00 (down from $129.00).', state: 'Open' },
      { stage: 'DIAGNOSE', timestamp: '06:46 AM', title: 'Desync Diagnosis Confirmed', description: 'Diagnostic rule confirmed feed mismatch issue (not just price drop).', state: 'Diagnosing' },
      { stage: 'CURRENT', timestamp: '06:50 AM', title: 'Open in Recovery Queue', description: 'Eligible for deterministic remediation proposal.', state: 'Open' }
    ],
    previewBadge: 'Representative Issue Preview · Preview Mode',
    changeEventId: 'evt-001'
  },
  {
    id: 'iss-005',
    issueNumber: 'ISS-05',
    scope: 'PRODUCT',
    title: 'Discovery Attribute Coverage Degraded',
    productId: 'aix-prod-849201948913',
    productName: 'AeroPulse TrailCore X Mountain Shoe',
    productSku: 'AP-TCX-017',
    issueType: 'Discovery Readiness',
    severity: 'High',
    evidenceState: 'DERIVED',
    whyItMatters: 'Variant outsole lug depth and waterproofing rating became incomplete after a detected source JSON-LD update, dropping structured attribute coverage from 94% to 61%. AI search engines require explicit terrain depth metrics to recommend footwear for technical wet mountain trails.',
    recoveryState: 'Recovery Proposed',
    recoveryClass: 'CLASS_A_DETERMINISTIC',
    recoveryEligibility: 'Eligible',
    detectedAt: '6 hours ago · Rep. Preview',
    detectedAtTimestamp: Date.now() - 6 * 60 * 60 * 1000,
    deterministicPriority: {
      score: 82,
      level: 'High',
      severityFactor: 'AI search synthesis readiness degradation',
      buyerImpactFactor: 'Directly damages Discovery, Specification, and Use Case matches',
      evidenceRiskFactor: 'State is DERIVED; values were lost during schema re-export',
      recoveryUrgencyFactor: 'High urgency to recover visibility in conversational search engines',
      explanationBullets: [
        'Affects Discovery: ChatGPT and Gemini omit shoe for "technical muddy trail" queries',
        'Affects Use Case: Missing 5mm lug depth parameter prevents terrain qualification',
        'Evidence state is DERIVED from catalog spec sheet; safe deterministic recovery available',
        'Class A transformation can restore schema attributes without inventing values'
      ]
    },
    diagnosticReason: 'Source update to product template stripped additionalProperty schema array containing lugDepth (5mm) and waterResistance (GORE-TEX Invisible Fit). Deterministic recovery can regenerate these attributes from verified product spec repository.',
    evidenceRecord: {
      value: 'Coverage dropped from 94% -> 61% (Missing lugDepth, waterResistance)',
      source: 'Deterministic Discovery Readiness Engine',
      detectedAt: 'Today, 05:20 AM (Preview)',
      validUntil: 'Indefinite until remediated',
      confidence: 'High',
      state: 'DERIVED'
    },
    buyerImpacts: {
      Discovery: { status: 'Affected', explanation: 'Dropped from AI generative shopping comparisons for trail categories.' },
      Problem: { status: 'Affected', explanation: 'Fails to answer "best shoes for slick mud" problem queries.' },
      Comparison: { status: 'Affected', explanation: 'Lug depth comparison table displays blank entries.' },
      Specification: { status: 'Affected', explanation: 'Key technical metrics missing from structured JSON-LD.' },
      Purchase: { status: 'Not Affected', explanation: 'Checkout path remains functional.' },
      'Use Case': { status: 'Affected', explanation: 'Severe loss of relevance for alpine and muddy terrain queries.' },
      Trust: { status: 'Evidence Blocked', explanation: 'Waterproofing claims ungrounded in schema microdata.' }
    },
    recoveryWorkspace: {
      recoveryClass: 'CLASS_A_DETERMINISTIC',
      recoveryClassLabel: 'Class A — Deterministic Recovery',
      currentStateSummary: 'Schema.org JSON-LD is missing technical outdoor attributes.',
      problemDescription: 'Conversational answer engines cannot extract lug depth or membrane type, causing recommendation suppression.',
      proposedRecoveryAction: 'Inject deterministic additionalProperty nodes for lugDepth=5mm and waterResistance=GORE-TEX Invisible Fit from verified spec vault.',
      evidenceRequirement: 'Verified Brand Spec Sheet AP-TC-SPEC-REV3.',
      deterministicValidationRules: [
        { id: 'v-501', category: 'Schema', ruleName: 'PropertyValue Structured Array Valid', status: 'PASS', detail: 'Complies with Schema.org PropertyValue specifications.' },
        { id: 'v-502', category: 'Discovery', ruleName: 'Answer Engine Intent Alignment', status: 'PASS', detail: 'Matches outdoor gear technical search ontology.' },
        { id: 'v-503', category: 'Evidence', ruleName: 'Ungrounded Inference Prevented', status: 'PASS', detail: 'Values derived directly from verified PDF spec sheet.' }
      ],
      verificationStatus: 'VERIFIED',
      diff: {
        field: 'additionalProperty',
        currentValue: '[] (Empty array)',
        currentEvidenceState: 'MISSING',
        proposedValue: '[{"@type":"PropertyValue","name":"lugDepth","value":"5mm"},{"@type":"PropertyValue","name":"waterproofing","value":"GORE-TEX Invisible Fit"}]',
        proposedEvidenceState: 'DERIVED',
        validationResult: 'PASS',
        validationReason: 'Deterministic extraction rule matches authoritative specification document.'
      }
    },
    history: [
      { stage: 'DETECT', timestamp: '05:20 AM', title: 'Schema Coverage Drop', description: 'Attribute coverage dropped below 70% threshold.', state: 'Open' },
      { stage: 'DIAGNOSE', timestamp: '05:21 AM', title: 'Missing Intent Attributes', description: 'Diagnosed missing lugDepth and waterproofing properties.', state: 'Diagnosing' },
      { stage: 'PROPOSE', timestamp: '05:22 AM', title: 'Remediation Generated', description: 'Generated structured Schema.org addition from spec vault.', state: 'Recovery Proposed' },
      { stage: 'CURRENT', timestamp: '05:30 AM', title: 'Awaiting User Review', description: 'Ready for deterministic injection in Fix & Verification.', state: 'Recovery Proposed' }
    ],
    previewBadge: 'Representative Issue Preview · Preview Mode',
    changeEventId: 'evt-007'
  },
  {
    id: 'iss-006',
    issueNumber: 'ISS-06',
    scope: 'PRODUCT',
    title: 'Duplicate Variant SKU Collision',
    productId: 'aix-prod-849201948880',
    productName: 'AeroPulse Velocity Carbon Pro 5K/10K',
    productSku: 'AP-VCP-016',
    productVariant: "Men's 9.5 vs Women's 11",
    issueType: 'Variant Identity',
    severity: 'Critical',
    evidenceState: 'CONFLICT',
    whyItMatters: 'SKU collision detected across Men\'s Size 9.5 and Women\'s Size 11 variants, corrupting catalog hierarchy and creating warehouse fulfillment hazard.',
    recoveryState: 'Validation Required',
    recoveryClass: 'CLASS_B_EVIDENCE_GATED',
    recoveryEligibility: 'Evidence-Gated',
    detectedAt: '7 hours ago · Rep. Preview',
    detectedAtTimestamp: Date.now() - 7 * 60 * 60 * 1000,
    deterministicPriority: {
      score: 94,
      level: 'Critical',
      severityFactor: 'Severe catalog collision hazard',
      buyerImpactFactor: 'Affects Purchase, Trust, and Specification',
      evidenceRiskFactor: 'State is CONFLICT; duplicate SKU across gender models',
      recoveryUrgencyFactor: 'Critical priority to prevent order mispicks',
      explanationBullets: [
        'Affects Purchase: Customers buying Men\'s 9.5 may receive Women\'s 11',
        'Evidence state is CONFLICT: AP-VC-002-95 assigned to two different physical shoes',
        'Recovery requires merchant arbitration to reassign distinct SKU suffixes',
        'Blocked from automated resolution to prevent shipping errors'
      ]
    },
    diagnosticReason: 'Database ingestion found identical SKU AP-VC-002-95 mapped to both Men\'s 9.5 and Women\'s 11 in Shopify variant table.',
    evidenceRecord: {
      value: 'AP-VC-002-95 (Duplicated across two variant IDs)',
      source: 'Shopify Variant API endpoint',
      detectedAt: 'Today, 04:10 AM (Preview)',
      validUntil: 'Unknown',
      confidence: 'High',
      state: 'CONFLICT'
    },
    buyerImpacts: {
      Discovery: { status: 'Evidence Blocked', explanation: 'AI engines conflate gender sizing specifications.' },
      Problem: { status: 'Not Affected', explanation: 'Running mechanics unaffected.' },
      Comparison: { status: 'Affected', explanation: 'Gender sizing comparison breaks.' },
      Specification: { status: 'Affected', explanation: 'Sole dimensions mismatch assigned gender.' },
      Purchase: { status: 'Affected', explanation: 'Severe return hazard due to sizing mismatch.' },
      'Use Case': { status: 'Not Affected', explanation: 'Pacing shoes unaffected.' },
      Trust: { status: 'Affected', explanation: 'Critical fulfillment risk.' }
    },
    recoveryWorkspace: {
      recoveryClass: 'CLASS_B_EVIDENCE_GATED',
      recoveryClassLabel: 'Class B — Evidence-Gated Recovery',
      currentStateSummary: 'Two distinct physical products share identical alphanumeric SKU code.',
      problemDescription: 'Fulfillment systems cannot differentiate stock levels between Men\'s and Women\'s variants.',
      proposedRecoveryAction: 'Append standard gender differentiator: AP-VC-002-M95 and AP-VC-002-W11.',
      evidenceRequirement: 'Merchant verification of warehouse inventory management codes.',
      deterministicValidationRules: [
        { id: 'v-601', category: 'Identity', ruleName: 'Variant SKU Uniqueness', status: 'FAIL', detail: 'AP-VC-002-95 is non-unique in catalog index.' },
        { id: 'v-602', category: 'Schema', ruleName: 'ProductModel Parent-Child Link', status: 'BLOCKED', detail: 'Hierarchy blocked until uniqueness restored.' }
      ],
      verificationStatus: 'BLOCKED',
      diff: {
        field: 'sku',
        currentValue: 'AP-VC-002-95 (Collision)',
        currentEvidenceState: 'CONFLICT',
        proposedValue: 'AP-VC-002-M95 (Proposed)',
        proposedEvidenceState: 'MERCHANT_VERIFIED',
        validationResult: 'BLOCKED',
        validationReason: 'Requires merchant sign-off to ensure warehouse barcode scanners support suffix change.'
      }
    },
    history: [
      { stage: 'DETECT', timestamp: '04:10 AM', title: 'SKU Collision Flagged', description: 'Duplicate SKU detected on variant load.', state: 'Open' },
      { stage: 'DIAGNOSE', timestamp: '04:11 AM', title: 'Variant Identity Conflict', description: 'Deterministic validator marked state as CONFLICT.', state: 'Diagnosing' },
      { stage: 'CURRENT', timestamp: '04:15 AM', title: 'Validation Required', description: 'Awaiting merchant SKU assignment.', state: 'Validation Required' }
    ],
    previewBadge: 'Representative Issue Preview · Preview Mode'
  },
  {
    id: 'iss-007',
    issueNumber: 'ISS-07',
    scope: 'OFFER',
    title: 'Inconsistent Availability Feed Microdata',
    productId: 'aix-prod-849201948634',
    productName: 'AeroKnit Recovery Slide Cushion',
    productSku: 'AP-REC-008',
    issueType: 'Availability',
    severity: 'Medium',
    evidenceState: 'CONFLICT',
    whyItMatters: 'Storefront displays "In Stock (3 Left)" while Schema.org microdata broadcasts "OutOfStock", causing AI recommendation models to bypass product.',
    recoveryState: 'Diagnosing',
    recoveryClass: 'CLASS_A_DETERMINISTIC',
    recoveryEligibility: 'Eligible',
    detectedAt: '8 hours ago · Rep. Preview',
    detectedAtTimestamp: Date.now() - 8 * 60 * 60 * 1000,
    deterministicPriority: {
      score: 72,
      level: 'Medium',
      severityFactor: 'Stock availability signal contradiction',
      buyerImpactFactor: 'Affects Purchase and Discovery archetypes',
      evidenceRiskFactor: 'State is CONFLICT between visual DOM and JSON-LD',
      recoveryUrgencyFactor: 'Loss of sales while out-of-stock badge is erroneously served',
      explanationBullets: [
        'Affects Purchase: Shoppers think shoe is sold out in search snippets',
        'Storefront button: "Add to Cart" (Active); Schema: ItemAvailability.OutOfStock',
        'Deterministic rule can resync schema to inventory quantity > 0',
        'Prevents lost revenue from premature stockout signals'
      ]
    },
    diagnosticReason: 'Theme liquid template did not re-render JSON-LD microdata when inventory replenished from 0 to 3 units.',
    evidenceRecord: {
      value: 'DOM: "In Stock" vs Schema: "https://schema.org/OutOfStock"',
      source: 'Realtime DOM parse vs Embedded Microdata',
      detectedAt: 'Today, 03:00 AM (Preview)',
      validUntil: 'Until next inventory webhook',
      confidence: 'High',
      state: 'CONFLICT'
    },
    buyerImpacts: {
      Discovery: { status: 'Affected', explanation: 'Excluded from "available to buy" search filters.' },
      Problem: { status: 'Not Affected', explanation: 'Post-run recovery benefits unchanged.' },
      Comparison: { status: 'Affected', explanation: 'Competitors shown as in-stock while AeroPulse appears unavailable.' },
      Specification: { status: 'Not Affected', explanation: 'EVA foam specs unchanged.' },
      Purchase: { status: 'Affected', explanation: 'Buyers abandon before visiting site.' },
      'Use Case': { status: 'Not Affected', explanation: 'Active recovery use case valid.' },
      Trust: { status: 'Affected', explanation: 'Confusing stock state creates hesitation.' }
    },
    recoveryWorkspace: {
      recoveryClass: 'CLASS_A_DETERMINISTIC',
      recoveryClassLabel: 'Class A — Deterministic Recovery',
      currentStateSummary: 'Availability schema claims out of stock while inventory level is positive.',
      problemDescription: 'Search crawlers downrank product under the assumption inventory is exhausted.',
      proposedRecoveryAction: 'Switch Offer.availability to https://schema.org/InStock with itemCondition=NewCondition.',
      evidenceRequirement: 'Warehouse inventory level snapshot >= 1.',
      deterministicValidationRules: [
        { id: 'v-701', category: 'Schema', ruleName: 'Schema.org ItemAvailability URI Valid', status: 'PASS', detail: 'Conforms to schema.org/InStock.' },
        { id: 'v-702', category: 'Evidence', ruleName: 'Positive Stock Level Confirmed', status: 'PASS', detail: 'Current inventory quantity is 3.' }
      ],
      verificationStatus: 'VERIFIED',
      diff: {
        field: 'offers[0].availability',
        currentValue: 'https://schema.org/OutOfStock',
        currentEvidenceState: 'CONFLICT',
        proposedValue: 'https://schema.org/InStock',
        proposedEvidenceState: 'MERCHANT_VERIFIED',
        validationResult: 'PASS',
        validationReason: 'Storefront inventory count confirms availability.'
      }
    },
    history: [
      { stage: 'DETECT', timestamp: '03:00 AM', title: 'Availability Mismatch Flagged', description: 'DOM shows in stock, JSON-LD shows out of stock.', state: 'Open' },
      { stage: 'CURRENT', timestamp: '03:05 AM', title: 'Diagnosing Root Cause', description: 'Inspecting theme template liquid synchronization.', state: 'Diagnosing' }
    ],
    previewBadge: 'Representative Issue Preview · Preview Mode'
  },
  {
    id: 'iss-008',
    issueNumber: 'ISS-08',
    scope: 'OFFER',
    title: 'Promotional Expiration Schema Mismatch',
    productId: 'aix-prod-849201948601',
    productName: 'CloudDrift Daily Trainer v3',
    productSku: 'AP-CDT-007',
    issueType: 'Promotion',
    severity: 'Low',
    evidenceState: 'OBSERVED',
    whyItMatters: 'Flash sale pricing schema is missing explicit priceValidUntil ISO datetime, preventing structured promotional badge indexing in Google Shopping.',
    recoveryState: 'Open',
    recoveryClass: 'CLASS_A_DETERMINISTIC',
    recoveryEligibility: 'Eligible',
    detectedAt: '10 hours ago · Rep. Preview',
    detectedAtTimestamp: Date.now() - 10 * 60 * 60 * 1000,
    deterministicPriority: {
      score: 45,
      level: 'Low',
      severityFactor: 'Non-blocking promotional enrichment gap',
      buyerImpactFactor: 'Affects Comparison and Discovery archetypes',
      evidenceRiskFactor: 'State is OBSERVED; promotional price active but lacks expiration ISO timestamp',
      recoveryUrgencyFactor: 'Low urgency; core product purchasing still active',
      explanationBullets: [
        'Affects Comparison: Deal badges in shopping carousels require explicit end date',
        'Evidence state is OBSERVED from storefront promo countdown timer',
        'Deterministic rule can format datetime from promo end schedule',
        'Safe Class A transformation'
      ]
    },
    diagnosticReason: 'Storefront displays promotional banner "Sale ends Sunday midnight" but Offer schema lacks priceValidUntil ISO 8601 attribute.',
    evidenceRecord: {
      value: 'Missing priceValidUntil in Offer schema',
      source: 'JSON-LD crawler audit',
      detectedAt: 'Yesterday, 11:30 PM (Preview)',
      validUntil: 'End of current promo cycle',
      confidence: 'Medium',
      state: 'OBSERVED'
    },
    buyerImpacts: {
      Discovery: { status: 'Affected', explanation: 'Missing "Sale" badge in structured search listings.' },
      Problem: { status: 'Not Affected', explanation: 'Max-cushion racing support unaffected.' },
      Comparison: { status: 'Affected', explanation: 'Deal comparison engines disregard unexpiring prices as everyday prices.' },
      Specification: { status: 'Not Affected', explanation: 'Technical attributes unaffected.' },
      Purchase: { status: 'Not Affected', explanation: 'Promo price honored at checkout.' },
      'Use Case': { status: 'Not Affected', explanation: 'Recovery running use case unaffected.' },
      Trust: { status: 'Not Affected', explanation: 'Transparency remains acceptable.' }
    },
    recoveryWorkspace: {
      recoveryClass: 'CLASS_A_DETERMINISTIC',
      recoveryClassLabel: 'Class A — Deterministic Recovery',
      currentStateSummary: 'Offer has sale price but lacks machine-readable validity timestamp.',
      problemDescription: 'Search engines discard promotional flags without verified expiration date.',
      proposedRecoveryAction: 'Set priceValidUntil to 2026-09-20T23:59:59Z.',
      evidenceRequirement: 'Merchant promotional calendar schedule.',
      deterministicValidationRules: [
        { id: 'v-801', category: 'Schema', ruleName: 'ISO 8601 DateTime Compliant', status: 'PASS', detail: '2026-09-20T23:59:59Z format valid.' },
        { id: 'v-802', category: 'Evidence', ruleName: 'Future Timestamp Verified', status: 'PASS', detail: 'Expiration date is in the future.' }
      ],
      verificationStatus: 'VERIFIED',
      diff: {
        field: 'offers[0].priceValidUntil',
        currentValue: 'null',
        currentEvidenceState: 'MISSING',
        proposedValue: '2026-09-20T23:59:59Z',
        proposedEvidenceState: 'MERCHANT_VERIFIED',
        validationResult: 'PASS',
        validationReason: 'Complies with Google Merchant Center promotional guidelines.'
      }
    },
    history: [
      { stage: 'DETECT', timestamp: '11:30 PM', title: 'Promotional Date Missing', description: 'Offer schema missing validUntil timestamp.', state: 'Open' },
      { stage: 'CURRENT', timestamp: '11:35 PM', title: 'Logged in Issue Queue', description: 'Ready for deterministic resolution.', state: 'Open' }
    ],
    previewBadge: 'Representative Issue Preview · Preview Mode'
  },
  // RECENTLY RESOLVED ISSUES (4 Representative issues illustrating the resolved lifecycle)
  {
    id: 'iss-009',
    issueNumber: 'ISS-09',
    scope: 'PRODUCT',
    title: 'Weight Attribute Schema Normalized',
    productId: CANONICAL_PRODUCT_ID,
    productName: CANONICAL_PRODUCT_NAME,
    productSku: CANONICAL_PRODUCT_SKU,
    issueType: 'Product Attribute',
    severity: 'Medium',
    evidenceState: 'MERCHANT_VERIFIED',
    whyItMatters: 'Shoe weight was previously listed as "198g" without unitCode quantitative specification, causing filter errors in comparison engines.',
    recoveryState: 'Resolved',
    recoveryClass: 'CLASS_A_DETERMINISTIC',
    recoveryEligibility: 'Eligible',
    detectedAt: '1 day ago · Rep. Preview',
    detectedAtTimestamp: Date.now() - 24 * 60 * 60 * 1000,
    deterministicPriority: {
      score: 30,
      level: 'Low',
      severityFactor: 'Resolved formatting normalization',
      buyerImpactFactor: 'Specification recovered',
      evidenceRiskFactor: 'State is MERCHANT VERIFIED',
      recoveryUrgencyFactor: 'Resolved',
      explanationBullets: [
        'Resolved via deterministic QuantitativeValue transformation',
        'Verified in preview verification model',
        'Does not modify external source systems'
      ]
    },
    diagnosticReason: 'Schema.org weight node lacked QuantitativeValue unitCode "GRM". Deterministic rule transformed "198g" into structured object.',
    evidenceRecord: {
      value: '{"@type":"QuantitativeValue","value":198,"unitCode":"GRM"}',
      source: 'Normalized from Brand Spec',
      detectedAt: 'Yesterday, 02:00 PM (Preview)',
      validUntil: 'Indefinite',
      confidence: 'High',
      state: 'MERCHANT_VERIFIED'
    },
    buyerImpacts: {
      Discovery: { status: 'Not Affected', explanation: 'Fully indexable.' },
      Problem: { status: 'Not Affected', explanation: 'N/A' },
      Comparison: { status: 'Not Affected', explanation: 'Weight filters operate smoothly.' },
      Specification: { status: 'Not Affected', explanation: 'Normalized.' },
      Purchase: { status: 'Not Affected', explanation: 'N/A' },
      'Use Case': { status: 'Not Affected', explanation: 'N/A' },
      Trust: { status: 'Not Affected', explanation: 'Grounded.' }
    },
    recoveryWorkspace: {
      recoveryClass: 'CLASS_A_DETERMINISTIC',
      recoveryClassLabel: 'Class A — Deterministic Recovery',
      currentStateSummary: 'Weight attribute correctly formatted as Schema.org QuantitativeValue.',
      problemDescription: 'Previously unformatted string prevented automated filtering.',
      proposedRecoveryAction: 'Resolved.',
      evidenceRequirement: 'Brand spec confirmation.',
      deterministicValidationRules: [
        { id: 'v-901', category: 'Schema', ruleName: 'QuantitativeValue Valid', status: 'PASS', detail: 'Passed schema audit.' }
      ],
      verificationStatus: 'VERIFIED',
      diff: {
        field: 'weight',
        currentValue: '198g (raw string)',
        currentEvidenceState: 'OBSERVED',
        proposedValue: '{"@type":"QuantitativeValue","value":198,"unitCode":"GRM"}',
        proposedEvidenceState: 'MERCHANT_VERIFIED',
        validationResult: 'PASS',
        validationReason: 'Successfully normalized.'
      }
    },
    history: [
      { stage: 'DETECT', timestamp: '1 day ago', title: 'Raw string weight detected', description: 'Found 198g unparsed.', state: 'Open' },
      { stage: 'RESOLVED', timestamp: 'Yesterday', title: 'Normalized & Verified', description: 'Transformed to QuantitativeValue GRM.', state: 'Resolved' }
    ],
    previewBadge: 'Representative Issue Preview · Preview Mode',
    isResolved: true
  },
  {
    id: 'iss-010',
    issueNumber: 'ISS-10',
    scope: 'PRODUCT',
    title: 'Primary Image Aspect Ratio Realigned',
    productId: 'aix-prod-849201948857',
    productName: 'AeroPulse TempoFlow Everyday Trainer',
    productSku: 'AP-TFT-015',
    issueType: 'Source Drift',
    severity: 'Low',
    evidenceState: 'MERCHANT_VERIFIED',
    whyItMatters: 'Primary hero image crop ratio had shifted to 4:3, causing bottom sole clip in mobile search carousels.',
    recoveryState: 'Resolved',
    recoveryClass: 'CLASS_A_DETERMINISTIC',
    recoveryEligibility: 'Eligible',
    detectedAt: '2 days ago · Rep. Preview',
    detectedAtTimestamp: Date.now() - 48 * 60 * 60 * 1000,
    deterministicPriority: {
      score: 25,
      level: 'Low',
      severityFactor: 'Visual aspect ratio alignment',
      buyerImpactFactor: 'Discovery preview restored',
      evidenceRiskFactor: 'State is MERCHANT VERIFIED',
      recoveryUrgencyFactor: 'Resolved',
      explanationBullets: ['Replaced with 1:1 square master asset from CDN']
    },
    diagnosticReason: 'Clipped aspect ratio detected by preview image validator. Realigned to CDN 1:1 master asset.',
    evidenceRecord: {
      value: '1:1 Square (2000x2000px master asset)',
      source: 'AeroPulse CDN Master Assets',
      detectedAt: '2 days ago (Preview)',
      validUntil: 'Indefinite',
      confidence: 'High',
      state: 'MERCHANT_VERIFIED'
    },
    buyerImpacts: {
      Discovery: { status: 'Not Affected', explanation: 'Images render without clipping.' },
      Problem: { status: 'Not Affected', explanation: 'N/A' },
      Comparison: { status: 'Not Affected', explanation: 'N/A' },
      Specification: { status: 'Not Affected', explanation: 'N/A' },
      Purchase: { status: 'Not Affected', explanation: 'N/A' },
      'Use Case': { status: 'Not Affected', explanation: 'N/A' },
      Trust: { status: 'Not Affected', explanation: 'Clean visual presentation.' }
    },
    recoveryWorkspace: {
      recoveryClass: 'CLASS_A_DETERMINISTIC',
      recoveryClassLabel: 'Class A — Deterministic Recovery',
      currentStateSummary: 'Image URL points to verified 1:1 master ratio.',
      problemDescription: 'Previously clipped image.',
      proposedRecoveryAction: 'Resolved.',
      evidenceRequirement: 'CDN URL verified.',
      deterministicValidationRules: [
        { id: 'v-1001', category: 'Schema', ruleName: 'ImageObject Aspect Ratio 1:1', status: 'PASS', detail: 'Passed.' }
      ],
      verificationStatus: 'VERIFIED',
      diff: {
        field: 'image[0]',
        currentValue: 'https://cdn.aeropulse.com/img/tempo-4x3.jpg',
        currentEvidenceState: 'OBSERVED',
        proposedValue: 'https://cdn.aeropulse.com/img/tempo-1x1-master.jpg',
        proposedEvidenceState: 'MERCHANT_VERIFIED',
        validationResult: 'PASS',
        validationReason: 'Aligned with Google Shopping standards.'
      }
    },
    history: [
      { stage: 'RESOLVED', timestamp: '2 days ago', title: 'Asset Replaced & Verified', description: 'Realigned to 1:1 master.', state: 'Resolved' }
    ],
    previewBadge: 'Representative Issue Preview · Preview Mode',
    isResolved: true
  },
  {
    id: 'iss-011',
    issueNumber: 'ISS-11',
    scope: 'OFFER',
    title: 'Manufacturer Currency Symbol Standardized',
    productId: 'aix-prod-849201948913',
    productName: 'AeroPulse TrailCore X Mountain Shoe',
    productSku: 'AP-TCX-017',
    issueType: 'Offer Integrity',
    severity: 'Low',
    evidenceState: 'MERCHANT_VERIFIED',
    whyItMatters: 'Currency prefix contained Unicode character variance ("$" vs "US$"), creating feed validation warnings.',
    recoveryState: 'Resolved',
    recoveryClass: 'CLASS_A_DETERMINISTIC',
    recoveryEligibility: 'Eligible',
    detectedAt: '3 days ago · Rep. Preview',
    detectedAtTimestamp: Date.now() - 72 * 60 * 60 * 1000,
    deterministicPriority: {
      score: 20,
      level: 'Low',
      severityFactor: 'Currency ISO standardization',
      buyerImpactFactor: 'Schema clean',
      evidenceRiskFactor: 'State is MERCHANT VERIFIED',
      recoveryUrgencyFactor: 'Resolved',
      explanationBullets: ['Normalized to ISO 4217 standard "USD"']
    },
    diagnosticReason: 'Schema Offer.priceCurrency required standard 3-letter ISO code USD.',
    evidenceRecord: {
      value: 'USD (ISO 4217)',
      source: 'Deterministic Currency Normalizer',
      detectedAt: '3 days ago (Preview)',
      validUntil: 'Indefinite',
      confidence: 'High',
      state: 'MERCHANT_VERIFIED'
    },
    buyerImpacts: {
      Discovery: { status: 'Not Affected', explanation: 'Clean.' },
      Problem: { status: 'Not Affected', explanation: 'N/A' },
      Comparison: { status: 'Not Affected', explanation: 'N/A' },
      Specification: { status: 'Not Affected', explanation: 'N/A' },
      Purchase: { status: 'Not Affected', explanation: 'N/A' },
      'Use Case': { status: 'Not Affected', explanation: 'N/A' },
      Trust: { status: 'Not Affected', explanation: 'N/A' }
    },
    recoveryWorkspace: {
      recoveryClass: 'CLASS_A_DETERMINISTIC',
      recoveryClassLabel: 'Class A — Deterministic Recovery',
      currentStateSummary: 'priceCurrency complies with ISO 4217.',
      problemDescription: 'Previously had non-standard symbol.',
      proposedRecoveryAction: 'Resolved.',
      evidenceRequirement: 'ISO table validation.',
      deterministicValidationRules: [
        { id: 'v-1101', category: 'Schema', ruleName: 'ISO 4217 Compliant', status: 'PASS', detail: 'Passed.' }
      ],
      verificationStatus: 'VERIFIED',
      diff: {
        field: 'priceCurrency',
        currentValue: 'US$',
        currentEvidenceState: 'OBSERVED',
        proposedValue: 'USD',
        proposedEvidenceState: 'MERCHANT_VERIFIED',
        validationResult: 'PASS',
        validationReason: 'Standardized.'
      }
    },
    history: [
      { stage: 'RESOLVED', timestamp: '3 days ago', title: 'ISO 4217 Normalized', description: 'Passed schema verification.', state: 'Resolved' }
    ],
    previewBadge: 'Representative Issue Preview · Preview Mode',
    isResolved: true
  },
  {
    id: 'iss-012',
    issueNumber: 'ISS-12',
    scope: 'PRODUCT',
    title: 'Cushioning Drop Millimeter Unit Re-parsed',
    productId: 'aix-prod-849201948634',
    productName: 'AeroKnit Recovery Slide Cushion',
    productSku: 'AP-REC-008',
    issueType: 'Product Attribute',
    severity: 'Medium',
    evidenceState: 'MERCHANT_VERIFIED',
    whyItMatters: 'Midsole heel-to-toe drop was listed as "4 mm" text without structured numerical value, blocking parametric search queries.',
    recoveryState: 'Resolved',
    recoveryClass: 'CLASS_A_DETERMINISTIC',
    recoveryEligibility: 'Eligible',
    detectedAt: '4 days ago · Rep. Preview',
    detectedAtTimestamp: Date.now() - 96 * 60 * 60 * 1000,
    deterministicPriority: {
      score: 35,
      level: 'Low',
      severityFactor: 'Parametric attribute normalization',
      buyerImpactFactor: 'Specification recovered',
      evidenceRiskFactor: 'State is MERCHANT VERIFIED',
      recoveryUrgencyFactor: 'Resolved',
      explanationBullets: ['Parsed 4mm drop into machine-readable QuantitativeValue']
    },
    diagnosticReason: 'Heel-to-toe drop was text string. Deterministic parser converted to numerical value 4 with unitCode MMT.',
    evidenceRecord: {
      value: '{"@type":"QuantitativeValue","value":4,"unitCode":"MMT"}',
      source: 'Deterministic Spec Parser',
      detectedAt: '4 days ago (Preview)',
      validUntil: 'Indefinite',
      confidence: 'High',
      state: 'MERCHANT_VERIFIED'
    },
    buyerImpacts: {
      Discovery: { status: 'Not Affected', explanation: 'Parametric queries enabled.' },
      Problem: { status: 'Not Affected', explanation: 'N/A' },
      Comparison: { status: 'Not Affected', explanation: 'Drop comparison active.' },
      Specification: { status: 'Not Affected', explanation: 'Structured.' },
      Purchase: { status: 'Not Affected', explanation: 'N/A' },
      'Use Case': { status: 'Not Affected', explanation: 'N/A' },
      Trust: { status: 'Not Affected', explanation: 'N/A' }
    },
    recoveryWorkspace: {
      recoveryClass: 'CLASS_A_DETERMINISTIC',
      recoveryClassLabel: 'Class A — Deterministic Recovery',
      currentStateSummary: 'Drop attribute structured as QuantitativeValue.',
      problemDescription: 'Previously text string prevented range searches.',
      proposedRecoveryAction: 'Resolved.',
      evidenceRequirement: 'Brand engineering blueprint.',
      deterministicValidationRules: [
        { id: 'v-1201', category: 'Schema', ruleName: 'QuantitativeValue MMT Valid', status: 'PASS', detail: 'Passed.' }
      ],
      verificationStatus: 'VERIFIED',
      diff: {
        field: 'heelDrop',
        currentValue: '4 mm (raw string)',
        currentEvidenceState: 'OBSERVED',
        proposedValue: '{"@type":"QuantitativeValue","value":4,"unitCode":"MMT"}',
        proposedEvidenceState: 'MERCHANT_VERIFIED',
        validationResult: 'PASS',
        validationReason: 'Parsed successfully.'
      }
    },
    history: [
      { stage: 'RESOLVED', timestamp: '4 days ago', title: 'Quantitative Drop Parsed', description: 'Converted to numerical MMT.', state: 'Resolved' }
    ],
    previewBadge: 'Representative Issue Preview · Preview Mode',
    isResolved: true
  }
];

// Authoritative live issue metrics selector applied to canonical issue dataset
export const sampleIssuesMetrics: IssuesMetricsSummary = deriveIssuesMetrics(sampleIssuesData);

