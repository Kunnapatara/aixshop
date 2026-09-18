import React from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Download, 
  Search,
  DollarSign,
  Package,
  Layers,
  ShieldCheck
} from 'lucide-react';

interface OffersHeaderProps {
  onBackToOverview: () => void;
  onNavigateProducts: () => void;
  onAnalyzeProduct: () => void;
  onOpenExportModal: () => void;
  totalOffersCount: number;
  totalProductsCount: number;
}

export const OffersHeader: React.FC<OffersHeaderProps> = ({
  onBackToOverview,
  onNavigateProducts,
  onAnalyzeProduct,
  onOpenExportModal,
  totalOffersCount,
  totalProductsCount
}) => {
  return (
    <div className="bg-white border-b border-stone-200 pt-6 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-4 font-mono">
          <button
            type="button"
            onClick={onBackToOverview}
            className="hover:text-[#F97316] transition-colors flex items-center gap-1 cursor-pointer font-medium"
          >
            <span>Overview</span>
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={onNavigateProducts}
            className="hover:text-[#F97316] transition-colors cursor-pointer font-medium"
          >
            <span>Products</span>
          </button>
          <span>/</span>
          <span className="text-[#F97316] font-bold">Offers & Pricing</span>
        </div>

        {/* Header Main Grid */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F97316]">
                <DollarSign className="w-5 h-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                Offers & Pricing
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200 text-xs font-mono font-medium">
                Representative Merchant · Preview Mode
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200 text-xs font-mono">
                {totalOffersCount} Offers across {totalProductsCount} SKUs
              </span>
            </div>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              Understand observed commercial offers, price conditions, availability, and evidence across your catalog.
            </p>

            <p className="text-xs text-stone-500 leading-relaxed border-l-2 border-[#F97316] pl-3 pt-0.5 font-sans">
              <strong className="text-stone-800">AIXSHOP Immutable Principle:</strong> AIXSHOP separates canonical product identity from seller-specific commercial offers so pricing intelligence remains time-aware, source-aware, and evidence-backed.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 self-start lg:self-center">
            <button
              type="button"
              onClick={onOpenExportModal}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-900 border border-stone-200 text-xs font-semibold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              title="Preview Offer Intelligence export payload"
            >
              <Download className="w-3.5 h-3.5 text-stone-500" />
              <span>Export Offer Intelligence</span>
            </button>

            <button
              type="button"
              onClick={onBackToOverview}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 text-stone-700 hover:text-stone-900 border border-stone-200 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview</span>
            </button>

            <button
              type="button"
              onClick={onAnalyzeProduct}
              className="px-4 py-2 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Analyze a Product</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
