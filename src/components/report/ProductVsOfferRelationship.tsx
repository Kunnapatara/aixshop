import React from 'react';
import { 
  Layers, 
  Store
} from 'lucide-react';

export const ProductVsOfferRelationship: React.FC = () => {
  return (
    <div className="rounded-3xl bg-white border border-stone-200 p-6 sm:p-8 relative overflow-hidden shadow-xs">
      {/* Central Law Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-mono text-orange-800 font-bold mb-3 shadow-3xs">
          <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
          FOUNDATIONAL LAW OF AIXSHOP
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
          PRODUCT ≠ OFFER
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
          The physical product and its technical specifications exist independently of any individual seller's price, stock, or return policy.
        </p>
      </div>

      {/* Relational Diagram Tree */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Side: The Canonical Product (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-stone-50 border border-stone-200 p-5 flex flex-col justify-between shadow-3xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-[#F97316]">
                  <Layers className="w-4 h-4" />
                </div>
                <span className="font-bold text-stone-900 text-sm">CANONICAL PRODUCT</span>
              </div>
              <span className="text-[10px] font-mono text-[#F97316] font-bold uppercase bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                Stable / Intrinsic
              </span>
            </div>

            <p className="text-xs text-stone-600 mt-3 leading-relaxed">
              Intrinsic attributes manufactured into the physical item. They never fluctuate based on who is selling it.
            </p>

            <div className="mt-4 space-y-2 text-xs font-mono text-stone-800">
              <div className="flex items-center gap-2 py-1.5 px-2.5 rounded-xl bg-white border border-stone-200/80 shadow-3xs">
                <span className="text-[#F97316] font-bold">•</span>
                <span>Brand Identity: AeroPulse Athletics</span>
              </div>
              <div className="flex items-center gap-2 py-1.5 px-2.5 rounded-xl bg-white border border-stone-200/80 shadow-3xs">
                <span className="text-[#F97316] font-bold">•</span>
                <span>Model & Name: VaporStride Carbon Elite</span>
              </div>
              <div className="flex items-center gap-2 py-1.5 px-2.5 rounded-xl bg-white border border-stone-200/80 shadow-3xs">
                <span className="text-[#F97316] font-bold">•</span>
                <span>Global Barcode: GTIN 00849201948172</span>
              </div>
              <div className="flex items-center gap-2 py-1.5 px-2.5 rounded-xl bg-white border border-stone-200/80 shadow-3xs">
                <span className="text-[#F97316] font-bold">•</span>
                <span>Physical Materials: Full-length Carbon Plate</span>
              </div>
              <div className="flex items-center gap-2 py-1.5 px-2.5 rounded-xl bg-white border border-stone-200/80 shadow-3xs">
                <span className="text-[#F97316] font-bold">•</span>
                <span>Dimensions & Stack: 39mm / 31mm / 320g</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-200 text-[11px] font-mono font-bold text-stone-500">
            Ownership: Brand / GS1 Registry
          </div>
        </div>

        {/* Middle Connector: Architectural Tree Spine (2 cols) */}
        <div className="lg:col-span-2 hidden lg:flex flex-col items-center justify-center relative py-4">
          <div className="w-0.5 h-full bg-stone-200 absolute"></div>
          
          <div className="relative z-10 px-3.5 py-2 rounded-xl bg-white border border-stone-200 text-[10px] font-mono font-bold text-stone-700 uppercase tracking-wider text-center shadow-xs">
            Decoupled<br />Relationship
          </div>
        </div>

        {/* Right Side: Multiple Observed Seller Offers (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-stone-50 border border-stone-200 p-5 flex flex-col justify-between shadow-3xs">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600">
                  <Store className="w-4 h-4" />
                </div>
                <span className="font-bold text-stone-900 text-sm">OBSERVED OFFERS</span>
              </div>
              <span className="text-[10px] font-mono text-blue-700 font-bold uppercase bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                Dynamic / Commercial
              </span>
            </div>

            <p className="text-xs text-stone-600 mt-3 leading-relaxed">
              Seller-specific terms that change minute-by-minute across distributors, retail shops, and marketplaces.
            </p>

            <div className="mt-4 space-y-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-white border border-stone-200 flex items-center justify-between shadow-3xs">
                <div>
                  <span className="text-stone-900 font-bold block">Seller A (Official Direct)</span>
                  <span className="text-[11px] text-stone-500">Free 2-day · 30-day trial</span>
                </div>
                <div className="text-right">
                  <span className="text-[#F97316] font-bold text-sm">$199.00</span>
                  <span className="text-[10px] text-emerald-700 font-bold block">In Stock</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-stone-200 flex items-center justify-between shadow-3xs">
                <div>
                  <span className="text-stone-900 font-bold block">Seller B (Authorized Specialty)</span>
                  <span className="text-[11px] text-stone-500">$8.50 ground · 14-day return</span>
                </div>
                <div className="text-right">
                  <span className="text-stone-900 font-bold text-sm">$219.00</span>
                  <span className="text-[10px] text-amber-800 font-bold block">Low Stock</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-stone-200 flex items-center justify-between shadow-3xs">
                <div>
                  <span className="text-stone-900 font-bold block">Seller C (Marketplace Merchant)</span>
                  <span className="text-[11px] text-stone-500">Standard shipping · Unknown return</span>
                </div>
                <div className="text-right">
                  <span className="text-stone-700 font-bold text-sm">$240.00</span>
                  <span className="text-[10px] text-stone-400 font-medium block">Restocking</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-200 text-[11px] font-mono font-bold text-stone-500">
            Ownership: Individual Merchants
          </div>
        </div>
      </div>
    </div>
  );
};
