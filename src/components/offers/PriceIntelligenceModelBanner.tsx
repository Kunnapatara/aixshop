import React, { useState } from 'react';
import { 
  Clock, 
  ArrowRight, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  HelpCircle,
  Eye,
  GitCompare,
  AlertOctagon,
  FileQuestion,
  Calculator
} from 'lucide-react';

export const PriceIntelligenceModelBanner: React.FC = () => {
  const [showEvidenceLegend, setShowEvidenceLegend] = useState(false);

  return (
    <div className="w-full bg-[#FAF8F5] border-b border-stone-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Top Dual Educational Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Card 1: Price Intelligence Is Time-Dependent (Section 8) */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F97316]">
                  <Clock className="w-4 h-4" />
                </div>
                <h2 className="text-sm sm:text-base font-bold text-stone-900 tracking-tight">
                  Price Intelligence Is Time-Dependent
                </h2>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200 font-semibold">
                Foundational Concept
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-3.5">
              A price is not a permanent property of a product. It belongs to an <strong className="text-stone-900 font-semibold">Offer</strong> and is valid only within the evidence and observation context available to AIXSHOP.
            </p>

            {/* Time Dependency Visual Flow */}
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex flex-wrap items-center justify-between gap-1.5 text-[11px] font-mono text-stone-600">
              <div className="flex items-center gap-1 text-stone-800">
                <span className="px-2 py-0.5 rounded-full bg-white border border-stone-200 text-[#F97316] font-bold shadow-2xs">PRODUCT</span>
                <ArrowRight className="w-3 h-3 text-stone-400" />
              </div>
              <div className="flex items-center gap-1 text-stone-800">
                <span className="px-2 py-0.5 rounded-full bg-white border border-stone-200 text-blue-600 font-bold shadow-2xs">OFFER</span>
                <ArrowRight className="w-3 h-3 text-stone-400" />
              </div>
              <div className="flex items-center gap-1 text-stone-800">
                <span className="px-2 py-0.5 rounded-full bg-white border border-stone-200 text-emerald-600 font-bold shadow-2xs">PRICE</span>
                <ArrowRight className="w-3 h-3 text-stone-400" />
              </div>
              <div className="flex items-center gap-1 text-stone-800">
                <span className="px-2 py-0.5 rounded-full bg-white border border-stone-200 text-amber-600 font-bold shadow-2xs">SOURCE</span>
                <ArrowRight className="w-3 h-3 text-stone-400" />
              </div>
              <div className="flex items-center gap-1 text-stone-800">
                <span className="px-2 py-0.5 rounded-full bg-white border border-stone-200 text-purple-600 font-bold shadow-2xs">DETECTED AT</span>
                <ArrowRight className="w-3 h-3 text-stone-400" />
              </div>
              <div>
                <span className="px-2 py-0.5 rounded-full bg-white border border-stone-200 text-stone-700 font-bold shadow-2xs">CONDITIONS</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-stone-500 font-mono">
              <span>Example: <strong className="text-emerald-600 font-bold">$199.00 USD</strong> · AeroPulse Direct</span>
              <span className="text-stone-400">Observed 14 Sep 2026 · 08:42 UTC</span>
            </div>
          </div>

          {/* Card 2: Product != Offer Separation (Section 20 & 3) */}
          <div className="p-6 rounded-3xl bg-white border border-stone-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <Layers className="w-4 h-4" />
                </div>
                <h2 className="text-sm sm:text-base font-bold text-stone-900 tracking-tight">
                  Product ≠ Offer Separation
                </h2>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                Immutable Law
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-3.5">
              A <strong className="text-stone-900 font-semibold">Product</strong> represents the canonical item (GTIN, MPN, specs). An <strong className="text-stone-900 font-semibold">Offer</strong> represents a seller-specific commercial proposition at a point in time.
            </p>

            {/* Visual Separation Architecture */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 shadow-2xs">
                <div className="text-[10px] uppercase font-mono text-[#F97316] font-semibold mb-0.5">AeroPulse Direct</div>
                <div className="text-base font-bold text-stone-900 font-mono">$199.00</div>
                <div className="text-[11px] text-emerald-600 font-medium">In Stock · Direct</div>
              </div>

              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 shadow-2xs">
                <div className="text-[10px] uppercase font-mono text-blue-600 font-semibold mb-0.5">Authorized Runner</div>
                <div className="text-base font-bold text-stone-900 font-mono">$219.00</div>
                <div className="text-[11px] text-emerald-600 font-medium">In Stock · 10% Promo</div>
              </div>

              <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 shadow-2xs">
                <div className="text-[10px] uppercase font-mono text-amber-600 font-semibold mb-0.5">Marketplace Seller</div>
                <div className="text-base font-bold text-stone-900 font-mono">$240.00</div>
                <div className="text-[11px] text-amber-600 font-medium">Limited (2 left)</div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-stone-500 font-mono">
              <span className="text-[#F97316] font-semibold">1 Canonical Product</span>
              <span className="text-stone-600">3 Observed Offers ($199 — $240 range)</span>
            </div>
          </div>
        </div>

        {/* Expandable Offer State Definitions (Section 12) */}
        <div className="rounded-3xl bg-white border border-stone-200/80 shadow-xs overflow-hidden">
          <button
            type="button"
            onClick={() => setShowEvidenceLegend(!showEvidenceLegend)}
            className="w-full px-6 py-3.5 flex items-center justify-between text-xs sm:text-sm text-stone-700 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <HelpCircle className="w-4 h-4 text-[#F97316]" />
              <span className="font-bold text-stone-900">Offer Evidence State Definitions & Epistemic Distinctions</span>
              <span className="text-xs text-stone-400 font-mono">
                (Click to {showEvidenceLegend ? 'collapse' : 'expand'} 5 states)
              </span>
            </div>
            {showEvidenceLegend ? (
              <ChevronUp className="w-4 h-4 text-stone-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-stone-400" />
            )}
          </button>

          {showEvidenceLegend && (
            <div className="px-6 pb-6 pt-2 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-orange-50/50 border border-orange-200">
                <div className="flex items-center gap-1.5 text-[#F97316] font-bold mb-1 font-mono">
                  <Eye className="w-3.5 h-3.5" />
                  <span>OBSERVED</span>
                </div>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  Directly observed from a public storefront, syndicated feed, or structured data payload.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50/50 border border-blue-200">
                <div className="flex items-center gap-1.5 text-blue-700 font-bold mb-1 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>MERCHANT VERIFIED</span>
                </div>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  Explicitly verified by the brand merchant via authoritative primary channel configuration.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-200">
                <div className="flex items-center gap-1.5 text-purple-700 font-bold mb-1 font-mono">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>DERIVED</span>
                </div>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  Computed or inferred from known evidence (e.g. price spread = $41 from min/max offers).
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200">
                <div className="flex items-center gap-1.5 text-amber-700 font-bold mb-1 font-mono">
                  <FileQuestion className="w-3.5 h-3.5" />
                  <span>MISSING</span>
                </div>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  Required commercial evidence (such as return window or shipping fees) is unavailable.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-200">
                <div className="flex items-center gap-1.5 text-rose-700 font-bold mb-1 font-mono">
                  <AlertOctagon className="w-3.5 h-3.5" />
                  <span>CONFLICT</span>
                </div>
                <p className="text-stone-600 text-[11px] leading-relaxed">
                  Two or more sources report incompatible commercial terms for the same seller or channel.
                </p>
              </div>

              {/* Crucial Epistemic Reminder */}
              <div className="sm:col-span-2 lg:col-span-5 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                <span>
                  <strong>Epistemic Principle:</strong> <span className="underline font-semibold">OBSERVED</span> does not mean <span className="underline font-semibold">MERCHANT VERIFIED</span>. And <span className="underline font-semibold">DERIVED</span> does not mean directly observed.
                </span>
                <span className="text-[10px] font-mono text-amber-800 font-semibold">AIXSHOP Truth Engine</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
