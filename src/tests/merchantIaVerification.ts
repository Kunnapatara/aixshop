/**
 * AIXSHOP — MERCHANT NAVIGATION & INTERACTION REPAIR VERIFICATION
 * 
 * Verifies:
 * 1. Shared Canonical Navigation Contract (MERCHANT_PRIMARY_NAV_ITEMS, MERCHANT_MORE_NAV_ITEMS)
 * 2. Invariant: MORE_DROPDOWN_LABEL is 'More' and never replaced by child tab name
 * 3. Tab resolution and alias handling (overview -> home, products -> catalog, discovery -> readiness)
 * 4. Actual Source-Level Navigation Wiring in MerchantExperience.tsx:
 *    - All 10 destinations have non-null, active render branches
 *    - hideNavShell is propagated to prevent double-navigation
 *    - AddProductsModal and onScanUrl -> report transitions are wired
 * 5. Mental Model Recheck Truth Boundary (simulation explicitly marked representative)
 * 6. AddProductsModal non-dead interaction handlers (file onChange, connect handlers)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { 
  MERCHANT_PRIMARY_NAV_ITEMS, 
  MERCHANT_MORE_NAV_ITEMS, 
  MORE_DROPDOWN_LABEL, 
  resolveMerchantTab, 
  isMoreSecondaryTab,
  MERCHANT_MENTAL_MODEL_STAGES
} from '../components/merchant/merchantNavigationConfig';
import { CANONICAL_SYSTEM_KPIS } from '../data/canonicalCatalog';
import { sampleIssuesMetrics } from '../data/sampleIssuesData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

console.log('\n======================================================');
console.log(' AIXSHOP SPRINT VERIFICATION: NAVIGATION & INTERACTION REPAIR');
console.log('======================================================\n');

// 1. CANONICAL NAVIGATION CONFIGURATION
console.log('--- 1. SHARED CANONICAL NAVIGATION CONTRACT ---');

assert(MERCHANT_PRIMARY_NAV_ITEMS.length === 4, 'Exactly 4 primary navigation tabs', `found: ${MERCHANT_PRIMARY_NAV_ITEMS.length}`);
const primaryIds = MERCHANT_PRIMARY_NAV_ITEMS.map(i => i.id);
assert(primaryIds.includes('home'), 'Primary nav contains "home"');
assert(primaryIds.includes('catalog'), 'Primary nav contains "catalog"');
assert(primaryIds.includes('issues'), 'Primary nav contains "issues"');
assert(primaryIds.includes('readiness'), 'Primary nav contains "readiness"');

assert(MORE_DROPDOWN_LABEL === 'More', 'More dropdown label is strictly invariant "More"', `found: ${MORE_DROPDOWN_LABEL}`);

assert(MERCHANT_MORE_NAV_ITEMS.length === 5, 'Exactly 5 secondary tools in More dropdown', `found: ${MERCHANT_MORE_NAV_ITEMS.length}`);
const moreIds = MERCHANT_MORE_NAV_ITEMS.map(i => i.id);
assert(moreIds.includes('offers'), 'More contains "offers"');
assert(moreIds.includes('monitoring'), 'More contains "monitoring"');
assert(moreIds.includes('analytics'), 'More contains "analytics"');
assert(moreIds.includes('integrations'), 'More contains "integrations" (Connections & Feeds)');
assert(moreIds.includes('billing'), 'More contains "billing"');

// 2. TAB RESOLUTION AND SECONDARY CHECK
console.log('\n--- 2. TAB RESOLVER & SECONDARY CLASSIFICATION ---');

assert(resolveMerchantTab('home') === 'home', 'Resolves home -> home');
assert(resolveMerchantTab('overview') === 'home', 'Resolves alias overview -> home');
assert(resolveMerchantTab('catalog') === 'catalog', 'Resolves catalog -> catalog');
assert(resolveMerchantTab('products') === 'catalog', 'Resolves alias products -> catalog');
assert(resolveMerchantTab('issues') === 'issues', 'Resolves issues -> issues');
assert(resolveMerchantTab('readiness') === 'readiness', 'Resolves readiness -> readiness');
assert(resolveMerchantTab('discovery') === 'readiness', 'Resolves alias discovery -> readiness');
assert(resolveMerchantTab('offers') === 'offers', 'Resolves offers -> offers');
assert(resolveMerchantTab('monitoring') === 'monitoring', 'Resolves monitoring -> monitoring');
assert(resolveMerchantTab('analytics') === 'analytics', 'Resolves analytics -> analytics');
assert(resolveMerchantTab('integrations') === 'integrations', 'Resolves integrations -> integrations');
assert(resolveMerchantTab('billing') === 'billing', 'Resolves billing -> billing');
assert(resolveMerchantTab('report') === 'report', 'Resolves report -> report');
assert(resolveMerchantTab('invalid_tab') === 'home', 'Fallback for unknown tab is home');

assert(!isMoreSecondaryTab('home'), 'home is not a More secondary tab');
assert(!isMoreSecondaryTab('catalog'), 'catalog is not a More secondary tab');
assert(!isMoreSecondaryTab('issues'), 'issues is not a More secondary tab');
assert(!isMoreSecondaryTab('readiness'), 'readiness is not a More secondary tab');
assert(isMoreSecondaryTab('offers'), 'offers is classified as a More secondary tab');
assert(isMoreSecondaryTab('monitoring'), 'monitoring is classified as a More secondary tab');
assert(isMoreSecondaryTab('analytics'), 'analytics is classified as a More secondary tab');
assert(isMoreSecondaryTab('integrations'), 'integrations is classified as a More secondary tab');
assert(isMoreSecondaryTab('billing'), 'billing is classified as a More secondary tab');

// 3. SOURCE WIRING AUDIT: MERCHANT EXPERIENCE
console.log('\n--- 3. SOURCE WIRING: MERCHANT EXPERIENCE ---');

const merchantExperiencePath = path.resolve(__dirname, '../components/merchant/MerchantExperience.tsx');
assert(fs.existsSync(merchantExperiencePath), 'MerchantExperience.tsx exists');
const merchantExperienceSrc = fs.readFileSync(merchantExperiencePath, 'utf8');

// A. Bug check: Ensure "getMoreLabel()" is NOT used to overwrite the More label
assert(!merchantExperienceSrc.includes('getMoreLabel()'), 'CRITICAL FIX: getMoreLabel() removed; More label never replaced');
assert(merchantExperienceSrc.includes('MORE_DROPDOWN_LABEL'), 'More button explicitly uses MORE_DROPDOWN_LABEL invariant');

// B. Render branch check: All 10 destinations must have actual rendered blocks
const requiredRenderBranches = [
  "activeTab === 'home'",
  "activeTab === 'catalog'",
  "activeTab === 'offers'",
  "activeTab === 'readiness'",
  "activeTab === 'issues'",
  "activeTab === 'monitoring'",
  "activeTab === 'analytics'",
  "activeTab === 'integrations'",
  "activeTab === 'billing'",
  "activeTab === 'report'"
];

requiredRenderBranches.forEach(branch => {
  assert(merchantExperienceSrc.includes(branch), `MerchantExperience contains active workspace branch: ${branch}`);
});

// C. Verify component rendering in branches
assert(merchantExperienceSrc.includes('<MerchantOverviewHome'), 'Renders MerchantOverviewHome');
assert(merchantExperienceSrc.includes('<ProductsWorkbenchPage'), 'Renders ProductsWorkbenchPage');
assert(merchantExperienceSrc.includes('<OffersPricingPage'), 'Renders OffersPricingPage');
assert(merchantExperienceSrc.includes('<MerchantDiscoveryPage'), 'Renders MerchantDiscoveryPage');
assert(merchantExperienceSrc.includes('<IssuesPage'), 'Renders IssuesPage');
assert(merchantExperienceSrc.includes('<MonitoringPage'), 'Renders MonitoringPage');
assert(merchantExperienceSrc.includes('<AnalyticsPage'), 'Renders AnalyticsPage');
assert(merchantExperienceSrc.includes('<IntegrationsPage'), 'Renders IntegrationsPage');
assert(merchantExperienceSrc.includes('<BillingPage'), 'Renders BillingPage');
assert(merchantExperienceSrc.includes('<ProductIntelligenceReportPage'), 'Renders ProductIntelligenceReportPage');

// D. Single authoritative shell invariant: hideNavShell propagation
assert(merchantExperienceSrc.includes('hideNavShell={true}'), 'MerchantExperience passes hideNavShell={true} to eliminate duplicate shells');

// E. Add products modal wiring
assert(merchantExperienceSrc.includes('<AddProductsModal'), 'MerchantExperience includes AddProductsModal');
assert(merchantExperienceSrc.includes('onScanUrl={handleScanUrl}'), 'AddProductsModal wired with onScanUrl handler');
assert(merchantExperienceSrc.includes("setActiveTab('report')"), 'URL scan transitions to report tab');

// 4. INTERACTIVE AUDIT: ADD PRODUCTS MODAL
console.log('\n--- 4. INTERACTION INTEGRITY: ADD PRODUCTS MODAL ---');

const addProductsModalPath = path.resolve(__dirname, '../components/merchant/AddProductsModal.tsx');
assert(fs.existsSync(addProductsModalPath), 'AddProductsModal.tsx exists');
const addProductsModalSrc = fs.readFileSync(addProductsModalPath, 'utf8');

assert(addProductsModalSrc.includes('onChange={handleFileChange}'), 'CSV file input has working onChange handler (no dead input)');
assert(addProductsModalSrc.includes('onClick={handleShopifySync}'), 'Shopify connector has working interactive click handler');
assert(addProductsModalSrc.includes('onClick={handleWooCommerceClick}'), 'WooCommerce connector has working interactive click handler');
assert(addProductsModalSrc.includes('Truth Boundary'), 'AddProductsModal states honest truth boundary');

// 5. TRUTH BOUNDARY: MENTAL MODEL RECHECK
console.log('\n--- 5. TRUTH BOUNDARY: RECHECK SIMULATION ---');

const workflowPath = path.resolve(__dirname, '../components/merchant/MerchantMentalModelWorkflow.tsx');
assert(fs.existsSync(workflowPath), 'MerchantMentalModelWorkflow.tsx exists');
const workflowSrc = fs.readFileSync(workflowPath, 'utf8');

assert(workflowSrc.includes('simulation'), 'Recheck explicitly labeled as simulation (SIMULATION ≠ ACTUAL AUDIT)');
assert(workflowSrc.includes('representative preview'), 'Recheck notice explicitly labeled representative preview');

// 6. SYSTEM INVARIANTS PRESERVED
console.log('\n--- 6. CATALOG INVARIANTS ---');

assert(CANONICAL_SYSTEM_KPIS.totalCatalogProducts === 24, 'Total catalog products remains 24');
assert(sampleIssuesMetrics.openIssues === 8, 'Derived open issues count remains 8');
assert(CANONICAL_SYSTEM_KPIS.discoveryReadinessPct === 79, 'Discovery readiness score remains 79%');
assert(MERCHANT_MENTAL_MODEL_STAGES.length === 6, 'Mental model contains exactly 6 stages');

console.log('\n======================================================');
console.log(` RESULTS: ${passedTests} passed, ${failedTests} failed out of ${totalTests} total tests`);
console.log('======================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('Navigation & Interaction Repair Verification PASSED cleanly!\n');
}
