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
  Sparkles, 
  Store,
  CheckCircle2
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
import { sampleIssuesMetrics } from '../../data/sampleIssuesData';
import { CANONICAL_SYSTEM_KPIS } from '../../data/canonicalCatalog';
import { sampleMonitoringMetrics } from '../../data/sampleMonitoringData';

export type MerchantTab = 
  | 'home' 
  | 'catalog' 
  | 'issues' 
  | 'readiness' 
  | 'offers' 
  | 'monitoring' 
  | 'analytics' 
  | 'integrations' 
  | 'billing'
  | 'report'
  // Backward compatibility aliases
  | 'overview' 
  | 'products' 
  | 'discovery';

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
  // Normalize alias initialTab
  const getNormalizedTab = (tab?: string): MerchantTab => {
    if (tab === 'overview') return 'home';
    if (tab === 'products') return 'catalog';
    if (tab === 'discovery') return 'readiness';
    if (
      tab === 'home' || 
      tab === 'catalog' || 
      tab === 'issues' || 
      tab === 'readiness' || 
      tab === 'offers' || 
      tab === 'monitoring' || 
      tab === 'analytics' || 
      tab === 'integrations' || 
      tab === 'billing' || 
      tab === 'report'
    ) {
      return tab as MerchantTab;
    }
    return 'home';
  };

  const [activeTab, setActiveTab] = useState<MerchantTab>(getNormalizedTab(initialTab));
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

  const isMoreActive = ['offers', 'monitoring', 'analytics', 'integrations', 'billing'].includes(activeTab);

  // Map active secondary tab label
  const getMoreLabel = () => {
    switch (activeTab) {
      case 'offers': return 'Offers & Pricing';
      case 'monitoring': return 'Monitoring';
      case 'analytics': return 'Analytics';
      case 'integrations': return 'Integrations';
      case 'billing': return 'Billing';
      default: return 'More';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans">
      
      {/* 1. Single Authoritative Merchant Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between gap-4">
            
            {/* Left Zone: Brand Wordmark + Primary Navigation */}
            <div className="flex items-center gap-6 sm:gap-8">
              {/* Brand Wordmark */}
              <button
                type="button"
                onClick={() => setActiveTab('home')}
                className="flex items-center gap-2 text-left group cursor-pointer focus-visible:outline-none"
                title="AIXSHOP Home"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#EA580C] to-[#F97316] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Layers className="w-4 h-4 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-lg tracking-tight text-stone-900 group-hover:text-orange-600 transition-colors leading-none">
                    AIXSHOP
                  </span>
                  <span className="text-[10px] text-stone-400 font-semibold tracking-wide hidden sm:inline leading-tight mt-0.5">
                    Merchant Console
                  </span>
                </div>
              </button>

              {/* Primary Merchant Navigation: Home | Catalog | Issues | Readiness | More ▾ */}
              <nav className="flex items-center gap-1 sm:gap-1.5" aria-label="Merchant Primary Navigation">
                {/* 1. Home */}
                <button
                  type="button"
                  onClick={() => setActiveTab('home')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === 'home' || activeTab === 'overview'
                      ? 'bg-stone-900 text-white shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Home</span>
                </button>

                {/* 2. Catalog */}
                <button
                  type="button"
                  onClick={() => setActiveTab('catalog')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === 'catalog' || activeTab === 'products'
                      ? 'bg-stone-900 text-white shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Catalog</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    activeTab === 'catalog' || activeTab === 'products'
                      ? 'bg-white/20 text-white'
                      : 'bg-stone-100 text-stone-600'
                  }`}>
                    {CANONICAL_SYSTEM_KPIS.totalCatalogProducts}
                  </span>
                </button>

                {/* 3. Issues */}
                <button
                  type="button"
                  onClick={() => setActiveTab('issues')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === 'issues'
                      ? 'bg-stone-900 text-white shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <AlertTriangle className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${activeTab === 'issues' ? 'text-amber-400' : 'text-amber-600'}`} />
                  <span>Issues</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    activeTab === 'issues'
                      ? 'bg-amber-400/30 text-amber-200'
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    {sampleIssuesMetrics.openIssues}
                  </span>
                </button>

                {/* 4. Readiness */}
                <button
                  type="button"
                  onClick={() => setActiveTab('readiness')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === 'readiness' || activeTab === 'discovery'
                      ? 'bg-stone-900 text-white shadow-xs font-bold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                  <span>Readiness</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    activeTab === 'readiness' || activeTab === 'discovery'
                      ? 'bg-emerald-400/30 text-emerald-200'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {CANONICAL_SYSTEM_KPIS.discoveryReadinessPct}%
                  </span>
                </button>

                {/* 5. More ▾ Dropdown */}
                <div className="relative" ref={moreMenuRef}>
                  <button
                    type="button"
                    onClick={() => setIsMoreOpen(!isMoreOpen)}
                    aria-expanded={isMoreOpen}
                    aria-haspopup="true"
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isMoreActive
                        ? 'bg-stone-900 text-white shadow-xs font-bold'
                        : isMoreOpen
                          ? 'bg-stone-100 text-stone-900'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    <span>{isMoreActive ? getMoreLabel() : 'More'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${isMoreOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Floating Menu */}
                  {isMoreOpen && (
                    <div 
                      className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-stone-200/90 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
                      role="menu"
                    >
                      <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-stone-400">
                        Operational Intelligence
                      </div>

                      <button
                        type="button"
                        onClick={() => { setActiveTab('offers'); setIsMoreOpen(false); }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold hover:bg-stone-50 transition-colors text-left ${
                          activeTab === 'offers' ? 'text-orange-600 bg-orange-50/50 font-bold' : 'text-stone-700'
                        }`}
                        role="menuitem"
                      >
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-stone-400" />
                          <span>Offers & Pricing</span>
                        </div>
                        <span className="text-[10px] text-stone-400">{CANONICAL_SYSTEM_KPIS.totalCommercialOffers}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setActiveTab('monitoring'); setIsMoreOpen(false); }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold hover:bg-stone-50 transition-colors text-left ${
                          activeTab === 'monitoring' ? 'text-orange-600 bg-orange-50/50 font-bold' : 'text-stone-700'
                        }`}
                        role="menuitem"
                      >
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-stone-400" />
                          <span>Continuous Monitoring</span>
                        </div>
                        <span className="text-[10px] text-stone-400">{sampleMonitoringMetrics.changesDetected} alerts</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setActiveTab('analytics'); setIsMoreOpen(false); }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold hover:bg-stone-50 transition-colors text-left ${
                          activeTab === 'analytics' ? 'text-orange-600 bg-orange-50/50 font-bold' : 'text-stone-700'
                        }`}
                        role="menuitem"
                      >
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4 text-stone-400" />
                          <span>Quality & Recovery Analytics</span>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setActiveTab('integrations'); setIsMoreOpen(false); }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold hover:bg-stone-50 transition-colors text-left ${
                          activeTab === 'integrations' ? 'text-orange-600 bg-orange-50/50 font-bold' : 'text-stone-700'
                        }`}
                        role="menuitem"
                      >
                        <div className="flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-stone-400" />
                          <span>Feeds & Integrations</span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">3 live</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setActiveTab('billing'); setIsMoreOpen(false); }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold hover:bg-stone-50 transition-colors text-left ${
                          activeTab === 'billing' ? 'text-orange-600 bg-orange-50/50 font-bold' : 'text-stone-700'
                        }`}
                        role="menuitem"
                      >
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-stone-400" />
                          <span>Subscription & SKU Limits</span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-stone-100 text-stone-700 font-bold">Pro</span>
                      </button>

                      <div className="my-1 border-t border-stone-100"></div>

                      <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-stone-400">
                        Switch Surfaces
                      </div>

                      {onNavigateShopper && (
                        <button
                          type="button"
                          onClick={() => { setIsMoreOpen(false); onNavigateShopper(); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors text-left"
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
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors text-left"
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
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors text-left"
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
            <div className="flex items-center gap-2.5 sm:gap-3">
              
              {/* Store Status Chip */}
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-200/80 text-stone-700 text-xs font-medium">
                <Store className="w-3.5 h-3.5 text-stone-500" />
                <span className="font-semibold text-stone-900">AeroPulse Athletics</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" title="Connected"></span>
              </div>

              {/* Primary Merchant CTA: + Add Products */}
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 text-xs font-bold text-white bg-[#F97316] hover:bg-[#EA580C] rounded-xl shadow-xs hover:shadow transition-all cursor-pointer whitespace-nowrap active:scale-98"
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
                        className="w-full px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 flex items-center gap-2 text-left"
                      >
                        <CreditCard className="w-4 h-4 text-stone-400" />
                        <span>Manage Subscription</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setActiveTab('report'); setIsStoreMenuOpen(false); }}
                        className="w-full px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 flex items-center gap-2 text-left"
                      >
                        <FileText className="w-4 h-4 text-stone-400" />
                        <span>Hero Intelligence Report</span>
                      </button>

                      <div className="my-1 border-t border-stone-100"></div>

                      {onNavigateShopper && (
                        <button
                          type="button"
                          onClick={() => { setIsStoreMenuOpen(false); onNavigateShopper(); }}
                          className="w-full px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 flex items-center gap-2 text-left"
                        >
                          <ExternalLink className="w-4 h-4 text-stone-400" />
                          <span>Shopper Public View</span>
                        </button>
                      )}

                      {onNavigateAdmin && (
                        <button
                          type="button"
                          onClick={() => { setIsStoreMenuOpen(false); onNavigateAdmin(); }}
                          className="w-full px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 flex items-center gap-2 text-left"
                        >
                          <ShieldAlert className="w-4 h-4 text-stone-400" />
                          <span>Admin Governance Tower</span>
                        </button>
                      )}

                      {onNavigateLanding && (
                        <button
                          type="button"
                          onClick={() => { setIsStoreMenuOpen(false); onNavigateLanding(); }}
                          className="w-full px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50 flex items-center gap-2 text-left"
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

      {/* 2. Main Active Merchant Workspace (No redundant duplicate navigation shells) */}
      <main className="flex-1">
        {(activeTab === 'home' || activeTab === 'overview') && (
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

        {(activeTab === 'catalog' || activeTab === 'products') && (
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

        {(activeTab === 'readiness' || activeTab === 'discovery') && (
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
