import React, { useState } from 'react';
import { 
  ArrowRight
} from 'lucide-react';
import { CANONICAL_SYSTEM_KPIS, CANONICAL_CATALOG_PRODUCTS, CANONICAL_MERCHANT } from '../../data/canonicalCatalog';
import { sampleIssuesData } from '../../data/sampleIssuesData';
import { MerchantActionCenter } from './MerchantActionCenter';
import { StoreAuditHero } from './StoreAuditHero';
import { StoreFindingsSection } from './StoreFindingsSection';
import { ProductAuditModal } from './ProductAuditModal';
import { IssueItem } from '../../types/issues';

interface MerchantOverviewHomeProps {
  onNavigateIssues: () => void;
  onNavigateProducts: () => void;
  onNavigateOffers: () => void;
  onNavigateDiscovery: () => void;
  onNavigateMonitoring: () => void;
  onNavigateReport: () => void;
  onNavigateIntegrations?: () => void;
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
  onNavigateOffers,
  onNavigateDiscovery,
  onNavigateMonitoring,
  onNavigateReport,
  onNavigateIntegrations,
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
  const [selectedProductAudit, setSelectedProductAudit] = useState<{ id: string; name: string }>({
    id: CANONICAL_CATALOG_PRODUCTS[0].id,
    name: CANONICAL_CATALOG_PRODUCTS[0].name
  });
  const [isAuditingStore, setIsAuditingStore] = useState(false);
  const [showActionCenter, setShowActionCenter] = useState(false);

  const openIssuesCount = issues.filter(i => !i.isResolved && i.recoveryState !== 'Resolved').length;

