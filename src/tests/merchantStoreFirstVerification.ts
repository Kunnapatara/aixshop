/**
 * AIXSHOP — PHASE 2: MERCHANT HOME TRUTH & WORKFLOW VERIFICATION SUITE
 * 
 * Verifies:
 * 1. Store Status & Provenance (Store, Connected, Preview Mode · Demo Merchant)
 * 2. Primary Question Framing: "What needs your attention?"
 * 3. Priority Actions (Derived actionable tasks routing to Catalog/Issues)
 * 4. Catalog Health (Products need attention / good shape / need review)
 * 5. Truthful Visibility Status (Honest "Not yet observed in production")
 * 6. DOM-Level Complete Absence of Legacy Home Strings:
 *    - "Store Readiness"
 *    - "How Ready is the Catalog?"
 *    - "Target: 95%+"
 *    - "Advanced Workspace"
 *    - "Guided Review & Diff Verification"
 *    - "Operational Workspaces"
 *    - "Jump directly to catalog management, continuous monitoring, or technical feeds."
 *    - "Re-check to update readiness"
 *    - "AI Commerce Catalog Readiness"
 *    - "technical feeds"
 *    - "continuous monitoring"
 * 7. Preserved Product/Issue ID Integrity and Invariants
 */

import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { fileURLToPath } from 'url';
import { CANONICAL_MERCHANT, CANONICAL_SYSTEM_KPIS } from '../data/canonicalCatalog';
import { sampleIssuesData, sampleIssuesMetrics } from '../data/sampleIssuesData';
import { MerchantExperience } from '../components/merchant/MerchantExperience';
import { MerchantOverviewHome } from '../components/merchant/MerchantOverviewHome';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('======================================================');
console.log(' AIXSHOP VERIFICATION: PHASE 2 MERCHANT HOME WORKFLOW');
console.log('======================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${testName} ${detail ? `(${detail})` : ''}`);
  }
}

// Read relevant component source files
const homePath = path.resolve(__dirname, '../components/merchant/MerchantOverviewHome.tsx');
assert(fs.existsSync(homePath), 'MerchantOverviewHome.tsx exists');
const homeSrc = fs.readFileSync(homePath, 'utf8');

const heroPath = path.resolve(__dirname, '../components/merchant/StoreAuditHero.tsx');
assert(fs.existsSync(heroPath), 'StoreAuditHero.tsx exists');
const heroSrc = fs.readFileSync(heroPath, 'utf8');

const findingsPath = path.resolve(__dirname, '../components/merchant/StoreFindingsSection.tsx');
assert(fs.existsSync(findingsPath), 'StoreFindingsSection.tsx exists');
const findingsSrc = fs.readFileSync(findingsPath, 'utf8');

const modalPath = path.resolve(__dirname, '../components/merchant/ProductAuditModal.tsx');
assert(fs.existsSync(modalPath), 'ProductAuditModal.tsx exists');
const modalSrc = fs.readFileSync(modalPath, 'utf8');

// 1. STORE STATUS & PROVENANCE BAR (Section 5A)
console.log('--- 1. STORE STATUS & PROVENANCE ---');
assert(heroSrc.includes('shop.aeropulse.com'), 'Store domain rendered: shop.aeropulse.com');
assert(heroSrc.includes('Connected'), 'Store status: Connected');
assert(heroSrc.includes('Preview Mode · Demo Merchant'), 'Honest provenance: Preview Mode · Demo Merchant');
assert(heroSrc.includes('Last checked'), 'Timestamp rendered: Last checked');

// 2. PRIMARY QUESTION FRAMING (Section 5B)
console.log('\n--- 2. PRIMARY QUESTION FRAMING ---');
assert(
  heroSrc.includes('What needs your attention?'),
  'Primary Question headline: "What needs your attention?"'
);
assert(
  heroSrc.includes('items need attention across your catalog'),
  'Primary explanation clearly states items requiring attention'
);
assert(
  heroSrc.includes('High Priority') && heroSrc.includes('Medium Priority') && heroSrc.includes('Low Priority'),
  '3 priority urgency tiers present (High | Medium | Low Priority)'
);

