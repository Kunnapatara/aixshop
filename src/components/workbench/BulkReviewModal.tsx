import React from 'react';
import { X, AlertOctagon, Flame, HelpCircle, CheckCircle2, ArrowRight, Layers } from 'lucide-react';
import { WorkbenchProduct } from '../../types/workbench';

interface BulkReviewModalProps {
  selectedProducts: WorkbenchProduct[];
  isOpen: boolean;
  onClose: () => void;
  onInspectProduct: (product: WorkbenchProduct) => void;
}

export const BulkReviewModal: React.FC<BulkReviewModalProps> = ({
  selectedProducts,
  isOpen,
  onClose,
  onInspectProduct
}) => {
  if (!isOpen) return null;

  const criticalCount = selectedProducts.filter(p => p.priority === 'Critical').length;
  const conflictCount = selectedProducts.reduce((acc, p) => acc + p.evidenceBreakdown.conflict, 0);
  const missingCount = selectedProducts.reduce((acc, p) => acc + p.evidenceBreakdown.missing, 0);
  const avgCoverage = Math.round(
    selectedProducts.reduce((acc, p) => acc + p.intelligenceCoverage, 0) / (selectedProducts.length || 1)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#FAF8F5] border border-stone-200 rounded-3xl shadow-2xl overflow-hidden text-stone-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-white flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200 font-medium">
                Bulk Intelligence Review
              </span>
              <span className="text-xs text-stone-500 font-mono">
                {selectedProducts.length} Products Selected
              </span>
            </div>
            <h3 className="text-lg font-bold text-stone-900 tracking-tight">
              Triage & Health Summary for Selected SKUs
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Aggregate Stats Cards */}
        <div className="p-5 border-b border-stone-200 grid grid-cols-4 gap-3 bg-white">
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 shadow-xs">
            <div className="text-[10px] text-stone-500 font-mono">Avg Coverage</div>
            <div className="text-lg font-bold font-mono text-[#F97316] mt-0.5">{avgCoverage}%</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200 shadow-xs">
            <div className="text-[10px] text-stone-500 font-mono">Critical Items</div>
            <div className="text-lg font-bold font-mono text-rose-700 mt-0.5">{criticalCount}</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 shadow-xs">
            <div className="text-[10px] text-stone-500 font-mono">Total Conflicts</div>
            <div className="text-lg font-bold font-mono text-amber-700 mt-0.5">{conflictCount}</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-orange-50/60 border border-orange-200 shadow-xs">
            <div className="text-[10px] text-stone-500 font-mono">Missing Claims</div>
            <div className="text-lg font-bold font-mono text-orange-700 mt-0.5">{missingCount}</div>
          </div>
        </div>

        {/* Product Items List */}
        <div className="p-5 space-y-2.5 max-h-[55vh] overflow-y-auto">
          <div className="text-xs font-bold text-stone-600 font-mono uppercase mb-2">
            Selected Products Breakdown:
          </div>

          {selectedProducts.map((p) => (
            <div 
              key={p.id}
              className="p-4 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 transition-colors flex items-center justify-between gap-4 shadow-xs"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-stone-900 text-xs truncate">{p.name}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
                    {p.sku}
                  </span>
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                    p.priority === 'Critical' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                    p.priority === 'High' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                    'bg-stone-100 text-stone-600 border border-stone-200'
                  }`}>
                    {p.priority}
                  </span>
                </div>
                <div className="text-[11px] text-stone-500 truncate">
                  {p.evidenceSummary}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right font-mono text-xs">
                  <span className="text-[#F97316] font-bold">{p.intelligenceCoverage}%</span>
                  <div className="text-[10px] text-stone-500">{p.dominantEvidenceState}</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onInspectProduct(p);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#F97316] text-xs font-semibold font-mono transition-colors flex items-center gap-1 border border-orange-200 cursor-pointer"
                >
                  <span>Inspect</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 bg-white flex items-center justify-between text-xs">
          <span className="text-stone-500 font-mono text-[11px]">
            Preview triage summary across {selectedProducts.length} selected items
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