  // Store Audit Trigger (Runs real store audit / preview simulation without opening product modal)
  const handleAuditStore = (url?: string) => {
    setIsAuditingStore(true);
    if (onRecheckStore) {
      onRecheckStore();
    }
    setTimeout(() => {
      setIsAuditingStore(false);
      const resultEl = document.getElementById('audit-result-banner');
      if (resultEl) {
        resultEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 750);
  };

  // Product Audit Trigger (ONLY called when merchant clicks "ตรวจสินค้านี้ →" on an affected product)
  const handleInspectProduct = (productId: string, productName: string) => {
    setSelectedProductAudit({ id: productId, name: productName });
    setIsProductModalOpen(true);
  };

  const scrollToFindings = () => {
    const el = document.getElementById('store-findings-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToActionCenter = () => {
    setShowActionCenter(true);
    setTimeout(() => {
      const el = document.getElementById('action-center-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* 1. STORE-FIRST AUDIT HERO (Primary Entry Point: ตรวจร้านของคุณ) */}
      <StoreAuditHero
        readinessScore={readinessScore}
        openIssuesCount={openIssuesCount}
        onAuditStore={handleAuditStore}
        onStartFixing={scrollToFindings}
        onRecheckStore={handleAuditStore}
        isRechecking={isAuditingStore || isRechecking}
      />

      {/* 2. STORE AUDIT RESULT SUMMARY BANNER */}
      <div 
        id="audit-result-banner"
        className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-stone-900 to-stone-800 text-white shadow-sm border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-orange-400">
              ผลการตรวจร้าน (Store Audit Result)
            </span>
            <span className="text-xs text-stone-400 font-mono">
              · {CANONICAL_MERCHANT.domain}
            </span>
          </div>

          <div className="flex flex-wrap items-baseline gap-3 pt-1">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              ความพร้อมของร้าน {readinessScore}%
            </h3>
            <span className="text-xs sm:text-sm text-stone-300 font-medium">
              — มี {openIssuesCount} เรื่องที่ควรปรับปรุง (3 เรื่องต้องแก้ก่อน)
            </span>
          </div>

          <p className="text-xs text-stone-400 max-w-2xl leading-relaxed">
            การตรวจสัญญาณระดับร้านค้า (Store Signals) และสเปกสินค้า (Catalog Signals) ครบ {CANONICAL_SYSTEM_KPIS.totalCatalogProducts} รายการ ข้อมูลจัดกลุ่มตามความสำคัญเพื่อให้แก้ที่ต้นทางได้ทันที
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
          <button
            type="button"
            onClick={scrollToFindings}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all cursor-pointer"
          >
            <span>ดูเรื่องที่ต้องแก้</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. FINDINGS GROUPED BY ACTION PRIORITY: ต้องแก้ก่อน | ควรปรับปรุง | ดีแล้ว */}
      <div id="store-findings-section">
        <StoreFindingsSection
          issues={issues}
          onInspectProduct={handleInspectProduct}
          onOpenActionCenter={scrollToActionCenter}
          onResolveIssue={(id) => onApproveIssue && onApproveIssue(id)}
        />
      </div>

      {/* 4. PRODUCT AUDIT DIAGNOSTIC MODAL (Drill-down from Affected Products) */}
      <ProductAuditModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        productId={selectedProductAudit.id}
        productName={selectedProductAudit.name}
        onRecheckProduct={() => {
          if (onApproveIssue) {
            onApproveIssue(selectedProductAudit.id);
          }
        }}
      />

      {/* 5. GUIDED ACTION CENTER WORKSPACE (Secondary Guided Resolution) */}
      <div id="action-center-section" className="border border-stone-200/80 rounded-3xl bg-white overflow-hidden shadow-xs">
        <div 
          onClick={() => setShowActionCenter(!showActionCenter)}
          className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-stone-50/60 transition-colors"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-800">
                เครื่องมือจัดการงานเชิงลึก (Advanced Workspace)
              </span>
              <span className="text-xs text-stone-400 font-medium">·</span>
              <span className="text-xs font-semibold text-stone-700">
                Guided Review & Diff Verification
              </span>
            </div>
            <h3 className="text-base font-bold text-stone-900">
              ศูนย์จัดการและอนุมัติการแก้ไข (Merchant Action Center)
            </h3>
            <p className="text-xs text-stone-500">
              สำหรับผู้ดูแลที่ต้องการดูความต่างของข้อมูล (Diff), แก้ไขค่าด้วยตนเอง และบันทึกคำตอบทีละรายการ
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              {showActionCenter ? 'ย่อ Action Center ▲' : 'เปิด Action Center ▼'}
            </button>
          </div>
        </div>

        {showActionCenter && (
          <div className="p-6 pt-0 border-t border-stone-100 animate-in fade-in">
            <MerchantActionCenter
              issues={issues}
              onApproveIssue={onApproveIssue}
              onDismissIssue={onDismissIssue}
              onInspectIssue={onInspectIssue || ((iss) => onNavigateIssues())}
              onNavigateCatalog={onNavigateProducts}
              onNavigateReadiness={onNavigateDiscovery}
              onNavigateIntegrations={onNavigateIntegrations}
              onAddProducts={onAddProducts || onNavigateProducts}
              readinessScore={readinessScore}
            />
          </div>
        )}
      </div>

      {/* 6. LEVEL 2 INTELLIGENCE WORKSPACES (Secondary Navigation Shortcuts) */}
      <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
            ข้อมูลเชิงลึกเฉพาะด้าน (Advanced Intelligence Surfaces)
          </h4>
          <p className="text-xs text-stone-500">
            ดูแคตตาล็อกสินค้า, การวิเคราะห์ความพร้อม (Readiness) หรือการเชื่อมต่อฟีดในหน้าเครื่องมือเฉพาะ
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onNavigateProducts}
            className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            แคตตาล็อก ({CANONICAL_SYSTEM_KPIS.totalCatalogProducts} สินค้า) →
          </button>
          <button
            type="button"
            onClick={onNavigateDiscovery}
            className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            ความพร้อม ({readinessScore}%) →
          </button>
          <button
            type="button"
            onClick={onNavigateIssues}
            className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold transition-colors cursor-pointer"
          >
            รายการปัญหา ({openIssuesCount} รายการ) →
          </button>
        </div>
      </div>

    </div>
  );
};
