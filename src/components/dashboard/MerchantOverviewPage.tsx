import React, { useState } from 'react';
import { DashboardNavigationShell } from './DashboardNavigationShell';
import { DashboardHeader } from './DashboardHeader';
import { CatalogSnapshotCards } from './CatalogSnapshotCards';
import { PriorityActionCenter } from './PriorityActionCenter';
import { CatalogIntelligenceOverview } from './CatalogIntelligenceOverview';
import { ProductHealthDistribution } from './ProductHealthDistribution';
import { ProductsRequiringAttention } from './ProductsRequiringAttention';
import { EvidenceHealthSection } from './EvidenceHealthSection';
import { OfferSnapshotSection } from './OfferSnapshotSection';
import { BuyerIntentCoverageSection } from './BuyerIntentCoverageSection';
import { DiscoveryReadinessSnapshot } from './DiscoveryReadinessSnapshot';
import { CatalogPriorityMatrix } from './CatalogPriorityMatrix';
import { RecentIntelligenceEvents } from './RecentIntelligenceEvents';
import { MerchantActionPhilosophy } from './MerchantActionPhilosophy';
import { QuickActionsRow } from './QuickActionsRow';

// Modals
import { FuturePageBoundaryModal } from './FuturePageBoundaryModal';
import { ProductDetailPreviewModal } from './ProductDetailPreviewModal';
import { MetricExplanationModal, MetricExplanation } from './MetricExplanationModal';
import { StateExplanationModal } from '../report/StateExplanationModal';

// Sample Data
import { CANONICAL_PRODUCT_ID } from '../../data/canonicalCatalog';
import {
  sampleCatalogSnapshot,
  samplePriorityActions,
  sampleCatalogDimensions,
  sampleHealthDistribution,
  sampleRepresentativeProducts,
  sampleEvidenceHealthItems,
  sampleOfferSnapshot,
  sampleBuyerIntentCoverage,
  sampleDiscoverySurfaces,
  sampleRecentEvents,
  samplePriorityMatrixQuadrants
} from '../../data/sampleDashboardData';

import { RepresentativeProductItem, PriorityActionItem, CatalogDiscoverySurface } from '../../types/dashboard';
import { EvidenceState } from '../../types/landing';

interface MerchantOverviewPageProps {
  onNavigateHome: () => void;
  onNavigateAnalysis: () => void;
  onNavigateReport: () => void;
  onNavigateProducts?: () => void;
  onNavigateOffers?: () => void;
  onNavigateDiscovery?: () => void;
  onNavigateMonitoring?: () => void;
  onNavigateIssues?: () => void;
  onNavigateShopper?: () => void;
  onNavigateIntegrations?: () => void;
  onNavigateAnalytics?: () => void;
  onNavigateBilling?: () => void;
  onNavigateAdmin?: () => void;
}

