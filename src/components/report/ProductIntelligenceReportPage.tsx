import React, { useState } from 'react';
import { 
  sampleCanonicalProduct, 
  sampleEvidenceAttributes,
  sampleVariants,
  sampleTimelineEvents,
  sampleIntelligenceGaps
} from '../../data/sampleIntelligence';
import { InspectedEvidenceAttribute, EvidenceState } from '../../types/landing';

// Modals
import { ExportPreviewModal } from './ExportPreviewModal';
import { Page04BoundaryModal } from './Page04BoundaryModal';
import { StateExplanationModal } from './StateExplanationModal';

// Components
import { ReportHeader } from './ReportHeader';
import { ProductIdentityHero } from './ProductIdentityHero';
import { IntelligenceScorecard } from './IntelligenceScorecard';
import { CanonicalProductModel } from './CanonicalProductModel';
import { AttributeIntelligenceTable } from './AttributeIntelligenceTable';
import { EvidenceProvenancePanel } from './EvidenceProvenancePanel';
import { VariantIntelligenceSection } from './VariantIntelligenceSection';
import { ProductVsOfferRelationship } from './ProductVsOfferRelationship';
import { ObservedOfferIntelligence } from './ObservedOfferIntelligence';
import { BuyerIntentSection } from './BuyerIntentSection';
import { DiscoveryIntelligenceSection } from './DiscoveryIntelligenceSection';
import { IntelligenceGapsSection } from './IntelligenceGapsSection';
import { ProductIntelligenceTimeline } from './ProductIntelligenceTimeline';
import { ExecutiveSummaryCard } from './ExecutiveSummaryCard';
import { ReportBottomActionBar } from './ReportBottomActionBar';

interface ProductIntelligenceReportPageProps {
  submittedUrl: string;
  onBackToLanding: () => void;
  onBackToAnalysis: () => void;
  onNavigateDashboard?: () => void;
}

export const ProductIntelligenceReportPage: React.FC<ProductIntelligenceReportPageProps> = ({
  submittedUrl,
  onBackToLanding,
  onBackToAnalysis,
  onNavigateDashboard
}) => {
  const [selectedAttribute, setSelectedAttribute] = useState<InspectedEvidenceAttribute>(
    sampleEvidenceAttributes[3] || sampleEvidenceAttributes[0] // Upper material conflict by default for rich inspection
  );

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isPage04ModalOpen, setIsPage04ModalOpen] = useState(false);
  const [selectedStateForModal, setSelectedStateForModal] = useState<EvidenceState | null>(null);

  const handleOpenStateModal = (state: EvidenceState) => {
    setSelectedStateForModal(state);
  };

  const handleCloseStateModal = () => {
    setSelectedStateForModal(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-orange-500/20 selection:text-orange-950">
      {/* Sticky Report Navigation Header */}
      <ReportHeader
        onAnalyzeAnother={onBackToLanding}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onBackToAnalysis={onBackToAnalysis}
        onNavigateDashboard={onNavigateDashboard}
        canonicalId={sampleCanonicalProduct.canonicalId}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Section 7: Product Identity Hero */}
        <ProductIdentityHero
          product={sampleCanonicalProduct}
          submittedUrl={submittedUrl}
        />

        {/* Section 8: Product Intelligence Scorecard (6 Dimensions) */}
        <IntelligenceScorecard
          onOpenStateModal={handleOpenStateModal}
        />

        {/* Section 9: Canonical Product Model */}
        <CanonicalProductModel
          product={sampleCanonicalProduct}
          onOpenStateModal={handleOpenStateModal}
        />

        {/* Sections 10 & 11: Attribute Intelligence Table & Evidence Provenance */}
        <section id="attributes-table" className="space-y-4">
          <div className="pb-2 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xl font-bold text-stone-900 tracking-tight">
                Attribute Intelligence & Evidence Provenance
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Inspect raw ground-truth facts, confidence scores, and conflict resolutions attribute-by-attribute.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#F97316] bg-orange-50 px-3 py-1 rounded-xl border border-orange-200 shadow-3xs self-start sm:self-auto">
              Interactive Evidence Inspector
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* Left 7 cols: Table */}
            <div className="lg:col-span-7">
              <AttributeIntelligenceTable
                attributes={sampleEvidenceAttributes}
                selectedAttributeId={selectedAttribute.id}
                onSelectAttribute={setSelectedAttribute}
                onOpenStateModal={handleOpenStateModal}
              />
            </div>

            {/* Right 5 cols: Provenance Inspector Panel */}
            <div className="lg:col-span-5">
              <EvidenceProvenancePanel
                attribute={selectedAttribute}
                onOpenStateModal={handleOpenStateModal}
              />
            </div>
          </div>
        </section>

        {/* Section 12: Variant Intelligence */}
        <VariantIntelligenceSection
          variants={sampleVariants}
          onOpenStateModal={handleOpenStateModal}
        />

        {/* Section 13: Product ≠ Offer Foundational Law */}
        <ProductVsOfferRelationship />

        {/* Section 14: Observed Offer Intelligence */}
        <ObservedOfferIntelligence
          offers={sampleCanonicalProduct.offers}
          onOpenStateModal={handleOpenStateModal}
        />

        {/* Section 15: Buyer Intent Coverage */}
        <BuyerIntentSection
          intents={sampleCanonicalProduct.intents}
        />

        {/* Section 16: Discovery Intelligence */}
        <DiscoveryIntelligenceSection
          surfaces={sampleCanonicalProduct.surfaces}
        />

        {/* Section 17: Intelligence Gaps */}
        <IntelligenceGapsSection
          gaps={sampleIntelligenceGaps}
          onOpenFixModal={() => setIsPage04ModalOpen(true)}
          onOpenStateModal={handleOpenStateModal}
        />

        {/* Section 18: Product Intelligence Timeline */}
        <ProductIntelligenceTimeline
          events={sampleTimelineEvents}
        />

        {/* Section 19: Executive Summary */}
        <ExecutiveSummaryCard />

        {/* Section 20: Primary Action Bar */}
        <ReportBottomActionBar
          onReviewFixIssues={() => setIsPage04ModalOpen(true)}
          onAnalyzeAnother={onBackToLanding}
          onBackToAnalysis={onBackToAnalysis}
        />
      </main>

      {/* Scope Boundary & Detail Modals */}
      <ExportPreviewModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        productName={sampleCanonicalProduct.name}
      />

      <Page04BoundaryModal
        isOpen={isPage04ModalOpen}
        onClose={() => setIsPage04ModalOpen(false)}
      />

      <StateExplanationModal
        isOpen={selectedStateForModal !== null}
        onClose={handleCloseStateModal}
        selectedState={selectedStateForModal}
      />
    </div>
  );
};
