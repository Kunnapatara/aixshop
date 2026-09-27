import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Tag, 
  Compass, 
  AlertTriangle, 
  Activity, 
  BarChart3, 
  Cpu, 
  CreditCard, 
  FileText, 
  Layers, 
  ChevronDown, 
  Plus, 
  ExternalLink, 
  ShieldAlert, 
  BookOpen, 
  Store,
  Check
} from 'lucide-react';
import { MerchantOverviewHome } from './MerchantOverviewHome';
import { ProductsWorkbenchPage } from '../workbench/ProductsWorkbenchPage';
import { OffersPricingPage } from '../offers/OffersPricingPage';
import { MerchantDiscoveryPage } from '../discovery/MerchantDiscoveryPage';
import { IssuesPage } from '../issues/IssuesPage';
import { MonitoringPage } from '../monitoring/MonitoringPage';
import { AnalyticsPage } from '../analytics/AnalyticsPage';
import { IntegrationsPage } from '../integrations/IntegrationsPage';
import { BillingPage } from '../billing/BillingPage';
import { ProductIntelligenceReportPage } from '../report/ProductIntelligenceReportPage';
import { AddProductsModal } from './AddProductsModal';
import { 
  MerchantTab, 
  MERCHANT_PRIMARY_NAV_ITEMS, 
  MERCHANT_MORE_NAV_ITEMS, 
  MORE_DROPDOWN_LABEL, 
  resolveMerchantTab, 
  isMoreSecondaryTab 
} from './merchantNavigationConfig';
import { sampleIssuesMetrics } from '../../data/sampleIssuesData';
import { CANONICAL_SYSTEM_KPIS } from '../../data/canonicalCatalog';
import { sampleMonitoringMetrics } from '../../data/sampleMonitoringData';

// Re-export type for consumers
export type { MerchantTab };

interface MerchantExperienceProps {
  initialTab?: MerchantTab;
  onNavigateShopper?: () => void;
  onNavigateAdmin?: () => void;
  onNavigateLanding?: () => void;
}

