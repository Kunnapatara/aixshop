import React from 'react';
import { ExternalLink, ShieldCheck, AlertCircle, X, Store, CheckCircle2 } from 'lucide-react';
import { ShopperObservedOffer } from '../../types/shopper';

interface VisitSellerModalProps {
  offer: ShopperObservedOffer | null;
  onClose: () => void;
}

export const VisitSellerModal: React.FC<VisitSellerModalProps> = ({ offer, onClose }) => {
  if (!offer) return null;

  const handleOpenExternal = () => {
    // In representative preview mode, alert or open destination safely
    window.open(offer.visitUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in-50 duration-200"
      onClick={onClose}
    >
      <div 
        className="max-w-md w-full bg-[#0A0E1A] border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#0C1222]">
          <div className="flex items-center gap-2.5">
            <Store className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Proceeding to External Seller
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {offer.sellerName}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs">
          <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-3.5 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Observed Snapshot</span>
              <div className="text-lg font-mono font-bold text-white mt-0.5">
                ${offer.price.toFixed(2)} {offer.currency}
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-[10px]">
              {offer.sellerStatus}
            </span>
          </div>

          <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3.5 space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>AIXSHOP is Not the Seller</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              You are leaving AIXSHOP to visit the seller's storefront. AIXSHOP does not process checkout, hold inventory, collect payment details, or guarantee stock availability. The merchant's own terms and policies apply.
            </p>
          </div>

          <div className="rounded-xl bg-slate-900/40 border border-slate-800 p-3 text-[11px] space-y-1.5 text-slate-300">
            <div className="flex items-center gap-2 text-slate-200 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Destination URL (Representative Preview)</span>
            </div>
            <div className="font-mono text-[10px] text-slate-400 break-all pl-5">
              {offer.visitUrl}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0C1222] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium cursor-pointer transition-colors"
          >
            Stay on AIXSHOP
          </button>
          <button
            type="button"
            onClick={handleOpenExternal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-600/30 cursor-pointer transition-colors"
          >
            <span>Proceed to Seller</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
