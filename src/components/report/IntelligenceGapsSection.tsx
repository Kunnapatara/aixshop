import React, { useState } from 'react';
import { 
  AlertOctagon, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp
} from 'lucide-react';
import { IntelligenceGapItem, EvidenceState } from '../../types/landing';

interface IntelligenceGapsSectionProps {
  gaps: IntelligenceGapItem[];
  onOpenFixModal: () => void;
  onOpenStateModal: (state: EvidenceState) => void;
}

export const IntelligenceGapsSection: React.FC<IntelligenceGapsSectionProps> = ({
  gaps,
  onOpenFixModal,
  onOpenStateModal
}) => {
  const [expandedGapId, setExpandedGapId] = useState<string>(gaps[0]?.id || 'gap-1');

  const toggleExpand = (id: string) => {
    setExpandedGapId(prev => prev === id ? '' : id);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'Warning':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Info':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  return (
    <section id="intelligence-gaps" className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-5 h-5 text-amber-600" />
            <h3 className="text-xl font-bold text-stone-900 tracking-tight">
              Intelligence Gaps & Diagnostic Triage
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            What prevents AIXSHOP from having an airtight, 100% verified canonical model for this product.
          </p>
        </div>

        {/* Primary CTA for next workflow */}
        <button
          type="button"
          onClick={onOpenFixModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold transition-all shadow-xs cursor-pointer self-start sm:self-auto active:scale-[0.98]"
        >
          <span>Review & Fix Issues</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Gaps List */}
      <div className="space-y-3">
        {gaps.map((gap) => {
          const isExpanded = expandedGapId === gap.id;

          return (
            <div
              key={gap.id}
              className={`rounded-2xl border transition-all overflow-hidden shadow-xs ${
                isExpanded
                  ? 'bg-white border-stone-300'
                  : 'bg-white hover:bg-stone-50/80 border-stone-200'
              }`}
            >
              {/* Header row */}
              <button
                type="button"
                onClick={() => toggleExpand(gap.id)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border shrink-0 ${getSeverityBadge(gap.severity)}`}>
                    {gap.severity}
                  </span>
                  <div className="min-w-0">
                    <span className="font-bold text-sm text-stone-900 truncate block">
                      {gap.title}
                    </span>
                    <span className="text-xs text-stone-500 font-mono">
                      Target: {gap.affectedEntity}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span 
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenStateModal(gap.currentState);
                    }}
                    className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200 hover:border-[#F97316] cursor-pointer"
                    title="Click to inspect state"
                  >
                    {gap.currentState}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-stone-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400" />
                  )}
                </div>
              </button>

              {/* Expanded details */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-stone-100 text-xs space-y-3 bg-stone-50/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-3xs">
                      <span className="text-[10px] font-mono font-bold uppercase text-stone-500 block mb-1">
                        Why It Matters:
                      </span>
                      <p className="text-stone-700 leading-relaxed font-medium">
                        {gap.whyItMatters}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-3xs">
                      <span className="text-[10px] font-mono font-bold uppercase text-stone-500 block mb-1">
                        Ground-Truth Evidence Note:
                      </span>
                      <p className="text-stone-600 font-mono text-[11px] leading-relaxed">
                        {gap.evidenceNote}
                      </p>
                    </div>
                  </div>

                  {gap.category !== 'Complete' && (
                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={onOpenFixModal}
                        className="text-xs font-bold text-[#F97316] hover:text-[#EA580C] flex items-center gap-1 cursor-pointer"
                      >
                        <span>Fix in upcoming Phase 04</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
