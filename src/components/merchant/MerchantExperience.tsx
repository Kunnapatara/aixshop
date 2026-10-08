import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  AlertTriangle, 
  Compass, 
  Layers, 
  Plus, 
  Store,
  Settings,
  User
} from 'lucide-react';
import { MerchantOverviewHome } from './MerchantOverviewHome';
import { ProductsWorkbenchPage } from '../workbench/ProductsWorkbenchPage';
import { IssuesPage } from '../issues/IssuesPage';
import { MerchantVisibilityPage } from './MerchantVisibilityPage';
import { AddProductsModal } from './AddProductsModal';
import { MerchantAccountModal } from './MerchantAccountModal';
import { 
  MerchantTab, 
  AccountSubSection,
  MERCHANT_PRIMARY_NAV_ITEMS, 
  resolveMerchantTab 
} from './merchantNavigationConfig';
import { CANONICAL_SYSTEM_KPIS, CANONICAL_MERCHANT } from '../../data/canonicalCatalog';
import { useMerchantSession } from '../../state/useMerchantSession';

// Re-export type for consumers
export type { MerchantTab };

interface MerchantExperienceProps {
  initialTab?: MerchantTab | string;
}

export const MerchantExperience: React.FC<MerchantExperienceProps> = ({
  initialTab = 'home'
}) => {
  // Canonical Session Coordinator
  const {
    activeTab,
    setActiveTab,
    issues,
    openIssuesCount,
    readinessScore,
    isRechecking,
    runRecheckSimulation,
    approveIssue: handleApproveIssue,
    dismissIssue: handleDismissIssue,
    updateIssue: handleUpdateIssue
  } = useMerchantSession(initialTab);

  // Secondary Modals & Surfaces
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [accountSection, setAccountSection] = useState<AccountSubSection>('connections');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleOpenAccount = (section: AccountSubSection = 'connections') => {
    setAccountSection(section);
    setIsAccountOpen(true);
  };

  const handleScanUrl = (url: string) => {
    // When a URL is scanned from Add Products modal, take merchant to Visibility to inspect discovery
    setActiveTab('visibility');
  };

  const handleImportSample = () => {
    setActiveTab('catalog');
  };

  // Map Lucide icons dynamically for primary tabs
  const getPrimaryIcon = (id: MerchantTab, isActive: boolean) => {
    switch (id) {
      case 'home':
        return <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />;
      case 'catalog':
        return <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />;
      case 'issues':
        return <AlertTriangle className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-amber-600'}`} />;
      case 'visibility':
        return <Compass className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-orange-400' : 'text-orange-600'}`} />;
      default:
        return null;
    }
  };

  // Map badges for primary tabs
  const getPrimaryBadge = (id: MerchantTab, isActive: boolean) => {
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
            {openIssuesCount}
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
            
            {/* Left Zone: Brand Wordmark + EXACT 4 Primary Navigation Items */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 min-w-0">
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

              {/* Primary Merchant Navigation: EXACTLY Home | Catalog | Issues | Visibility (Never clipped) */}
              <nav className="flex items-center gap-1 sm:gap-1.5 shrink-0 py-1" aria-label="Merchant Primary Navigation">
                {MERCHANT_PRIMARY_NAV_ITEMS.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
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
              </nav>
            </div>

            {/* Right Zone: Primary CTA (+ Add Products) + Account & Settings (Consolidated) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              {/* Primary Merchant CTA: + Add Products */}
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold text-white bg-[#F97316] hover:bg-[#EA580C] rounded-xl shadow-xs hover:shadow transition-all cursor-pointer whitespace-nowrap active:scale-98"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span className="hidden sm:inline">Add Products</span>
                <span className="sm:hidden">Add</span>
              </button>

              {/* Consolidated Store Account & Settings Trigger */}
              <button
                type="button"
                onClick={() => handleOpenAccount('connections')}
                className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-stone-100 transition-colors text-stone-700 cursor-pointer border border-stone-200/80"
                aria-label="Account Settings"
                title={`Account & Settings: ${CANONICAL_MERCHANT.name} (Connections, Subscription, Settings)`}
              >
                <div className="w-6 h-6 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs">
                  AP
                </div>
                <div className="flex flex-col text-left leading-tight hidden lg:flex">
                  <span className="text-xs font-bold text-stone-900 truncate max-w-[120px]">{CANONICAL_MERCHANT.name}</span>
                  <span className="text-[10px] text-stone-400">Settings</span>
                </div>
                <span className="text-xs font-semibold text-stone-700 hidden sm:inline lg:hidden">Account</span>
              </button>

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
            onNavigateVisibility={() => setActiveTab('visibility')}
            onAddProducts={() => setIsAddModalOpen(true)}
            issues={issues}
            onApproveIssue={handleApproveIssue}
            onDismissIssue={handleDismissIssue}
            readinessScore={readinessScore}
            onRecheckStore={runRecheckSimulation}
            isRechecking={isRechecking}
          />
        )}

        {activeTab === 'catalog' && (
          <div className="py-2">
            <ProductsWorkbenchPage
              onBackToLanding={() => setActiveTab('home')}
              onNavigateOverview={() => setActiveTab('home')}
              onNavigateIssues={() => setActiveTab('issues')}
              onNavigateAnalysis={() => setActiveTab('visibility')}
              onNavigateReport={() => setActiveTab('visibility')}
            />
          </div>
        )}

        {activeTab === 'issues' && (
          <div className="py-2">
            <IssuesPage
              onNavigateHome={() => setActiveTab('home')}
              onNavigateOverview={() => setActiveTab('home')}
              onNavigateProducts={() => setActiveTab('catalog')}
              issues={issues}
              onUpdateIssue={handleUpdateIssue}
            />
          </div>
        )}

        {activeTab === 'visibility' && (
          <div className="py-2">
            <MerchantVisibilityPage
              onNavigateIssues={() => setActiveTab('issues')}
              onNavigateCatalog={() => setActiveTab('catalog')}
              onNavigateHome={() => setActiveTab('home')}
              issues={issues}
              onResolveIssue={handleApproveIssue}
              readinessScore={readinessScore}
            />
          </div>
        )}

        {/* Fallback to Home if unknown tab */}
        {!['home', 'catalog', 'issues', 'visibility'].includes(activeTab) && (
          <MerchantOverviewHome
            onNavigateIssues={() => setActiveTab('issues')}
            onNavigateProducts={() => setActiveTab('catalog')}
            onNavigateVisibility={() => setActiveTab('visibility')}
            onAddProducts={() => setIsAddModalOpen(true)}
            issues={issues}
            onApproveIssue={handleApproveIssue}
            onDismissIssue={handleDismissIssue}
            readinessScore={readinessScore}
            onRecheckStore={runRecheckSimulation}
            isRechecking={isRechecking}
          />
        )}
      </main>

      {/* 3. Add Products Modal */}
      <AddProductsModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onScanUrl={handleScanUrl}
        onImportSample={handleImportSample}
      />

      {/* 4. Secondary Account Surface (Connections, Subscription, Settings) */}
      <MerchantAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        initialSection={accountSection}
      />

    </div>
  );
};
