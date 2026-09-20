// src/data/telemetrySelectors.ts
// Authoritative Telemetry Selectors and Shared Metric Calculators for AIXSHOP
// Consolidates metric derivations across Shopper, Merchant, and Admin surfaces.

import { 
  IssueItem, 
  IssuesMetricsSummary, 
  IssueRecoveryState,
  MerchantActionIntegrity,
  IssueScope
} from '../types/issues';
import { EvidenceState } from '../types/landing';
import {
  MonitoringEvent,
  MonitoredProductSummary,
  MonitoringSummaryMetrics
} from '../types/monitoring';
import {
  CANONICAL_CATALOG_PRODUCTS,
  CANONICAL_MERCHANT,
  CANONICAL_TELEMETRY_FUNNEL,
  CANONICAL_SYSTEM_KPIS
} from './canonicalCatalog';

/**
 * Derives live issues metrics deterministically from an array of IssueItems.
 * Enforces a single source of truth for issue counts and lifecycle distributions.
 */
export function deriveIssuesMetrics(issues: IssueItem[]): IssuesMetricsSummary {
  const openIssuesList = issues.filter(i => i.recoveryState !== 'Resolved');
  const openCount = openIssuesList.length;
  const criticalCount = openIssuesList.filter(i => i.severity === 'Critical').length;
  const blockedCount = openIssuesList.filter(
    i => i.recoveryState === 'Blocked' || i.evidenceState === 'CONFLICT' || i.evidenceState === 'MISSING'
  ).length;
  const eligibleCount = openIssuesList.filter(i => i.recoveryEligibility === 'Eligible').length;
  const merchantCount = openIssuesList.filter(
    i => i.recoveryEligibility === 'Merchant Required' || i.recoveryState === 'Merchant Verification'
  ).length;
  const resolvedCount = issues.filter(i => i.recoveryState === 'Resolved').length;

  const dist: Record<IssueRecoveryState, number> = {
    Open: 0,
    Diagnosing: 0,
    'Recovery Proposed': 0,
    'Validation Required': 0,
    'Merchant Verification': 0,
    Resolved: 0,
    Blocked: 0
  };

  issues.forEach(i => {
    if (dist[i.recoveryState] !== undefined) {
      dist[i.recoveryState]++;
    }
  });

  return {
    openIssues: openCount,
    criticalIssues: criticalCount,
    evidenceBlocked: blockedCount,
    recoveryEligible: eligibleCount,
    merchantVerificationRequired: merchantCount,
    recentlyResolved: resolvedCount,
    stateDistribution: dist
  };
}

/**
 * Maps an authoritative EvidenceState to a context-specific human-readable UI presentation label.
 * Under no circumstances does the UI label replace the underlying domain EvidenceState enum.
 */
export function getEvidenceStatePresentationLabel(
  state: EvidenceState,
  context: 'shopper' | 'merchant' | 'admin' = 'merchant'
): string {
  if (context === 'shopper') {
    switch (state) {
      case 'OBSERVED':
        return 'Observed from source';
      case 'DERIVED':
        return 'Derived from verified information';
      case 'MERCHANT_VERIFIED':
        return 'Verified by merchant';
      case 'MISSING':
        return 'Not verified';
      case 'CONFLICT':
        return 'Sources disagree';
    }
  }

  switch (state) {
    case 'OBSERVED':
      return 'Observed';
    case 'DERIVED':
      return 'Derived';
    case 'MERCHANT_VERIFIED':
      return 'Merchant Verified';
    case 'MISSING':
      return 'Missing';
    case 'CONFLICT':
      return 'Conflict';
  }
}

/**
 * Returns the canonical catalog and telemetry funnel summary metrics.
 */
export function getCanonicalCatalogTelemetry() {
  return {
    catalogProductCount: CANONICAL_CATALOG_PRODUCTS.length,
    activeChildVariantsCount: CANONICAL_MERCHANT.activeChildVariants,
    activeCommercialOffersCount: CANONICAL_MERCHANT.activeCommercialOffers,
    telemetryFunnel: CANONICAL_TELEMETRY_FUNNEL,
    systemKpis: CANONICAL_SYSTEM_KPIS
  };
}

