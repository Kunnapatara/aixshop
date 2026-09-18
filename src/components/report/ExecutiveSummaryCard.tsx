import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  Store, 
  Radio, 
  ShieldCheck
} from 'lucide-react';

export const ExecutiveSummaryCard: React.FC = () => {
  return (
    <div className="rounded-3xl bg-white border border-stone-200 p-6 sm:p-8 shadow-xs relative overflow-hidden">
      <div className="flex items-center justify-between pb-4 border-b border-stone-200">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#F97316] font-bold block mb-1">
            Executive Synthesis
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
            What AIXSHOP Knows
          </h3>
        </div>
        <span className="text-xs font-mono font-bold text-stone-600 bg-stone-50 border border-stone-200 px-3 py-1 rounded-xl">
          Factual Intelligence State
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 text-xs">
        {/* Identity */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 shadow-3xs">
          <div className="flex items-center gap-2 text-emerald-800 font-bold uppercase font-mono text-[11px]">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Identity</span>
          </div>
          <p className="font-bold text-stone-900 text-sm">Resolved</p>
          <p className="text-stone-600 leading-relaxed">
            Global GTIN, MPN, brand, and category definitively mapped into canonical schema.
          </p>
        </div>

        {/* Product Facts */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 shadow-3xs">
          <div className="flex items-center gap-2 text-[#F97316] font-bold uppercase font-mono text-[11px]">
            <Layers className="w-4 h-4 text-[#F97316]" />
            <span>Product Facts</span>
          </div>
          <p className="font-bold text-stone-900 text-sm">Mostly Identified (7/10)</p>
          <p className="text-stone-600 leading-relaxed">
            Propulsion plate, stack, drop, and PEBA foam mapped; arch support missing.
          </p>
        </div>

        {/* Evidence */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-2 shadow-3xs">
          <div className="flex items-center gap-2 text-amber-900 font-bold uppercase font-mono text-[11px]">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Evidence</span>
          </div>
          <p className="font-bold text-amber-950 text-sm">Gaps & Conflicts Remain</p>
          <p className="text-amber-900 leading-relaxed">
            Upper material has conflicting claims. Return policy evidence missing across feeds.
          </p>
        </div>

        {/* Offers */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 shadow-3xs">
          <div className="flex items-center gap-2 text-blue-800 font-bold uppercase font-mono text-[11px]">
            <Store className="w-4 h-4 text-blue-600" />
            <span>Offers</span>
          </div>
          <p className="font-bold text-stone-900 text-sm">3 Representative Offers</p>
          <p className="text-stone-600 leading-relaxed">
            Decoupled commercial seller records observed ranging from $199.00 to $240.00.
          </p>
        </div>

        {/* Discovery */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 shadow-3xs">
          <div className="flex items-center gap-2 text-orange-800 font-bold uppercase font-mono text-[11px]">
            <Radio className="w-4 h-4 text-[#F97316]" />
            <span>Discovery</span>
          </div>
          <p className="font-bold text-stone-900 text-sm">Diagnostic Readiness Available</p>
          <p className="text-stone-600 leading-relaxed">
            Machine readability verified for 4 search and AI engines (79% diagnostic signal).
          </p>
        </div>

        {/* Priority */}
        <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-300 space-y-2 shadow-3xs">
          <div className="flex items-center gap-2 text-orange-950 font-bold uppercase font-mono text-[11px]">
            <ShieldCheck className="w-4 h-4 text-[#F97316]" />
            <span>Recommended Priority</span>
          </div>
          <p className="font-bold text-orange-950 text-sm">Resolve Missing Return Evidence</p>
          <p className="text-stone-700 leading-relaxed">
            Adding verified return terms and reconciling variant GTIN ensures search engines grant trust badges.
          </p>
        </div>
      </div>
    </div>
  );
};
