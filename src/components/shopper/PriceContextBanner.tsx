import React from 'react';
import { DollarSign, Clock, HelpCircle, AlertCircle, Info } from 'lucide-react';

interface PriceContextBannerProps {
  minPrice: number;
  maxPrice: number;
  currency: string;
  totalOffers: number;
}

export const PriceContextBanner: React.FC<PriceContextBannerProps> = ({
  minPrice,
  maxPrice,
  currency,
  totalOffers
}) => {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-[#0C1222] via-[#090D18] to-[#0C1222] border border-cyan-500/30 p-5 shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Price Range Display */}
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Observed Offer Range</span>
          </div>
          <div className="mt-1 flex items-baseline gap-3">
            <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
              ${minPrice.toFixed(2)} — ${maxPrice.toFixed(2)}
            </div>
            <span className="text-xs font-mono text-slate-400">
              {currency} ({totalOffers} seller offers observed)
            </span>
          </div>
        </div>

        {/* Right: Explicit Transparency Microcopy */}
        <div className="md:max-w-md bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed">
            <span className="font-semibold text-slate-100">Observed, not guaranteed. </span>
            This range reflects representative observed offers associated with this product. It is not a guarantee of current market price or seller inventory.
          </div>
        </div>
      </div>
    </div>
  );
};