/**
 * Derives live monitoring metrics deterministically from monitoring events and monitored product summaries.
 * Single source of truth for monitoring summary bar and health state distributions.
 */
export function deriveMonitoringMetrics(
  events: MonitoringEvent[],
  monitoredProducts: MonitoredProductSummary[]
): MonitoringSummaryMetrics {
  const highPriorityCount = events.filter(e => e.priority === 'High' || e.priority === 'Critical').length;
  const evidenceChangesCount = events.filter(e => e.category === 'evidence_integrity').length;
  const offerChangesCount = events.filter(e => e.category === 'offer_intelligence').length;
  const discoverySignalsCount = events.filter(e => e.category === 'discovery_readiness').length;

  return {
    monitoredProducts: monitoredProducts.length,
    changesDetected: events.length,
    highPriority: highPriorityCount,
    evidenceChanges: evidenceChangesCount,
    offerChanges: offerChangesCount,
    discoverySignalsChanged: discoverySignalsCount,
    statusDistribution: {
      stable: monitoredProducts.filter(p => p.monitoringState === 'stable').length,
      changed: monitoredProducts.filter(p => p.monitoringState === 'changed').length,
      needsReview: monitoredProducts.filter(p => p.monitoringState === 'needs_review').length,
      evidenceConflict: monitoredProducts.filter(p => p.monitoringState === 'conflict').length,
      staleUnknown: monitoredProducts.filter(p => p.monitoringState === 'stale_unknown').length
    }
  };
}

/**
 * Phase 2.2: Merchant Action Integrity Selector
 * Derives the canonical 6-part contract answering:
 * 1. WHAT IS WRONG?
 * 2. WHAT EVIDENCE PROVES IT?
 * 3. WHY WAS THE ISSUE CREATED?
 * 4. WHAT SHOULD THE MERCHANT DO NEXT?
 * 5. WHAT SOURCE OR DATA SHOULD BE CHANGED?
 * 6. WHAT MUST REMAIN UNCHANGED BECAUSE AIXSHOP DOES NOT OWN THE SOURCE OF TRUTH?
 *
 * Guarantees Product != Offer domain separation and enforces zero-hallucination / no-fake-writeback rules.
 */
