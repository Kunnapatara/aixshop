import React from 'react';
import { 
  X, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  FileText, 
  Sparkles,
  Info,
  Scale
} from 'lucide-react';
import { ShopperProductFact } from '../../types/shopper';

interface EvidenceDetailDrawerProps {
  fact: ShopperProductFact | null;
  onClose: () => void;
}

export const EvidenceDetailDrawer: React.FC<EvidenceDetailDrawerProps> = ({ fact, onClose }) => {
  if (!fact) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in-50 duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg bg-[#0A0E18] border-l border-slate-800 h-full flex flex-col shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#0C1220]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">
                Evidence Provenance Inspection
              </h3>
              <p className="text-[11px] font-mono text-cyan-400">
                {fact.name} · {fact.category}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 flex-1 text-xs">
          {/* Fact Value Card */}
          <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-4">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Attribute Value</span>
            <div className="text-base font-bold text-white mt-1">
              {fact.value}
            </div>
            {fact.note && (
              <p className="text-xs text-slate-300 mt-2 leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                {fact.note}
              </p>
            )}
          </div>

          {/* Conflict Details if present */}
          {fact.state === 'CONFLICT' && fact.conflictDetails && (
            <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4 space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>Sources Disagree (Active Conflict)</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {fact.conflictDetails.explanation}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-3">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Source A</div>
                  <div className="font-semibold text-slate-200 mt-0.5">{fact.conflictDetails.sourceA.name}</div>
                  <div className="text-cyan-300 font-medium mt-1">{fact.conflictDetails.sourceA.value}</div>
                  <div className="text-[10px] font-mono text-slate-400 mt-1">{fact.conflictDetails.sourceA.timestamp}</div>
                </div>
                <div className="rounded-lg bg-slate-900/90 border border-slate-800 p-3">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Source B</div>
                  <div className="font-semibold text-slate-200 mt-0.5">{fact.conflictDetails.sourceB.name}</div>
                  <div className="text-cyan-300 font-medium mt-1">{fact.conflictDetails.sourceB.value}</div>
                  <div className="text-[10px] font-mono text-slate-400 mt-1">{fact.conflictDetails.sourceB.timestamp}</div>
                </div>
              </div>
              <div className="text-[11px] text-amber-200 font-mono">
                AIXSHOP does not silently select one source or average values.
              </div>
            </div>
          )}

          {/* Diagnostic Evidence Metadata */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
              Diagnostic Evidence Schema
            </h4>

            <div className="rounded-xl bg-slate-900/60 border border-slate-800 divide-y divide-slate-800/80">
              <div className="p-3 flex justify-between items-center">
                <span className="text-slate-400">Shopper Label:</span>
                <span className="font-semibold text-slate-200">{fact.shopperLabel}</span>
              </div>

              <div className="p-3 flex justify-between items-center">
                <span className="text-slate-400">Internal Evidence State:</span>
                <span className="font-mono text-cyan-300 font-bold">{fact.state}</span>
              </div>

              <div className="p-3 flex justify-between items-center">
                <span className="text-slate-400">Diagnostic Confidence:</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full ${fact.confidence > 80 ? 'bg-emerald-400' : fact.confidence > 50 ? 'bg-cyan-400' : 'bg-amber-400'}`} 
                      style={{ width: `${fact.confidence}%` }}
                    ></div>
                  </div>
                  <span className="font-mono text-slate-200">{fact.confidence}%</span>
                </div>
              </div>

              <div className="p-3 flex justify-between items-start gap-4">
                <span className="text-slate-400">Primary Source:</span>
                <span className="text-slate-200 text-right font-sans">{fact.source}</span>
              </div>

              <div className="p-3 flex justify-between items-center">
                <span className="text-slate-400">Detected At:</span>
                <span className="font-mono text-cyan-400">{fact.detectedAt}</span>
              </div>

              {fact.validUntil && (
                <div className="p-3 flex justify-between items-center">
                  <span className="text-slate-400">Validity Horizon:</span>
                  <span className="font-mono text-slate-400">{fact.validUntil}</span>
                </div>
              )}
            </div>
          </div>

          {/* Architectural Grounding Principle */}
          <div className="rounded-xl bg-slate-900/40 border border-slate-800 p-3.5 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="text-slate-300 leading-relaxed text-xs">
              <span className="font-semibold text-white">Evidence is First-Class Data. </span>
              In AI commerce, an ungrounded claim is invisible or untrusted. AIXSHOP surfaces the empirical source behind every specification.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0C1220] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer transition-colors"
          >
            Close Provenance Drawer
          </button>
        </div>
      </div>
    </div>
  );
};
