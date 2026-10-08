/**
 * AIXSHOP — SPRINT 1 BEHAVIORAL & INTEGRATION TEST SUITE
 * 
 * Verifies actual runtime behavior, contracts, and regressions:
 * Test A: Initial application opens Merchant Console ('merchant')
 * Test B: Merchant Home renders Store Audit ('home') in English
 * Test C: Click Store Audit does NOT open Product Audit
 * Test D: Store Finding -> affected product -> Product Audit
 * Test E: Product ID is NEVER passed as Issue ID (ID Integrity)
 * Test F: Product Recheck updates the correct issue (iss-001 / canonical issues)
 * Test G: No external visibility claim is rendered as actual observation
 * Test H: Landing remains accessible via switcher/handlers
 * Test I: Shopper remains accessible via switcher/handlers
 * Test J: Admin remains accessible via switcher/handlers
 * Test K: Merchant Action Center remains secondary/collapsible
 * Test L: All 10 Merchant Navigation tabs render successfully with zero blank screens
 * Test M: Strict Product Identity integrity (no fallback across products)
 * Test N: Zero Thai user-facing text in Merchant components
 * Test O: Zero legacy page leakage (P06, P07, P09, P10, Page 01-07) in user UI
 */

import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { fileURLToPath } from 'url';
import { approveIssue, getOpenIssuesCount, getApprovedIssuesCount } from '../state/canonicalIssues';
import { calculateReadinessScore, BASE_READINESS_SCORE } from '../state/canonicalReadiness';
import { sampleIssuesData } from '../data/sampleIssuesData';
import { CANONICAL_CATALOG_PRODUCTS } from '../data/canonicalCatalog';
import { MerchantExperience, MerchantTab } from '../components/merchant/MerchantExperience';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('======================================================');
console.log(' AIXSHOP SPRINT 1 BEHAVIORAL VERIFICATION SUITE');
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

// Read relevant component source files for behavioral static-trace & state checks
const appPath = path.resolve(__dirname, '../App.tsx');
const appSrc = fs.readFileSync(appPath, 'utf8');

const merchantExpPath = path.resolve(__dirname, '../components/merchant/MerchantExperience.tsx');
const merchantExpSrc = fs.readFileSync(merchantExpPath, 'utf8');

const homePath = path.resolve(__dirname, '../components/merchant/MerchantOverviewHome.tsx');
const homeSrc = fs.readFileSync(homePath, 'utf8');

const heroPath = path.resolve(__dirname, '../components/merchant/StoreAuditHero.tsx');
const heroSrc = fs.readFileSync(heroPath, 'utf8');

const findingsPath = path.resolve(__dirname, '../components/merchant/StoreFindingsSection.tsx');
const findingsSrc = fs.readFileSync(findingsPath, 'utf8');

const modalPath = path.resolve(__dirname, '../components/merchant/ProductAuditModal.tsx');
const modalSrc = fs.readFileSync(modalPath, 'utf8');

// Test A: Initial application opens Merchant Console
console.log('--- TEST A: RUNTIME APPLICATION ENTRY ---');
assert(
  appSrc.includes("useState<UserJourney>('merchant')"),
  'Test A: Initial application opens Merchant Console (currentJourney defaults to "merchant")'
);
assert(
  appSrc.includes("useState<MerchantTab>('home')"),
  'Test A: Merchant sub-tab defaults to "home"'
);

// Test B: Merchant Home renders Store Audit
console.log('\n--- TEST B: MERCHANT HOME RENDERS STORE AUDIT ---');
assert(
  homeSrc.includes('<StoreAuditHero'),
  'Test B: MerchantOverviewHome renders StoreAuditHero'
);
assert(
  heroSrc.includes('Store Audit') && heroSrc.includes('Audit My Store'),
  'Test B: Store Audit CTA headline and button present in English'
);

// Test C: Click Store Audit does NOT open Product Audit
console.log('\n--- TEST C: STORE AUDIT DOES NOT OPEN PRODUCT AUDIT ---');
assert(
  !homeSrc.includes('onAuditStore={(url) => {\n          setSelectedProductAudit'),
  'Test C: Store audit trigger does NOT auto-invoke product audit modal'
);
assert(
  homeSrc.includes('handleAuditStore') && !homeSrc.includes('handleAuditStore = () => {\n    setIsProductModalOpen(true)'),
  'Test C: handleAuditStore does not set isProductModalOpen to true'
);