export const MerchantExperience: React.FC<MerchantExperienceProps> = ({
  initialTab = 'home',
  onNavigateShopper,
  onNavigateAdmin,
  onNavigateLanding
}) => {
  const [activeTab, setActiveTab] = useState<MerchantTab>(resolveMerchantTab(initialTab));
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isStoreMenuOpen, setIsStoreMenuOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeScannedUrl, setActiveScannedUrl] = useState<string>('https://shop.aeropulse.com/products/vaporstride-carbon-elite');

  const moreMenuRef = useRef<HTMLDivElement>(null);
  const storeMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(e.target as Node)) {
        setIsMoreOpen(false);
      }
      if (storeMenuRef.current && !storeMenuRef.current.contains(e.target as Node)) {
        setIsStoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleScanUrl = (url: string) => {
    setActiveScannedUrl(url);
    setActiveTab('report');
  };

  const handleImportSample = () => {
    setActiveTab('catalog');
  };

  const isMoreActive = isMoreSecondaryTab(activeTab);

  // Map Lucide icons dynamically for primary tabs
  const getPrimaryIcon = (id: string, isActive: boolean) => {
    switch (id) {
      case 'home':
        return <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />;
      case 'catalog':
        return <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />;
      case 'issues':
        return <AlertTriangle className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-amber-600'}`} />;
      case 'readiness':
        return <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0" />;
      default:
        return null;
    }
  };

  // Map badges for primary tabs
  const getPrimaryBadge = (id: string, isActive: boolean) => {
    switch (id) {
      case 'catalog':
        return (
          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
            isActive ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-600'
          }`}>
            {CANONICAL_SYSTEM_KPIS.totalCatalogProducts}
          </span>
        );
      case 'issues':
        return (
          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
            isActive ? 'bg-amber-400/30 text-amber-200' : 'bg-rose-100 text-rose-800'
          }`}>
            {sampleIssuesMetrics.openIssues}
          </span>
        );
      case 'readiness':
        return (
          <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
            isActive ? 'bg-emerald-400/30 text-emerald-200' : 'bg-emerald-100 text-emerald-800'
          }`}>
            {CANONICAL_SYSTEM_KPIS.discoveryReadinessPct}%
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans">
      
      {/* 1. Single Authoritative Merchant Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-2 sm:gap-4">
            
            {/* Left Zone: Brand Wordmark + Primary Navigation */}
            <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 min-w-0">
              {/* Brand Wordmark */}
              <button
                type="button"
                onClick={() => setActiveTab('home')}
                className="flex items-center gap-2 text-left group cursor-pointer focus-visible:outline-none shrink-0"
                title="AIXSHOP Home"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#EA580C] to-[#F97316] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Layers className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-lg tracking-tight text-stone-900 group-hover:text-orange-600 transition-colors leading-none">
                    AIXSHOP
                  </span>
                  <span className="text-[10px] text-stone-400 font-semibold tracking-wide hidden md:inline leading-tight mt-0.5">
                    Merchant Console
                  </span>
                </div>
              </button>

              {/* Primary Merchant Navigation: Home | Catalog | Issues | Readiness | More ▾ */}
              <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 scrollbar-none" aria-label="Merchant Primary Navigation">
                {MERCHANT_PRIMARY_NAV_ITEMS.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-stone-900 text-white shadow-xs font-bold'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                      }`}
                    >
                      {getPrimaryIcon(item.id, isActive)}
                      <span>{item.label}</span>
                      {getPrimaryBadge(item.id, isActive)}
                    </button>
                  );
                })}

                {/* 5. More ▾ Dropdown (Invariant: Label ALWAYS remains 'More ▾') */}
                <div className="relative" ref={moreMenuRef}>
                  <button
                    type="button"
                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                    aria-expanded={isMoreOpen}
                    aria-haspopup="true"
                    className={`flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      isMoreActive
                        ? 'bg-stone-900 text-white shadow-xs font-bold'
                        : isMoreOpen
                          ? 'bg-stone-100 text-stone-900'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    <span>{MORE_DROPDOWN_LABEL}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${isMoreOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Floating Menu */}
                  {isMoreOpen && (
                    <div 
                      className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-stone-200/90 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                      role="menu"
                    >
                      <div className="px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-stone-400">
                        Operational Intelligence
                      </div>

                      {/* 1. Offers & Pricing */}
                      <button
                        type="button"
                        onClick={() => { setActiveTab('offers'); setIsMoreOpen(false); }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold hover:bg-stone-50 transition-colors text-left ${
                          activeTab === 'offers' ? 'text-orange-600 bg-orange-50/50 font-bold' : 'text-stone-700'
                        }`}
                        role="menuitem"
                      >
                        <div className="flex items-center gap-2.5">
                          <Tag className="w-4 h-4 text-stone-400 shrink-0" />
                          <div>
                            <div>Offers & Pricing</div>
                            <div className="text-[10px] text-stone-400 font-normal">Multi-seller intelligence</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-stone-400 font-mono">{CANONICAL_SYSTEM_KPIS.totalCommercialOffers}</span>
                          {activeTab === 'offers' && <Check className="w-3.5 h-3.5 text-orange-600" />}
                        </div>
                      </button>

                      {/* 2. Continuous Monitoring */}
                      <button
                        type="button"
                        onClick={() => { setActiveTab('monitoring'); setIsMoreOpen(false); }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold hover:bg-stone-50 transition-colors text-left ${
                          activeTab === 'monitoring' ? 'text-orange-600 bg-orange-50/50 font-bold' : 'text-stone-700'
                        }`}
                        role="menuitem"
                      >
                        <div className="flex items-center gap-2.5">
                          <Activity className="w-4 h-4 text-stone-400 shrink-0" />
                          <div>
                            <div>Continuous Monitoring</div>
                            <div className="text-[10px] text-stone-400 font-normal">Ground-truth drift alerts</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-stone-400 font-mono">{sampleMonitoringMetrics.changesDetected}</span>
                          {activeTab === 'monitoring' && <Check className="w-3.5 h-3.5 text-orange-600" />}
                        </div>
                      </button>

                      {/* 3. Quality & Recovery Analytics */}
                      <button
                        type="button"
                        onClick={() => { setActiveTab('analytics'); setIsMoreOpen(false); }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold hover:bg-stone-50 transition-colors text-left ${
                          activeTab === 'analytics' ? 'text-orange-600 bg-orange-50/50 font-bold' : 'text-stone-700'
                        }`}
                        role="menuitem"
                      >
                        <div className="flex items-center gap-2.5">
                          <BarChart3 className="w-4 h-4 text-stone-400 shrink-0" />
                          <div>
                            <div>Quality & Recovery Analytics</div>
                            <div className="text-[10px] text-stone-400 font-normal">Coverage & recovery curves</div>
                          </div>
                        </div>
                        {activeTab === 'analytics' && <Check className="w-3.5 h-3.5 text-orange-600" />}
                      </button>

                      {/* 4. Connections & Feeds */}
                      <button
                        type="button"
                        onClick={() => { setActiveTab('integrations'); setIsMoreOpen(false); }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold hover:bg-stone-50 transition-colors text-left ${
                          activeTab === 'integrations' ? 'text-orange-600 bg-orange-50/50 font-bold' : 'text-stone-700'
                        }`}
                        role="menuitem"
                      >
                        <div className="flex items-center gap-2.5">
                          <Cpu className="w-4 h-4 text-stone-400 shrink-0" />
                          <div>
                            <div>Connections & Feeds</div>
                            <div className="text-[10px] text-stone-400 font-normal">Store connectors & feeds</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">Preview</span>
                          {activeTab === 'integrations' && <Check className="w-3.5 h-3.5 text-orange-600" />}
                        </div>
                      </button>

                      {/* 5. Subscription & SKU Limits */}
                      <button
                        type="button"
                        onClick={() => { setActiveTab('billing'); setIsMoreOpen(false); }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold hover:bg-stone-50 transition-colors text-left ${
                          activeTab === 'billing' ? 'text-orange-600 bg-orange-50/50 font-bold' : 'text-stone-700'
                        }`}
                        role="menuitem"
                      >
                        <div className="flex items-center gap-2.5">
                          <CreditCard className="w-4 h-4 text-stone-400 shrink-0" />
                          <div>
                            <div>Subscription & SKU Limits</div>
                            <div className="text-[10px] text-stone-400 font-normal">Plan tiers & capacity</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-stone-100 text-stone-700 font-bold">Pro</span>
                          {activeTab === 'billing' && <Check className="w-3.5 h-3.5 text-orange-600" />}
                        </div>
                      </button>

                      <div className="my-1 border-t border-stone-100"></div>

                      <div className="px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-stone-400">
                        Switch Surfaces
                      </div>

                      {onNavigateShopper && (
                        <button
                          type="button"
                          onClick={() => { setIsMoreOpen(false); onNavigateShopper(); }}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors text-left"
                          role="menuitem"
                        >
                          <ExternalLink className="w-4 h-4 text-stone-400" />
                          <span>Shopper Public View</span>
                        </button>
                      )}

                      {onNavigateAdmin && (
                        <button
                          type="button"
                          onClick={() => { setIsMoreOpen(false); onNavigateAdmin(); }}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors text-left"
                          role="menuitem"
                        >
                          <ShieldAlert className="w-4 h-4 text-stone-400" />
                          <span>Admin Governance Tower</span>
                        </button>
                      )}

                      {onNavigateLanding && (
                        <button
                          type="button"
                          onClick={() => { setIsMoreOpen(false); onNavigateLanding(); }}
                          className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors text-left"
                          role="menuitem"
                        >
                          <BookOpen className="w-4 h-4 text-stone-400" />
                          <span>Platform Landing & Docs</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </nav>
            </div>

            {/* Right Zone: + Add Products CTA + Connected Store Profile */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Store Status Chip (Visible on lg screens) */}
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-200/80 text-stone-700 text-xs font-medium">
                <Store className="w-3.5 h-3.5 text-stone-500" />
                <span className="font-semibold text-stone-900">AeroPulse Athletics</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" title="Connected"></span>
              </div>

              {/* Primary Merchant CTA: + Add Products */}
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-bold text-white bg-[#F97316] hover:bg-[#EA580C] rounded-xl shadow-xs hover:shadow transition-all cursor-pointer whitespace-nowrap active:scale-98"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Add Products</span>
              </button>

              {/* Store Account & Role Switcher Menu */}
              <div className="relative" ref={storeMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsStoreMenuOpen(!isStoreMenuOpen)}
                  className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-stone-100 transition-colors text-stone-700 cursor-pointer border border-stone-200/70"
                  aria-label="Account and surfaces menu"
                >
                  <div className="w-6 h-6 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs">
                    AP
                  </div>
                  <ChevronDown className="w-3 h-3 text-stone-400 hidden sm:inline" />
                </button>

                {isStoreMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200/90 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <div className="text-xs font-bold text-stone-900">AeroPulse Athletics</div>
                      <div className="text-[11px] text-stone-500 truncate">shop.aeropulse.com</div>
                      <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-800">
                        Pro Tier (24 / 2,000 SKUs)
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        type="button"
                        onClick={() => { setActiveTab('billing'); setIsStoreMenuOpen(false); }}
                        className="w-full px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 flex items-center gap-2 text-left cursor-pointer"
                      >
                        <CreditCard className="w-4 h-4 text-stone-400" />
                        <span>Manage Subscription</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setActiveTab('report'); setIsStoreMenuOpen(false); }}
                        className="w-full px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 flex items-center gap-2 text-left cursor-pointer"
                      >
                        <FileText className="w-4 h-4 text-stone-400" />
                        <span>Hero Intelligence Report</span>
                      </button>

                      <div className="my-1 border-t border-stone-100"></div>

                      {onNavigateShopper && (
                        <button
                          type="button"
                          onClick={() => { setIsStoreMenuOpen(false); onNavigateShopper(); }}
                          className="w-full px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 flex items-center gap-2 text-left cursor-pointer"
                        >
                          <ExternalLink className="w-4 h-4 text-stone-400" />
                          <span>Shopper Public View</span>
                        </button>
                      )}

                      {onNavigateAdmin && (
                        <button
                          type="button"
                          onClick={() => { setIsStoreMenuOpen(false); onNavigateAdmin(); }}
                          className="w-full px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 flex items-center gap-2 text-left cursor-pointer"
                        >
                          <ShieldAlert className="w-4 h-4 text-stone-400" />
                          <span>Admin Governance Tower</span>
                        </button>
                      )}

                      {onNavigateLanding && (
                        <button
                          type="button"
                          onClick={() => { setIsStoreMenuOpen(false); onNavigateLanding(); }}
                          className="w-full px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 flex items-center gap-2 text-left cursor-pointer"
                        >
                          <BookOpen className="w-4 h-4 text-stone-400" />
                          <span>Platform Landing & Pricing</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </header>

      {/* 2. Main Active Merchant Workspace */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <MerchantOverviewHome
            onNavigateIssues={() => setActiveTab('issues')}
            onNavigateProducts={() => setActiveTab('catalog')}
            onNavigateOffers={() => setActiveTab('offers')}
            onNavigateDiscovery={() => setActiveTab('readiness')}
            onNavigateMonitoring={() => setActiveTab('monitoring')}
            onNavigateReport={() => setActiveTab('report')}
            onNavigateIntegrations={() => setActiveTab('integrations')}
            onAddProducts={() => setIsAddModalOpen(true)}
          />
        )}

        {activeTab === 'catalog' && (
          <div className="py-2">
            <ProductsWorkbenchPage
              hideNavShell={true}
              onBackToLanding={() => setActiveTab('home')}
              onNavigateAnalysis={() => setActiveTab('report')}
              onNavigateReport={() => setActiveTab('report')}
              onNavigateOverview={() => setActiveTab('home')}
              onNavigateOffers={() => setActiveTab('offers')}
              onNavigateDiscovery={() => setActiveTab('readiness')}
              onNavigateMonitoring={() => setActiveTab('monitoring')}
              onNavigateIssues={() => setActiveTab('issues')}
              onNavigateShopper={onNavigateShopper}
              onNavigateIntegrations={() => setActiveTab('integrations')}
              onNavigateAnalytics={() => setActiveTab('analytics')}
            />
          </div>
        )}

        {activeTab === 'offers' && (
          <div className="py-2">
            <OffersPricingPage
              hideNavShell={true}
              onNavigateLanding={() => setActiveTab('home')}
              onNavigateAnalysis={() => setActiveTab('report')}
              onNavigateReport={() => setActiveTab('report')}
              onNavigateFixWorkflow={() => setActiveTab('issues')}
              onNavigateDashboard={() => setActiveTab('home')}
              onNavigateWorkbench={() => setActiveTab('catalog')}
              onNavigateDiscovery={() => setActiveTab('readiness')}
              onNavigateMonitoring={() => setActiveTab('monitoring')}
              onNavigateIssues={() => setActiveTab('issues')}
              onNavigateShopper={onNavigateShopper}
              onNavigateIntegrations={() => setActiveTab('integrations')}
              onNavigateAnalytics={() => setActiveTab('analytics')}
            />
          </div>
        )}

        {activeTab === 'readiness' && (
          <div className="py-2">
            <MerchantDiscoveryPage
              onNavigateIssues={() => setActiveTab('issues')}
              onNavigateProducts={() => setActiveTab('catalog')}
              onNavigateOverview={() => setActiveTab('home')}
              onNavigateOffers={() => setActiveTab('offers')}
              onNavigateMonitoring={() => setActiveTab('monitoring')}
              onNavigateReport={() => setActiveTab('report')}
              onNavigateIntegrations={() => setActiveTab('integrations')}
              onNavigateAnalytics={() => setActiveTab('analytics')}
              onNavigateBilling={() => setActiveTab('billing')}
              onNavigateShopper={onNavigateShopper}
            />
          </div>
        )}

        {activeTab === 'issues' && (
          <div className="py-2">
            <IssuesPage
              hideNavShell={true}
              onNavigateHome={() => setActiveTab('home')}
              onNavigateAnalysis={() => setActiveTab('report')}
              onNavigateReport={() => setActiveTab('report')}
              onNavigateOverview={() => setActiveTab('home')}
              onNavigateProducts={() => setActiveTab('catalog')}
              onNavigateOffers={() => setActiveTab('offers')}
              onNavigateDiscovery={() => setActiveTab('readiness')}
              onNavigateMonitoring={() => setActiveTab('monitoring')}
              onNavigateFixWorkflow={() => setActiveTab('report')}
              onNavigateShopper={onNavigateShopper}
              onNavigateIntegrations={() => setActiveTab('integrations')}
              onNavigateAnalytics={() => setActiveTab('analytics')}
            />
          </div>
        )}

        {activeTab === 'monitoring' && (
          <div className="py-2">
            <MonitoringPage
              hideNavShell={true}
              onNavigateHome={() => setActiveTab('home')}
              onNavigateAnalysis={() => setActiveTab('report')}
              onNavigateReport={() => setActiveTab('report')}
              onNavigateOverview={() => setActiveTab('home')}
              onNavigateProducts={() => setActiveTab('catalog')}
              onNavigateOffers={() => setActiveTab('offers')}
              onNavigateDiscovery={() => setActiveTab('readiness')}
              onNavigateMonitoring={() => setActiveTab('monitoring')}
              onNavigateIssues={() => setActiveTab('issues')}
              onNavigateShopper={onNavigateShopper}
              onNavigateIntegrations={() => setActiveTab('integrations')}
              onNavigateAnalytics={() => setActiveTab('analytics')}
            />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="py-2">
            <AnalyticsPage
              onNavigateOverview={() => setActiveTab('home')}
              onNavigateProducts={() => setActiveTab('catalog')}
              onNavigateOffers={() => setActiveTab('offers')}
              onNavigateMonitoring={() => setActiveTab('monitoring')}
              onNavigateIssues={() => setActiveTab('issues')}
              onNavigateIntegrations={() => setActiveTab('integrations')}
              onNavigateReport={() => setActiveTab('report')}
              onNavigateWorkbench={() => setActiveTab('catalog')}
            />
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="py-2">
            <IntegrationsPage
              hideNavShell={true}
              onNavigateHome={() => setActiveTab('home')}
              onNavigateLanding={() => setActiveTab('home')}
              onNavigateAnalysis={() => setActiveTab('report')}
              onNavigateReport={() => setActiveTab('report')}
              onNavigateOverview={() => setActiveTab('home')}
              onNavigateProducts={() => setActiveTab('catalog')}
              onNavigateOffers={() => setActiveTab('offers')}
              onNavigateDiscovery={() => setActiveTab('readiness')}
              onNavigateMonitoring={() => setActiveTab('monitoring')}
              onNavigateIssues={() => setActiveTab('issues')}
              onNavigateShopper={onNavigateShopper}
              onNavigateIntegrations={() => setActiveTab('integrations')}
              onNavigateAnalytics={() => setActiveTab('analytics')}
            />
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="py-2">
            <BillingPage
              hideNavShell={true}
              onNavigateHome={() => setActiveTab('home')}
              onNavigateLanding={() => setActiveTab('home')}
              onNavigateAnalysis={() => setActiveTab('report')}
              onNavigateReport={() => setActiveTab('report')}
              onNavigateOverview={() => setActiveTab('home')}
              onNavigateDashboard={() => setActiveTab('home')}
              onNavigateProducts={() => setActiveTab('catalog')}
              onNavigateWorkbench={() => setActiveTab('catalog')}
              onNavigateOffers={() => setActiveTab('offers')}
              onNavigateDiscovery={() => setActiveTab('readiness')}
              onNavigateMonitoring={() => setActiveTab('monitoring')}
              onNavigateIssues={() => setActiveTab('issues')}
              onNavigateFixWorkflow={() => setActiveTab('report')}
              onNavigateShopper={onNavigateShopper}
              onNavigateIntegrations={() => setActiveTab('integrations')}
              onNavigateAnalytics={() => setActiveTab('analytics')}
              onNavigateBilling={() => setActiveTab('billing')}
            />
          </div>
        )}

        {activeTab === 'report' && (
          <div className="py-2">
            <ProductIntelligenceReportPage
              submittedUrl={activeScannedUrl}
              onBackToLanding={() => setActiveTab('home')}
              onBackToAnalysis={() => setActiveTab('home')}
              onNavigateDashboard={() => setActiveTab('home')}
            />
          </div>
        )}
      </main>

      {/* 3. Add Products Modal */}
      <AddProductsModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onScanUrl={handleScanUrl}
        onImportSample={handleImportSample}
      />

    </div>
  );
};
