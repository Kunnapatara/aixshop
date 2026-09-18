import React from 'react';
import { 
  ShieldCheck, 
  Eye, 
  Sparkles, 
  AlertTriangle, 
  HelpCircle, 
  Clock, 
  Calendar, 
  HelpCircle as QuestionIcon
} from 'lucide-react';
import { InspectedEvidenceAttribute, EvidenceState } from '../../types/landing';

interface EvidenceProvenancePanelProps {
  attribute: InspectedEvidenceAttribute;
  onOpenStateModal: (state: EvidenceState) => void;
}

export const EvidenceProvenancePanel: React.FC<EvidenceProvenancePanelProps> = ({
  attribute,
  onOpenStateModal
}) => {
  const getStateBadge = (state: EvidenceState) => {
    switch (state) {
      case 'MERCHANT_VERIFIED':
        return {
          label: 'MERCHANT VERIFIED',
          classes: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
        };
      case 'OBSERVED':
        return {
          label: 'OBSERVED',
          classes: 'bg-blue-50 text-blue-800 border-blue-200',
          icon: <Eye className="w-3.5 h-3.5 text-blue-600" />
        };
      case 'DERIVED':
        return {
          label: 'DERIVED',
          classes: 'bg-purple-50 text-purple-800 border-purple-200',
          icon: <Sparkles className="w-3.5 h-3.5 text-purple-600" />
        };
      case 'CONFLICT':
        return {
          label: 'CONFLICT',
          classes: 'bg-amber-50 text-amber-800 border-amber-300',
          icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
        };
      case 'MISSING':
        return {
          label: 'MISSING',
          classes: 'bg-rose-50 text-rose-800 border-rose-200',
          icon: <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
        };
    }
  };

  const badge = getStateBadge(attribute.state);

  return (
    <div id="evidence-provenance" className="rounded-2xl bg-white border border-stone-200 p-5 shadow-xs space-y-4 flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Header & Principle */}
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold">
              Evidence Provenance Inspector
            </span>
            <span className="text-[10px] font-mono text-[#F97316] font-bold bg-orange-50 px-2 py-0.5 rounded-md">
              Tuple v1.2
            </span>
          </div>
          <h4 className="text-base font-bold text-stone-900 mt-1">
            {attribute.name}
          </h4>
          <p className="text-[11px] text-stone-500 mt-0.5">
            Every important conclusion should be traceable to verifiable evidence.
          </p>
        </div>

        {/* Conceptual Tuple Display */}
        <div className="space-y-2.5 text-xs">
          {/* VALUE */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 shadow-3xs">
            <span className="text-[10px] font-mono uppercase font-bold text-stone-500 block mb-1">
              VALUE
            </span>
            <div className="font-mono text-sm font-bold text-stone-900">
              {attribute.state === 'MISSING' ? (
                <span className="text-rose-600 font-normal italic">Unknown / No Evidence Detected</span>
              ) : (
                attribute.value
              )}
            </div>
          </div>

          {/* STATE & CONFIDENCE */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 shadow-3xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono uppercase font-bold text-stone-500">STATE</span>
                <button
                  type="button"
                  onClick={() => onOpenStateModal(attribute.state)}
                  className="text-stone-400 hover:text-[#F97316] transition-colors cursor-pointer"
                  title="What does this state mean?"
                >
                  <QuestionIcon className="w-3.5 h-3.5" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => onOpenStateModal(attribute.state)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border cursor-pointer hover:opacity-90 ${badge.classes}`}
              >
                {badge.icon}
                <span>{badge.label}</span>
              </button>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 shadow-3xs">
              <span className="text-[10px] font-mono uppercase font-bold text-stone-500 block mb-1">CONFIDENCE</span>
              <span className={`text-xs font-mono font-bold ${
                attribute.confidence === 'High' ? 'text-emerald-700' :
                attribute.confidence === 'Medium' ? 'text-amber-700' : 'text-stone-400'
              }`}>
                {attribute.confidence} Confidence
              </span>
            </div>
          </div>

          {/* SOURCE */}
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 shadow-3xs">
            <span className="text-[10px] font-mono uppercase font-bold text-stone-500 block mb-1">SOURCE</span>
            <div className="font-mono text-xs text-stone-800 font-semibold truncate">
              {attribute.source}
            </div>
          </div>

          {/* TIMESTAMPS: DETECTED_AT & VALID_UNTIL */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 shadow-3xs">
              <span className="text-[10px] font-mono uppercase font-bold text-stone-500 block mb-1">DETECTED_AT</span>
              <div className="flex items-center gap-1 font-mono text-[11px] text-stone-700">
                <Clock className="w-3.5 h-3.5 text-stone-400" />
                <span>{attribute.detectedAt}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 shadow-3xs">
              <span className="text-[10px] font-mono uppercase font-bold text-stone-500 block mb-1">VALID_UNTIL</span>
              <div className="flex items-center gap-1 font-mono text-[11px] text-stone-600">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                <span>2027-01-01 (Est.)</span>
              </div>
            </div>
          </div>

          {/* Conflict or Evidence Excerpt */}
          {attribute.conflictDetails ? (
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 space-y-2.5 shadow-3xs">
              <div className="flex items-center gap-1.5 text-amber-900 font-bold text-xs">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Discrepancy Resolution Breakdown:</span>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-white border border-amber-200 shadow-3xs">
                  <span className="text-stone-500 text-[10px] block font-bold">Source A:</span>
                  <div className="text-stone-900 font-bold">{attribute.conflictDetails.sourceA.value}</div>
                  <div className="text-[10px] text-stone-500 mt-0.5">Origin: {attribute.conflictDetails.sourceA.name}</div>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-amber-200 shadow-3xs">
                  <span className="text-stone-500 text-[10px] block font-bold">Source B:</span>
                  <div className="text-stone-900 font-bold">{attribute.conflictDetails.sourceB.value}</div>
                  <div className="text-[10px] text-stone-500 mt-0.5">Origin: {attribute.conflictDetails.sourceB.name}</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-100/80 border border-amber-300 text-[11px] text-amber-900">
                <strong>Resolution: CONFLICT — AIXSHOP does not guess.</strong>
                <p className="mt-0.5 text-amber-800 text-[10px]">
                  AIXSHOP will not pick a "most likely" candidate. Both records remain isolated until merchant signs off.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 shadow-3xs">
              <span className="text-[10px] font-mono uppercase font-bold text-stone-500 block mb-1">
                EVIDENCE EXCERPT
              </span>
              <p className="text-xs text-stone-700 italic leading-relaxed">
                "{attribute.note || 'Directly recorded from authoritative technical documentation without inference.'}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Epistemic Footer */}
      <div className="pt-2.5 border-t border-stone-200 text-[10px] font-mono text-stone-500 flex items-center justify-between">
        <span>Provenance Integrity: Validated</span>
        <span className="text-[#F97316] font-bold">Preview Mode</span>
      </div>
    </div>
  );
};