// 3. PRIORITY ACTIONS SECTION (Section 6)
console.log('\n--- 3. PRIORITY ACTIONS SECTION ---');
assert(homeSrc.includes('Priority actions'), 'Headline: Priority actions');
assert(homeSrc.includes('4 products are missing key specifications'), 'Action 1: 4 products missing key specs');
assert(homeSrc.includes('3 offers have incomplete commercial information'), 'Action 2: 3 offers incomplete commercial info');
assert(homeSrc.includes('5 product descriptions lack structured attribute tags'), 'Action 3: 5 product descriptions lack tags');
assert(homeSrc.includes('Fix products →'), 'Action button 1: Fix products →');
assert(homeSrc.includes('Review offers →'), 'Action button 2: Review offers →');
assert(homeSrc.includes('Review issues →'), 'Action button 3: Review issues →');

// 4. CATALOG HEALTH & VISIBILITY STATUS (Sections 7, 8, 9, 10)
console.log('\n--- 4. CATALOG HEALTH & TRUTHFUL VISIBILITY ---');
assert(homeSrc.includes('Catalog health'), 'Headline: Catalog health');
assert(homeSrc.includes('Need attention') && homeSrc.includes('Good shape') && homeSrc.includes('Need review'), 'Catalog health breakdown present');
assert(homeSrc.includes('Review catalog →'), 'Action button: Review catalog →');

assert(homeSrc.includes('Visibility'), 'Headline: Visibility');
assert(homeSrc.includes('Not yet observed'), 'Honest visibility status: Not yet observed in production');
assert(homeSrc.includes('View visibility →'), 'Action button: View visibility →');

// 5. DOM-LEVEL ELIMINATION OF LEGACY HOME STRINGS (Sections 27 & 32)
console.log('\n--- 5. DOM-LEVEL ELIMINATION OF LEGACY STRINGS ---');
const renderedHomeHtml = renderToString(React.createElement(MerchantExperience, { initialTab: 'home' }));

const legacyStrings = [
  'Store Readiness',
  'How Ready is the Catalog?',
  'Target: 95%+',
  'Advanced Workspace',
  'Guided Review & Diff Verification',
  'Operational Workspaces',
  'Jump directly to catalog management, continuous monitoring, or technical feeds.',
  'Re-check to update readiness',
  'AI Commerce Catalog Readiness',
  'technical feeds',
  'continuous monitoring'
];

for (const legacy of legacyStrings) {
  assert(!renderedHomeHtml.includes(legacy), `Rendered Home DOM strictly omits "${legacy}"`);
}

// 6. NEEDS ATTENTION & PRODUCT AUDIT DRILL-DOWN (Section 15 & 16)
console.log('\n--- 6. NEEDS ATTENTION & PRODUCT AUDIT CONTRACT ---');
assert(findingsSrc.includes('Needs attention'), 'Findings headline: Needs attention');
assert(findingsSrc.includes('Audit Product →'), 'Drill-down action: Audit Product →');
assert(modalSrc.includes('Product Audit'), 'Modal title: Product Audit');
assert(modalSrc.includes('Re-check Product'), 'Re-check action button: Re-check Product');
assert(
  !homeSrc.includes("issues.filter(i => !i.isResolved).slice(0, 1)"),
  'Strict ID integrity: No fallback to unrelated issue'
);

// 7. INVARIANTS & TRUTH
console.log('\n--- 7. SYSTEM INVARIANTS ---');
assert(CANONICAL_MERCHANT.name === 'AeroPulse Athletics', 'Canonical merchant remains AeroPulse Athletics');
assert(CANONICAL_MERCHANT.domain === 'shop.aeropulse.com', 'Canonical domain remains shop.aeropulse.com');
assert(CANONICAL_SYSTEM_KPIS.totalCatalogProducts === 24, 'Total catalog products remains 24');
assert(sampleIssuesMetrics.openIssues === 8, 'Derived open issues count remains 8');

console.log('\n======================================================');
console.log(` RESULTS: ${passedTests} passed, ${failedTests} failed out of ${totalTests} total tests`);
console.log('======================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('Phase 2 Merchant Home Truth & Workflow Verification PASSED cleanly!\n');
}
