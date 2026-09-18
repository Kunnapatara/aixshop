import React from 'react';
import { 
  ShieldCheck, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  ChevronRight,
  Sparkles,
  Search
} from 'lucide-react';
import { ShopperProductFact } from '../../types/shopper';

interface KeyFactsSpecificationsProps {
  facts: ShopperProductFact[];
  onInspectFact: (fact: ShopperProductFact) => void;
}

export const KeyFactsSpecifications: React.FC<KeyFactsSpecificationsProps> = ({
  facts,
  onInspectFact
}) => {
  const getBadgeStyle = (state: ShopperProductFact['state']) => {
    switch (state) {
      case 'MERCHANT_VERIFIED':
        return 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300';
      case 'OBSERVED':
        return 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300';
      case 'DERIVED':
        return 'bg-blue-500/15 border-blue-500/40 text-blue-300';
      case 'CONFLICT':
        return 'bg-amber-500/15 border-amber-500/40 text-amber-300';
      case 'MISSING':
      default:
        return 'bg-slate-800 border-slate-700 text-slate-400';
    }
  };

  return (
    <div className="rounded-2xl bg-[#090E19] border border-slate-800/90 shadow-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-slate-800 bg-[#0B1222]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Key Product Facts & Evidence ({facts.length})
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Every specification is grounded in explicit source evidence or flagged when uncertain.
          </p>
        </div>

        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-md self-start sm:self-auto">
          Click any attribute to inspect provenance
        </span>
      </div>

      {/* Facts List */}
      <div className="divide-y divide-slate-800/70">
        {facts.map((fact) => (
          <div
            key={fact.id}
            onClick={() => onInspectFact(fact)}
            className="p-4 sm:px-6 sm:py-4.5 hover:bg-slate-800/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group"
          >
            {/* Left: Name & Category */}
            <div className="sm:w-1/3">
              <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                <span>{fact.name}</span>
                {fact.state === 'CONFLICT' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                )}
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                {fact.category}
              </div>
            </div>

            {/* Middle: Fact Value */}
            <div className="sm:w-1/3">
              <div className="text-xs text-slate-100 font-medium font-sans">
                {fact.value}
              </div>
              <div className="text-[10px] text-slate-400 truncate mt-0.5" title={fact.source}>
                Source: {fact.source}
              </div>
            </div>

            {/* Right: State Badge & Inspect Action */}
            <div className="sm:w-1/3 flex items-center justify-between sm:justify-end gap-3">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-mono font-medium ${getBadgeStyle(fact.state)}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                <span>{fact.shopperLabel}</span>
              </span>

              <div className="flex items-center gap-1 text-[11px] font-mono text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Inspect</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="p-4 bg-slate-950/80 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Evidence is prioritized over speculative AI explanations.</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 hidden sm:inline">
          Confidence ranges from 0% (missing) to 100% (merchant verified)
        </span>
      </div>
    </div>
  );
};
