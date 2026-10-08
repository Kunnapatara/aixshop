/**
 * AIXSHOP — STORE-FIRST & TASK-FIRST UI REDESIGN VERIFICATION SUITE
 * 
 * Verifies:
 * 1. Store-First Entry Point & 2-Layer Store Audit (Store Signals & Catalog Signals)
 * 2. Human Language & Task-First Priority Grouping (Must Fix | Improve | Healthy)
 * 3. Affected Products Drill-down to Product Audit Modal
 * 4. Product Audit Contract: Product | Status | Problems Found | Action at Source | [ Re-check ]
 * 5. Source-of-truth Integrity: Merchant System = Source of Truth; AIXSHOP = Intelligence Layer
 * 6. Preserved Canonical State Authorities & Zero False AI Guarantees
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CANONICAL_MERCHANT, CANONICAL_SYSTEM_KPIS } from '../data/canonicalCatalog';
import { sampleIssuesMetrics } from '../data/sampleIssuesData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('======================================================');
console.log(' AIXSHOP VERIFICATION: STORE-FIRST & TASK-FIRST REDESIGN');
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

// 1. STORE-FIRST AUDIT CONTRACT
console.log('--- 1. STORE-FIRST AUDIT ENTRY POINT ---');

const heroPath = path.resolve(__dirname, '../components/merchant/StoreAuditHero.tsx');
assert(fs.existsSync(heroPath), 'StoreAuditHero.tsx exists');
const heroSrc = fs.readFileSync(heroPath, 'utf8');

assert(heroSrc.includes('Store Audit'), 'Store Audit headline: Store Audit');
assert(heroSrc.includes('Audit My Store'), 'Primary Action CTA: Audit My Store');
assert(
  heroSrc.includes('AI Shopping assistants') || heroSrc.includes('Evaluate how well your store'),
  'Supporting explanation: AI Shopping assistant readiness'
);
assert(heroSrc.includes('How Ready is the Catalog?'), 'Human readiness question: How Ready is the Catalog?');
assert(heroSrc.includes('12 Items to Address'), 'Priority breakdown headline: 12 Items to Address');
assert(heroSrc.includes('Must Fix') && heroSrc.includes('Improve') && heroSrc.includes('Healthy'), '3 human priority tiers present (Must Fix | Improve | Healthy)');
assert(heroSrc.includes('Store-Level Signals'), 'Layer 1: Store-level signals distinguished');
assert(heroSrc.includes('Catalog-Level Signals'), 'Layer 2: Catalog-level signals distinguished');

// 2. STORE FINDINGS & DRILL-DOWN CONTRACT
console.log('\n--- 2. STORE FINDINGS & DRILL-DOWN ---');

const findingsPath = path.resolve(__dirname, '../components/merchant/StoreFindingsSection.tsx');
assert(fs.existsSync(findingsPath), 'StoreFindingsSection.tsx exists');
const findingsSrc = fs.readFileSync(findingsPath, 'utf8');

assert(findingsSrc.includes('Must Fix (3 issues)'), 'Critical findings tab: Must Fix (3 issues)');
assert(findingsSrc.includes('Improve (5 issues)'), 'Improvement findings tab: Improve (5 issues)');
assert(findingsSrc.includes('Healthy (4 items)'), 'Good findings tab: Healthy (4 items)');
assert(findingsSrc.includes('Incomplete Product Specifications'), 'Finding 1: Incomplete Product Specifications');
assert(findingsSrc.includes('Price Discrepancy'), 'Finding 2: Price Discrepancy');
assert(findingsSrc.includes('View Affected Products'), 'Interactive drill-down prompt: View Affected Products');
assert(findingsSrc.includes('Audit Product →'), 'Drill-down action button: Audit Product →');
assert(findingsSrc.includes('Action at Source') || findingsSrc.includes('store source'), 'Action-at-source direction: Action at Source');

// 3. PRODUCT AUDIT MODAL CONTRACT
console.log('\n--- 3. PRODUCT AUDIT DIAGNOSTIC MODAL ---');

const modalPath = path.resolve(__dirname, '../components/merchant/ProductAuditModal.tsx');
assert(fs.existsSync(modalPath), 'ProductAuditModal.tsx exists');
const modalSrc = fs.readFileSync(modalPath, 'utf8');

assert(modalSrc.includes('Product Audit'), 'Modal title: Product Audit');
assert(modalSrc.includes('Readiness Status'), 'Status section: Readiness Status');
assert(modalSrc.includes('Needs Improvement'), 'Defines status: Needs Improvement');
assert(modalSrc.includes('Problems Identified'), 'Defines problems: Problems Identified');
assert(modalSrc.includes('Action at Store Source:'), 'Action directive: Action at Store Source:');
assert(modalSrc.includes('Re-check Product'), 'Re-check action button: Re-check Product');

// 4. HOME & ARCHITECTURAL INTEGRATION
console.log('\n--- 4. STORE-FIRST HOME INTEGRATION ---');

const homePath = path.resolve(__dirname, '../components/merchant/MerchantOverviewHome.tsx');
assert(fs.existsSync(homePath), 'MerchantOverviewHome.tsx exists');
const homeSrc = fs.readFileSync(homePath, 'utf8');

assert(homeSrc.includes('<StoreAuditHero'), 'MerchantOverviewHome renders StoreAuditHero at top');
assert(homeSrc.includes('<StoreFindingsSection'), 'MerchantOverviewHome renders StoreFindingsSection');
assert(homeSrc.includes('<ProductAuditModal'), 'MerchantOverviewHome renders ProductAuditModal');
assert(homeSrc.includes('<MerchantActionCenter'), 'MerchantOverviewHome preserves MerchantActionCenter');
assert(homeSrc.includes('onApproveIssue={onApproveIssue}'), 'MerchantOverviewHome passes onApproveIssue');
assert(homeSrc.includes('readinessScore={readinessScore}'), 'MerchantOverviewHome passes readinessScore');
assert(homeSrc.includes('audit-result-banner') && homeSrc.includes('Store Audit Result'), 'MerchantOverviewHome renders Store Audit Result summary banner');
assert(homeSrc.includes('showActionCenter'), 'Action Center is housed in secondary/collapsible workspace on Home');

// Verify old dashboard sections removed from primary Home
assert(!homeSrc.includes('sampleCatalogDimensions'), 'OLD DASHBOARD REMOVAL: Catalog Intelligence Dimensions removed from Home');
assert(!homeSrc.includes('sampleHealthDistribution'), 'OLD DASHBOARD REMOVAL: Health Distribution removed from Home');
assert(!homeSrc.includes('sampleRecentEvents'), 'OLD DASHBOARD REMOVAL: Live Ingestion Feed removed from Home');
assert(!homeSrc.includes('What needs attention?'), 'OLD DASHBOARD REMOVAL: "What needs attention?" hero block removed from Home');
assert(!homeSrc.includes('Intelligence Coverage'), 'OLD DASHBOARD REMOVAL: Intelligence Coverage KPI block removed from Home');

// Verify semantic routing: Store Audit CTA triggers store audit, NOT product audit
assert(
  !homeSrc.includes('onAuditStore={(url) => {\n          setSelectedProductAudit'),
  'ROUTING FIX: "Store Audit" triggers store audit, not product modal'
);
assert(
  modalSrc.includes('Shopify / WooCommerce') && modalSrc.includes('Resolution Workflow:'),
  'SOURCE-OF-TRUTH RULE: Clear step-by-step fix at store source instructions present'
);

// 5. NO FALSE AI CLAIMS & HONEST BOUNDARIES
console.log('\n--- 5. TRUTH BOUNDARIES & NO FALSE AI CLAIMS ---');

// Verify 5 AI Commerce Surfaces represented honestly
assert(
  heroSrc.includes('Google') && heroSrc.includes('ChatGPT') && heroSrc.includes('Gemini') && heroSrc.includes('Bing') && heroSrc.includes('TikTok'),
  '5 AI Commerce Visibility surfaces (Google, ChatGPT, Gemini, Bing, TikTok) presented in StoreAuditHero'
);
assert(
  heroSrc.includes('AI Commerce') && heroSrc.includes('Catalog Readiness'),
  'Frames store discoverability honestly as AI Commerce catalog readiness without fake rankings'
);

const actionCenterPath = path.resolve(__dirname, '../components/merchant/MerchantActionCenter.tsx');
const actionCenterSrc = fs.readFileSync(actionCenterPath, 'utf8');

assert(
  !actionCenterSrc.includes('ChatGPT will recommend your products') &&
  !actionCenterSrc.includes('guarantee ChatGPT recommendations'),
  'No false promise of guaranteed ChatGPT recommendation'
);
assert(
  actionCenterSrc.includes('readiness for AI Shopping') || actionCenterSrc.includes('information quality'),
  'Uses honest framing: readiness for AI Shopping & information quality'
);
assert(
  !heroSrc.includes('window.alert') && !findingsSrc.includes('window.alert') && !modalSrc.includes('window.alert'),
  'Zero intrusive window.alert calls'
);

// 6. SYSTEM INVARIANTS
console.log('\n--- 6. CATALOG & STORE INVARIANTS ---');

assert(CANONICAL_MERCHANT.name === 'AeroPulse Athletics', 'Canonical merchant remains AeroPulse Athletics');
assert(CANONICAL_MERCHANT.domain === 'shop.aeropulse.com', 'Canonical domain remains shop.aeropulse.com');
assert(CANONICAL_SYSTEM_KPIS.totalCatalogProducts === 24, 'Total catalog products remains 24');
assert(sampleIssuesMetrics.openIssues === 8, 'Derived open issues count remains 8');
assert(CANONICAL_SYSTEM_KPIS.discoveryReadinessPct === 79, 'Discovery readiness score remains 79%');

console.log('\n======================================================');
console.log(` RESULTS: ${passedTests} passed, ${failedTests} failed out of ${totalTests} total tests`);
console.log('======================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('Store-First & Task-First Redesign Verification PASSED cleanly!\n');
}
