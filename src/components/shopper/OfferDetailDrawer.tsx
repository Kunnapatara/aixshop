import React from 'react';
import { 
  X, 
  Store, 
  ExternalLink, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle,
  Truck,
  RotateCcw,
  Tag,
  Info
} from 'lucide-react';
import { ShopperObservedOffer } from '../../types/shopper';

interface OfferDetailDrawerProps {
  offer: ShopperObservedOffer | null;
  onClose: () => void;
  onVisitSeller: (offer: ShopperObservedOffer) => void;
}

export const OfferDetailDrawer: React.FC<OfferDetailDrawerProps> = ({
  offer,
  onClose,
  onVisitSeller
}) => {
  if (!offer) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in-50 duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-[#0A0E18] border-l border-slate-800 h-full flex flex-col shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#0C1220]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-300 font-bold text-sm">
              {offer.sellerName.charAt(0)}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">
                {offer.sellerName}
              </h3>
              <div className="text-[11px] font-mono text-cyan-400">
                {offer.sellerStatus}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-5 space-y-5 flex-1 text-xs">
          {/* Price Snapshot Card */}
          <div className="rounded-xl bg-slate-900/90 border border-slate-800 p-4 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Observed Snapshot Price</span>
              <div className="text-2xl font-black font-mono text-white mt-0.5">
                ${offer.price.toFixed(2)}
              </div>
              <span className="text-[11px] font-mono text-slate-400">{offer.currency} currency</span>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                {offer.availability}
              </span>
              <div className="text-[10px] text-slate-400 mt-1 font-mono">{offer.observedAt}</div>
            </div>
          </div>

          {/* Core Offer Attributes */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
              Commercial Terms (Observed)
            </h4>

            <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 divide-y divide-slate-800/60">
              <div className="p-3 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 text-slate-300">
                  <Truck className="w-4 h-4 text-slate-400" />
                  <span>Shipping Cost & Speed</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-slate-200">{offer.shipping}</span>
                  <div className="text-[10px] text-slate-400 font-mono">{offer.shippingState}</div>
                </div>
              </div>

              <div className="p-3 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 text-slate-300">
                  <RotateCcw className="w-4 h-4 text-slate-400" />
                  <span>Return Policy Window</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-slate-200">{offer.returnPolicy}</span>
                  <div className="text-[10px] text-slate-400 font-mono">{offer.returnPolicyState}</div>
                </div>
              </div>

              <div className="p-3 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 text-slate-300">
                  <Tag className="w-4 h-4 text-slate-400" />
                  <span>Active Promotion</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-cyan-300">{offer.promotion}</span>
                  <div className="text-[10px] text-slate-400 font-mono">{offer.promotionState}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Diagnostic Provenance */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-mono uppercase text-slate-400 tracking-wider">
              Observation Provenance
            </h4>
            <div className="rounded-xl bg-slate-900/40 border border-slate-800/80 p-3.5 space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Data Source:</span>
                <span className="font-mono text-slate-200 text-right">{offer.source}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Observation Time:</span>
                <span className="font-mono text-cyan-400">{offer.observedAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Evidence State:</span>
                <span className="font-mono text-emerald-400 font-semibold">{offer.shopperLabel} ({offer.evidenceState})</span>
              </div>
            </div>
          </div>

          {/* Disclaimer callout */}
          <div className="rounded-xl bg-cyan-950/20 border border-cyan-500/30 p-3 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-300 leading-relaxed">
              <strong>AIXSHOP does not process checkout.</strong> When you proceed to the seller, the order is fulfilled and processed directly on their website under their merchant terms.
            </p>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-[#0B1220] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer transition-colors"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onVisitSeller(offer)}
            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/20 transition-all cursor-pointer"
          >
            <span>Proceed to {offer.sellerName}</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
