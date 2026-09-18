import React from 'react';
import { 
  ShieldCheck, 
  Eye, 
  AlertTriangle, 
  FileQuestion, 
  HelpCircle, 
  Sparkles, 
  Layers, 
  TrendingUp,
  Info,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { offersSummaryMetrics } from '../../data/sampleOffersData';

export const OfferEvidenceHealthSection: React.FC = () => {
  const { evidenceClaimsByState } = offersSummaryMetrics;
  const totalClaims = 
    evidenceClaimsByState.observed +
    evidenceClaimsByState.merchantVerified +
    evidenceClaimsByState.derived +
    evidenceClaimsByState.missing +
    evidenceClaimsByState.conflict;

  const pct = (val: number) => ((val / totalClaims) * 100).toFixed(1);

  return (
    <div className="w-full bg-[#FAF8F5] border-t border-stone-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section 21: Offer Evidence Health */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F97316]" />
                <h3 className="text-sm sm:text-base font-bold text-stone-900 tracking-tight">
                  Commercial Evidence Health
                </h3>
              </div>
              <p className="text-xs text-stone-500">
                Breakdown of ground-truth claims backing commercial offers across the preview catalog.
              </p>
            </div>

            <div className="text-[11px] font-mono text-stone-600 bg-stone-50 px-3 py-1 rounded-full border border-stone-200">
              {totalClaims} Total Evaluated Claims · <span className="text-[#F97316] font-semibold">Claims ≠ 1:1 Offer Count</span>
            </div>
          </div>

          {/* Segmented Proportion Bar */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-stone-100 rounded-full overflow-hidden flex border border-stone-200">
              <div 
                style={{ width: `${pct(evidenceClaimsByState.observed)}%` }} 
                className="bg-[#F97316] h-full transition-all"
                title={`Observed: ${evidenceClaimsByState.observed} (${pct(evidenceClaimsByState.observed)}%)`}
              />
              <div 
                style={{ width: `${pct(evidenceClaimsByState.merchantVerified)}%` }} 
                className="bg-stone-800 h-full transition-all"
                title={`Merchant Verified: ${evidenceClaimsByState.merchantVerified} (${pct(evidenceClaimsByState.merchantVerified)}%)`}
              />
              <div 
                style={{ width: `${pct(evidenceClaimsByState.derived)}%` }} 
                className="bg-amber-600 h-full transition-all"
                title={`Derived: ${evidenceClaimsByState.derived} (${pct(evidenceClaimsByState.derived)}%)`}
              />
              <div 
                style={{ width: `${pct(evidenceClaimsByState.missing)}%` }} 
                className="bg-amber-400 h-full transition-all"
                title={`Missing: ${evidenceClaimsByState.missing} (${pct(evidenceClaimsByState.missing)}%)`}
              />
              <div 
                style={{ width: `${pct(evidenceClaimsByState.conflict)}%` }} 
                className="bg-rose-500 h-full transition-all"
                title={`Conflict: ${evidenceClaimsByState.conflict} (${pct(evidenceClaimsByState.conflict)}%)`}
              />
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 text-xs">
              <div className="flex items-center gap-1.5 text-stone-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F97316] shrink-0"></span>
                <span>Observed: <strong className="text-stone-900 font-mono">{evidenceClaimsByState.observed}</strong> ({pct(evidenceClaimsByState.observed)}%)</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-600">
                <span className="w-2.5 h-2.5 rounded-full bg-stone-800 shrink-0"></span>
                <span>Verified: <strong className="text-stone-900 font-mono">{evidenceClaimsByState.merchantVerified}</strong> ({pct(evidenceClaimsByState.merchantVerified)}%)</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-600">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600 shrink-0"></span>
                <span>Derived: <strong className="text-stone-900 font-mono">{evidenceClaimsByState.derived}</strong> ({pct(evidenceClaimsByState.derived)}%)</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-600">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0"></span>
                <span>Missing: <strong className="text-stone-900 font-mono">{evidenceClaimsByState.missing}</strong> ({pct(evidenceClaimsByState.missing)}%)</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-600">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>
                <span>Conflict: <strong className="text-stone-900 font-mono">{evidenceClaimsByState.conflict}</strong> ({pct(evidenceClaimsByState.conflict)}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 22: Price Intelligence Insights */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#F97316]" />
              <h3 className="text-sm font-bold text-stone-900 tracking-tight uppercase font-mono">
                Catalog-Wide Commercial Observations & Patterns
              </h3>
            </div>
            <span className="text-[10px] font-mono text-stone-400">
              Automated Reasoning Insights
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Insight 1: Highest Spread */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
              <div className="text-[10px] font-mono uppercase text-amber-700 font-bold">Highest Observed Spread</div>
              <div className="text-lg font-bold text-stone-900 font-mono">
                $41.00 USD <span className="text-xs text-stone-500 font-sans font-normal">(+20.6%)</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Observed on <strong className="text-stone-900 font-semibold">VaporStride Carbon Elite</strong> between AeroPulse Direct ($199) and unverified marketplace sellers ($240).
              </p>
            </div>

            {/* Insight 2: Most Common Issue */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
              <div className="text-[10px] font-mono uppercase text-rose-700 font-bold">Most Common Evidence Gap</div>
              <div className="text-lg font-bold text-stone-900 font-mono">
                7 Missing Policies
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Return window and restocking fee terms unavailable on secondary marketplace and partner syndications.
              </p>
            </div>

            {/* Insight 3: Availability Inconsistency */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
              <div className="text-[10px] font-mono uppercase text-orange-700 font-bold">Stock Inconsistency</div>
              <div className="text-lg font-bold text-stone-900 font-mono">
                3 SKUs Affected
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Direct storefront shows availability while retail feed indicates out-of-stock, causing friction for AI agents.
              </p>
            </div>

            {/* Insight 4: Promotion Verification */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-2">
              <div className="text-[10px] font-mono uppercase text-emerald-700 font-bold">Promotions Detected</div>
              <div className="text-lg font-bold text-stone-900 font-mono">
                6 Active Promos
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Observed conditional discounts (membership prices, coupons) require explicit eligibility verification.
              </p>
            </div>
          </div>

          {/* Section 22 Disclaimer: Diagnostics Only */}
          <div className="p-3.5 rounded-xl bg-white border border-stone-200 text-[11px] text-stone-600 flex items-center justify-between shadow-3xs">
            <span className="flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-[#F97316] shrink-0" />
              <span><strong>Diagnostic Architecture:</strong> AIXSHOP is an observational intelligence layer, not a repricing or dynamic inventory management engine.</span>
            </span>
            <span className="font-mono text-[10px] text-stone-400">Preview Data Engine</span>
          </div>
        </div>

      </div>
    </div>
  );
};
