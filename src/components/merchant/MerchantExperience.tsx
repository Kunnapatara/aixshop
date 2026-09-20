import React, { useState } from 'react';
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
  CheckCircle2,
  Layers,
  ChevronRight,
  Sparkles
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
import { sampleIssuesMetrics } from '../../data/sampleIssuesData';
import { CANONICAL_SYSTEM_KPIS } from '../../data/canonicalCatalog';
import { sampleMonitoringMetrics } from '../../data/sampleMonitoringData';

export type MerchantTab = 
  | 'overview' 
  | 'products' 
  | 'offers' 
  | 'discovery' 
  | 'issues' 
  | 'monitoring' 
  | 'analytics' 
  | 'integrations' 
  | 'billing'
  | 'report';

interface MerchantExperienceProps {
  initialTab?: MerchantTab;
  onNavigateShopper?: () => void;
  onNavigateAdmin?: () => void;
}

interface NavTabItem {
  id: MerchantTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
  badge?: string;
  isAlert?: boolean;
}

export const MerchantExperience: React.FC<MerchantExperienceProps> = ({
  initialTab = 'overview',
  onNavigateShopper,
  onNavigateAdmin
}) => {
  const [activeTab, setActiveTab] = useState<MerchantTab>(initialTab);

  const navTabs: NavTabItem[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Products', count: CANONICAL_SYSTEM_KPIS.totalCatalogProducts, icon: Package },
    { id: 'offers', label: 'Offers', count: CANONICAL_SYSTEM_KPIS.totalCommercialOffers, icon: Tag },
    { id: 'discovery', label: 'Discovery', badge: `${CANONICAL_SYSTEM_KPIS.discoveryReadinessPct}%`, icon: Compass },
    { id: 'issues', label: 'Issues', count: sampleIssuesMetrics.openIssues, isAlert: true, icon: AlertTriangle },
    { id: 'monitoring', label: 'Monitoring', count: sampleMonitoringMetrics.changesDetected, icon: Activity },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'integrations', label: 'Integrations', count: 3, icon: Cpu },
    { id: 'billing', label: 'Billing', badge: 'Pro', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans">
      
      {/* 1. Merchant Brand Bar & Navigation Pills (QRxMENU Style) */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Merchant Workspace Floating Header Card */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200/80 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200/80">
                  MERCHANT SAAS CONSOLE
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Catalog Synced
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight mt-1.5">
                AeroPulse Athletics · Catalog Intelligence
              </h2>
              <p className="text-xs text-stone-500 font-medium">
                Connected Store: shop.aeropulse.com · Tier: Pro Plan (24 of 2,000 Products Monitored)
              </p>
            </div>

            {/* Quick Hero Report Link */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab('report')}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
                  activeTab === 'report'
                    ? 'bg-[#F97316] text-white border-transparent shadow-xs'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5 inline mr-1.5" />
                <span>Product Intelligence Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Merchant Category / Feature Pills (Inspired by QRxMENU category bar in 2.png) */}
        <div className="mt-4 bg-white rounded-2xl p-2 border border-stone-200/80 shadow-xs flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as MerchantTab)}
                className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#F97316] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/80'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>

                {/* Counter / Status Badge */}
                {'count' in tab && tab.count !== undefined && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : tab.isAlert
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-stone-100 text-stone-600'
                  }`}>
                    {tab.count}
                  </span>
                )}

                {'badge' in tab && tab.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

      </div>

      {/* 3. Render Active Merchant Workspace */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <MerchantOverviewHome
            onNavigateIssues={() => setActiveTab('issues')}
            onNavigateProducts={() => setActiveTab('products')}
            onNavigateOffers={() => setActiveTab('offers')}
            onNavigateDiscovery={() => setActiveTab('discovery')}
            onNavigateMonitoring={() => setActiveTab('monitoring')}
            onNavigateReport={() => setActiveTab('report')}
          />
        )}

        {activeTab === 'products' && (
          <div className="py-6">
            <ProductsWorkbenchPage
              onBackToLanding={() => setActiveTab('overview')}
              onNavigateAnalysis={() => setActiveTab('report')}
              onNavigateReport={() => setActiveTab('report')}
              onNavigateOverview={() => setActiveTab('overview')}
              onNavigateOffers={() => setActiveTab('offers')}
              onNavigateDiscovery={() => setActiveTab('discovery')}
              onNavigateMonitoring={() => setActiveTab('monitoring')}
              onNavigateIssues={() => setActiveTab('issues')}
              onNavigateShopper={onNavigateShopper}
              onNavigateIntegrations={() => setActiveTab('integrations')}
              onNavigateAnalytics={() => setActiveTab('analytics')}
            />
          </div>
        )}

        {activeTab === 'offers' && (
          <div className="py-6">
            <OffersPricingPage
              onNavigateLanding={() => setActiveTab('overview')}
              onNavigateAnalysis={() => setActiveTab('report')}
              onNavigateReport={() => setActiveTab('report')}
              onNavigateFixWorkflow={() => setActiveTab('issues')}
              onNavigateDashboard={() => setActiveTab('overview')}
              onNavigateWorkbench={() => setActiveTab('products')}
              onNavigateDiscovery={() => setActiveTab('discovery')}
              onNavigateMonitoring={() => setActiveTab('monitoring')}
              onNavigateIssues={() => setActiveTab('issues')}
              onNavigateShopper={onNavigateShopper}
              onNavigateIntegrations={() => setActiveTab('integrations')}
              onNavigateAnalytics={() => setActiveTab('analytics')}
            />
          </div>
        )}

        {activeTab === 'discovery' && (
          <div className="py-6">
            <MerchantDiscoveryPage
              onNavigateIssues={() => setActiveTab('issues')}
              onNavigateProducts={() => setActiveTab('products')}
              onNavigateOverview={() => setActiveTab('overview')}
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
          <div className="py-6">
            <IssuesPage
              onNavigateHome={() => setActiveTab('overview')}
              onNavigateAnalysis={() => setActiveTab('report')}
              onNavigateReport={() => setActiveTab('report')}
              onNavigateOverview={() => setActiveTab('overview')}
              onNavigateProducts={() => setActiveTab('products')}
              onNavigateOffers={() => setActiveTab('offers')}
              onNavigateDiscovery={() => setActiveTab('discovery')}
              onNavigateMonitoring={() => setActiveTab('monitoring')}
              onNavigateFixWorkflow={() => setActiveTab('report')}
              onNavigateShopper={onNavigateShopper}
              onNavigateIntegrations={() => setActiveTab('integrations')}
              onNavigateAnalytics={() => setActiveTab('analytics')}
            />
          </div>
        )}

        {activeTab === 'monitoring' && (
          <div className="py-6">
            <MonitoringPage
              onNavigateHome={() => setActiveTab('overview')}
              onNavigateAnalysis={() => setActiveTab('report')}
              onNavigateReport={() => setActiveTab('report')}
              onNavigateOverview={() => setActiveTab('overview')}
              onNavigateProducts={() => setActiveTab('products')}
              onNavigateOffers={() => setActiveTab('offers')}
              onNavigateDiscovery={() => setActiveTab('discovery')}
              onNavigateMonitoring={() => setActiveTab('monitoring')}
              onNavigateIssues={() => setActiveTab('issues')}
              onNavigateShopper={onNavigateShopper}
              onNavigateIntegrations={() => setActiveTab('integrations')}
              onNavigateAnalytics={() => setActiveTab('analytics')}
            />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="py-6">
            <AnalyticsPage
              onNavigateOverview={() => setActiveTab('overview')}
              onNavigateProducts={() => setActiveTab('products')}
              onNavigateOffers={() => setActiveTab('offers')}
              onNavigateMonitoring={() => setActiveTab('monitoring')}
              onNavigateIssues={() => setActiveTab('issues')}
              onNavigateIntegrations={() => setActiveTab('integrations')}
              onNavigateReport={() => setActiveTab('report')}
              onNavigateWorkbench={() => setActiveTab('products')}
            />
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="py-6">
            <IntegrationsPage
              onNavigateHome={() => setActiveTab('overview')}
              onNavigateLanding={() => setActiveTab('overview')}
              onNavigateAnalysis={() => setActiveTab('report')}
              onNavigateReport={() => setActiveTab('report')}
              onNavigateOverview={() => setActiveTab('overview')}
              onNavigateProducts={() => setActiveTab('products')}
              onNavigateOffers={() => setActiveTab('offers')}
              onNavigateDiscovery={() => setActiveTab('discovery')}
              onNavigateMonitoring={() => setActiveTab('monitoring')}
              onNavigateIssues={() => setActiveTab('issues')}
              onNavigateShopper={onNavigateShopper}
              onNavigateIntegrations={() => setActiveTab('integrations')}
              onNavigateAnalytics={() => setActiveTab('analytics')}
            />
          </div>
        )}

        {activeTab === 'billing' && (
          <div className="py-6">
            <BillingPage
              onNavigateHome={() => setActiveTab('overview')}
              onNavigateLanding={() => setActiveTab('overview')}
              onNavigateAnalysis={() => setActiveTab('report')}
              onNavigateReport={() => setActiveTab('report')}
              onNavigateOverview={() => setActiveTab('overview')}
              onNavigateDashboard={() => setActiveTab('overview')}
              onNavigateProducts={() => setActiveTab('products')}
              onNavigateWorkbench={() => setActiveTab('products')}
              onNavigateOffers={() => setActiveTab('offers')}
              onNavigateDiscovery={() => setActiveTab('discovery')}
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
          <div className="py-6">
            <ProductIntelligenceReportPage
              submittedUrl="https://shop.aeropulse.com/products/vaporstride-carbon-elite"
              onBackToLanding={() => setActiveTab('overview')}
              onBackToAnalysis={() => setActiveTab('overview')}
              onNavigateDashboard={() => setActiveTab('overview')}
            />
          </div>
        )}
      </main>

    </div>
  );
};
