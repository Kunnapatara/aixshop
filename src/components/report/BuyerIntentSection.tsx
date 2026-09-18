import React, { useState } from 'react';
import { 
  Compass, 
  CheckCircle2, 
  AlertCircle, 
  Search
} from 'lucide-react';
import { BuyerIntentItem, IntentArchetype } from '../../types/landing';

interface BuyerIntentSectionProps {
  intents: BuyerIntentItem[];
}

export const BuyerIntentSection: React.FC<BuyerIntentSectionProps> = ({ intents }) => {
  const [selectedArchetype, setSelectedArchetype] = useState<IntentArchetype>('Trust');

  const selectedItem = intents.find(i => i.archetype === selectedArchetype) || intents[0];

  const archetypesList: {
    type: IntentArchetype;
    label: string;
    description: string;
  }[] = [
    { type: 'Discovery', label: '1. Discovery', description: 'Category and high-level product search' },
    { type: 'Problem', label: '2. Problem', description: 'Runners solving fatigue and joint impact' },
    { type: 'Comparison', label: '3. Comparison', description: 'Benchmarking against rival super-shoes' },
    { type: 'Specification', label: '4. Specification', description: 'Precise weight, stack, and drop queries' },
    { type: 'Purchase', label: '5. Purchase', description: 'Sellers, prices, stock, and fulfillment' },
    { type: 'Use Case', label: '6. Use Case', description: 'Marathon distance and race-day suitability' },
    { type: 'Trust', label: '7. Trust', description: 'Verifying return terms and warranty' }
  ];

  return (
    <section id="buyer-intent" className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#F97316]" />
            <h3 className="text-xl font-bold text-stone-900 tracking-tight">
              Buyer Intent Coverage Matrix
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Diagnostic alignment across the 7 immutable buyer intent archetypes for conversational AI and search.
          </p>
        </div>
        <span className="text-xs font-mono text-stone-600 bg-white border border-stone-200 px-3 py-1 rounded-xl shadow-3xs">
          7 / 7 Archetypes Diagnosed · Preview Mode
        </span>
      </div>

      {/* Grid: 7 Archetype Tabs/List (Left 5 cols) & Active Diagnostic Inspector (Right 7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left column: Archetype Selector list (5 cols) */}
        <div className="lg:col-span-5 space-y-2">
          {archetypesList.map((arc) => {
            const item = intents.find(i => i.archetype === arc.type);
            const isSelected = selectedArchetype === arc.type;
            const isSupported = item?.isSupported ?? false;

            return (
              <div
                key={arc.type}
                onClick={() => setSelectedArchetype(arc.type)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between shadow-3xs ${
                  isSelected
                    ? 'bg-orange-50/70 border-[#F97316] text-stone-900'
                    : 'bg-white hover:bg-stone-50/80 border-stone-200 text-stone-700'
                }`}
              >
                <div>
                  <div className="font-bold text-xs text-stone-900">
                    {arc.label}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    {arc.description}
                  </div>
                </div>

                <div className="pl-3">
                  {isSupported ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Supported
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                      <AlertCircle className="w-3 h-3 text-rose-600" />
                      Gaps Detected
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right column: Intent Archetype Deep Inspection (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-white border border-stone-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 font-bold">
                  Active Archetype Diagnostic
                </span>
                <h4 className="text-lg font-bold text-stone-900 mt-0.5">
                  {selectedItem.archetype} Intent
                </h4>
              </div>
              <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
                selectedItem.isSupported
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}>
                {selectedItem.isSupported ? 'Factually Supported' : 'Critical Data Gap'}
              </span>
            </div>

            {/* Simulated Natural Language Buyer Query */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 shadow-3xs">
              <span className="text-[10px] uppercase font-mono font-bold text-stone-500 block mb-1.5 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-[#F97316]" />
                Example Conversational Buyer Question
              </span>
              <p className="text-sm font-mono text-[#F97316] font-bold italic">
                "{selectedItem.query}"
              </p>
            </div>

            {/* Matched Verified Facts */}
            <div className="space-y-1.5 text-xs">
              <span className="text-[10px] uppercase font-mono font-bold text-stone-500 block">
                Associated Canonical Fact
              </span>
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 font-mono text-stone-800 shadow-3xs">
                {selectedItem.matchedFact ? (
                  <span className="text-emerald-800 font-bold">{selectedItem.matchedFact}</span>
                ) : (
                  <span className="text-rose-600 font-semibold italic">No verified ground-truth fact available</span>
                )}
              </div>
            </div>

            {/* Machine Diagnostic Note */}
            <div className={`p-4 rounded-xl border text-xs leading-relaxed shadow-3xs ${
              selectedItem.isSupported
                ? 'bg-stone-50 border-stone-200 text-stone-700'
                : 'bg-rose-50/80 border-rose-200 text-rose-900'
            }`}>
              <span className="text-[10px] uppercase font-mono text-stone-500 block mb-1 font-bold">
                AI Discovery Diagnostic Note:
              </span>
              <p>{selectedItem.diagnosticNote}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-200 text-[11px] text-stone-500 font-mono">
            Notice: Buyer intent queries are diagnostic models based on commerce interaction taxonomy, not simulated live queries to external models.
          </div>
        </div>
      </div>
    </section>
  );
};
