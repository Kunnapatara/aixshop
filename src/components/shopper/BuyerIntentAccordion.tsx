import React, { useState } from 'react';
import { 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  Tag,
  AlertCircle
} from 'lucide-react';
import { BuyerIntentShopperItem } from '../../types/shopper';

interface BuyerIntentAccordionProps {
  intents: BuyerIntentShopperItem[];
}

export const BuyerIntentAccordion: React.FC<BuyerIntentAccordionProps> = ({ intents }) => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'intent-discovery': true,
    'intent-specification': true,
    'intent-purchase': true
  });

  const toggleOpen = (id: string) => {
    setOpenIds(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="rounded-2xl bg-[#090E18] border border-slate-800/90 shadow-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-5 border-b border-slate-800 bg-[#0B1220]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Questions This Product Intelligence Can Answer ({intents.length})
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Shopper query intent archetypes mapped directly to corroborated product facts.
          </p>
        </div>

        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded self-start sm:self-auto">
          7 Buyer Intent Archetypes
        </span>
      </div>

      {/* Accordion List */}
      <div className="divide-y divide-slate-800/70">
        {intents.map((item) => {
          const isOpen = !!openIds[item.id];
          return (
            <div key={item.id} className="transition-colors hover:bg-slate-900/30">
              <button
                type="button"
                onClick={() => toggleOpen(item.id)}
                className="w-full p-4 sm:px-6 sm:py-4 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 font-semibold shrink-0">
                    {item.archetype}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-cyan-300 transition-colors">
                    {item.question}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-slate-400 shrink-0">
                  <span className="text-[11px] font-mono text-emerald-400 hidden sm:inline">
                    Grounded Answer
                  </span>
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 sm:px-6 sm:pb-5 pt-1 text-xs text-slate-300 space-y-2.5 animate-in fade-in-50 duration-150">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 leading-relaxed font-sans">
                    <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">Answer Summary</div>
                    {item.answerSummary}
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1 text-[11px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span><strong>Evidence Basis: </strong>{item.evidenceBasis}</span>
                    </div>
                    {item.limitations && (
                      <span className="font-mono text-amber-400 text-[10px]">
                        Limitation: {item.limitations}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
