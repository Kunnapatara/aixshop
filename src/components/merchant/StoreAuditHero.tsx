// src/components/merchant/StoreAuditHero.tsx
// Merchant Command Center Header for AIXSHOP Home
// Answers: 1. Store Status  2. What needs your attention?  3. Priority Breakdown & Direct Routing

import React, { useState } from 'react';
import { 
  Store, 
  Globe, 
  Clock, 
  ArrowRight, 
  RefreshCw, 
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { CANONICAL_MERCHANT, CANONICAL_SYSTEM_KPIS } from '../../data/canonicalCatalog';

interface StoreAuditHeroProps {
  openIssuesCount: number;
  readinessScore?: number;
  onAuditStore?: (url: string) => void;
  onStartFixing?: () => void;
  onRecheckStore?: () => void;
  isRechecking?: boolean;
}

export const StoreAuditHero: React.FC<StoreAuditHeroProps> = ({
  openIssuesCount,
  readinessScore = CANONICAL_SYSTEM_KPIS.discoveryReadinessPct,
  onAuditStore,
  onStartFixing,
  onRecheckStore,
  isRechecking = false
}) => {
  const [storeUrlInput, setStoreUrlInput] = useState<string>(CANONICAL_MERCHANT.domain);
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);

  const handleRunRecheck = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (onRecheckStore) {
      onRecheckStore();
    } else if (onAuditStore) {
      onAuditStore(storeUrlInput);
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-stone-200/80 shadow-xs space-y-5 sm:space-y-6 overflow-hidden">
      
      {/* 1. Store Status & Provenance Bar (Section 5A) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-stone-100">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200/80 flex items-center gap-1.5">
            <Store className="w-3.5 h-3.5 text-orange-600" />
            <span>Store Audit</span>
          </span>
          <span className="text-xs text-stone-600 font-mono font-medium flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-stone-400" />
            <span>shop.aeropulse.com</span>
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Connected
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
            Preview Mode · Demo Merchant
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Clock className="w-3.5 h-3.5 text-stone-400" />
          <span>Last checked: <strong className="text-stone-800">2 hours ago</strong></span>
        </div>
      </div>

      {/* 2. Primary Question: What needs your attention? (Section 5B) */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900 tracking-tight">
            What needs your attention?
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            <strong>{openIssuesCount}</strong> items need attention across your catalog. Fixing these can improve how your catalog is understood and recommended by AI shopping systems.
          </p>
        </div>

        {/* Priority Counts Breakdown — Responsive 3-column on mobile */}
        <div className="grid grid-cols-3 gap-2 w-full sm:w-auto sm:flex sm:flex-wrap sm:items-center sm:gap-3 shrink-0">
          <div className="p-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl bg-rose-50 border border-rose-200 text-center min-w-0 sm:min-w-[90px]">
            <div className="text-lg sm:text-2xl font-black text-rose-900">3</div>
            <div className="text-[9px] sm:text-[10px] font-bold text-rose-700 uppercase tracking-wider">High Priority</div>
          </div>
          <div className="p-2 sm:px-4 sm:py-2.5 rounded-2xl bg-amber-50 border border-amber-200 text-center min-w-0 sm:min-w-[90px]">
            <div className="text-lg sm:text-2xl font-black text-amber-900">5</div>
            <div className="text-[9px] sm:text-[10px] font-bold text-amber-700 uppercase tracking-wider">Medium Priority</div>
          </div>
          <div className="p-2 sm:px-4 sm:py-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center min-w-0 sm:min-w-[90px]">
            <div className="text-lg sm:text-2xl font-black text-emerald-900">4</div>
            <div className="text-[9px] sm:text-[10px] font-bold text-emerald-700 uppercase tracking-wider">Low Priority</div>
          </div>
        </div>
      </div>

      {/* 3. Action Trigger Bar & Honest Re-evaluate Tooling (Section 11) */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-t border-stone-100">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={onStartFixing}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl sm:rounded-2xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all cursor-pointer text-center"
          >
            <span>Review Issues ({openIssuesCount} to Fix)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {!showUrlInput ? (
            <button
              type="button"
              onClick={() => handleRunRecheck()}
              disabled={isRechecking}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl sm:rounded-2xl bg-stone-900 hover:bg-black text-white text-xs font-bold shadow-xs transition-all cursor-pointer disabled:opacity-50 text-center"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRechecking ? 'animate-spin' : ''}`} />
              <span>{isRechecking ? 'Evaluating...' : 'Audit My Store'}</span>
            </button>
          ) : (
            <form onSubmit={handleRunRecheck} className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={storeUrlInput}
                onChange={(e) => setStoreUrlInput(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-orange-500 flex-1 sm:w-48 font-mono text-stone-800"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-black cursor-pointer"
              >
                Re-check
              </button>
              <button
                type="button"
                onClick={() => setShowUrlInput(false)}
                className="text-xs text-stone-400 hover:text-stone-600 px-1"
              >
                ✕
              </button>
            </form>
          )}
        </div>

        <p className="text-[11px] text-stone-400 max-w-sm sm:text-right">
          * Preview evaluation based on current catalog data model. Does not represent live AI search visibility.
        </p>
      </div>

      {/* 4. Surface Prerequisites & Catalog Readiness (Honest truth boundaries) */}
      <div className="pt-4 border-t border-stone-100 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-bold text-stone-700">
          <span>Catalog Data Prerequisites</span>
          <span className="text-stone-500 font-normal">Catalog Readiness: {readinessScore}%</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/60 flex items-center justify-between">
            <span className="text-stone-700 font-medium">Google Shopping</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Prerequisites Met</span>
          </div>
          <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/60 flex items-center justify-between">
            <span className="text-stone-700 font-medium">AI Answer Engines</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">Needs Attention</span>
          </div>
          <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/60 flex items-center justify-between">
            <span className="text-stone-700 font-medium">Perplexity Shopping</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Prerequisites Met</span>
          </div>
          <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/60 flex items-center justify-between">
            <span className="text-stone-700 font-medium">Meta & Ads Feeds</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Prerequisites Met</span>
          </div>
        </div>
      </div>

    </div>
  );
};
