import React from 'react';
import { AlertTriangle, Scale, ShieldAlert, ArrowRight } from 'lucide-react';
import { ShopperProductFact } from '../../types/shopper';

interface ConflictTransparencyCardProps {
  conflictFact: ShopperProductFact | undefined;
  onInspect: (fact: ShopperProductFact) => void;
}

export const ConflictTransparencyCard: React.FC<ConflictTransparencyCardProps> = ({
  conflictFact,
  onInspect
}) => {
  if (!conflictFact || !conflictFact.conflictDetails) return null;

  const { sourceA, sourceB, explanation } = conflictFact.conflictDetails;

  return (
    <div className="rounded-2xl bg-gradient-to-b from-[#181110] to-[#0D0908] border border-amber-500/40 p-5 shadow-xl flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-amber-500/20">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-amber-500/20 flex items-center justify-center text-amber-400">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
            Conflict Transparency: {conflictFact.name}
          </h3>
        </div>

        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-[11px] font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          Sources Disagree
        </span>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed">
        {explanation}
      </p>

      {/* Side-by-side comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3.5 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Source A · {sourceA.name}
            </div>
            <div className="text-sm font-bold text-white mt-1">
              {sourceA.value}
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-2">
            {sourceA.timestamp}
          </div>
        </div>

        <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-3.5 flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Source B · {sourceB.name}
            </div>
            <div className="text-sm font-bold text-white mt-1">
              {sourceB.value}
            </div>
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-2">
            {sourceB.timestamp}
          </div>
        </div>
      </div>

      <div className="p-3 bg-amber-950/20 border border-amber-500/20 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <span className="text-amber-200/90">
          <strong>AIXSHOP principle: </strong>
          Conflicts are never silently resolved, guessed, or averaged.
        </span>

        <button
          type="button"
          onClick={() => onInspect(conflictFact)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto"
        >
          <span>Inspect Provenance</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
