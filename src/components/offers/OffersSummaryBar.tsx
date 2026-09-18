import React, { useState } from 'react';
import { 
  DollarSign, 
  PackageCheck, 
  AlertTriangle, 
  FileQuestion, 
  Layers, 
  Tag, 
  Info,
  CheckCircle2,
  X
} from 'lucide-react';
import { offersSummaryMetrics } from '../../data/sampleOffersData';

interface OffersSummaryBarProps {
  onFilterByStatus?: (filterType: 'all' | 'conflicts' | 'missing' | 'promotions' | 'products') => void;
  activeQuickFilter?: string;
}

export const OffersSummaryBar: React.FC<OffersSummaryBarProps> = ({
  onFilterByStatus,
  activeQuickFilter
}) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const cards = [
    {
      id: 'observed-offers',
      filterKey: 'all',
      title: 'Observed Offers',
      value: offersSummaryMetrics.observedOffers,
      icon: DollarSign,
      color: 'text-[#F97316]',
      bgColor: 'bg-orange-50/50',
      borderColor: 'border-orange-200/80',
      badge: 'Preview Catalog',
      definition: 'Number of seller-specific offers represented in the current preview catalog across direct and partner channels.'
    },
    {
      id: 'products-with-offers',
      filterKey: 'products',
      title: 'Products With Offers',
      value: offersSummaryMetrics.productsWithOffers,
      icon: PackageCheck,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50/50',
      borderColor: 'border-blue-200/80',
      badge: '18 of 24 SKUs',
      definition: 'Products with at least one observed commercial offer. Remaining 6 catalog SKUs represent unreleased prototypes without public offers.'
    },
    {
      id: 'price-conflicts',
      filterKey: 'conflicts',
      title: 'Price Conflicts',
      value: offersSummaryMetrics.priceConflicts,
      icon: AlertTriangle,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50/50',
      borderColor: 'border-rose-200/80',
      badge: 'Requires Triage',
      definition: 'Products where observed offer information requires investigation because sources disagree or commercial conditions differ materially.'
    },
    {
      id: 'missing-evidence',
      filterKey: 'missing',
      title: 'Missing Offer Evidence',
      value: offersSummaryMetrics.missingOfferEvidence,
      icon: FileQuestion,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50/50',
      borderColor: 'border-amber-200/80',
      badge: 'Incomplete Claims',
      definition: 'Offers whose critical commercial attributes (return policies, shipping tables, warranty terms) cannot currently be sufficiently verified.'
    },
    {
      id: 'availability-conflicts',
      filterKey: 'conflicts',
      title: 'Availability Conflicts',
      value: offersSummaryMetrics.availabilityConflicts,
      icon: Layers,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50/50',
      borderColor: 'border-orange-200/80',
      badge: 'Stock Disparity',
      definition: 'Cases where availability information differs between observed sources (e.g. In Stock on Direct vs. Out of Stock on Retail Partner).'
    },
    {
      id: 'promotions-detected',
      filterKey: 'promotions',
      title: 'Promotions Detected',
      value: offersSummaryMetrics.promotionsDetected,
      icon: Tag,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50/50',
      borderColor: 'border-emerald-200/80',
      badge: 'Conditional Offers',
      definition: 'Offers containing an explicitly observed promotional condition (member discounts, coupons, sitewide clearance) requiring eligibility verification.'
    }
  ];

  return (
    <div className="w-full bg-white border-b border-stone-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
            <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse"></span>
            <span className="font-semibold text-stone-700">DIAGNOSTIC SUMMARY · REPRESENTATIVE PREVIEW VALUES</span>
          </div>
          <span className="text-[11px] font-mono text-stone-400">Click card to filter table</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {cards.map((card) => {
            const Icon = card.icon;
            const isFilterActive = activeQuickFilter === card.filterKey;

            return (
              <div
                key={card.id}
                onClick={() => onFilterByStatus?.(card.filterKey as any)}
                onMouseEnter={() => setActiveTooltip(card.id)}
                onMouseLeave={() => setActiveTooltip(null)}
                className={`relative p-3.5 rounded-2xl border transition-all cursor-pointer group shadow-2xs ${card.bgColor} ${card.borderColor} ${
                  isFilterActive ? 'ring-2 ring-orange-500 shadow-sm border-orange-300' : 'hover:border-stone-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-xs text-stone-700 font-semibold">
                    <Icon className={`w-3.5 h-3.5 ${card.color}`} />
                    <span className="truncate">{card.title}</span>
                  </div>
                  <Info className="w-3 h-3 text-stone-400 group-hover:text-stone-600 transition-colors shrink-0" />
                </div>

                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-extrabold text-stone-900 tracking-tight font-mono">
                    {card.value}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white text-stone-600 border border-stone-200 shadow-2xs">
                    {card.badge}
                  </span>
                </div>

                {/* Tooltip */}
                {activeTooltip === card.id && (
                  <div className="absolute left-0 bottom-full mb-2 z-30 w-64 p-3 rounded-2xl bg-white border border-stone-200 shadow-xl text-xs text-stone-800 pointer-events-none animate-in fade-in duration-150">
                    <div className="flex items-center gap-1.5 text-[#F97316] font-bold mb-1 font-mono">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{card.title}</span>
                    </div>
                    <p className="text-stone-600 leading-relaxed text-[11px]">
                      {card.definition}
                    </p>
                    <div className="mt-2 pt-1.5 border-t border-stone-100 text-[10px] font-mono text-stone-400">
                      Representative metric · Not live store feed
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
