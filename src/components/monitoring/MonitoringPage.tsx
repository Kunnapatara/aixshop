// src/components/monitoring/MonitoringPage.tsx
// Page 09 — Monitoring Intelligence
// Complete integration of the merchant's Monitoring Intelligence workspace

import React, { useState, useMemo } from 'react';
import { DashboardNavigationShell } from '../dashboard/DashboardNavigationShell';
import { MonitoringHeader } from './MonitoringHeader';
import { MonitoringSummaryBar } from './MonitoringSummaryBar';
import { MonitoringHealthSection } from './MonitoringHealthSection';
import { ChangeIsNotAnIssueBanner } from './ChangeIsNotAnIssueBanner';
import { MonitoringPrinciplesSection } from './MonitoringPrinciplesSection';
import { MonitoringFiltersBar } from './MonitoringFiltersBar';
import { ChangeEventTimeline } from './ChangeEventTimeline';
import { ProductsMonitoringTable } from './ProductsMonitoringTable';
import { ChangeIntelligenceDrawer } from './ChangeIntelligenceDrawer';
import { ProductMonitoringDrawer } from './ProductMonitoringDrawer';
import { FuturePageBoundaryModal } from '../dashboard/FuturePageBoundaryModal';

import {
  sampleMonitoringMetrics,
  sampleMonitoringEvents,
  sampleMonitoredProducts
} from '../../data/sampleMonitoringData';

import {
  MonitoringCategory,
  MonitoringPriority,
  MonitoringState,
  MonitoringFiltersState,
  MonitoringSortField,
  MonitoringSortDirection,
  MonitoringEvent,
  MonitoredProductSummary
} from '../../types/monitoring';

interface MonitoringPageProps {
  onNavigateHome: () => void;
  onNavigateAnalysis: () => void;
  onNavigateReport: () => void;
  onNavigateOverview: () => void;
  onNavigateProducts?: () => void;
  onNavigateOffers?: () => void;
  onNavigateDiscovery?: () => void;
  onNavigateIssues?: () => void;
  onNavigateShopper?: () => void;
  onNavigateIntegrations?: () => void;
  onNavigateAnalytics?: () => void;
}

