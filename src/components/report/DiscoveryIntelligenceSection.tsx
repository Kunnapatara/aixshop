import React, { useState } from 'react';
import { 
  Radio, 
  Search, 
  Bot, 
  ShoppingBag, 
  Layers, 
  AlertTriangle, 
  Info,
  Code2
} from 'lucide-react';
import { DiscoverySurfaceSignal } from '../../types/landing';

interface DiscoveryIntelligenceSectionProps {
  surfaces: DiscoverySurfaceSignal[];
}

export const DiscoveryIntelligenceSection: React.FC<DiscoveryIntelligenceSectionProps> = ({ surfaces }) => {
  const [selectedSurfaceId, setSelectedSurfaceId] = useState<string>(surfaces[1]?.surfaceId || surfaces[0]?.surfaceId);

  const selectedSurface = surfaces.find(s => s.surfaceId === selectedSurfaceId) || surfaces[0];

  const getSurfaceIcon = (type: string) => {
    switch (type) {
      case 'Search':
        return <Search className="w-4 h-4 text-[#F97316]" />;
      case 'AI':
        return <Bot className="w-4 h-4 text-purple-600" />;
      case 'Commerce':
        return <ShoppingBag className="w-4 h-4 text-amber-600" />;
      case 'AIXSHOP':
        return <Layers className="w-4 h-4 text-emerald-600" />;
      default:
        return <Radio className="w-4 h-4 text-stone-400" />;
    }
  };

  const surfaceTechnicalDetails: Record<string, {
    missingEvidence: string;
    importantAttributes: string[];
    machineSignals: string;
  }> = {
    'surf-traditional-search': {
      missingEvidence: 'Structured merchantReturnPolicy and hasMerchantReturnFees attributes.',
      importantAttributes: ['brand.name', 'gtin14', 'offers.price', 'offers.priceCurrency', 'hasMerchantReturnPolicy'],
      machineSignals: 'Schema.org JSON-LD microdata validates with 1 critical warning: Missing return policy schema suppresses Google merchant trust badges in SERP rich snippets.'
    },
    'surf-ai-answer': {
      missingEvidence: 'Upper material conflict between mesh vs synthetic upper causes factual hallucination risk.',
      importantAttributes: ['biomechanics.plate', 'midsole.compound', 'materials.upper', 'specs.stackHeight', 'specs.heelDrop'],
      machineSignals: 'High machine readability: LLMs cite carbon propulsion plate and supercritical PEBA foam cleanly, but hesitate on weather resistance due to conflicting upper material claims.'
    },
    'surf-google-shopping': {
      missingEvidence: 'Secondary distributor inventory feed uses unverified GTIN barcode (00849201948999).',
      importantAttributes: ['id', 'title', 'availability', 'condition', 'price', 'link', 'image_link', 'gtin'],
      machineSignals: 'Feed ingestion diagnostic: SKU AP-VSE-BLK-105 risks feed suspension or split listing authority if barcode does not match primary GS1 registry.'
    },
    'surf-aix-native': {
      missingEvidence: 'None. Canonical product entity successfully decoupled from 3 observed seller offers.',
      importantAttributes: ['canonicalId', 'facts.provenance', 'variants.gtin', 'offers.observedAt'],
      machineSignals: 'Complete graph resolution: 100% attribute traceability across immutable product specs and variable market offers.'
    }
  };

  const activeDetails = surfaceTechnicalDetails[selectedSurface.surfaceId] || surfaceTechnicalDetails['surf-ai-answer'];

  return (
    <section id="discovery-intelligence" className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-[#F97316]" />
            <h3 className="text-xl font-bold text-stone-900 tracking-tight">
              Discovery Intelligence by Surface
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Machine-readability and structured data readiness across modern AI and commerce discovery channels.
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-orange-800 bg-orange-50 border border-orange-200 px-3 py-1 rounded-xl shadow-3xs">
          4 Discovery Surfaces Diagnosed
        </span>
      </div>

      {/* Mandatory Regulatory & Epistemic Disclaimer */}
      <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 text-xs text-stone-700 flex items-start gap-2.5 shadow-3xs">
        <Info className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Mandatory Diagnostic Disclaimer:</strong> These are diagnostic signals and machine-readability indicators, not ranking or visibility guarantees. AIXSHOP does not fabricate search positions or make speculative ranking claims.
        </p>
      </div>

      {/* Grid: 4 Surface Selectors & Deep Diagnostic View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: 4 Surface Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          {surfaces.map((surf) => {
            const isSelected = surf.surfaceId === selectedSurface.surfaceId;

            return (
              <div
                key={surf.surfaceId}
                onClick={() => setSelectedSurfaceId(surf.surfaceId)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer shadow-3xs ${
                  isSelected
                    ? 'bg-orange-50/70 border-[#F97316]'
                    : 'bg-white hover:bg-stone-50/80 border-stone-200 text-stone-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5 font-bold text-xs text-stone-900">
                    {getSurfaceIcon(surf.type)}
                    <span className="truncate max-w-[200px]">{surf.name}</span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                    surf.readinessStatus === 'Ready'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {surf.readinessStatus}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-stone-600 font-mono">
                  <span>Machine Readability:</span>
                  <span className="font-bold text-stone-900">{surf.completenessPercentage}%</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-stone-100 mt-2.5 overflow-hidden border border-stone-200/60">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      surf.completenessPercentage >= 80 ? 'bg-[#F97316]' : 'bg-amber-500'
                    }`}
                    style={{ width: `${surf.completenessPercentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Surface Diagnostic Findings (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-white border border-stone-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div className="flex items-center gap-2.5">
              {getSurfaceIcon(selectedSurface.type)}
              <h4 className="text-base font-bold text-stone-900">
                {selectedSurface.name}
              </h4>
            </div>
            <span className="text-xs font-mono text-[#F97316] font-bold bg-orange-50 px-2.5 py-1 rounded-xl border border-orange-200">
              {selectedSurface.completenessPercentage}% Diagnostic Signal
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Finding */}
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 shadow-3xs">
              <span className="text-[10px] uppercase font-mono font-bold text-stone-500 block mb-1">
                Surface Diagnostic Finding:
              </span>
              <p className="text-stone-800 leading-relaxed font-medium">
                {selectedSurface.diagnosticFinding}
              </p>
            </div>

            {/* Missing Evidence */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 shadow-3xs">
              <span className="text-[10px] uppercase font-mono font-bold text-amber-800 block mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Missing / Ambiguous Evidence Signal:
              </span>
              <p className="text-amber-900 font-medium">
                {activeDetails.missingEvidence}
              </p>
            </div>

            {/* Important Machine Attributes */}
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-2 shadow-3xs">
              <span className="text-[10px] uppercase font-mono font-bold text-stone-500 block">
                Required Machine-Readable Attributes:
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {activeDetails.importantAttributes.map((attr) => (
                  <span key={attr} className="px-2.5 py-1 rounded-lg bg-white text-stone-800 font-bold border border-stone-200 shadow-3xs">
                    {attr}
                  </span>
                ))}
              </div>
            </div>

            {/* Machine Signal Details */}
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 shadow-3xs">
              <span className="text-[10px] uppercase font-mono font-bold text-stone-500 block mb-1 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-[#F97316]" />
                Ingestion Engine Diagnostic Excerpt:
              </span>
              <p className="font-mono text-[11px] text-stone-600 leading-relaxed">
                {activeDetails.machineSignals}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
