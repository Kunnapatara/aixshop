import React, { useState } from 'react';
import { AnalysisHeader } from './AnalysisHeader';
import { AnalysisProgressBar } from './AnalysisProgressBar';
import { InitialIntelligenceSummary } from './InitialIntelligenceSummary';
import { CriticalFindingsSection } from './CriticalFindingsSection';
import { ProductVsOfferSection } from './ProductVsOfferSection';
import { EvidenceInspectionSection } from './EvidenceInspectionSection';
import { DiscoveryReadinessSection } from './DiscoveryReadinessSection';
import { BuyerIntentMatrix } from './BuyerIntentMatrix';
import { DiagnosisBottomSummary } from './DiagnosisBottomSummary';
import { Page03PlaceholderModal } from './Page03PlaceholderModal';

interface AnalysisPageProps {
  submittedUrl: string;
  onBackToLanding: () => void;
  onNavigateToReport?: () => void;
}

export const AnalysisPage: React.FC<AnalysisPageProps> = ({
  submittedUrl,
  onBackToLanding,
  onNavigateToReport
}) => {
  const [showPage03Modal, setShowPage03Modal] = useState<boolean>(false);

  const handleViewFullReport = () => {
    if (onNavigateToReport) {
      onNavigateToReport();
    } else {
      setShowPage03Modal(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* SECTION A: ANALYSIS HEADER */}
      <AnalysisHeader 
        submittedUrl={submittedUrl || 'https://shop.aeropulse.com/products/vaporstride-carbon-elite'} 
        onBackToLanding={onBackToLanding} 
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        {/* SECTION B: ANALYSIS PIPELINE PROGRESS */}
        <AnalysisProgressBar />

        {/* SECTION C & D: FIRST MOMENT OF VALUE & INITIAL INTELLIGENCE */}
        <InitialIntelligenceSummary />

        {/* SECTION E: CRITICAL FINDINGS */}
        <CriticalFindingsSection />

        {/* SECTION F: PRODUCT VS OFFER FOUNDATIONAL SEPARATION */}
        <ProductVsOfferSection />

        {/* SECTION G: EVIDENCE INSPECTION */}
        <EvidenceInspectionSection />

        {/* SECTION H: DISCOVERY READINESS PREVIEW */}
        <DiscoveryReadinessSection />

        {/* SECTION I: BUYER INTENT PREVIEW (ALL 7 ARCHETYPES) */}
        <BuyerIntentMatrix />

        {/* SECTION J & K: THE "WHAT AIXSHOP FOUND" SUMMARY & ACTIONS */}
        <DiagnosisBottomSummary 
          onViewFullReport={handleViewFullReport}
          onAnalyzeAnother={onBackToLanding}
        />
      </main>

      {/* MODAL: Page 03 Next Phase Notice (Strict Scope Discipline fallback) */}
      <Page03PlaceholderModal
        isOpen={showPage03Modal}
        onClose={() => setShowPage03Modal(false)}
      />
    </div>
  );
};
