import React from 'react';
import { 
  Package, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ShoppingBag, 
  Store, 
  Clock, 
  Tag, 
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';
import { sampleCanonicalProduct } from '../../data/sampleIntelligence';

export const InitialIntelligenceSummary: React.FC = () => {
  const product = sampleCanonicalProduct;

  // Evidence state breakdown
  const evidenceBreakdown = [
    { label: 'Observed', count: 3, color: 'bg-cyan-500', textColor: 'text-cyan-400', desc: 'Directly extracted from primary manufacturer microdata' },
    { label: 'Merchant Verified', count: 1, color: 'bg-emerald-500', textColor: 'text-emerald-400', desc: 'Signed off by verified merchant product authority' },
    { label: 'Derived', count: 1, color: 'bg-indigo-500', textColor: 'text-indigo-400', desc: 'Synthesized from structured specifications & biomechanics' },
    { label: 'Conflict', count: 1, color: 'bg-amber-500', textColor: 'text-amber-400', desc: 'Conflicting values across two authoritative channels' },
    { label: 'Missing', count: 1, color: 'bg-rose-500', textColor: 'text-rose-400', desc: 'Essential buyer decision attribute missing from schema' },
  ];

  return (
    <div className="space-y-6 mb-12">
      {/* SECTION TITLE & VALUE PROPOSITION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
            <span>First Moment of Value</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Section 06 & 07</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Initial Intelligence Summary
          </h2>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-900 border border-slate-800 text-slate-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>Representative Preview Data</span>
        </div>
      </div>

      {/* CORE 4-CARD BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* CARD 1: PRODUCT IDENTIFIED */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 px-2.5 py-1 bg-cyan-950/60 border-b border-l border-cyan-500/20 text-[10px] font-mono font-semibold text-cyan-300 rounded-bl-lg">
            Example Data
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3">
              <Package className="w-4 h-4 text-cyan-400" />
              <span>Product Identity</span>
              <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <CheckCircle2 className="w-3 h-3" /> Resolved
              </span>
            </div>

            <div className="mb-3">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                {product.brand}
              </span>
              <h3 className="text-base font-bold text-white leading-snug">
                {product.name}
              </h3>
              <p className="text-xs text-cyan-300/90 mt-0.5">
                {product.category}
              </p>
            </div>

            {/* Identifiers List */}
            <div className="space-y-1.5 text-xs border-t border-slate-800/80 pt-3">
              <div className="flex justify-between items-center text-slate-400">
                <span className="font-mono text-[11px]">GTIN:</span>
                <span className="font-mono text-slate-200">{product.gtin}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span className="font-mono text-[11px]">MPN:</span>
                <span className="font-mono text-slate-200">{product.mpn}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span className="font-mono text-[11px]">Variant:</span>
                <span className="text-slate-200">US Men 10 / Onyx Black</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-slate-800/60 text-[11px] text-slate-500">
            Canonical entity mapped across barcode & schema databases.
          </div>
        </div>

        {/* CARD 2: SPECIFICATION COVERAGE */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 px-2.5 py-1 bg-amber-950/60 border-b border-l border-amber-500/20 text-[10px] font-mono font-semibold text-amber-300 rounded-bl-lg">
            Example Diagnostic
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Specification Coverage</span>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-extrabold text-white tracking-tight">7 / 10</span>
              <span className="text-xs text-slate-400 font-medium">known core attributes</span>
            </div>

            {/* Visual Coverage Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2.5 mb-3 overflow-hidden flex">
              <div className="bg-cyan-500 h-full w-[70%]" title="70% attributes known" />
              <div className="bg-rose-500/80 h-full w-[30%]" title="30% missing or ambiguous" />
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Biomechanical Specs:</span>
                <span className="text-emerald-400 font-medium">Complete (3/3)</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Material Composition:</span>
                <span className="text-amber-400 font-medium">Conflict Detected</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">Customer Assurance:</span>
                <span className="text-rose-400 font-medium">Policy Missing</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-slate-800/60 text-[11px] text-slate-500">
            Diagnostic calculation; not an arbitrary SEO score.
          </div>
        </div>

        {/* CARD 3: EVIDENCE COVERAGE BREAKDOWN */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 px-2.5 py-1 bg-cyan-950/60 border-b border-l border-cyan-500/20 text-[10px] font-mono font-semibold text-cyan-300 rounded-bl-lg">
            Evidence Model
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Evidence Coverage</span>
            </div>

            {/* Distribution Pills */}
            <div className="space-y-2">
              {evidenceBreakdown.map((item) => (
                <div key={item.label} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-slate-300">{item.label}</span>
                  </div>
                  <span className={`font-mono font-bold ${item.textColor}`}>
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
            Every specification tracks source provenance and confidence.
          </div>
        </div>

        {/* CARD 4: OFFER INTELLIGENCE */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 px-2.5 py-1 bg-cyan-950/60 border-b border-l border-cyan-500/20 text-[10px] font-mono font-semibold text-cyan-300 rounded-bl-lg">
            Example Data
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2">
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              <span>Offer Intelligence</span>
            </div>

            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl font-bold text-white tracking-tight">3 observed</span>
              <span className="text-xs text-slate-400">seller offers</span>
            </div>

            <div className="space-y-2 text-xs">
              {product.offers.map((offer) => (
                <div key={offer.id} className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                  <div className="truncate mr-2">
                    <div className="font-medium text-slate-200 truncate">{offer.sellerName}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{offer.detectedAt}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-mono font-semibold text-cyan-300">${offer.price.toFixed(2)}</div>
                    <div className="text-[10px] text-slate-400">{offer.availability}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-slate-800/60 text-[11px] font-semibold text-cyan-400 flex items-center gap-1">
            <span>Product ≠ Offer decoupled</span>
          </div>
        </div>

      </div>
    </div>
  );
};
