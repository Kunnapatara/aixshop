import React from 'react';
import { 
  AlertTriangle, 
  HelpCircle, 
  ArrowRight, 
  Layers, 
  Clock, 
  Tag,
  DollarSign,
  ShieldAlert,
  Building2
} from 'lucide-react';
import { CommercialOffer } from '../../types/offers';

interface OfferConflictsSectionProps {
  onInspectOffer: (offer: CommercialOffer) => void;
  offers: CommercialOffer[];
}

export const OfferConflictsSection: React.FC<OfferConflictsSectionProps> = ({
  onInspectOffer,
  offers
}) => {
  // Find offers with conflicts or missing issues
  const conflictOffers = offers.filter(o => o.dominantEvidenceState === 'CONFLICT' || o.issues.length > 0);

  const representativeConflicts = [
    {
      id: 'conflict-1',
      title: 'Partner Feed Price Disagreement',
      type: 'Price Disagreement',
      productName: 'AeroPulse Horizon Trail Hydro',
      sku: 'AP-RUN-002',
      details: 'AeroPulse Direct lists standard price at $159.00 USD, while an authorized retail feed reports $139.00 USD without an explicit promotional event or coupon code.',
      affectedSellers: ['AeroPulse Direct ($159.00)', 'TrailRunner Depot ($139.00)'],
      severity: 'Medium',
      evidenceState: 'CONFLICT',
      targetOfferId: 'off-004'
    },
    {
      id: 'conflict-2',
      title: 'Availability State Inconsistency',
      type: 'Availability Disagreement',
      productName: 'AeroPulse TempoFlow Daily Trainer',
      sku: 'AP-RUN-003',
      details: 'Direct storefront reports "In Stock" with same-day dispatch, whereas syndicated marketplace feeds display "Out of Stock" across European regional nodes.',
      affectedSellers: ['AeroPulse Direct (In Stock)', 'FleetFeet Syndicated (Out of Stock)'],
      severity: 'Medium',
      evidenceState: 'CONFLICT',
      targetOfferId: 'off-006'
    },
    {
      id: 'conflict-3',
      title: 'Unverified Promotional Conditions',
      type: 'Promotion Condition Incomplete',
      productName: 'AeroPulse TrailCore X Waterproof',
      sku: 'AP-RUN-008',
      details: 'A $30 coupon was observed on an affiliate feed, but the terms of qualification (minimum basket size or cart eligibility) could not be verified in structured markup.',
      affectedSellers: ['Affiliate Partner Feed'],
      severity: 'Low',
      evidenceState: 'MISSING',
      targetOfferId: 'off-012'
    },
    {
      id: 'conflict-4',
      title: 'Wide Marketplace Price Disparity',
      type: 'High Dispersion / Arbitrage',
      productName: 'AeroPulse VaporStride Carbon Elite',
      sku: 'AP-RUN-001',
      details: 'Unverified marketplace seller lists item at $240.00 USD (+20.6% premium over $199.00 direct price) with unconfirmed warranty support and stock scarcity claims.',
      affectedSellers: ['KicksMarket Online ($240.00)', 'AeroPulse Direct ($199.00)'],
      severity: 'High',
      evidenceState: 'OBSERVED',
      targetOfferId: 'off-003'
    }
  ];

  const handleInspect = (targetOfferId: string) => {
    const target = offers.find(o => o.id === targetOfferId) || offers[0];
    if (target) {
      onInspectOffer(target);
    }
  };

  return (
    <div className="w-full bg-[#FAF8F5] py-8 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">
                Offer Intelligence Conflicts & Evidence Gaps
              </h2>
            </div>
            <p className="text-xs text-stone-500 max-w-2xl">
              Where observed commercial data disagrees between sources or lacks verifiable terms. These represent high-impact areas for catalog hygiene.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-stone-500 bg-white px-3 py-1.5 rounded-full border border-stone-200">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
            <span className="font-semibold text-stone-700">4 Active Discrepancies Requiring Investigation</span>
          </div>
        </div>

        {/* Conflict Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {representativeConflicts.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 shadow-2xs transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-rose-600 uppercase font-bold tracking-wide">
                      {item.type}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-stone-900 mt-0.5">
                      {item.title}
                    </h3>
                  </div>

                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-semibold border ${
                    item.evidenceState === 'CONFLICT' 
                      ? 'bg-rose-50 text-rose-700 border-rose-200' 
                      : item.evidenceState === 'MISSING'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-stone-100 text-stone-700 border-stone-200'
                  }`}>
                    {item.evidenceState}
                  </span>
                </div>

                <div className="text-xs font-medium text-stone-700">
                  Product: <strong className="text-stone-900 font-bold">{item.productName}</strong> <span className="text-stone-500 font-mono">({item.sku})</span>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {item.details}
                </p>

                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1.5 text-xs">
                  <div className="text-[10px] uppercase font-mono text-stone-500 font-bold">Observed Sources / Sellers:</div>
                  <div className="flex flex-wrap items-center gap-2">
                    {item.affectedSellers.map((s, idx) => (
                      <span key={idx} className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-white text-stone-700 border border-stone-200 shadow-3xs">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-stone-500">
                  Severity: <span className="text-stone-800 font-bold">{item.severity}</span>
                </span>

                <button
                  type="button"
                  onClick={() => handleInspect(item.targetOfferId)}
                  className="text-xs font-semibold text-[#F97316] hover:text-orange-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Inspect Evidence</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
