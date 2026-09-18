import React from 'react';
import { 
  Package, 
  ShoppingBag, 
  Layers, 
  Scale, 
  Clock, 
  Truck, 
  RotateCcw, 
  CheckCircle2, 
  AlertOctagon,
  Sparkles,
  Info
} from 'lucide-react';

export const ProductVsOfferSection: React.FC = () => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-7 mb-12 backdrop-blur-sm relative overflow-hidden">
      {/* Background glow behind divider */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
          <span>Foundational Architecture Law</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">Section 09</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Product Intelligence vs. Seller Offers
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          AIXSHOP strictly separates timeless intrinsic product specifications from transient, seller-specific marketplace terms.
        </p>
      </div>

      {/* Side-by-side comparison layout with center divider */}
      <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-stretch relative">
        
        {/* LEFT: PRODUCT (5 cols on lg) */}
        <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800/90 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Product
                  </h3>
                  <p className="text-[11px] text-slate-400">Intrinsic, canonical product reality</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/20">
                Single Truth
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Brand & Model</div>
                  <div className="text-slate-400 text-[11px]">AeroPulse Athletics · VaporStride Carbon Elite</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Technical Specifications</div>
                  <div className="text-slate-400 text-[11px]">Full-length carbon plate, 8mm drop, 39mm stack height</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Materials & Dimensions</div>
                  <div className="text-slate-400 text-[11px]">Supercritical Nitrogen PEBA foam, 204 g / 320 g weight</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Global Identifiers & Variants</div>
                  <div className="text-slate-400 text-[11px]">GTIN: 00849201948172, MPN: AP-VSE-BLK-10, Size US 10</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Remains true regardless of which merchant or marketplace sells it.</span>
          </div>
        </div>

        {/* CENTER DIVIDER (1 col on lg) */}
        <div className="lg:col-span-1 flex flex-col items-center justify-center my-2 lg:my-0">
          <div className="hidden lg:block w-px h-full bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent" />
          <div className="px-3 py-2 rounded-xl bg-slate-950 border-2 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.2)] text-center my-auto">
            <div className="text-xs font-black tracking-widest text-cyan-300 font-mono whitespace-nowrap">
              Product
            </div>
            <div className="text-base font-black text-rose-400 my-0.5 font-mono">
              ≠
            </div>
            <div className="text-xs font-black tracking-widest text-cyan-300 font-mono whitespace-nowrap">
              Offer
            </div>
          </div>
          <div className="hidden lg:block w-px h-full bg-gradient-to-b from-cyan-500/40 via-cyan-500/40 to-transparent" />
        </div>

        {/* RIGHT: OFFER (5 cols on lg) */}
        <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800/90 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Offers
                  </h3>
                  <p className="text-[11px] text-slate-400">Seller-specific, transient commerce terms</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/40 text-indigo-300 border border-indigo-500/20">
                Multiple Sellers
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Price & Currency Fluctuations</div>
                  <div className="text-slate-400 text-[11px]">$199.00 to $240.00 USD observed across 3 sellers</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                <Truck className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Fulfillment, Shipping & Stock</div>
                  <div className="text-slate-400 text-[11px]">Free 2-Day Priority vs $14.95 courier; stock varies by size</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                <RotateCcw className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Return Terms & Merchant Guarantee</div>
                  <div className="text-slate-400 text-[11px]">30-Day wear test guarantee vs Final Sale non-returnable</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-200">Observation Timestamp & Promotions</div>
                  <div className="text-slate-400 text-[11px]">Checked 15m to 1h ago; discounts tied to specific vendors</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>Changes continuously per retailer without altering product specifications.</span>
          </div>
        </div>

      </div>
    </div>
  );
};
