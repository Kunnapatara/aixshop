import React from 'react';
import { Layers, ArrowDown, DollarSign, Store, Shield, RefreshCw } from 'lucide-react';

export const ProductVsOfferExplainer: React.FC = () => {
  return (
    <div className="rounded-2xl bg-gradient-to-b from-[#0B101E] to-[#080C16] border border-cyan-500/20 p-5 shadow-lg flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
            Product ≠ Offer Principle
          </h3>
        </div>
        <span className="text-[10px] font-mono text-cyan-400/90 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
          Core AIXSHOP Separation
        </span>
      </div>

      {/* Visual Flow Diagram */}
      <div className="flex flex-col items-center gap-2 pt-1">
        {/* The One Product */}
        <div className="w-full rounded-xl bg-slate-900/90 border border-slate-700/80 p-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold text-xs">
              1
            </div>
            <div>
              <div className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">
                ONE CANONICAL PRODUCT
              </div>
              <div className="text-xs font-bold text-white">
                AeroPulse Athletics — VaporStride Carbon Elite
              </div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
            Physical Item
          </span>
        </div>

        {/* Down Arrow */}
        <div className="flex items-center gap-2 text-slate-500 py-0.5">
          <ArrowDown className="w-4 h-4 text-cyan-400 animate-bounce" />
          <span className="text-[10px] font-mono text-slate-400">Multiple commercial sellers observed</span>
          <ArrowDown className="w-4 h-4 text-cyan-400 animate-bounce" />
        </div>

        {/* Multiple Observed Offers */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-2.5 flex flex-col justify-between">
            <div className="text-[10px] text-slate-400 font-mono">SELLER A</div>
            <div className="text-xs font-semibold text-slate-200 mt-0.5">AeroPulse Direct</div>
            <div className="text-sm font-mono font-bold text-cyan-300 mt-1">$199.00</div>
          </div>

          <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-2.5 flex flex-col justify-between">
            <div className="text-[10px] text-slate-400 font-mono">SELLER B</div>
            <div className="text-xs font-semibold text-slate-200 mt-0.5">Authorized Retailer</div>
            <div className="text-sm font-mono font-bold text-cyan-300 mt-1">$219.00</div>
          </div>

          <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-2.5 flex flex-col justify-between">
            <div className="text-[10px] text-slate-400 font-mono">SELLER C</div>
            <div className="text-xs font-semibold text-slate-200 mt-0.5">Marketplace Seller</div>
            <div className="text-sm font-mono font-bold text-cyan-300 mt-1">$240.00</div>
          </div>
        </div>
      </div>

      {/* Explanatory microcopy */}
      <div className="rounded-xl bg-slate-900/40 border border-slate-800/80 p-3 text-xs text-slate-400 leading-relaxed">
        <p>
          <strong className="text-slate-200">These are different commercial offers for the same canonical product.</strong> Individual sellers govern their own shipping costs, return windows, availability, and warranty terms. Product specifications belong to the physical item; offers belong to the seller.
        </p>
      </div>
    </div>
  );
};
