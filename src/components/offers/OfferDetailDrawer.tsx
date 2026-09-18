import React from 'react';
import { 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Eye, 
  AlertTriangle, 
  HelpCircle, 
  Clock, 
  Tag, 
  Truck, 
  RotateCcw, 
  DollarSign, 
  Layers, 
  ArrowRight,
  Sparkles,
  ShieldAlert,
  Building2,
  FileText
} from 'lucide-react';
import { CommercialOffer, CommercialClaim, OfferEvidenceState } from '../../types/offers';

interface OfferDetailDrawerProps {
  offer: CommercialOffer | null;
  onClose: () => void;
  onNavigateReport: () => void;
  onNavigateFixWorkflow: (issueDescription: string) => void;
}

export const OfferDetailDrawer: React.FC<OfferDetailDrawerProps> = ({
  offer,
  onClose,
  onNavigateReport,
  onNavigateFixWorkflow
}) => {
  if (!offer) return null;

  const getClaimStateBadge = (state: OfferEvidenceState) => {
    switch (state) {
      case 'MERCHANT_VERIFIED':
        return (
          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-mono font-bold">
            MERCHANT VERIFIED
          </span>
        );
      case 'OBSERVED':
        return (
          <span className="px-2 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200 text-[10px] font-mono font-semibold">
            OBSERVED
          </span>
        );
      case 'DERIVED':
        return (
          <span className="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-mono font-semibold">
            DERIVED
          </span>
        );
      case 'CONFLICT':
        return (
          <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-mono font-bold">
            CONFLICT
          </span>
        );
      case 'MISSING':
        return (
          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-mono font-semibold">
            MISSING
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-stone-900/40 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
    >
      <div 
        className="w-full max-w-2xl h-full bg-[#FAF8F5] border-l border-stone-200 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-250"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 bg-white flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-[#F97316] font-bold uppercase">
                {offer.brand}
              </span>
              <span className="text-stone-300">·</span>
              <span className="text-[11px] font-mono text-stone-500">
                Offer ID: {offer.id}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-mono border border-stone-200">
                {offer.sellerType}
              </span>
            </div>

            <h2 id="drawer-title" className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
              {offer.productName}
            </h2>

            <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs text-stone-500">
              <span className="text-stone-800 font-semibold">{offer.seller}</span>
              <span className="text-stone-300">·</span>
              <span className="font-mono text-[11px]">GTIN: {offer.gtin}</span>
              <span className="text-stone-300">·</span>
              <span className="font-mono text-[11px]">SKU: {offer.sku}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-stone-800">
          
          {/* SECTION 1: COMMERCIAL STATE (Section 11) */}
          <div className="p-5 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs uppercase font-mono font-bold text-stone-900 tracking-wider">
                  Observed Commercial Proposition
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                Time-Bound Snapshot
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* Offer Price */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="text-[10px] uppercase font-mono text-stone-500">Observed Price</div>
                <div className="text-xl font-bold text-stone-900 font-mono mt-0.5">
                  ${offer.offerPrice?.toFixed(2)} <span className="text-xs text-stone-500 font-normal">{offer.currency}</span>
                </div>
                <div className="text-[10px] text-stone-500 font-mono mt-0.5">Condition: {offer.priceCondition}</div>
              </div>

              {/* Availability */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="text-[10px] uppercase font-mono text-stone-500">Availability</div>
                <div className="text-sm font-bold text-emerald-700 mt-1">
                  {offer.availability}
                </div>
                <div className="text-[10px] text-stone-500 truncate mt-0.5" title={offer.stockStateSummary}>
                  {offer.stockStateSummary}
                </div>
              </div>

              {/* Observed At */}
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
                <div className="text-[10px] uppercase font-mono text-stone-500">Detected Timestamp</div>
                <div className="text-xs font-mono font-semibold text-stone-800 mt-1">
                  {offer.observedAt}
                </div>
                <div className="text-[10px] text-stone-400 font-mono mt-0.5">
                  Valid Until: {offer.validUntil}
                </div>
              </div>
            </div>

            {/* Promotion Details (Section 10) */}
            {offer.promotion.hasPromotion ? (
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Promotional Condition Detected</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-medium">
                    {offer.promotion.verificationState}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs pt-1 font-mono">
                  <div>
                    <span className="text-stone-500">Base Price: </span>
                    <span className="text-stone-400 line-through">${offer.promotion.basePrice?.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-stone-500">Promotional Price: </span>
                    <span className="text-emerald-700 font-bold">${offer.promotion.promotionalPrice?.toFixed(2)}</span>
                  </div>
                </div>
                <p className="text-[11px] text-stone-700 pt-1 leading-relaxed">
                  <strong>Condition:</strong> {offer.promotion.conditionDescription}
                </p>
                <div className="text-[10px] font-mono text-amber-700 pt-1 border-t border-emerald-200/60">
                  Notice: Condition observed — eligibility is not independently verified for every shopper.
                </div>
              </div>
            ) : (
              <div className="text-xs text-stone-500 font-mono flex items-center gap-1.5 pt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-300"></span>
                <span>No promotional discount or coupon detected for this offer. Standard base pricing applies.</span>
              </div>
            )}

            {/* Shipping & Returns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-stone-800">
                    <Truck className="w-3.5 h-3.5 text-[#F97316]" />
                    <span>Shipping Policy</span>
                  </div>
                  {getClaimStateBadge(offer.shipping.state)}
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  {offer.shipping.summary}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-stone-800">
                    <RotateCcw className="w-3.5 h-3.5 text-[#F97316]" />
                    <span>Return Policy</span>
                  </div>
                  {getClaimStateBadge(offer.returns.state)}
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  {offer.returns.summary}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 2: EVIDENCE CLAIMS BREAKDOWN (Section 11) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F97316]" />
                <h3 className="text-xs uppercase font-mono font-bold text-stone-900 tracking-wider">
                  Commercial Claims & Epistemic Evidence
                </h3>
              </div>
              <span className="text-[10px] font-mono text-stone-500">
                {offer.evidenceClaims.length} Grounded Claims
              </span>
            </div>

            <div className="space-y-2">
              {offer.evidenceClaims.map((claim) => (
                <div 
                  key={claim.id}
                  className="p-3.5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900 font-mono">{claim.attribute}:</span>
                      <span className="text-stone-700">{claim.value}</span>
                    </div>
                    {getClaimStateBadge(claim.state)}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono text-stone-500 pt-1.5 border-t border-stone-100">
                    <div>
                      <span className="text-stone-400">Source:</span> {claim.source}
                    </div>
                    <div>
                      <span className="text-stone-400">Detected:</span> {claim.detectedAt}
                    </div>
                    <div>
                      <span className="text-stone-400">Valid:</span> {claim.validUntil}
                    </div>
                    <div>
                      <span className="text-stone-400">Confidence:</span> {claim.confidence}
                    </div>
                  </div>

                  {claim.notes && (
                    <div className="text-[11px] text-amber-700 font-sans italic bg-amber-50/50 p-2 rounded-xl border border-amber-200/50">
                      Note: {claim.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: WHAT AIXSHOP KNOWS / CANNOT VERIFY / WHY IT MATTERS (Section 23) */}
          <div className="p-5 rounded-3xl bg-white border border-stone-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F97316]" />
                <h3 className="text-xs uppercase font-mono font-bold text-stone-900 tracking-wider">
                  Epistemic Knowledge Boundaries
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[#F97316] font-semibold">
                Reasoning Protocol
              </span>
            </div>

            {/* What AIXSHOP Knows */}
            <div className="space-y-1">
              <div className="text-xs font-bold text-emerald-700 font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>WHAT AIXSHOP KNOWS</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed pl-3 border-l-2 border-emerald-500">
                {offer.whatAIXShopKnows}
              </p>
            </div>

            {/* What AIXSHOP Cannot Verify */}
            <div className="space-y-1">
              <div className="text-xs font-bold text-amber-700 font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                <span>WHAT AIXSHOP CANNOT VERIFY</span>
              </div>
              <ul className="space-y-1 pl-3 border-l-2 border-amber-500">
                {offer.whatAIXShopCannotVerify.map((gap, idx) => (
                  <li key={idx} className="text-xs text-stone-600 leading-relaxed list-disc list-inside">
                    {gap}
                  </li>
                ))}
              </ul>
            </div>

            {/* Why It Matters */}
            <div className="space-y-1 pt-1">
              <div className="text-xs font-bold text-stone-900 font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></span>
                <span>WHY IT MATTERS ({offer.whyItMatters.category.toUpperCase()})</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed pl-3 border-l-2 border-[#F97316]">
                {offer.whyItMatters.explanation}
              </p>
            </div>

            {/* Recommended Next Step */}
            <div className="p-3.5 rounded-2xl bg-orange-50/60 border border-orange-200 text-xs">
              <span className="font-bold text-[#F97316] font-mono">RECOMMENDED ACTION: </span>
              <span className="text-stone-800">{offer.recommendedNextStep}</span>
            </div>
          </div>

          {/* Issues Section */}
          {offer.issues.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-rose-700 font-mono text-xs font-bold uppercase">
                <AlertTriangle className="w-4 h-4" />
                <span>Detected Offer Issues ({offer.issues.length})</span>
              </div>

              <div className="space-y-2">
                {offer.issues.map((iss) => (
                  <div key={iss.id} className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-800">{iss.type}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200 font-medium">
                        {iss.severity} Severity
                      </span>
                    </div>
                    <p className="text-stone-700 leading-relaxed">
                      {iss.description}
                    </p>
                    <div className="pt-2 border-t border-rose-200/60 flex items-center justify-between">
                      <span className="text-stone-500 text-[11px]">Suggested: {iss.suggestedAction}</span>
                      <button
                        type="button"
                        onClick={() => onNavigateFixWorkflow(iss.description)}
                        className="text-[#F97316] hover:text-orange-700 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        <span>Review Issue (P04)</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 border-t border-stone-200 bg-white flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] font-mono text-stone-500">
            Product ≠ Offer Perspective
          </div>

          <div className="flex items-center gap-2">
            {offer.isPrimaryExample && (
              <button
                type="button"
                onClick={onNavigateReport}
                className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-orange-50 text-stone-700 hover:text-[#F97316] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer border border-stone-200"
              >
                <FileText className="w-3.5 h-3.5 text-[#F97316]" />
                <span>View Product Intelligence (P03)</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              Close Drawer
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