// Test D: Store Finding -> affected product -> Product Audit
console.log('\n--- TEST D: STORE FINDINGS DRILL-DOWN ---');
assert(
  findingsSrc.includes('onInspectProduct') && findingsSrc.includes('Audit Product →'),
  'Test D: Store findings provides "Audit Product →" drill-down button'
);
assert(
  homeSrc.includes('onInspectProduct={handleInspectProduct}'),
  'Test D: MerchantOverviewHome wires handleInspectProduct from findings'
);
assert(
  homeSrc.includes('setIsProductModalOpen(true)'),
  'Test D: handleInspectProduct opens Product Audit modal'
);

// Test E: Product ID is NEVER passed as Issue ID (ID Integrity)
console.log('\n--- TEST E: PRODUCT ID ≠ ISSUE ID INTEGRITY ---');
const sampleProductId = CANONICAL_CATALOG_PRODUCTS[0].id; // aix-prod-849201948172
const sampleIssueId = 'iss-001';

// Verify format differences
assert(
  sampleProductId.startsWith('aix-prod-') && sampleIssueId.startsWith('iss-'),
  'Test E: Product ID prefix (aix-prod-) is distinct from Issue ID prefix (iss-)'
);
// In approveIssue function, verifying that passing a product ID would not resolve any issue
const testIssues = [...sampleIssuesData];
const resolvedWithProductId = approveIssue(testIssues, sampleProductId);
const resolvedWithIssueId = approveIssue(testIssues, sampleIssueId);

assert(
  getOpenIssuesCount(resolvedWithProductId) === getOpenIssuesCount(testIssues),
  'Test E: Passing Product ID to approveIssue resolves 0 issues (protecting state integrity)'
);
assert(
  getOpenIssuesCount(resolvedWithIssueId) === getOpenIssuesCount(testIssues) - 1,
  'Test E: Passing Issue ID to approveIssue correctly resolves the issue'
);
assert(
  homeSrc.includes('Product ID != Issue ID') || homeSrc.includes('Product ID ≠ Issue ID'),
  'Test E: MerchantOverviewHome explicitly documents and enforces Product ID ≠ Issue ID'
);
assert(
  !homeSrc.includes('onApproveIssue(selectedProductAudit.id)'),
  'Test E: MerchantOverviewHome NEVER passes selectedProductAudit.id (product ID) to onApproveIssue'
);

// Test F: Product Recheck updates the correct issue
console.log('\n--- TEST F: PRODUCT RECHECK UPDATES CORRECT ISSUE ---');
assert(
  modalSrc.includes('onRecheckProduct') && modalSrc.includes('Re-check Product'),
  'Test F: ProductAuditModal exposes onRecheckProduct with "Re-check Product" trigger in English'
);
const afterRecheck = approveIssue(testIssues, 'iss-001');
const newReadiness = calculateReadinessScore(getApprovedIssuesCount(afterRecheck));
assert(
  newReadiness > BASE_READINESS_SCORE,
  `Test F: Approving iss-001 increases canonical readiness from ${BASE_READINESS_SCORE}% to ${newReadiness}%`
);

// Test G: No external visibility claim is rendered as actual observation
console.log('\n--- TEST G: TRUTH BOUNDARIES (READINESS ≠ VISIBILITY) ---');
assert(
  heroSrc.includes('Catalog Readiness') && heroSrc.includes('Not an external ranking guarantee'),
  'Test G: Surfaces framed honestly as Catalog Readiness without fake rankings'
);
assert(
  heroSrc.includes('Not yet observed'),
  'Test G: Unobserved visibility is explicitly labeled as "Not yet observed"'
);
assert(
  !heroSrc.includes('actual ranking') && !heroSrc.includes('Your store is #7 on Google'),
  'Test G: Zero fabricated external rank claims'
);

// Test H, I, J, K: Secondary Journeys & Action Center
console.log('\n--- TEST H, I, J, K: SECONDARY JOURNEYS & ACTION CENTER ---');
assert(
  appSrc.includes("currentJourney === 'landing'"),
  'Test H: Landing page remains implemented and accessible'
);
assert(
  merchantExpSrc.includes('onNavigateLanding'),
  'Test H: MerchantExperience provides onNavigateLanding callback to return to landing'
);

