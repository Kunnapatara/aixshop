import React, { useState } from 'react';
import { 
  Store, 
  Clock, 
  Truck, 
  RotateCcw, 
  Info
} from 'lucide-react';
import { SellerOffer, EvidenceState } from '../../types/landing';

interface ObservedOfferIntelligenceProps {
  offers: SellerOffer[];
  onOpenStateModal: (state: EvidenceState) => void;
}

export const ObservedOfferIntelligence: React.FC<ObservedOfferIntelligenceProps> = ({
  offers,
  onOpenStateModal
}) => {
  const [selectedOfferId, setSelectedOfferId] = useState<string>(offers[0]?.id || 'offer-1');

  const selectedOffer = offers.find(o => o.id === selectedOfferId) || offers[0];

  return (
    <section id="offer-intelligence" className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-[#F97316]" />
            <h3 className="text-xl font-bold text-stone-900 tracking-tight">
              Observed Offer Intelligence
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Seller-specific pricing and fulfillment terms observed at specific points in time.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-stone-600 bg-white border border-stone-200 px-3 py-1 rounded-xl shadow-3xs">
            Not Live Feeds · Representative Snapshot
          </span>
        </div>
      </div>

      {/* Grid: Offer Cards (Left) and Offer Detail/Evidence (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Offer Cards List (2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          {offers.map((offer) => {
            const isSelected = offer.id === selectedOffer.id;

            return (
              <div
                key={offer.id}
                onClick={() => setSelectedOfferId(offer.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isSelected
                    ? 'bg-orange-50/50 border-[#F97316] shadow-sm'
                    : 'bg-white hover:bg-stone-50/80 border-stone-200 text-stone-700 shadow-xs'
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-stone-900 text-sm">
                      {offer.sellerName}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200">
                      {offer.sellerType}
                    </span>
                    {offer.isOfficial && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                        Direct Brand
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-stone-400" />
                      {offer.shipping}
                    </span>
                    <span className="flex items-center gap-1">
                      <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
                      {offer.returnPolicy}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-stone-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Observed: {offer.detectedAt}</span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-200">
                  <div className="text-xl font-black font-mono text-stone-900">
                    ${offer.price.toFixed(2)}
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full mt-1 border ${
                    offer.availability === 'In Stock'
                      ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                      : 'text-amber-800 bg-amber-50 border-amber-200'
                  }`}>
                    {offer.availability}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Offer Evidence Detail (Right 1 col) */}
        <div className="rounded-2xl bg-white border border-stone-200 p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-stone-200">
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider font-bold">
                Offer Evidence Inspector
              </span>
              <button
                type="button"
                onClick={() => onOpenStateModal('OBSERVED')}
                className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 cursor-pointer"
              >
                OBSERVED
              </button>
            </div>

            <div className="mt-3">
              <h4 className="text-base font-bold text-stone-900">
                {selectedOffer.sellerName}
              </h4>
              <p className="text-xs text-stone-500 mt-0.5">
                Observed at {selectedOffer.detectedAt}
              </p>
            </div>

            <div className="mt-4 space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between shadow-3xs">
                <span className="text-stone-500 font-medium">Observed Price:</span>
                <span className="font-mono text-stone-900 font-bold text-sm">${selectedOffer.price.toFixed(2)} {selectedOffer.currency}</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between shadow-3xs">
                <span className="text-stone-500 font-medium">Inventory Status:</span>
                <span className="font-mono text-emerald-700 font-bold">{selectedOffer.availability}</span>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1 shadow-3xs">
                <span className="text-[10px] uppercase font-mono font-bold text-stone-500 block">Fulfillment / Shipping:</span>
                <div className="text-stone-800 font-mono text-[11px] font-medium">{selectedOffer.shipping}</div>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1 shadow-3xs">
                <span className="text-[10px] uppercase font-mono font-bold text-stone-500 block">Return Evidence:</span>
                <div className="text-stone-800 font-mono text-[11px] font-medium">{selectedOffer.returnPolicy}</div>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-orange-50/60 border border-orange-200 text-[11px] text-stone-700 flex items-start gap-2">
            <Info className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
            <p>
              Commercial conditions are time-dependent. When an offer goes out of stock or changes price, the canonical product specifications remain completely intact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