export function deriveMerchantActionIntegrity(issue: IssueItem): MerchantActionIntegrity {
  // Enforce explicit canonical IssueScope; never infer from title, keywords, issueNumber, or labels
  if (!issue.scope || (issue.scope !== 'PRODUCT' && issue.scope !== 'OFFER')) {
    throw new Error(
      `[AIXSHOP Action Integrity Error] Issue ${issue.issueNumber || issue.id} is missing explicit canonical IssueScope ('PRODUCT' | 'OFFER'). Scope must never be inferred.`
    );
  }

  const scope: IssueScope = issue.scope;
  const isOfferDomain = scope === 'OFFER';

  // Base shared evidence mapping
  const evidence = {
    source: issue.evidenceRecord.source,
    observedValue: issue.evidenceRecord.value,
    evidenceState: issue.evidenceRecord.state,
    detectedAt: issue.evidenceRecord.detectedAt,
    confidence: issue.evidenceRecord.confidence,
    sourceDetails: issue.evidenceRecord.sourceDetails,
    expectedCondition: issue.recoveryWorkspace.evidenceRequirement || 'Corroborated, machine-readable parameter'
  };

  // Issue-specific overrides to match ground-truth audit
  switch (issue.issueNumber) {
    case 'ISS-01':
      return {
        scope: 'OFFER',
        problem: 'Commercial return policy evidence is missing from Schema.org microdata and product page. Downstream AI shopping engines cannot verify return windows or restocking conditions.',
        evidence,
        reason: issue.diagnosticReason || 'Automated crawler observed merchant checkout link but found no authoritative Schema.org MerchantReturnPolicy object or structured return window in PDP DOM. In accordance with zero-hallucination rules, missing terms cannot be fabricated.',
        nextAction: {
          actionCode: 'VERIFY',
          actionLabel: 'Verify Authoritative Return Window',
          summary: 'Attest official return window parameters (e.g., 30-day window, free returns) to inject Schema.org MerchantReturnPolicy into Offer.',
          steps: [
            {
              stepNumber: 1,
              label: 'Review Store Policy',
              description: 'Confirm standard return window days and restocking fees in Shopify Store Policy settings.',
              targetSystem: 'Shopify Admin'
            },
            {
              stepNumber: 2,
              label: 'Certify in AIXSHOP',
              description: 'Select or input the authoritative return policy parameters in the AIXSHOP drawer.',
              targetSystem: 'AIXSHOP Verification Drawer'
            },
            {
              stepNumber: 3,
              label: 'Preview Rescan',
              description: 'Run preview rescan to verify Schema.org MerchantReturnPolicy microdata structure.',
              targetSystem: 'AIXSHOP Validation Engine'
            },
            {
              stepNumber: 4,
              label: 'Update Storefront Template',
              description: 'Inject the verified Schema.org snippet into your Shopify theme or product liquid template.',
              targetSystem: 'Shopify Theme Editor'
            }
          ],
          canSimulateRecheck: true
        },
        sourceOwnership: {
          sourceOfRecord: 'Shopify Store Policy Settings & Commercial Storefront Terms',
          ownerType: 'Merchant',
          systemLocation: 'Shopify Admin > Settings > Policies > Return & Refund Policy',
          dataFieldToChange: 'Schema.org Offer.hasMerchantReturnPolicy (Window, Return Method, Restocking Fees)'
        },
        boundary: {
          aixshopCan: [
            'Detect missing policy schema in live storefront DOM and Google feeds',
            'Validate proposed return policy structure against Schema.org standards',
            'Provide merchant verification workflow to record authoritative parameters',
            'Simulate schema injection and preview rescan'
          ],
          merchantMust: [
            'Define and approve official return & refund terms in Shopify Admin',
            'Confirm physical return processing workflow with fulfillment team',
            'Implement MerchantReturnPolicy JSON-LD snippet in theme if using custom storefront'
          ],
          cannotClaim: 'AIXSHOP cannot modify store legal policies in Shopify Admin or alter customer contract terms on external checkout gateways.'
        }
      };

    case 'ISS-02':
      return {
        scope: 'PRODUCT',
        problem: 'Authoritative barcode conflict detected: GS1 GEPIR registry reports GTIN 00849201948172 while Shopify catalog specifies 00849201948999 for variant AP-VSE-BLK-10.',
        evidence,
        reason: issue.diagnosticReason || 'GS1 GEPIR global registry and Shopify Variant API return different GTIN barcodes for variant AP-VSE-BLK-10. Downstream marketplace and search engines reject or miscategorize products with uncorroborated GTIN identifiers.',
        nextAction: {
          actionCode: 'OPEN_SOURCE',
          actionLabel: 'Arbitrate Barcode & Correct in Shopify',
          summary: 'Inspect physical shoe box barcode against GS1 Data Hub registration, then correct the variant barcode in Shopify Admin.',
          steps: [
            {
              stepNumber: 1,
              label: 'Inspect Physical Box Barcode',
              description: 'Scan physical product shoe box barcode to verify printed GTIN-14/UPC.',
              targetSystem: 'Physical Warehouse Stock'
            },
            {
              stepNumber: 2,
              label: 'Verify in GS1 Data Hub',
              description: 'Verify registered company prefix and product assignment in GS1 GEPIR Data Hub.',
              targetSystem: 'GS1 Data Hub'
            },
            {
              stepNumber: 3,
              label: 'Update Shopify Variant Barcode',
              description: 'Update the Barcode (ISBN, UPC, GTIN) field on variant AP-VSE-BLK-10 in Shopify Admin.',
              targetSystem: 'Shopify Admin'
            },
            {
              stepNumber: 4,
              label: 'Recheck in AIXSHOP',
              description: 'Select the verified authoritative source in AIXSHOP drawer and trigger preview rescan.',
              targetSystem: 'AIXSHOP Validation Engine'
            }
          ],
          canSimulateRecheck: true
        },
        sourceOwnership: {
          sourceOfRecord: 'GS1 GEPIR Global Registry & Shopify Variant Catalog',
          ownerType: 'External Registry',
          systemLocation: 'Shopify Admin > Products > VaporStride Carbon Elite > Variants > AP-VSE-BLK-10 > Barcode',
          dataFieldToChange: 'Variant GTIN / UPC Barcode'
        },
        boundary: {
          aixshopCan: [
            'Cross-reference catalog barcodes against GS1 GEPIR registry API',
            'Detect identity divergence and prevent hazardous automated overwrite',
            'Preserve multi-source evidence without averaging conflicting numbers',
            'Provide manual source arbitration workflow'
          ],
          merchantMust: [
            'Physically check manufacturer box barcode',
            'Update barcode value in Shopify Admin or ERP master catalog',
            'Notify distributor if wholesale barcode was misallocated'
          ],
          cannotClaim: 'AIXSHOP cannot change barcodes registered in GS1 GEPIR or directly rewrite Shopify variant catalog barcode fields.'
        }
      };

    case 'ISS-03':
      return {
        scope: 'PRODUCT',
        problem: 'Upper material specification discrepancy: Brand Engineering Spec PDF certifies "AeroWeave Bio-Matrix Carbon-Infused" whereas Wholesale B2B feed describes "Breathable Engineered Knit Poly-Blend".',
        evidence,
        reason: issue.diagnosticReason || 'Wholesale partner feed diluted proprietary textile specification with generic poly-blend description, causing semantic ambiguity in downstream technical comparison engines.',
        nextAction: {
          actionCode: 'VERIFY',
          actionLabel: 'Certify Brand Engineering Spec',
          summary: 'Confirm brand lab specification to lock authoritative upper material across search and discovery surfaces.',
          steps: [
            {
              stepNumber: 1,
              label: 'Cross-Check Lab Spec',
              description: 'Cross-check AeroPulse engineering lab specification PDF for confirmed textile naming.',
              targetSystem: 'Brand Engineering Repository'
            },
            {
              stepNumber: 2,
              label: 'Certify Source A in AIXSHOP',
              description: 'Select Source A (Brand Engineering Spec) in the verification drawer.',
              targetSystem: 'AIXSHOP Verification Drawer'
            },
            {
              stepNumber: 3,
              label: 'Re-evaluate Discovery Score',
              description: 'Recheck discovery readiness score to verify specification clarity.',
              targetSystem: 'AIXSHOP Validation Engine'
            },
            {
              stepNumber: 4,
              label: 'Notify Wholesale Partners',
              description: 'Distribute updated specification sheet to wholesale partners to correct syndicated feeds.',
              targetSystem: 'B2B Wholesale Portal'
            }
          ],
          canSimulateRecheck: true
        },
        sourceOwnership: {
          sourceOfRecord: 'Brand Technical Product Specification & Wholesale Partner Catalog',
          ownerType: 'Brand / Manufacturer',
          systemLocation: 'Brand PIM / Engineering Specification PDF Archives',
          dataFieldToChange: 'Upper Material Physical Specification'
        },
        boundary: {
          aixshopCan: [
            'Compare text descriptors across brand documentation and partner feeds',
            'Surface technical discrepancy without generating synthetic intermediate blend',
            'Allow merchant certification of authoritative brand material specification',
            'Score attribute completeness and buyer comparison readiness'
          ],
          merchantMust: [
            'Arbitrate between brand engineering specs and wholesale feed descriptions',
            'Notify wholesale syndication partners of correct standardized terminology',
            'Ensure marketing copy reflects lab-certified material composition'
          ],
          cannotClaim: 'AIXSHOP cannot alter syndicated wholesale partner feeds or third-party retailer databases.'
        }
      };

    case 'ISS-04':
      return {
        scope: 'OFFER',
        problem: 'Commercial offer price mismatch: Storefront DOM checkout shows $119.00 while Google Merchant Center feed advertises $129.00.',
        evidence,
        reason: issue.diagnosticReason || 'Storefront price markdown was implemented without updating the syndicated Google Shopping XML feed, creating price mismatch penalties and checkout friction.',
        nextAction: {
          actionCode: 'REVIEW',
          actionLabel: 'Align Feed Price with Storefront',
          summary: 'Verify live storefront pricing and trigger Google Merchant Center feed resynchronization.',
          steps: [
            {
              stepNumber: 1,
              label: 'Confirm Live Price',
              description: 'Confirm authoritative offer price ($119.00) in Shopify Admin product pricing.',
              targetSystem: 'Shopify Admin'
            },
            {
              stepNumber: 2,
              label: 'Fetch GMC Feed',
              description: 'Trigger manual feed fetch in Google Merchant Center to pull current storefront price.',
              targetSystem: 'Google Merchant Center'
            },
            {
              stepNumber: 3,
              label: 'Preview Rescan',
              description: 'Simulate preview rescan in AIXSHOP to verify offer reconciliation.',
              targetSystem: 'AIXSHOP Validation Engine'
            }
          ],
          canSimulateRecheck: true
        },
        sourceOwnership: {
          sourceOfRecord: 'Shopify Storefront Pricing & Google Merchant Center Feed',
          ownerType: 'Merchant',
          systemLocation: 'Shopify Admin > Products > TempoFlow Everyday > Pricing',
          dataFieldToChange: 'Offer Price (USD) / Google Shopping Feed Price'
        },
        boundary: {
          aixshopCan: [
            'Detect real-time price divergence across storefront DOM and marketplace feeds',
            'Formulate deterministic Schema.org Offer pricing updates',
            'Validate price currency codes and decimal formatting',
            'Evaluate impact on Buyer Purchase and Comparison intent archetypes'
          ],
          merchantMust: [
            'Confirm intended retail sale price in Shopify Admin',
            'Initiate feed refresh in Google Merchant Center or marketing apps',
            'Verify checkout payment gateway charges the advertised price'
          ],
          cannotClaim: 'AIXSHOP cannot change bank/Stripe prices, modify credit card charges, or force Google Merchant Center feed approvals.'
        }
      };

    case 'ISS-05':
      return {
        scope: 'PRODUCT',
        problem: 'Discovery attribute coverage dropped from 94% to 61% following a theme update; essential structured attributes (5mm lug depth, waterproofing) are omitted from JSON-LD.',
        evidence,
        reason: issue.diagnosticReason || 'A theme update replaced structured additionalProperty array with unstructured paragraph text, preventing discovery engines from indexing lug depth and waterproofing.',
        nextAction: {
          actionCode: 'REVIEW',
          actionLabel: 'Restore Structured AdditionalProperties',
          summary: 'Deterministically extract verified technical specifications from brand engineering sheet and regenerate structured JSON-LD additionalProperty tags.',
          steps: [
            {
              stepNumber: 1,
              label: 'Inspect Missing Attributes',
              description: 'Review missing attributes (lug depth: 5mm, waterproofing: HydroShield Membrane).',
              targetSystem: 'AIXSHOP Diff'
            },
            {
              stepNumber: 2,
              label: 'Copy Restored Schema',
              description: 'Copy regenerated Schema.org additionalProperty array snippet from AIXSHOP.',
              targetSystem: 'AIXSHOP Workspace'
            },
            {
              stepNumber: 3,
              label: 'Inject in Theme',
              description: 'Paste snippet into Shopify product template or theme app block.',
              targetSystem: 'Shopify Theme Editor'
            },
            {
              stepNumber: 4,
              label: 'Preview Rescan',
              description: 'Run preview rescan to confirm attribute coverage returns to >90%.',
              targetSystem: 'AIXSHOP Validation Engine'
            }
          ],
          canSimulateRecheck: true
        },
        sourceOwnership: {
          sourceOfRecord: 'Product Catalog Theme Template & Brand Technical Sheet',
          ownerType: 'Merchant',
          systemLocation: 'Shopify Admin > Online Store > Themes > Product Template (Liquid / JSON)',
          dataFieldToChange: 'Schema.org additionalProperty Array'
        },
        boundary: {
          aixshopCan: [
            'Calculate attribute coverage scores deterministically',
            'Extract physical facts from authoritative brand documentation',
            'Format Schema.org PropertyValue arrays according to standard taxonomy',
            'Verify schema syntax and preview rescan'
          ],
          merchantMust: [
            'Paste or integrate structured schema snippet into storefront theme',
            'Ensure theme deployment does not strip custom JSON-LD script tags',
            'Review attribute visibility across search console tools'
          ],
          cannotClaim: 'AIXSHOP cannot write code directly to merchant theme Git repositories or publish Shopify theme modifications without app block permissions.'
        }
      };

    case 'ISS-06':
      return {
        scope: 'PRODUCT',
        problem: 'Critical SKU collision: Shopify Variant API returns identical SKU "AP-VC-002-95" for Men\'s Size 9.5 and Women\'s Size 11.0.',
        evidence,
        reason: issue.diagnosticReason || 'Duplicate SKU assignment in Shopify inventory database creates critical fulfillment hazard; warehouse pickers and automated 3PL systems cannot disambiguate orders.',
        nextAction: {
          actionCode: 'OPEN_SOURCE',
          actionLabel: 'Reassign Unique SKU in Shopify Admin',
          summary: 'Navigate to Shopify Admin and update the SKU for Women\'s Size 11.0 to a unique identifier (e.g., AP-VC-002-110W).',
          steps: [
            {
              stepNumber: 1,
              label: 'Open Shopify Variant',
              description: 'Open Shopify Admin > Products > Velocity Carbon Pro > Variants.',
              targetSystem: 'Shopify Admin'
            },
            {
              stepNumber: 2,
              label: 'Change Women\'s SKU',
              description: 'Reassign duplicate SKU AP-VC-002-95 to unique AP-VC-002-110W.',
              targetSystem: 'Shopify Inventory'
            },
            {
              stepNumber: 3,
              label: 'Save & Rescan',
              description: 'Save changes in Shopify and execute preview rescan in AIXSHOP to confirm collision resolved.',
              targetSystem: 'AIXSHOP Validation Engine'
            }
          ],
          canSimulateRecheck: true
        },
        sourceOwnership: {
          sourceOfRecord: 'Shopify Admin Inventory & SKU Catalog',
          ownerType: 'Merchant',
          systemLocation: 'Shopify Admin > Products > Velocity Carbon Pro > Variants > Women\'s 11.0 > SKU',
          dataFieldToChange: 'Variant SKU (Stock Keeping Unit)'
        },
        boundary: {
          aixshopCan: [
            'Detect SKU collisions and duplicate primary keys across product variants',
            'Block dangerous automated operations until merchant arbitrates',
            'Simulate collision resolution upon preview rescan',
            'Provide audit trail of detected collision'
          ],
          merchantMust: [
            'Assign unique SKU directly in Shopify Admin or ERP master catalog',
            'Ensure 3PL warehouse management system recognizes newly assigned SKU',
            'Update printed barcode labels if warehouse picks by SKU barcode'
          ],
          cannotClaim: 'AIXSHOP cannot modify SKU records in Shopify Admin, alter 3PL inventory mappings, or rewrite warehouse database entries.'
        }
      };

    case 'ISS-07':
      return {
        scope: 'OFFER',
        problem: 'Commercial availability state mismatch: Storefront DOM displays "In Stock (14 units)" while Schema.org microdata advertises "OutOfStock".',
        evidence,
        reason: issue.diagnosticReason || 'Storefront inventory replenishment occurred but static JSON-LD template cache retained "OutOfStock", suppressing buy box eligibility in search engines.',
        nextAction: {
          actionCode: 'REVIEW',
          actionLabel: 'Synchronize Availability Microdata',
          summary: 'Sync Schema.org ItemAvailability to InStock based on confirmed inventory count (>0).',
          steps: [
            {
              stepNumber: 1,
              label: 'Verify Stock in Shopify',
              description: 'Confirm positive inventory quantity (14 units) in Shopify Admin.',
              targetSystem: 'Shopify Admin'
            },
            {
              stepNumber: 2,
              label: 'Review Schema Sync',
              description: 'Inspect proposed ItemAvailability.InStock schema fix in AIXSHOP.',
              targetSystem: 'AIXSHOP Diff'
            },
            {
              stepNumber: 3,
              label: 'Purge Theme Cache',
              description: 'Clear storefront liquid/CDN microdata cache to reflect live stock state.',
              targetSystem: 'Shopify Theme / CDN'
            },
            {
              stepNumber: 4,
              label: 'Preview Rescan',
              description: 'Run preview rescan in AIXSHOP to confirm availability alignment.',
              targetSystem: 'AIXSHOP Validation Engine'
            }
          ],
          canSimulateRecheck: true
        },
        sourceOwnership: {
          sourceOfRecord: 'Shopify Inventory Tracker & Storefront Theme Microdata',
          ownerType: 'Merchant',
          systemLocation: 'Shopify Admin > Inventory & Theme Liquid product-template.liquid',
          dataFieldToChange: 'Schema.org ItemAvailability (https://schema.org/InStock)'
        },
        boundary: {
          aixshopCan: [
            'Detect availability mismatch between DOM inventory badges and schema tags',
            'Formulate canonical Schema.org ItemAvailability enum values',
            'Provide preview rescan to verify availability state alignment',
            'Assess impact on Buyer Purchase and Trust intent archetypes'
          ],
          merchantMust: [
            'Maintain accurate inventory counts in Shopify or inventory management software',
            'Clear storefront liquid caching if microdata lags stock updates',
            'Ensure supplier dropship feeds report accurate stock levels'
          ],
          cannotClaim: 'AIXSHOP cannot physically count warehouse inventory or update Shopify stock quantities.'
        }
      };

    case 'ISS-08':
      return {
        scope: 'OFFER',
        problem: 'Promotional banner displays active discount pricing ($139.00) but Schema.org Offer lacks the required priceValidUntil timestamp.',
        evidence,
        reason: issue.diagnosticReason || 'Google Shopping and AI commerce agents require valid ISO-8601 priceValidUntil date for promotional offers; missing timestamps risk promotional rejection.',
        nextAction: {
          actionCode: 'REVIEW',
          actionLabel: 'Add ISO-8601 priceValidUntil Timestamp',
          summary: 'Format campaign expiration date into ISO-8601 DateTime and inject into Schema.org Offer.',
          steps: [
            {
              stepNumber: 1,
              label: 'Check Campaign Calendar',
              description: 'Verify promotional campaign end date from marketing calendar.',
              targetSystem: 'Marketing Schedule'
            },
            {
              stepNumber: 2,
              label: 'Review Formatted Date',
              description: 'Inspect ISO-8601 priceValidUntil timestamp generated in AIXSHOP.',
              targetSystem: 'AIXSHOP Diff'
            },
            {
              stepNumber: 3,
              label: 'Preview Rescan',
              description: 'Execute preview rescan to confirm Offer schema completeness.',
              targetSystem: 'AIXSHOP Validation Engine'
            }
          ],
          canSimulateRecheck: true
        },
        sourceOwnership: {
          sourceOfRecord: 'Merchant Marketing Promotion Calendar & Storefront Campaign',
          ownerType: 'Merchant',
          systemLocation: 'Shopify Admin > Discounts > Active Campaigns / Product Metafields',
          dataFieldToChange: 'Schema.org Offer.priceValidUntil (ISO-8601 String)'
        },
        boundary: {
          aixshopCan: [
            'Validate ISO-8601 date formatting and timezone offsets',
            'Detect promotional price claims lacking expiration timestamps',
            'Generate compliant Schema.org Offer property snippets',
            'Verify schema syntax in preview rescan'
          ],
          merchantMust: [
            'Determine official promotional campaign duration and cutoff date',
            'Set automated discount schedule in Shopify Admin',
            'Ensure promotional terms comply with regional consumer pricing regulations'
          ],
          cannotClaim: 'AIXSHOP cannot start, extend, or end marketing discount promotions in Shopify or advertising channels.'
        }
      };

    default:
      // Generic deterministic derivation for ISS-09 to ISS-12 and future dynamic issues
      const isEvidenceGated = issue.recoveryClass === 'CLASS_B_EVIDENCE_GATED';
      const isExternalWriteback = issue.recoveryClass === 'CLASS_C_EXTERNAL_WRITEBACK';

      return {
        scope,
        problem: issue.recoveryWorkspace.problemDescription || issue.title,
        evidence,
        reason: issue.diagnosticReason || issue.whyItMatters,
        nextAction: {
          actionCode: isExternalWriteback ? 'OPEN_SOURCE' : isEvidenceGated ? 'VERIFY' : 'REVIEW',
          actionLabel: isExternalWriteback 
            ? 'Update External Source of Record' 
            : isEvidenceGated 
            ? 'Verify Authoritative Attribute in AIXSHOP' 
            : 'Review & Copy Validated Schema Transformation',
          summary: issue.recoveryWorkspace.proposedRecoveryAction || 'Review issue diff and execute deterministic validation steps.',
          steps: [
            {
              stepNumber: 1,
              label: 'Inspect Discrepancy',
              description: 'Examine current observed evidence against required standard.',
              targetSystem: 'AIXSHOP Intelligence'
            },
            {
              stepNumber: 2,
              label: isExternalWriteback ? 'Modify External Source' : 'Arbitrate / Confirm Value',
              description: isExternalWriteback
                ? 'Update master record in source system.'
                : 'Confirm ground truth value in AIXSHOP verification drawer.',
              targetSystem: isExternalWriteback ? 'External Master System' : 'AIXSHOP Verification Drawer'
            },
            {
              stepNumber: 3,
              label: 'Run Preview Rescan',
              description: 'Verify normalized data passes all deterministic validation rules.',
              targetSystem: 'AIXSHOP Validation Engine'
            }
          ],
          canSimulateRecheck: true
        },
        sourceOwnership: {
          sourceOfRecord: isOfferDomain ? 'Commercial Offer & Merchant Storefront Feed' : 'Product Technical Specification / CMS',
          ownerType: isOfferDomain ? 'Merchant' : 'Brand / Manufacturer',
          systemLocation: isOfferDomain ? 'Shopify Admin > Pricing & Inventory' : 'Brand PIM / Catalog Feed',
          dataFieldToChange: issue.recoveryWorkspace.diff?.field || 'Product Attribute'
        },
        boundary: {
          aixshopCan: [
            'Detect inconsistencies across catalog, DOM, and syndication feeds',
            'Enforce deterministic validation rules and calculate readiness metrics',
            'Provide human-in-the-loop merchant verification workflow',
            'Simulate preview rescan against normalized truth'
          ],
          merchantMust: [
            'Confirm authoritative business truth at the origin source',
            'Update external e-commerce platforms if records are incorrect',
            'Ensure downstream merchant feeds reflect verified changes'
          ],
          cannotClaim: 'AIXSHOP does not write back directly to Shopify, GS1, GMC, or external databases. Verification in AIXSHOP establishes truth within the AIXSHOP intelligence layer; external systems must be updated at their respective sources of record.'
        }
      };
  }
}