export const MerchantOverviewPage: React.FC<MerchantOverviewPageProps> = ({
  onNavigateHome,
  onNavigateAnalysis,
  onNavigateReport,
  onNavigateProducts,
  onNavigateOffers,
  onNavigateDiscovery,
  onNavigateMonitoring,
  onNavigateIssues,
  onNavigateShopper,
  onNavigateIntegrations,
  onNavigateAnalytics,
  onNavigateBilling,
  onNavigateAdmin
}) => {
  // Modal states
  const [boundaryModalState, setBoundaryModalState] = useState<{
    isOpen: boolean;
    pageName: string;
    scopeSummary?: string;
    suggestedAction?: string;
  }>({
    isOpen: false,
    pageName: ''
  });

  const [selectedProduct, setSelectedProduct] = useState<RepresentativeProductItem | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const [selectedMetric, setSelectedMetric] = useState<MetricExplanation | null>(null);
  const [isMetricModalOpen, setIsMetricModalOpen] = useState(false);

  const [selectedState, setSelectedState] = useState<EvidenceState | null>(null);
  const [isStateModalOpen, setIsStateModalOpen] = useState(false);

  // Handlers
  const handleOpenFutureBoundary = (pageName: string, scopeSummary?: string, suggestedAction?: string) => {
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

  const handleSelectProduct = (product: RepresentativeProductItem) => {
    if (product.id === CANONICAL_PRODUCT_ID) {
      // Direct jump to Page 03!
      onNavigateReport();
    } else {
      setSelectedProduct(product);
      setIsProductModalOpen(true);
    }
  };

  const handleOpenMetricExplanation = (metric: MetricExplanation) => {
    setSelectedMetric(metric);
    setIsMetricModalOpen(true);
  };

  const handleSelectEvidenceState = (state: EvidenceState) => {
    setSelectedState(state);
    setIsStateModalOpen(true);
  };

  const handleSelectOfferMetric = (title: string, value: string, explanation: string) => {
    handleOpenMetricExplanation({
      title,
      value,
      subtitle: 'Observed Offer Dimension Snapshot',
      whatItMeans: explanation,
      whatItIsNot: 'Not an intrinsic product specification and not guaranteed real-time pricing.',
      methodology: 'Captured across public structured microdata from verified merchant sites.'
    });
  };

  const handleSelectSurface = (surface: CatalogDiscoverySurface) => {
    if (onNavigateDiscovery) {
      onNavigateDiscovery();
    } else {
      handleOpenFutureBoundary(
        `Discovery Surface Detail: ${surface.surfaceName} (Page 08)`,
        `Diagnostic schema and intent evaluation for ${surface.surfaceName}. Readiness: ${surface.readinessPercentage}%. Major gap: ${surface.majorGap}`,
        'Full surface inspection and synthetic query simulation will be available in Page 08 Discovery Intelligence.'
      );
    }
  };

  const handleTriggerPriorityAction = (action: PriorityActionItem) => {
    handleOpenFutureBoundary(
      action.targetFuturePage,
      `Action: "${action.title}". Why it matters: ${action.whyItMatters}`,
      action.recommendedStep
    );
  };

  return (
    <div className="min-h-screen bg-[#090D14] text-slate-100 flex flex-col selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Merchant Application Navigation Shell */}
      <DashboardNavigationShell
        activeTab="overview"
        onSelectFuturePage={(pageName, desc) => handleOpenFutureBoundary(pageName, desc)}
        onNavigateHome={onNavigateHome}
        onNavigateAnalysis={onNavigateAnalysis}
        onNavigateReport={onNavigateReport}
        onNavigateOverview={() => {}}
        onNavigateProducts={onNavigateProducts}
        onNavigateOffers={onNavigateOffers}
        onNavigateDiscovery={onNavigateDiscovery}
        onNavigateMonitoring={onNavigateMonitoring}
        onNavigateIssues={onNavigateIssues}
        onNavigateShopper={onNavigateShopper}
        onNavigateIntegrations={onNavigateIntegrations}
        onNavigateAnalytics={onNavigateAnalytics}
        onNavigateBilling={onNavigateBilling}
        onNavigateAdmin={onNavigateAdmin}
      />

      {/* Dashboard Header */}
      <DashboardHeader
        onAnalyzeClick={onNavigateHome}
        onViewIssuesClick={() => {
          if (onNavigateIssues) {
            onNavigateIssues();
          } else {
            handleOpenFutureBoundary(
              'Page 10 — Issues & Recovery',
              'Review all 8 products requiring attention, GTIN barcode conflicts, and missing return policies in the dedicated triage queue.',
              'Open issue arbitration workspace.'
            );
          }
        }}
      />

      {/* Main Dashboard Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* 1. Quick Actions Row */}
        <QuickActionsRow
          onAnalyzeProduct={onNavigateHome}
          onReviewGaps={() => {
            if (onNavigateIssues) {
              onNavigateIssues();
            } else {
              handleOpenFutureBoundary(
                'Page 10 — Issues & Recovery',
                'Filter catalog by 17 missing evidence attributes and attach structured product documentation.',
                'Batch ground-truth evidence intake.'
              );
            }
          }}
          onReviewConflicts={() => {
            if (onNavigateIssues) {
              onNavigateIssues();
            } else {
              handleOpenFutureBoundary(
                'Page 10 — Issues & Recovery',
                'Arbitrate 6 active source disagreements with merchant authoritative signoffs.',
                'Review conflict evidence pairs.'
              );
            }
          }}
          onReviewOffers={() => {
            if (onNavigateOffers) {
              onNavigateOffers();
            } else {
              handleOpenFutureBoundary(
                'Page 07 — Offers & Pricing',
                'Detailed 42-offer marketplace tracker, price variation history, and stock availability telemetry.',
                'View multi-seller offer intelligence.'
              );
            }
          }}
          onReviewDiscovery={() => {
            if (onNavigateDiscovery) {
              onNavigateDiscovery();
            } else {
              handleOpenFutureBoundary(
                'Page 08 — Discovery Intelligence',
                'Simulate AI conversational answer engine retrieval and audit search schema readiness across all catalog SKUs.',
                'Run discovery surface diagnostic.'
              );
            }
          }}
        />

        {/* 2. Top-Level Catalog Snapshot (6 high-value cards) */}
        <CatalogSnapshotCards
          metrics={sampleCatalogSnapshot}
          onOpenMetricExplanation={handleOpenMetricExplanation}
        />

        {/* 3. Priority Action Center (Most important section) */}
        <PriorityActionCenter
          actions={samplePriorityActions}
          onTriggerAction={handleTriggerPriorityAction}
        />

        {/* 4. Split Layout: Catalog Intelligence (6 dims) + Product Health (Distribution) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <div className="xl:col-span-7">
            <CatalogIntelligenceOverview dimensions={sampleCatalogDimensions} />
          </div>
          <div className="xl:col-span-5">
            <ProductHealthDistribution distribution={sampleHealthDistribution} />
          </div>
        </div>

        {/* 5. Products Requiring Attention (Top 5 Triage SKUs) */}
        <ProductsRequiringAttention
          products={sampleRepresentativeProducts}
          onSelectProduct={handleSelectProduct}
          onNavigateToReport={onNavigateReport}
          onNavigateProducts={onNavigateProducts}
        />

        {/* 6. Split Layout: Evidence Health (5 Epistemic States) + Offer Snapshot */}
        <div className="space-y-6">
          <EvidenceHealthSection
            items={sampleEvidenceHealthItems}
            onSelectState={handleSelectEvidenceState}
          />

          <OfferSnapshotSection
            snapshot={sampleOfferSnapshot}
            onSelectMetric={handleSelectOfferMetric}
          />
        </div>

        {/* 7. Buyer Intent Coverage (7 Archetypes) */}
        <BuyerIntentCoverageSection intents={sampleBuyerIntentCoverage} />

        {/* 8. Discovery Readiness Snapshot (4 Surfaces) */}
        <DiscoveryReadinessSnapshot
          surfaces={sampleDiscoverySurfaces}
          onSelectSurface={handleSelectSurface}
        />

        {/* 9. Catalog Priority Matrix (2x2 Grid) */}
        <CatalogPriorityMatrix quadrants={samplePriorityMatrixQuadrants} />

        {/* 10. Merchant Action Philosophy Banner */}
        <MerchantActionPhilosophy />

        {/* 11. Recent Intelligence Events (Preview activity stream) */}
        <RecentIntelligenceEvents events={sampleRecentEvents} />
      </main>

      {/* Boundary Modal for Future Pages */}
      <FuturePageBoundaryModal
        isOpen={boundaryModalState.isOpen}
        onClose={handleCloseFutureBoundary}
        targetPageName={boundaryModalState.pageName}
        scopeSummary={boundaryModalState.scopeSummary}
        suggestedAction={boundaryModalState.suggestedAction}
      />

      {/* Product Detail Preview Modal (for non-VaporStride items) */}
      <ProductDetailPreviewModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        product={selectedProduct}
        onNavigateToReport={onNavigateReport}
      />

      {/* Metric Explanation Modal */}
      <MetricExplanationModal
        isOpen={isMetricModalOpen}
        onClose={() => setIsMetricModalOpen(false)}
        metric={selectedMetric}
      />

      {/* Epistemic State Explanation Modal */}
      <StateExplanationModal
        isOpen={isStateModalOpen}
        onClose={() => setIsStateModalOpen(false)}
        selectedState={selectedState}
      />
    </div>
  );
};
