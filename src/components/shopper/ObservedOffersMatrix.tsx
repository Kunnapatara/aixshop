import React, { useState } from 'react';
import { 
  Store, 
  ExternalLink, 
  Clock, 
  ShieldCheck, 
  AlertCircle, 
  HelpCircle, 
  CheckCircle2, 
  Tag, 
  Truck, 
  RotateCcw,
  Eye,
  ChevronRight
} from 'lucide-react';
import { ShopperObservedOffer } from '../../types/shopper';

interface ObservedOffersMatrixProps {
  offers: ShopperObservedOffer[];
  onSelectOffer: (offer: ShopperObservedOffer) => void;
  onVisitSeller: (offer: ShopperObservedOffer) => void;
}

export const ObservedOffersMatrix: React.FC<ObservedOffersMatrixProps> = ({
  offers,
  onSelectOffer,
  onVisitSeller
}) => {
  return (
    <div className="rounded-2xl bg-[#090E18] border border-slate-800/90 shadow-xl overflow-hidden flex flex-col gap-0">
      {/* Matrix Header */}
      <div className="p-5 border-b border-slate-800 bg-[#0B1220]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Observed Seller Offers ({offers.length})
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Observed offer snapshots separated from the underlying canonical product.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-700/80 text-[11px] font-mono text-slate-300">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Snapshots observed between 15m – 1h ago</span>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left text-xs divide-y divide-slate-800/80">
          <thead className="bg-slate-950/60 text-[10px] font-mono uppercase text-slate-400 tracking-wider">
            <tr>
              <th className="py-3 px-4 font-semibold">Seller</th>
              <th className="py-3 px-4 font-semibold text-right">Price</th>
              <th className="py-3 px-4 font-semibold">Observed Availability</th>
              <th className="py-3 px-4 font-semibold">Shipping Terms</th>
              <th className="py-3 px-4 font-semibold">Return Policy</th>
              <th className="py-3 px-4 font-semibold">Promotions</th>
              <th className="py-3 px-4 font-semibold">Evidence State</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {offers.map((offer) => (
              <tr 
                key={offer.id}
                className="hover:bg-cyan-950/20 transition-colors group cursor-pointer"
                onClick={() => onSelectOffer(offer)}
              >
                {/* Seller Column */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-200">
                      {offer.sellerName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                        <span>{offer.sellerName}</span>
                        {offer.isOfficial && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                            Official
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        {offer.sellerStatus}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Price */}
                <td className="py-3.5 px-4 text-right">
                  <div className="font-mono font-bold text-sm text-white group-hover:text-cyan-300">
                    ${offer.price.toFixed(2)}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    {offer.currency}
                  </div>
                </td>

                {/* Availability */}
                <td className="py-3.5 px-4">
                  <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                    offer.availability === 'In Stock' 
                      ? 'text-emerald-400' 
                      : offer.availability === 'Limited Stock' 
                        ? 'text-amber-400' 
                        : 'text-slate-400'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    <span>{offer.availability}</span>
                  </span>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {offer.observedAt}
                  </div>
                </td>

                {/* Shipping */}
                <td className="py-3.5 px-4">
                  <span className="text-slate-400 italic text-[11px]">
                    {offer.shipping}
                  </span>
                </td>

                {/* Returns */}
                <td className="py-3.5 px-4">
                  {offer.returnPolicyState === 'Observed' ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px]">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{offer.returnPolicy}</span>
                    </span>
                  ) : (
                    <span className="text-slate-400 italic text-[11px]">
                      {offer.returnPolicy}
                    </span>
                  )}
                </td>

                {/* Promotions */}
                <td className="py-3.5 px-4">
                  {offer.promotionState === 'Observed' ? (
                    <span className="text-cyan-300 font-medium text-[11px]">
                      {offer.promotion}
                    </span>
                  ) : (
                    <span className="text-slate-400 text-[11px]">
                      {offer.promotion}
                    </span>
                  )}
                </td>

                {/* Evidence State */}
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span>{offer.shopperLabel}</span>
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectOffer(offer)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium border border-slate-700 transition-colors cursor-pointer"
                    >
                      Inspect
                    </button>
                    <button
                      type="button"
                      onClick={() => onVisitSeller(offer)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-[11px] shadow-sm transition-colors cursor-pointer"
                    >
                      <span>Visit Seller</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile & Tablet Card View */}
      <div className="lg:hidden p-4 space-y-3">
        {offers.map((offer) => (
          <div 
            key={offer.id}
            className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 hover:border-cyan-500/40 transition-colors flex flex-col gap-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-bold text-white text-sm flex items-center gap-1.5">
                  <span>{offer.sellerName}</span>
                  {offer.isOfficial && (
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                      Official
                    </span>
                  )}
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                  {offer.sellerStatus} · {offer.observedAt}
                </div>
              </div>

              <div className="text-right">
                <div className="text-base font-bold font-mono text-white">
                  ${offer.price.toFixed(2)}
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {offer.currency}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-800/80">
              <div>
                <span className="text-slate-400 text-[11px]">Availability: </span>
                <span className={`font-medium ${
                  offer.availability === 'In Stock' ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {offer.availability}
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px]">Returns: </span>
                <span className="text-slate-200">{offer.returnPolicy}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px]">Shipping: </span>
                <span className="text-slate-400 italic">{offer.shipping}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[11px]">Promotion: </span>
                <span className="text-slate-200">{offer.promotion}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] font-mono text-slate-400">
                State: {offer.shopperLabel}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectOffer(offer)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-medium hover:bg-slate-700 transition-colors"
                >
                  Details
                </button>
                <button
                  type="button"
                  onClick={() => onVisitSeller(offer)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-medium text-xs shadow-sm transition-colors"
                >
                  <span>Visit Seller</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Footer Disclosure */}
      <div className="px-5 py-3 bg-slate-950/90 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          <span><strong>Observed offer snapshots.</strong> AIXSHOP does not sell products or process transactions.</span>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Purchases are completed on the merchant's external website
        </span>
      </div>
    </div>
  );
};
