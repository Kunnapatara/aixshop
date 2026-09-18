// src/components/monitoring/MonitoringHeader.tsx
import React from 'react';
import { 
  Activity, 
  Search, 
  ArrowLeft, 
  Package, 
  DollarSign, 
  ShieldAlert, 
  Eye,
  AlertCircle
} from 'lucide-react';

interface MonitoringHeaderProps {
  onNavigateAnalysis: () => void;
  onNavigateOverview: () => void;
  onNavigateProducts?: () => void;
  onNavigateOffers?: () => void;
  onNavigateIssues?: () => void;
}

export const MonitoringHeader: React.FC<MonitoringHeaderProps> = ({
  onNavigateAnalysis,
  onNavigateOverview,
  onNavigateProducts,
  onNavigateOffers,
  onNavigateIssues
}) => {
  return (
    <div className="bg-white border-b border-stone-200 pb-6 pt-7 px-4 sm:px-6 lg:px-8 shadow-2xs">
      <div className="max-w-7xl mx-auto">
        {/* Top Badges & Breadcrumb Context */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onNavigateOverview}
              className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-900 font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Overview (P05)</span>
            </button>
            <span className="text-stone-300">/</span>
            <span className="text-xs font-mono text-[#F97316] font-bold">Page 09 · Monitoring Intelligence</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-orange-50 text-[#F97316] border border-orange-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse"></span>
              Representative Merchant · Monitoring Preview
            </span>
          </div>
        </div>

        {/* Title, Subtitle, and Primary Actions */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#F97316] shrink-0 shadow-3xs">
                <Activity className="w-5 h-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                Monitoring
              </h1>
            </div>

            <p className="text-base text-stone-700 leading-relaxed font-medium">
              Detect changes in product intelligence, commercial offers, and evidence before they become expensive information failures.
            </p>

            <p className="text-xs text-stone-500 leading-normal">
              QRxMENU monitors the integrity of the product intelligence layer — not traffic, clicks, or generic website metrics.
            </p>
          </div>

          {/* Explicitly permitted header actions only */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-1">
            {onNavigateProducts && (
              <button
                type="button"
                onClick={onNavigateProducts}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-semibold border border-stone-200 transition-colors cursor-pointer shadow-3xs"
                title="View Products Workbench (P06)"
              >
                <Package className="w-3.5 h-3.5 text-stone-500" />
                <span>View Products (P06)</span>
              </button>
            )}

            {onNavigateOffers && (
              <button
                type="button"
                onClick={onNavigateOffers}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-semibold border border-stone-200 transition-colors cursor-pointer shadow-3xs"
                title="View Offers & Pricing (P07)"
              >
                <DollarSign className="w-3.5 h-3.5 text-stone-500" />
                <span>View Offers (P07)</span>
              </button>
            )}

            {onNavigateIssues && (
              <button
                type="button"
                onClick={onNavigateIssues}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-100/80 text-[#F97316] text-xs font-bold border border-orange-200 transition-colors cursor-pointer shadow-3xs"
                title="Triage in Issues & Recovery (P10)"
              >
                <AlertCircle className="w-3.5 h-3.5 text-[#F97316]" />
                <span>Issues Queue (P10)</span>
              </button>
            )}

            <button
              type="button"
              onClick={onNavigateAnalysis}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F97316] hover:bg-orange-600 text-white text-xs font-bold shadow-3xs transition-all cursor-pointer"
              title="Analyze a Product Extraction (P02)"
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
