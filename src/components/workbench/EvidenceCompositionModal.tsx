import React from 'react';
import { X, ShieldCheck, Layers, Eye, CheckCircle2, Sparkles, Flame, HelpCircle, ArrowRight } from 'lucide-react';
import { WorkbenchProduct } from '../../types/workbench';

interface EvidenceCompositionModalProps {
  product: WorkbenchProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenReport?: () => void;
}

export const EvidenceCompositionModal: React.FC<EvidenceCompositionModalProps> = ({
  product,
  isOpen,
  onClose,
  onOpenReport
}) => {
  if (!isOpen || !product) return null;

  const totalClaims = 
    product.evidenceBreakdown.observed +
    product.evidenceBreakdown.verified +
    product.evidenceBreakdown.derived +
    product.evidenceBreakdown.conflict +
    product.evidenceBreakdown.missing;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-[#FAF8F5] border border-stone-200 rounded-3xl shadow-2xl overflow-hidden text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-white flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200 font-medium">
                Evidence Composition
              </span>
              <span className="text-xs text-stone-400 font-mono">{product.sku}</span>
            </div>
            <h3 className="text-lg font-bold text-stone-900 tracking-tight">{product.name}</h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Why does AIXSHOP assign an Intelligence Coverage score of <strong className="text-[#F97316]">{product.intelligenceCoverage}%</strong>?
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Coverage Definition Callout */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200 text-xs text-stone-600 leading-relaxed shadow-xs">
            <span className="font-bold text-stone-900">Rule of Coverage: </span>
            Intelligence Coverage measures the proportion of modeled product attributes supported by verified or observed ground truth. It is NOT a vanity SEO score or subjective quality metric.
          </div>

          {/* Composition Breakdown Grid */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider font-mono">
              Claim Epistemic Breakdown ({totalClaims} Total Modeled Attributes)
            </h4>

            {/* Merchant Verified */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-emerald-900">Merchant Verified</div>
                  <div className="text-[11px] text-stone-600">Attested via manufacturer spec sheet or laboratory certificate</div>
                </div>
              </div>
              <span className="text-sm font-bold font-mono text-emerald-700">{product.evidenceBreakdown.verified} claims</span>
            </div>

            {/* Observed */}
            <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <Eye className="w-4 h-4 text-blue-600 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-blue-900">Directly Observed</div>
                  <div className="text-[11px] text-stone-600">Extracted from public storefront DOM or retailer feeds</div>
                </div>
              </div>
              <span className="text-sm font-bold font-mono text-blue-700">{product.evidenceBreakdown.observed} claims</span>
            </div>

            {/* Derived */}
            <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-purple-900">Algorithmically Derived</div>
                  <div className="text-[11px] text-stone-600">Synthesized from multi-source corroboration patterns</div>
                </div>
              </div>
              <span className="text-sm font-bold font-mono text-purple-700">{product.evidenceBreakdown.derived} claims</span>
            </div>

            {/* Conflict */}
            <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <Flame className="w-4 h-4 text-rose-600 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-rose-900">Active Conflicts</div>
                  <div className="text-[11px] text-stone-600">Contradictory claims between merchant and partner feeds</div>
                </div>
              </div>
              <span className="text-sm font-bold font-mono text-rose-700">{product.evidenceBreakdown.conflict} claims</span>
            </div>

            {/* Missing */}
            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-amber-900">Missing Evidence</div>
                  <div className="text-[11px] text-stone-600">Attributes with zero verifiable source citations</div>
                </div>
              </div>
              <span className="text-sm font-bold font-mono text-amber-700">{product.evidenceBreakdown.missing} claims</span>
            </div>
          </div>

          {/* Evidence Summary from data */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200 text-xs shadow-xs">
            <span className="font-bold text-stone-900 block mb-1">Diagnostic Summary:</span>
            <p className="text-stone-600 leading-relaxed">{product.evidenceSummary}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-white flex items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-stone-500">
            Dominant Condition: <strong className="text-stone-800">{product.dominantEvidenceState}</strong>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              Close
            </button>
            {product.isPrimaryExample && onOpenReport && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenReport();
                }}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-[#F97316] hover:bg-[#EA580C] shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Product Intelligence Report</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
