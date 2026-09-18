import React from 'react';
import { 
  ArrowUpRight
} from 'lucide-react';
import { EvidenceState } from '../../types/landing';

interface DimensionCard {
  id: string;
  title: string;
  status: string;
  metric: string;
  sublabel: string;
  interpretation: string;
  evidenceState: EvidenceState;
  targetSectionId: string;
}

interface IntelligenceScorecardProps {
  onSelectDimension?: (sectionId: string) => void;
  onOpenStateModal: (state: EvidenceState) => void;
}

export const IntelligenceScorecard: React.FC<IntelligenceScorecardProps> = ({
  onSelectDimension,
  onOpenStateModal
}) => {
  const dimensions: DimensionCard[] = [
    {
      id: 'dim-identity',
      title: '1. Identity',
      status: 'Resolved',
      metric: '100%',
      sublabel: 'GTIN / MPN matched',
      interpretation: 'Canonical product entity anchored to global barcode registry.',
      evidenceState: 'OBSERVED',
      targetSectionId: 'canonical-model'
    },
    {
      id: 'dim-specs',
      title: '2. Specifications',
      status: 'Partial',
      metric: '7 / 10',
      sublabel: 'Known core facts',
      interpretation: 'Physical properties mapped; missing arch support and upper conflict.',
      evidenceState: 'CONFLICT',
      targetSectionId: 'attributes-table'
    },
    {
      id: 'dim-evidence',
      title: '3. Evidence',
      status: 'Traceable',
      metric: '4 States',
      sublabel: 'Observed & Verified',
      interpretation: 'Direct provenance citations from Shopify DOM & GS1 feeds.',
      evidenceState: 'MERCHANT_VERIFIED',
      targetSectionId: 'attributes-table'
    },
    {
      id: 'dim-variants',
      title: '4. Variants',
      status: '6 Verified',
      metric: '6 / 6',
      sublabel: 'SKUs resolved',
      interpretation: 'Colorways and sizes tied to verified parent canonical identity.',
      evidenceState: 'OBSERVED',
      targetSectionId: 'variant-intelligence'
    },
    {
      id: 'dim-offers',
      title: '5. Offers',
      status: '3 Active',
      metric: '3 Sources',
      sublabel: '$199 – $240 range',
      interpretation: 'Decoupled seller pricing and stock observed across channels.',
      evidenceState: 'OBSERVED',
      targetSectionId: 'offer-intelligence'
    },
    {
      id: 'dim-discovery',
      title: '6. Discovery Readiness',
      status: 'Diagnostic Signal',
      metric: '79%',
      sublabel: 'Machine readability',
      interpretation: 'Diagnostic index across traditional, AI search, and commerce feeds.',
      evidenceState: 'DERIVED',
      targetSectionId: 'discovery-intelligence'
    }
  ];

  const handleScrollTo = (sectionId: string) => {
    if (onSelectDimension) {
      onSelectDimension(sectionId);
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getBadgeClass = (state: EvidenceState) => {
    switch (state) {
      case 'MERCHANT_VERIFIED':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'OBSERVED':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'DERIVED':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'CONFLICT':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'MISSING':
        return 'bg-rose-50 text-rose-800 border-rose-200';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-stone-800">
            Product Intelligence Scorecard
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Diagnostic indicators across 6 core intelligence dimensions (no aggregate artificial score)
          </p>
        </div>
        <span className="text-[11px] font-mono font-medium text-stone-500 bg-white px-2.5 py-1 rounded-lg border border-stone-200 shadow-3xs">
          Click card to inspect section
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {dimensions.map((dim) => (
          <div
            key={dim.id}
            onClick={() => handleScrollTo(dim.targetSectionId)}
            className="group rounded-2xl bg-white hover:bg-orange-50/20 border border-stone-200 hover:border-[#F97316] p-4.5 transition-all duration-200 cursor-pointer flex flex-col justify-between relative shadow-xs hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span className="font-bold text-stone-700 group-hover:text-[#F97316] transition-colors">
                  {dim.title}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#F97316] transition-colors" />
              </div>

              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-xl font-black text-stone-900 font-mono">
                  {dim.metric}
                </span>
                <span className="text-[11px] text-stone-500 truncate">
                  {dim.sublabel}
                </span>
              </div>

              <p className="text-[11px] text-stone-600 leading-relaxed line-clamp-2 mt-1 mb-3">
                {dim.interpretation}
              </p>
            </div>

            <div className="pt-2.5 border-t border-stone-200/80 flex items-center justify-between">
              <span className="text-[10px] font-bold text-stone-500">
                {dim.status}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenStateModal(dim.evidenceState);
                }}
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border transition-opacity hover:opacity-80 cursor-pointer ${getBadgeClass(dim.evidenceState)}`}
                title="Click to view state definition"
              >
                {dim.evidenceState}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