export const MonitoringPage: React.FC<MonitoringPageProps> = ({
  onNavigateHome,
  onNavigateAnalysis,
  onNavigateReport,
  onNavigateOverview,
  onNavigateProducts,
  onNavigateOffers,
  onNavigateDiscovery,
  onNavigateIssues,
  onNavigateShopper,
  onNavigateIntegrations,
  onNavigateAnalytics
}) => {
  // 1. Filter and View States
  const [filters, setFilters] = useState<MonitoringFiltersState>({
    category: 'ALL',
    priority: 'ALL',
    state: 'ALL',
    evidenceState: 'ALL',
    searchQuery: '',
    viewMode: 'events'
  });

  const [sortField, setSortField] = useState<MonitoringSortField>('detectedAt');
  const [sortDirection, setSortDirection] = useState<MonitoringSortDirection>('desc');

  // 2. Selection & Drawer States
  const [selectedEvent, setSelectedEvent] = useState<MonitoringEvent | null>(null);
  const [isEventDrawerOpen, setIsEventDrawerOpen] = useState<boolean>(false);

  const [selectedProduct, setSelectedProduct] = useState<MonitoredProductSummary | null>(null);
  const [isProductDrawerOpen, setIsProductDrawerOpen] = useState<boolean>(false);

  // 3. User Review / Acknowledgement State
  const [reviewedEventIds, setReviewedEventIds] = useState<Set<string>>(new Set());

  // 4. Future Boundary Modal
  const [boundaryModalState, setBoundaryModalState] = useState<{
    isOpen: boolean;
    pageName: string;
    scopeSummary?: string;
    suggestedAction?: string;
  }>({
    isOpen: false,
    pageName: ''
  });

  // Future Boundary Trigger
  const handleOpenFutureBoundary = (
    pageName: string,
    scopeSummary?: string,
    suggestedAction?: string
  ) => {
    setBoundaryModalState({
      isOpen: true,
      pageName,
      scopeSummary,
      suggestedAction
    });
  };

  const handleCloseFutureBoundary = () => {
    setBoundaryModalState(prev => ({ ...prev, isOpen: false }));
  };

  // Filter Updates
  const handleUpdateFilters = (updates: Partial<MonitoringFiltersState>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'ALL',
      priority: 'ALL',
      state: 'ALL',
      evidenceState: 'ALL',
      searchQuery: '',
      viewMode: filters.viewMode // maintain current view mode
    });
    setSortField('detectedAt');
    setSortDirection('desc');
  };

  // Sort Updates
  const handleUpdateSort = (field: MonitoringSortField) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Quick summary bar filtering
  const handleFilterChangeType = (category: MonitoringCategory | 'ALL') => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === category ? 'ALL' : category,
      viewMode: 'events'
    }));
  };

  const handleFilterPriority = (priority: MonitoringPriority | 'ALL') => {
    setFilters(prev => ({
      ...prev,
      priority: prev.priority === priority ? 'ALL' : priority
    }));
  };

  const handleSelectStateFilter = (state: 'ALL' | MonitoringState) => {
    setFilters(prev => ({
      ...prev,
      state: prev.state === state ? 'ALL' : state
    }));
  };

  // Review status toggle
  const handleToggleReviewed = (eventId: string) => {
    setReviewedEventIds(prev => {
      const next = new Set(prev);
      if (next.has(eventId)) {
        next.delete(eventId);
      } else {
        next.add(eventId);
      }
      return next;
    });
  };

  // Event Selection
  const handleSelectEvent = (event: MonitoringEvent) => {
    setSelectedEvent(event);
    setIsEventDrawerOpen(true);
  };

  // Product Selection
  const handleSelectProduct = (product: MonitoredProductSummary) => {
    setSelectedProduct(product);
    setIsProductDrawerOpen(true);
  };

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return sampleMonitoringEvents
      .filter(event => {
        // Search query
        if (filters.searchQuery.trim()) {
          const query = filters.searchQuery.toLowerCase();
          const matchName = event.productName.toLowerCase().includes(query);
          const matchSku = event.productSku.toLowerCase().includes(query);
          const matchTitle = event.changeTitle.toLowerCase().includes(query);
          const matchAttr = event.attribute.toLowerCase().includes(query);
          const matchSource = event.source.toLowerCase().includes(query);
          const matchReason = event.reason.toLowerCase().includes(query);
          if (!matchName && !matchSku && !matchTitle && !matchAttr && !matchSource && !matchReason) {
            return false;
          }
        }

        // Category filter
        if (filters.category !== 'ALL' && event.category !== filters.category) {
          return false;
        }

        // Priority filter
        if (filters.priority !== 'ALL' && event.priority !== filters.priority) {
          return false;
        }

        // State filter
        if (filters.state !== 'ALL' && event.status !== filters.state) {
          return false;
        }

        // Evidence State filter
        if (filters.evidenceState !== 'ALL' && event.evidenceState !== filters.evidenceState) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        let comparison = 0;
        switch (sortField) {
          case 'priority': {
            const priorityWeight: Record<MonitoringPriority, number> = {
              Critical: 4,
              High: 3,
              Medium: 2,
              Low: 1
            };
            comparison = priorityWeight[b.priority] - priorityWeight[a.priority];
            break;
          }
          case 'detectedAt':
            comparison = b.detectedAtTimestamp - a.detectedAtTimestamp;
            break;
          case 'product':
            comparison = a.productName.localeCompare(b.productName);
            break;
          case 'changeType':
            comparison = a.changeType.localeCompare(b.changeType);
            break;
          case 'confidence':
            comparison = b.confidence - a.confidence;
            break;
          default:
            comparison = b.detectedAtTimestamp - a.detectedAtTimestamp;
        }

        return sortDirection === 'asc' ? -comparison : comparison;
      });
  }, [filters, sortField, sortDirection]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return sampleMonitoredProducts
      .filter(product => {
        // Search query
        if (filters.searchQuery.trim()) {
          const query = filters.searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(query);
          const matchBrand = product.brand.toLowerCase().includes(query);
          const matchSku = product.sku.toLowerCase().includes(query);
          const matchGtin = product.gtin.toLowerCase().includes(query);
          const matchIssue = product.topIssue.toLowerCase().includes(query);
          if (!matchName && !matchBrand && !matchSku && !matchGtin && !matchIssue) {
            return false;
          }
        }

        // Priority filter
        if (filters.priority !== 'ALL' && product.priority !== filters.priority) {
          return false;
        }

        // State filter
        if (filters.state !== 'ALL' && product.monitoringState !== filters.state) {
          return false;
        }

        // Evidence State filter
        if (filters.evidenceState !== 'ALL' && product.dominantEvidenceState !== filters.evidenceState) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        let comparison = 0;
        switch (sortField) {
          case 'priority':
            comparison = b.priorityScore - a.priorityScore;
            break;
          case 'product':
            comparison = a.name.localeCompare(b.name);
            break;
          case 'confidence':
            comparison = b.coverage - a.coverage;
            break;
          default:
            comparison = b.priorityScore - a.priorityScore;
        }
        return sortDirection === 'asc' ? -comparison : comparison;
      });
  }, [filters, sortField, sortDirection]);

  // Find events for selected product
  const selectedProductEvents = useMemo(() => {
    if (!selectedProduct) return [];
    return sampleMonitoringEvents.filter(e => e.productId === selectedProduct.id);
  }, [selectedProduct]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-orange-500/20 selection:text-[#F97316]">
      {/* 1. Merchant Application Navigation Shell */}
      <DashboardNavigationShell
        currentPage="monitoring"
        onBoundaryClick={(pageId, pageName, description) =>
          handleOpenFutureBoundary(pageName, description)
        }
        onSelectFuturePage={(pageName, description) =>
          handleOpenFutureBoundary(pageName, description)
        }
        onNavigateHome={onNavigateHome}
        onNavigateAnalysis={onNavigateAnalysis}
        onNavigateReport={onNavigateReport}
        onNavigateOverview={onNavigateOverview}
        onNavigateProducts={onNavigateProducts}
        onNavigateOffers={onNavigateOffers}
        onNavigateDiscovery={onNavigateDiscovery}
        onNavigateMonitoring={() => {}}
        onNavigateIssues={onNavigateIssues}
        onNavigateShopper={onNavigateShopper}
        onNavigateIntegrations={onNavigateIntegrations}
        onNavigateAnalytics={onNavigateAnalytics}
      />

      {/* 2. Monitoring Header */}
      <MonitoringHeader
        onNavigateAnalysis={onNavigateAnalysis}
        onNavigateOverview={onNavigateOverview}
        onNavigateProducts={onNavigateProducts}
        onNavigateOffers={onNavigateOffers}
        onNavigateIssues={onNavigateIssues}
      />

      {/* 3. Diagnostic Metrics Summary Bar */}
      <MonitoringSummaryBar
        metrics={sampleMonitoringMetrics}
        onFilterChangeType={handleFilterChangeType}
        onFilterPriority={handleFilterPriority}
      />

      {/* 4. Health Section (Stable, Changed, Needs Review, Conflict, Stale) */}
      <MonitoringHealthSection
        statusDistribution={sampleMonitoringMetrics.statusDistribution}
        activeStateFilter={filters.state}
        onSelectStateFilter={handleSelectStateFilter}
      />

      {/* 5. Principle Banner: A Change Is Not Automatically An Issue */}
      <ChangeIsNotAnIssueBanner />

      {/* 6. Monitoring Principles (Collapsible) */}
      <MonitoringPrinciplesSection />

      {/* 7. Main Content Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Filter, Search, and View-Mode Toggle Bar */}
        <MonitoringFiltersBar
          filters={filters}
          onUpdateFilters={handleUpdateFilters}
          onResetFilters={handleResetFilters}
          sortField={sortField}
          sortDirection={sortDirection}
          onUpdateSort={handleUpdateSort}
          eventsCount={filteredEvents.length}
          totalProductsCount={filteredProducts.length}
        />

        {/* View Toggle Display */}
        {filters.viewMode === 'events' ? (
          <ChangeEventTimeline
            events={filteredEvents}
            onSelectEvent={handleSelectEvent}
            onNavigateReport={onNavigateReport}
            onNavigateOffers={onNavigateOffers || (() => {})}
            onNavigateWorkbench={onNavigateProducts || (() => {})}
            onNavigateDiscoveryBoundary={() =>
              handleOpenFutureBoundary(
                'Page 08 — Discovery Intelligence',
                'Simulate AI conversational answer engine retrieval and audit search schema readiness across all catalog SKUs.',
                'Run discovery surface diagnostic.'
              )
            }
            onToggleReviewed={handleToggleReviewed}
            reviewedEventIds={reviewedEventIds}
          />
        ) : (
          <ProductsMonitoringTable
            products={filteredProducts}
            onSelectProduct={handleSelectProduct}
            onNavigateWorkbench={onNavigateProducts || (() => {})}
            onNavigateOffers={onNavigateOffers || (() => {})}
          />
        )}
      </main>

      {/* Event Intelligence Drawer */}
      <ChangeIntelligenceDrawer
        event={selectedEvent}
        isOpen={isEventDrawerOpen}
        onClose={() => setIsEventDrawerOpen(false)}
        onNavigateReport={onNavigateReport}
        onNavigateOffers={onNavigateOffers || (() => {})}
        onNavigateWorkbench={onNavigateProducts || (() => {})}
        onNavigateDiscoveryBoundary={() =>
          handleOpenFutureBoundary(
            'Page 08 — Discovery Intelligence',
            'Simulate AI conversational answer engine retrieval and audit search schema readiness across all catalog SKUs.',
            'Run discovery surface diagnostic.'
          )
        }
        onToggleReviewed={handleToggleReviewed}
        isReviewed={selectedEvent ? reviewedEventIds.has(selectedEvent.id) : false}
      />

      {/* Product Monitoring Detail Drawer */}
      <ProductMonitoringDrawer
        product={selectedProduct}
        productEvents={selectedProductEvents}
        isOpen={isProductDrawerOpen}
        onClose={() => setIsProductDrawerOpen(false)}
        onSelectEvent={event => {
          setIsProductDrawerOpen(false);
          setSelectedEvent(event);
          setIsEventDrawerOpen(true);
        }}
        onNavigateReport={onNavigateReport}
        onNavigateWorkbench={onNavigateProducts || (() => {})}
        onNavigateOffers={onNavigateOffers || (() => {})}
        onNavigateDiscoveryBoundary={() =>
          handleOpenFutureBoundary(
            'Page 08 — Discovery Intelligence',
            'Simulate AI conversational answer engine retrieval and audit search schema readiness across all catalog SKUs.',
            'Run discovery surface diagnostic.'
          )
        }
      />

      {/* Future Page Boundary Modal */}
      <FuturePageBoundaryModal
        isOpen={boundaryModalState.isOpen}
        onClose={handleCloseFutureBoundary}
        targetPageName={boundaryModalState.pageName}
        scopeSummary={boundaryModalState.scopeSummary}
        suggestedAction={boundaryModalState.suggestedAction}
      />
    </div>
  );
};
