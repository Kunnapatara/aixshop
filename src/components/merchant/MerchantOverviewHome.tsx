import React, { useState } from 'react';
import { 
  ArrowRight,
  Package,
  AlertTriangle,
  Tag,
  CheckCircle2,
  Compass,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { CANONICAL_SYSTEM_KPIS, CANONICAL_CATALOG_PRODUCTS, CANONICAL_MERCHANT } from '../../data/canonicalCatalog';
import { sampleIssuesData } from '../../data/sampleIssuesData';
import { StoreAuditHero } from './StoreAuditHero';
import { MerchantActionCenter } from './MerchantActionCenter';
import { StoreFindingsSection } from './StoreFindingsSection';
import { ProductAuditModal } from './ProductAuditModal';
import { IssueItem } from '../../types/issues';

interface MerchantOverviewHomeProps {
  onNavigateIssues: () => void;
  onNavigateProducts: () => void;
  onNavigateVisibility: () => void;
  onAddProducts?: () => void;
  issues?: IssueItem[];
  onApproveIssue?: (issueId: string, customValue?: string) => void;
  onDismissIssue?: (issueId: string) => void;
  onInspectIssue?: (issue: IssueItem) => void;
  readinessScore?: number;
  onRecheckStore?: () => void;
  isRechecking?: boolean;
}

export const MerchantOverviewHome: React.FC<MerchantOverviewHomeProps> = ({
  onNavigateIssues,
  onNavigateProducts,
  onNavigateVisibility,
  onAddProducts,
  issues = sampleIssuesData,
  onApproveIssue,
  onDismissIssue,
  onInspectIssue,
  readinessScore = CANONICAL_SYSTEM_KPIS.discoveryReadinessPct,
  onRecheckStore,
  isRechecking = false
}) => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProductAudit, setSelectedProductAudit] = useState<{ id: string; name: string; issueIds: string[] }>({
    id: CANONICAL_CATALOG_PRODUCTS[0].id,
    name: CANONICAL_CATALOG_PRODUCTS[0].name,
    issueIds: ['iss-001']
  });

  const openIssuesCount = issues.filter(i => !i.isResolved && i.recoveryState !== 'Resolved').length;

  // Product Audit Trigger (ONLY called when merchant clicks "Audit Product →" on an affected product)
  // ID Integrity: Strictly maps product ID to its own matching open issue IDs.
  // Rule: NEVER fallback to another product's issues if this product has none.
  const handleInspectProduct = (productId: string, productName: string) => {
    const matchingIssues = issues.filter(i => i.productId === productId && !i.isResolved);
    const issueIds = matchingIssues.map(i => i.id);

    setSelectedProductAudit({ id: productId, name: productName, issueIds });
    setIsProductModalOpen(true);
  };

  const scrollToNeedsAttention = () => {
    const el = document.getElementById('needs-attention-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Store Audit handler: runs catalog recheck; does NOT open Product Audit modal
  const handleAuditStore = (url?: string) => {
    if (onRecheckStore) {
      onRecheckStore();
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. STORE STATUS & PRIMARY QUESTION: What needs your attention? (Sections 5A & 5B) */}
      <StoreAuditHero
        openIssuesCount={openIssuesCount}
        readinessScore={readinessScore}
        onAuditStore={handleAuditStore}
        onStartFixing={scrollToNeedsAttention}
        onRecheckStore={onRecheckStore}
        isRechecking={isRechecking}
      />

      {/* 2. STRATEGIC PILLARS: Priority Actions & Catalog Health (Sections 6 & 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        
        {/* Column 1: Priority Actions (Section 6) */}
        <div className="lg:col-span-7 p-4 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-white border border-stone-200/80 shadow-xs flex flex-col justify-between space-y-4 sm:space-y-5">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block">
              Priority actions
            </span>
            <h2 className="text-lg font-extrabold text-stone-900 tracking-tight">
              Actions Requiring Attention
            </h2>
            <p className="text-xs text-stone-500">
              Derived from product specification and offer audits across your catalog.
            </p>
          </div>

          <div className="space-y-3">
            {/* Action Item 1 */}
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-stone-50 border border-stone-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-orange-200 transition-colors">
              <div className="space-y-1">
                <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                  <span>4 products are missing key specifications</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-normal">
                  Shoppers asking technical queries receive incomplete answers from AI answer engines.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleInspectProduct(CANONICAL_CATALOG_PRODUCTS[0].id, CANONICAL_CATALOG_PRODUCTS[0].name)}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition-all shrink-0 cursor-pointer w-full sm:w-auto"
              >
                <span>Fix products →</span>
              </button>
            </div>

            {/* Action Item 2 */}
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-stone-50 border border-stone-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-orange-200 transition-colors">
              <div className="space-y-1">
                <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                  <span>3 offers have incomplete commercial information</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-normal">
                  Store pricing and promotions conflict with third-party merchant listings.
                </p>
              </div>
              <button
                type="button"
                onClick={onNavigateIssues}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition-all shrink-0 cursor-pointer w-full sm:w-auto"
              >
                <span>Review offers →</span>
              </button>
            </div>

            {/* Action Item 3 */}
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-stone-50 border border-stone-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-orange-200 transition-colors">
              <div className="space-y-1">
                <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                  <span>5 product descriptions lack structured attribute tags</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-normal">
                  Structured attribute tags help shopping systems understand and match catalog items.
                </p>
              </div>
              <button
                type="button"
                onClick={onNavigateIssues}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition-all shrink-0 cursor-pointer w-full sm:w-auto"
              >
                <span>Review issues →</span>
              </button>
            </div>
          </div>
        </div>

        {/* Column 2: Catalog Health & Visibility Status (Sections 7, 8, 9, 10) */}
        <div className="lg:col-span-5 space-y-5 sm:space-y-6 flex flex-col justify-between">
          
          {/* Card A: Catalog Health (Section 7) */}
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                  Catalog health
                </span>
                <h3 className="text-base font-extrabold text-stone-900">
                  {CANONICAL_SYSTEM_KPIS.totalCatalogProducts} Products Total
                </h3>
              </div>
              <button
                type="button"
                onClick={onNavigateProducts}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
              >
                <span>Review catalog →</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-rose-50/70 border border-rose-100">
                <div className="text-lg font-black text-rose-900">12</div>
                <div className="text-[10px] font-semibold text-rose-700">Need attention</div>
              </div>
              <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <div className="text-lg font-black text-emerald-900">8</div>
                <div className="text-[10px] font-semibold text-emerald-700">Good shape</div>
              </div>
              <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-stone-100 border border-stone-200/60">
                <div className="text-lg font-black text-stone-800">4</div>
                <div className="text-[10px] font-semibold text-stone-600">Need review</div>
              </div>
            </div>

            <p className="text-[11px] text-stone-500 leading-normal">
              Internal catalog completeness: <strong className="text-stone-800 font-semibold">{readinessScore}%</strong>. Based on current structured data quality across products and active offers.
            </p>
          </div>

          {/* Card B: Visibility Status (Sections 8, 9, 10) */}
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-stone-900 text-white shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400 block">
                  Visibility
                </span>
                <h3 className="text-base font-bold text-white">
                  Customer Search Observations
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
                Not yet observed
              </span>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              AIXSHOP has not yet completed a live visibility check for this store. 4 customer buyer intent queries are available to preview in the Visibility workspace.
            </p>

            <button
              type="button"
              onClick={onNavigateVisibility}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
            >
              <span>View visibility →</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* 3. GUIDED ACTION CENTER & REVIEW WORKFLOW */}
      <div id="action-center-section">
        <MerchantActionCenter
          issues={issues}
          onApproveIssue={onApproveIssue}
          onDismissIssue={onDismissIssue}
          onInspectIssue={onInspectIssue}
          onNavigateCatalog={onNavigateProducts}
          readinessScore={readinessScore}
        />
      </div>

      {/* 4. FINDINGS GROUPED BY ACTION PRIORITY: Must Fix | Improve | Healthy (Section 15) */}
      <div id="needs-attention-section">
        <StoreFindingsSection
          issues={issues}
          onInspectProduct={handleInspectProduct}
          onResolveIssue={(id) => onApproveIssue && onApproveIssue(id)}
        />
      </div>

      {/* 4. PRODUCT AUDIT DIAGNOSTIC MODAL (Drill-down from Affected Products) */}
      <ProductAuditModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        productId={selectedProductAudit.id}
        productName={selectedProductAudit.name}
        issueIds={selectedProductAudit.issueIds}
        onRecheckProduct={() => {
          if (onApproveIssue) {
            // ID INTEGRITY GUARANTEE: Product ID != Issue ID.
            // Approve the actual open issue IDs belonging to this product.
            if (selectedProductAudit.issueIds && selectedProductAudit.issueIds.length > 0) {
              selectedProductAudit.issueIds.forEach(issueId => {
                onApproveIssue(issueId);
              });
            }
          }
        }}
      />

    </div>
  );
};