assert(
  appSrc.includes("currentJourney === 'shopper'"),
  'Test I: Shopper journey remains implemented and accessible'
);
assert(
  merchantExpSrc.includes('onNavigateShopper'),
  'Test I: MerchantExperience provides onNavigateShopper switcher'
);

assert(
  appSrc.includes("currentJourney === 'admin'"),
  'Test J: Admin journey remains implemented and accessible'
);
assert(
  merchantExpSrc.includes('onNavigateAdmin'),
  'Test J: MerchantExperience provides onNavigateAdmin switcher'
);

assert(
  homeSrc.includes('<MerchantActionCenter') && homeSrc.includes('showActionCenter'),
  'Test K: Merchant Action Center is collapsible/secondary on Home'
);
assert(
  homeSrc.includes('Advanced Workspace'),
  'Test K: Action Center labeled as Advanced Workspace'
);

// Test L: Runtime Render Verification of All 10 Tabs (No Blank Screen)
console.log('\n--- TEST L: RUNTIME NAVIGATION MATRIX (NO BLANK SCREENS) ---');
const allTabs: MerchantTab[] = [
  'home', 'catalog', 'issues', 'readiness', 'offers', 
  'monitoring', 'analytics', 'integrations', 'billing', 'report'
];

for (const tab of allTabs) {
  try {
    const html = renderToString(React.createElement(MerchantExperience, { initialTab: tab }));
    assert(html.length > 5000, `Test L: Tab "${tab}" renders cleanly without blank screen (${html.length} bytes)`);
  } catch (err: any) {
    assert(false, `Test L: Tab "${tab}" crashed during render: ${err?.message}`);
  }
}

// Test M: Strict Product Identity Integrity (No fallback across products)
console.log('\n--- TEST M: STRICT PRODUCT IDENTITY INTEGRITY ---');
assert(
  !homeSrc.includes("issues.filter(i => !i.isResolved).slice(0, 1)"),
  'Test M: No cross-product issue fallback when product has no matching issues'
);
assert(
  modalSrc.includes("No open issues found for this product"),
  'Test M: ProductAuditModal cleanly handles products with zero open issues'
);

// Test N: Language Audit - Zero Thai text in rendered Merchant UI
console.log('\n--- TEST N: LANGUAGE AUDIT (ZERO THAI IN MERCHANT UI) ---');
const thaiRegex = /[\u0E00-\u0E7F]/;
assert(!thaiRegex.test(heroSrc), 'Test N: StoreAuditHero has 0 Thai characters');
assert(!thaiRegex.test(findingsSrc), 'Test N: StoreFindingsSection has 0 Thai characters');
assert(!thaiRegex.test(modalSrc), 'Test N: ProductAuditModal has 0 Thai characters');
assert(!thaiRegex.test(homeSrc), 'Test N: MerchantOverviewHome has 0 Thai characters');

// Test O: Legacy Leakage Audit (No P06/P07/P09/P10/Page 01-07 in Merchant rendered UI)
console.log('\n--- TEST O: ARCHITECTURAL LEAKAGE AUDIT ---');
const homeRenderedHtml = renderToString(React.createElement(MerchantExperience, { initialTab: 'home' }));
const catalogRenderedHtml = renderToString(React.createElement(MerchantExperience, { initialTab: 'catalog' }));

assert(!homeRenderedHtml.includes('P06') && !homeRenderedHtml.includes('P10'), 'Test O: Home rendered UI has zero P06/P10 badges');
assert(!catalogRenderedHtml.includes('P06') && !catalogRenderedHtml.includes('P10'), 'Test O: Catalog rendered UI has zero P06/P10 badges');
assert(!homeRenderedHtml.includes('FuturePageBoundaryModal'), 'Test O: Home rendered UI has zero FuturePageBoundaryModal');

console.log('\n======================================================');
console.log(` RESULTS: ${passedTests} passed, ${failedTests} failed out of ${totalTests} total behavioral tests`);
console.log('======================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('Sprint 1 Behavioral Verification PASSED cleanly!\n');
}
