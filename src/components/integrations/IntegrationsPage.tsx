import React, { useState, useMemo } from 'react';
import { DashboardNavigationShell } from '../dashboard/DashboardNavigationShell';
import { IntegrationsHeader } from './IntegrationsHeader';
import { IntegrationsSummaryBar } from './IntegrationsSummaryBar';
import { IntegrationSourceCard } from './IntegrationSourceCard';
import { DataFlowPipelineSection } from './DataFlowPipelineSection';
import { SourceAuthorityMatrix } from './SourceAuthorityMatrix';
import { ConnectionHealthPanel } from './ConnectionHealthPanel';
import { IntegrationHistoryTimeline } from './IntegrationHistoryTimeline';
import { SourceDetailDrawer } from './SourceDetailDrawer';
import { RevokeConfirmationModal } from './RevokeConfirmationModal';
import { FeedConfigurationModal } from './FeedConfigurationModal';
import { ConnectionFlowModal } from './ConnectionFlowModal';
import { ConnectionPrinciplesModal } from './ConnectionPrinciplesModal';
import { sampleIntegrationSources } from '../../data/sampleIntegrationsData';
import { 
  IntegrationSource, 
  IntegrationsFilterState, 
  FeedConfigModel 
} from '../../types/integrations';
import { 
  Layers, 
  Workflow, 
  Scale, 
  Activity, 
  History, 
  ShieldCheck, 
  Plus, 
  Search, 
  SlidersHorizontal 
} from 'lucide-react';

interface IntegrationsPageProps {
  onNavigateHome?: () => void;
  onNavigateLanding?: () => void;
  onNavigateAnalysis?: () => void;
  onNavigateReport?: () => void;
  onNavigateOverview?: () => void;
  onNavigateProducts?: () => void;
  onNavigateOffers?: () => void;
  onNavigateDiscovery?: () => void;
  onNavigateMonitoring?: () => void;
  onNavigateIssues?: () => void;
  onNavigateShopper?: () => void;
  onNavigateIntegrations?: () => void;
  onNavigateAnalytics?: () => void;
  onBoundaryClick?: (pageId: string, pageName: string, description: string) => void;
}

