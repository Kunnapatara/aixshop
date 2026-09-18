import React, { useState } from 'react';
import { 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ChevronRight, 
  Sparkles,
  Info
} from 'lucide-react';
import { sampleCanonicalProduct } from '../../data/sampleIntelligence';
import { BuyerIntentItem, IntentArchetype } from '../../types/landing';

export const BuyerIntentMatrix: React.FC = () => {
  const intents = sampleCanonicalProduct.intents;
  const [selectedIntentId, setSelectedIntentId] = useState<string>(intents[0]?.id || 'intent-1');

  const selectedItem = intents.find(i => i.id === selectedIntentId) || intents[0];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-7 mb-12 backdrop-blur-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
            <Target className="w-3.5 h-3.5 text-cyan-400" />
            <span>Semantic Intent Matrix</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Section 12 (All 7 Archetypes)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Buyer Intent Diagnostic Preview
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            How modern AI agents evaluate your product across all 7 archetypes of buyer inquiry.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-950 border border-slate-800 text-slate-400 self-start sm:self-auto">
          <span>Preview Diagnostic · Click intent row to reveal query</span>
        </div>
      </div>

      {/* 2-column layout: Left table with all 7 archetypes, Right active query detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT: COMPACT DIAGNOSTIC MATRIX (All 7 Archetypes) */}
        <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            <span>Intent Archetype (7 Total)</span>
            <span>Diagnostic Coverage</span>
          </div>

          <div className="divide-y divide-slate-800/60">
            {intents.map((item, idx) => {
              const isSelected = item.id === selectedIntentId;

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedIntentId(item.id)}
                  className={`w-full text-left px-4 py-3 flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                    isSelected 
                      ? 'bg-cyan-950/40 border-l-2 border-l-cyan-400' 
                      : 'hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-slate-500 font-bold">
                      0{idx + 1}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-white">
                        {item.archetype}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                        "{item.query}"
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.isSupported ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" /> Answerable
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                        <AlertCircle className="w-3 h-3" /> Evidence Gap
                      </span>
                    )}
                    <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-600'}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT: INTENT DETAIL PANEL */}
        <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="border-b border-slate-800 pb-3">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
              Archetype Deep-Dive
            </div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>{selectedItem.archetype} Intent</span>
              {selectedItem.isSupported ? (
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Supported
                </span>
              ) : (
                <span className="text-xs font-semibold text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded-full border border-rose-500/30">
                  Missing Facts
                </span>
              )}
            </h3>
          </div>

          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Representative AI Search Query:
            </div>
            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs sm:text-sm font-medium text-cyan-200 font-mono">
              "{selectedItem.query}"
            </div>
          </div>

          {selectedItem.matchedFact && (
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Matched Verified Fact:
              </div>
              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300 font-medium">
                {selectedItem.matchedFact}
              </div>
            </div>
          )}

          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Diagnostic Finding:
            </div>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              {selectedItem.diagnosticNote}
            </p>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Demonstration query model · No simulated live search API call</span>
          </div>
        </div>

      </div>
    </div>
  );
};
