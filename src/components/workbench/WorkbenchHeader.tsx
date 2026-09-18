import React from 'react';
import { ArrowLeft, PlusCircle, ShieldCheck, Database } from 'lucide-react';

interface WorkbenchHeaderProps {
  onBackToOverview: () => void;
  onAnalyzeProduct: () => void;
  totalProductsCount: number;
}

export const WorkbenchHeader: React.FC<WorkbenchHeaderProps> = ({
  onBackToOverview,
  onAnalyzeProduct,
  totalProductsCount
}) => {
  return (
    <div className="border-b border-stone-200/80 bg-[#FAF8F5]/90 backdrop-blur-md sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Top Breadcrumb row */}
        <div className="flex items-center justify-between gap-4 mb-2 text-xs">
          <div className="flex items-center gap-2 text-stone-500 font-medium">
            <button
              type="button"
              onClick={onBackToOverview}
              className="hover:text-stone-900 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Merchant Overview</span>
            </button>
            <span className="text-stone-300">/</span>
            <span className="text-[#F97316] font-bold">Products Intelligence Workbench</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white text-stone-700 border border-stone-200/80 font-mono text-[11px] shadow-xs">
              <Database className="w-3 h-3 text-[#F97316]" />
              <span>Catalog Scope: {totalProductsCount} Products</span>
            </span>
          </div>
        </div>

        {/* Main Title Row & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight flex items-center gap-2.5">
                <span>Products</span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                  Workbench
                </span>
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Representative Merchant · Preview Mode</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-3xl">
              Inspect product identity, evidence, issues, and discovery readiness across the catalog.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onBackToOverview}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold border border-stone-200/80 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-stone-500" />
              <span>Back to Overview</span>
            </button>

            <button
              type="button"
              onClick={onAnalyzeProduct}
              className="px-4 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5 text-white" />
              <span>Analyze a Product</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
