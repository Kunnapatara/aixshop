import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Eye, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink,
  Calendar,
  Layers,
  Sparkles,
  Info,
  Scale
} from 'lucide-react';
import { sampleInspectedAttributes } from '../../data/sampleIntelligence';
import { InspectedEvidenceAttribute } from '../../types/landing';

export const EvidenceInspectionSection: React.FC = () => {
  const [selectedAttributeId, setSelectedAttributeId] = useState<string>('attr-upper-material');

  const selectedAttr = sampleInspectedAttributes.find(a => a.id === selectedAttributeId) || sampleInspectedAttributes[0];

  const getStateBadge = (state: InspectedEvidenceAttribute['state']) => {
    switch (state) {
      case 'OBSERVED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
            <Eye className="w-3 h-3" /> OBSERVED
          </span>
        );
      case 'MERCHANT_VERIFIED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="w-3 h-3" /> MERCHANT VERIFIED
          </span>
        );
      case 'MISSING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30">
            <HelpCircle className="w-3 h-3" /> MISSING
          </span>
        );
      case 'CONFLICT':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <AlertTriangle className="w-3 h-3" /> CONFLICT
          </span>
        );
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-7 mb-12 backdrop-blur-sm">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Evidence First Philosophy</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Section 10</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Evidence Inspection
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Every specification is traced to primary observation, merchant signature, or explicit conflict detection.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-950 border border-slate-800 text-slate-400 self-start sm:self-auto">
          <span>Click any attribute to inspect source evidence</span>
        </div>
      </div>

      {/* CORE INSPECTION INTERACTION GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT: ATTRIBUTE LIST (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs font-medium text-slate-400 uppercase tracking-wider px-1 mb-1">
            Sample Product Attributes
          </div>

          {sampleInspectedAttributes.map((attr) => {
            const isSelected = attr.id === selectedAttributeId;

            return (
              <button
                key={attr.id}
                onClick={() => setSelectedAttributeId(attr.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-cyan-950/40 border-cyan-500/60 shadow-[0_0_12px_rgba(6,182,212,0.15)]'
                    : 'bg-slate-950/70 border-slate-800/90 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">
                      {attr.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {attr.category}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 font-medium mt-0.5 line-clamp-1">
                    {attr.value}
                  </div>
                </div>

                <div className="shrink-0">
                  {getStateBadge(attr.state)}
                </div>
              </button>
            );
          })}

          {/* Critical Philosophy Banner */}
          <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-xs text-amber-200/90 mt-4 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300 block mb-0.5">
                AIXSHOP Core Law: No Hallucinated Consensus
              </span>
              <span className="text-[11px] text-amber-200/80 leading-relaxed">
                When manufacturer feeds and retailer descriptions disagree, AIXSHOP flags a CONFLICT state. The engine never calculates arbitrary averages or guesses without merchant signoff.
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: INSPECTION DETAIL PANE (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950/90 border border-slate-800 rounded-xl p-5 sm:p-6 space-y-5">
          <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                Attribute Deep Inspection
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {selectedAttr.name}
              </h3>
              <p className="text-xs text-slate-400">
                Category: {selectedAttr.category}
              </p>
            </div>

            <div>
              {getStateBadge(selectedAttr.state)}
            </div>
          </div>

          {/* Current Stated Value */}
          <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Established Value
            </div>
            <div className="text-base font-bold text-white font-mono">
              {selectedAttr.value}
            </div>
          </div>

          {/* Conflict Inspection Specific UI */}
          {selectedAttr.state === 'CONFLICT' && selectedAttr.conflictDetails && (
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/40 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                <span>Detected Divergent Evidence Across Channels</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-900/90 border border-amber-500/20">
                  <div className="text-[10px] font-mono text-cyan-400 font-semibold mb-1">
                    {selectedAttr.conflictDetails.sourceA.name}
                  </div>
                  <div className="font-medium text-slate-200">
                    "{selectedAttr.conflictDetails.sourceA.value}"
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/90 border border-amber-500/20">
                  <div className="text-[10px] font-mono text-amber-400 font-semibold mb-1">
                    {selectedAttr.conflictDetails.sourceB.name}
                  </div>
                  <div className="font-medium text-slate-200">
                    "{selectedAttr.conflictDetails.sourceB.value}"
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-amber-300/80 font-medium pt-1">
                AIXSHOP does not guess when evidence conflicts. The canonical product graph requires explicit merchant resolution.
              </div>
            </div>
          )}

          {/* Missing Inspection Specific UI */}
          {selectedAttr.state === 'MISSING' && (
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-rose-400">
                <HelpCircle className="w-4 h-4" />
                <span>Schema Coverage Gap</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Discovery engines (Google Shopping, ChatGPT Search, Perplexity) rely on this attribute to answer high-intent buyer queries. Without verified evidence, your product will be omitted from filtered comparisons.
              </p>
            </div>
          )}

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <div className="text-[10px] font-medium text-slate-500 uppercase mb-1">Primary Source</div>
              <div className="text-slate-300 font-mono text-[11px] truncate" title={selectedAttr.source}>
                {selectedAttr.source}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <div className="text-[10px] font-medium text-slate-500 uppercase mb-1">Detection Date</div>
              <div className="text-slate-300 font-mono text-[11px]">
                {selectedAttr.detectedAt}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
              <div className="text-[10px] font-medium text-slate-500 uppercase mb-1">Confidence Rating</div>
              <div className={`font-mono text-[11px] font-bold ${
                selectedAttr.confidence === 'High' 
                  ? 'text-emerald-400' 
                  : selectedAttr.confidence === 'Medium'
                    ? 'text-amber-400'
                    : 'text-rose-400'
              }`}>
                {selectedAttr.confidence}
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-400 pt-1">
            <span className="text-slate-500 font-semibold">Provenance Note: </span>
            {selectedAttr.note}
          </div>
        </div>

      </div>
    </div>
  );
};