export const IntegrationsPage: React.FC<IntegrationsPageProps> = ({
  onNavigateHome,
  onNavigateLanding,
  onNavigateAnalysis = () => {},
  onNavigateReport = () => {},
  onNavigateOverview,
  onNavigateProducts,
  onNavigateOffers,
  onNavigateDiscovery,
  onNavigateMonitoring,
  onNavigateIssues,
  onNavigateShopper,
  onNavigateIntegrations,
  onNavigateAnalytics,
  onBoundaryClick
}) => {
  // State for sources (can be modified in preview mode)
  const [sources, setSources] = useState<IntegrationSource[]>(sampleIntegrationSources);
  
  // Filter state
  const [filters, setFilters] = useState<IntegrationsFilterState>({
    searchQuery: '',
    category: 'ALL',
    status: 'ALL',
    dataScope: 'ALL'
  });

  // Active view section tab
  const [activeSection, setActiveSection] = useState<'sources' | 'pipeline' | 'authority' | 'health' | 'history'>('sources');

  // Modal / Drawer States
  const [selectedSourceForDrawer, setSelectedSourceForDrawer] = useState<IntegrationSource | null>(null);
  const [selectedSourceForRevoke, setSelectedSourceForRevoke] = useState<IntegrationSource | null>(null);
  const [isFeedConfigOpen, setIsFeedConfigOpen] = useState<boolean>(false);
  const [isConnectionFlowOpen, setIsConnectionFlowOpen] = useState<boolean>(false);
  const [connectionFlowTargetSource, setConnectionFlowTargetSource] = useState<IntegrationSource | null>(null);
  const [isPrinciplesOpen, setIsPrinciplesOpen] = useState<boolean>(false);

  // Filter sources
  const filteredSources = useMemo(() => {
    return sources.filter(src => {
      // Search
      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = src.name.toLowerCase().includes(q);
        const matchesProvider = src.provider.toLowerCase().includes(q);
        const matchesScope = src.scope.toLowerCase().includes(q);
        const matchesDesc = src.shortDescription.toLowerCase().includes(q);
        if (!matchesName && !matchesProvider && !matchesScope && !matchesDesc) {
          return false;
        }
      }

      // Category
      if (filters.category !== 'ALL' && src.category !== filters.category) {
        return false;
      }

      // Status
      if (filters.status !== 'ALL' && src.status !== filters.status) {
        return false;
      }

      // Data Scope
      if (filters.dataScope !== 'ALL') {
        const scope = filters.dataScope.toLowerCase();
        if (scope === 'product' && src.coverage.productsCount === 0) return false;
        if (scope === 'variant' && src.coverage.variantsCount === 0) return false;
        if (scope === 'offer' && src.coverage.offersCount === 0) return false;
        if (scope === 'evidence' && src.coverage.evidenceRecordsCount === 0) return false;
        if (scope === 'images' && src.coverage.imagesCount === 0) return false;
      }

      return true;
    });
  }, [sources, filters]);

  // Handle Revoke Simulation
  const handleConfirmRevocation = (sourceId: string) => {
    setSources(prev => prev.map(s => {
      if (s.id === sourceId) {
        return {
          ...s,
          status: 'REVOKED',
          previewLabel: 'Connection Revoked · Access Suspended'
        };
      }
      return s;
    }));
  };

  // Handle Connect Simulation
  const handleCompleteConnect = (sourceId: string) => {
    setSources(prev => prev.map(s => {
      if (s.id === sourceId) {
        return {
          ...s,
          status: 'CONNECTED',
          lastObservation: 'Just now',
          observationFreshnessMinutes: 0,
          previewLabel: 'Representative Connection · Active'
        };
      }
      return s;
    }));
  };

  return (
    <DashboardNavigationShell
      currentActive="integrations"
      onNavigateHome={onNavigateHome}
      onNavigateLanding={onNavigateLanding}
      onNavigateAnalysis={onNavigateAnalysis}
      onNavigateReport={onNavigateReport}
      onNavigateOverview={onNavigateOverview}
      onNavigateProducts={onNavigateProducts}
      onNavigateOffers={onNavigateOffers}
      onNavigateDiscovery={onNavigateDiscovery}
      onNavigateMonitoring={onNavigateMonitoring}
      onNavigateIssues={onNavigateIssues}
      onNavigateShopper={onNavigateShopper}
      onNavigateIntegrations={onNavigateIntegrations}
      onNavigateAnalytics={onNavigateAnalytics}
      onBoundaryClick={onBoundaryClick}
    >
      <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans flex flex-col selection:bg-orange-500/20 selection:text-orange-950">
        
        {/* Page 12 Header */}
        <IntegrationsHeader
          filters={filters}
          onFilterChange={updates => setFilters(prev => ({ ...prev, ...updates }))}
          onOpenPrinciples={() => setIsPrinciplesOpen(true)}
          onStartConnectionFlow={() => {
            setConnectionFlowTargetSource(null);
            setIsConnectionFlowOpen(true);
          }}
        />

        {/* Summary Metrics Bar */}
        <IntegrationsSummaryBar
          onFilterStatus={status => setFilters(prev => ({ ...prev, status: status as any }))}
        />

        {/* Section Navigation Tabs (QRxMENU Pill Bar) */}
        <div className="border-b border-stone-200/80 bg-white/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-2.5">
            
            <button
              type="button"
              onClick={() => setActiveSection('sources')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeSection === 'sources'
                  ? 'bg-[#F97316] text-white shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Workflow className={`w-3.5 h-3.5 ${activeSection === 'sources' ? 'text-white' : 'text-stone-400'}`} />
              <span>Connectors & Sources ({filteredSources.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('pipeline')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeSection === 'pipeline'
                  ? 'bg-[#F97316] text-white shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Layers className={`w-3.5 h-3.5 ${activeSection === 'pipeline' ? 'text-white' : 'text-stone-400'}`} />
              <span>9-Stage Data Pipeline</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('authority')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeSection === 'authority'
                  ? 'bg-[#F97316] text-white shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Scale className={`w-3.5 h-3.5 ${activeSection === 'authority' ? 'text-white' : 'text-stone-400'}`} />
              <span>Source Authority & Conflicts</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('health')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeSection === 'health'
                  ? 'bg-[#F97316] text-white shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Activity className={`w-3.5 h-3.5 ${activeSection === 'health' ? 'text-white' : 'text-stone-400'}`} />
              <span>Health Dimensions</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('history')}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeSection === 'history'
                  ? 'bg-[#F97316] text-white shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <History className={`w-3.5 h-3.5 ${activeSection === 'history' ? 'text-white' : 'text-stone-400'}`} />
              <span>Sync & Observation History</span>
            </button>

          </div>
        </div>

        {/* Section Contents */}
        <main className="flex-1 pb-16">
          
          {/* View A: Connectors Grid */}
          {activeSection === 'sources' && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
              
              {/* Category Quick Tags */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono text-stone-500 mr-1 uppercase font-semibold">Filter Category:</span>
                  {[
                    { id: 'ALL', label: 'All Sources' },
                    { id: 'COMMERCE_PLATFORM', label: 'Commerce Platforms' },
                    { id: 'COMMERCE_FEED', label: 'Feeds (Google, XML)' },
                    { id: 'STRUCTURED_SOURCE', label: 'Structured Microdata' },
                    { id: 'MARKETPLACE_SOURCE', label: 'Marketplaces' },
                    { id: 'MERCHANT_VERIFICATION', label: 'Merchant Verification' }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setFilters(prev => ({ ...prev, category: cat.id as any }))}
                      className={`px-3 py-1.5 rounded-xl font-mono text-[11px] transition-all cursor-pointer ${
                        filters.category === cat.id
                          ? 'bg-[#F97316] text-white font-bold shadow-3xs'
                          : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-50 border border-stone-200/80 shadow-3xs'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <span className="text-xs font-mono text-stone-500 font-medium">
                  Showing {filteredSources.length} of {sources.length} sources
                </span>
              </div>

              {/* Source Cards Grid */}
              {filteredSources.length === 0 ? (
                <div className="p-12 text-center rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-3">
                  <Workflow className="w-8 h-8 text-stone-400 mx-auto" />
                  <div className="text-base font-bold text-stone-900">No Sources Match Filters</div>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Try clearing search queries or selecting "All Categories" to view all available connectors.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFilters({ searchQuery: '', category: 'ALL', status: 'ALL', dataScope: 'ALL' })}
                    className="px-3.5 py-1.5 rounded-xl bg-orange-50 text-orange-800 border border-orange-200 text-xs font-bold cursor-pointer hover:bg-orange-100"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredSources.map(source => (
                    <IntegrationSourceCard
                      key={source.id}
                      source={source}
                      onInspect={src => setSelectedSourceForDrawer(src)}
                      onOpenPermissions={src => setSelectedSourceForDrawer(src)}
                      onStartConnect={src => {
                        if (src.canConfigureFeed) {
                          setIsFeedConfigOpen(true);
                        } else {
                          setConnectionFlowTargetSource(src);
                          setIsConnectionFlowOpen(true);
                        }
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Bottom Quick-Start Connection Banner */}
              <div className="rounded-3xl bg-white border border-stone-200/80 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span>Have a custom enterprise catalog or internal ERP?</span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-xl">
                    Configure a scheduled CSV/XML product feed with automatic deterministic schema validation and zero external code deployment.
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsFeedConfigOpen(true)}
                    className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs border border-stone-200 transition-colors cursor-pointer"
                  >
                    Configure Custom Feed
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setConnectionFlowTargetSource(null);
                      setIsConnectionFlowOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs transition-colors cursor-pointer shadow-xs"
                  >
                    Connect Source Preview
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* View B: 9-Stage Pipeline */}
          {activeSection === 'pipeline' && (
            <DataFlowPipelineSection />
          )}

          {/* View C: Source Authority & Conflicts */}
          {activeSection === 'authority' && (
            <SourceAuthorityMatrix 
              onNavigateIssues={onNavigateIssues} 
            />
          )}

          {/* View D: Health Dimensions */}
          {activeSection === 'health' && (
            <ConnectionHealthPanel />
          )}

          {/* View E: History Timeline */}
          {activeSection === 'history' && (
            <IntegrationHistoryTimeline />
          )}

        </main>

        {/* Modals & Drawers */}
        <SourceDetailDrawer
          source={selectedSourceForDrawer}
          isOpen={!!selectedSourceForDrawer}
          onClose={() => setSelectedSourceForDrawer(null)}
          onOpenRevokeModal={src => {
            setSelectedSourceForDrawer(null);
            setSelectedSourceForRevoke(src);
          }}
          onNavigateMonitoring={onNavigateMonitoring}
          onNavigateIssues={onNavigateIssues}
        />

        <RevokeConfirmationModal
          source={selectedSourceForRevoke}
          isOpen={!!selectedSourceForRevoke}
          onClose={() => setSelectedSourceForRevoke(null)}
          onConfirmRevocation={handleConfirmRevocation}
        />

        <FeedConfigurationModal
          isOpen={isFeedConfigOpen}
          onClose={() => setIsFeedConfigOpen(false)}
          onSaveConfig={(cfg) => {
            // Can update the custom feed source if desired
            setSources(prev => prev.map(s => {
              if (s.id === 'src-product-feed-custom') {
                return {
                  ...s,
                  status: 'PARTIAL',
                  scope: cfg.feedUrl,
                  previewLabel: 'Feed Configured · Preview Validated'
                };
              }
              return s;
            }));
          }}
        />

        <ConnectionFlowModal
          initialSource={connectionFlowTargetSource}
          isOpen={isConnectionFlowOpen}
          onClose={() => setIsConnectionFlowOpen(false)}
          onCompleteConnect={handleCompleteConnect}
        />

        <ConnectionPrinciplesModal
          isOpen={isPrinciplesOpen}
          onClose={() => setIsPrinciplesOpen(false)}
        />

      </div>
    </DashboardNavigationShell>
  );
};
