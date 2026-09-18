import React from 'react';
import { CheckSquare, Eye, SplitSquareVertical, FileDown, X, AlertOctagon, Flame, HelpCircle } from 'lucide-react';
import { WorkbenchProduct } from '../../types/workbench';

interface BulkActionBarProps {
  selectedProducts: WorkbenchProduct[];
  onClearSelection: () => void;
  onReviewSelected: () => void;
  onCompareIntelligence: () => void;
  onExportPreview: () => void;
}

export const BulkActionBar: React.FC<BulkActionBarProps> = ({
  selectedProducts,
  onClearSelection,
  onReviewSelected,
  onCompareIntelligence,
  onExportPreview
}) => {
  if (selectedProducts.length === 0) return null;

  const criticalCount = selectedProducts.filter(p => p.priority === 'Critical').length;
  const conflictCount = selectedProducts.reduce((acc, p) => acc + p.evidenceBreakdown.conflict, 0);
  const missingCount = selectedProducts.reduce((acc, p) => acc + p.evidenceBreakdown.missing, 0);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-4xl animate-in slide-in-from-bottom-4 duration-200">
      <div className="bg-white/95 border border-stone-200 rounded-2xl p-3 sm:px-5 shadow-xl shadow-stone-900/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        {/* Left summary counter */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 font-bold font-mono text-stone-900 text-sm">
            <CheckSquare className="w-4 h-4 text-[#F97316]" />
            <span>{selectedProducts.length}</span>
            <span className="text-stone-500 text-xs font-normal">Selected</span>
          </div>

          <span className="text-stone-300 hidden sm:inline">•</span>

          <div className="flex items-center gap-3 text-[11px] font-mono">
            {criticalCount > 0 && (
              <span className="flex items-center gap-1 text-rose-600 font-medium">
                <AlertOctagon className="w-3 h-3" />
                <span>{criticalCount} Critical</span>
              </span>
            )}
            {conflictCount > 0 && (
              <span className="flex items-center gap-1 text-amber-600 font-medium">
                <Flame className="w-3 h-3" />
                <span>{conflictCount} Conflicts</span>
              </span>
            )}
            {missingCount > 0 && (
              <span className="flex items-center gap-1 text-orange-600 font-medium">
                <HelpCircle className="w-3 h-3" />
                <span>{missingCount} Missing Claims</span>
              </span>
            )}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onReviewSelected}
            className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold transition-colors flex items-center gap-1.5 border border-stone-200 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Review Selected</span>
          </button>

          <button
            type="button"
            onClick={onCompareIntelligence}
            disabled={selectedProducts.length < 2}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-colors flex items-center gap-1.5 border ${
              selectedProducts.length >= 2
                ? 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-200 cursor-pointer'
                : 'bg-stone-50 text-stone-400 border-stone-200 cursor-not-allowed'
            }`}
            title={selectedProducts.length < 2 ? 'Select at least 2 products to compare' : 'Compare side by side'}
          >
            <SplitSquareVertical className="w-3.5 h-3.5 text-purple-600" />
            <span>Compare ({selectedProducts.length})</span>
          </button>

          <button
            type="button"
            onClick={onExportPreview}
            className="px-3.5 py-1.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5 text-white" />
            <span>Export Preview</span>
          </button>

          <button
            type="button"
            onClick={onClearSelection}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors ml-1 cursor-pointer"
            title="Deselect all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
