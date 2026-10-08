// src/components/merchant/StoreAuditHero.tsx
// Store-First Diagnostic Header & 2-Layer Store Audit for AIXSHOP
// Answers: 1. How is my store doing? 2. What needs attention? 3. What should I do next?

import React, { useState } from 'react';
import { 
  Store, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  RefreshCw, 
  ShieldCheck, 
  Globe, 
  Sparkles, 
  Layers, 
  ExternalLink,
  ChevronDown,
  Info
} from 'lucide-react';
import { CANONICAL_MERCHANT, CANONICAL_SYSTEM_KPIS } from '../../data/canonicalCatalog';
import { READINESS_TRUTH_BOUNDARIES } from '../../state/canonicalReadiness';

interface StoreAuditHeroProps {
  readinessScore: number;
  openIssuesCount: number;
  onAuditStore?: (url: string) => void;
  onStartFixing?: () => void;
  onRecheckStore?: () => void;
  isRechecking?: boolean;
}

export const StoreAuditHero: React.FC<StoreAuditHeroProps> = ({
  readinessScore,
  openIssuesCount,
  onAuditStore,
  onStartFixing,
  onRecheckStore,
  isRechecking = false
}) => {
  const [storeUrlInput, setStoreUrlInput] = useState<string>(CANONICAL_MERCHANT.domain);
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);

  const handleRunAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAuditStore) {
      onAuditStore(storeUrlInput);
    } else if (onRecheckStore) {
      onRecheckStore();
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-xs space-y-6">
      
      {/* 1. Store Header & Simple Scan Entry */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-100">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200/80 flex items-center gap-1.5">
              <Store className="w-3.5 h-3.5 text-orange-600" />
              <span>Store Audit</span>
            </span>
            <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-stone-400" />
              <span>{CANONICAL_MERCHANT.domain}</span>
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Connected
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
              Preview Mode · Demo Merchant
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            {CANONICAL_MERCHANT.name}
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
            Evaluate how well your store products, specifications, and commercial offers are structured for AI Shopping assistants — identify what to fix to improve AI catalog discoverability.
          </p>
        </div>

        {/* Quick Re-audit Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 self-start lg:self-center shrink-0">
          {!showUrlInput ? (
            <>
              <button
                type="button"
                onClick={() => {
                  if (onAuditStore) {
                    onAuditStore(storeUrlInput);
                  } else if (onRecheckStore) {
                    onRecheckStore();
                  }
                }}
                disabled={isRechecking}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-stone-900 hover:bg-black text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRechecking ? 'animate-spin' : ''}`} />
                <span>{isRechecking ? 'Auditing Store...' : 'Audit My Store'}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowUrlInput(true)}
                className="px-3 py-3 rounded-2xl text-xs text-stone-500 hover:text-stone-800 hover:bg-stone-50 border border-stone-200 font-medium transition-colors cursor-pointer"
                title="Change Store URL"
              >
                Audit Other URL
              </button>
            </>
          ) : (
            <form onSubmit={handleRunAudit} className="flex items-center gap-2">
              <input
                type="text"
                value={storeUrlInput}
                onChange={(e) => setStoreUrlInput(e.target.value)}
                placeholder="https://your-store.com"
                className="px-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-orange-500 w-56 font-mono text-stone-800"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-black cursor-pointer"
              >
                Audit
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
      </div>

      {/* 2. Store Audit Result: 3 Clear Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        
        {/* Pillar 1: Readiness Score Card */}
        <div className="md:col-span-4 p-6 rounded-3xl bg-[#FAF8F5] border border-stone-200/80 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block">
              Store Readiness
            </span>
            <h2 className="text-base font-bold text-stone-800 mt-0.5">
              How Ready is the Catalog?
            </h2>
            <p className="text-xs text-stone-500 mt-1 leading-normal">
              Internal catalog information quality evaluated across {CANONICAL_SYSTEM_KPIS.totalCatalogProducts} products.
            </p>
          </div>

          <div className="flex items-baseline gap-3 my-2">
            <span className="text-5xl font-black text-stone-900 tracking-tight">
              {readinessScore}%
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full self-start">
                {readinessScore >= 95 ? 'High Readiness' : readinessScore >= 75 ? 'Good Foundation' : 'Needs Work'}
              </span>
              <span className="text-[11px] text-stone-400 mt-1">
                Target: 95%+
              </span>
            </div>
          </div>

          <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${readinessScore}%` }}
            />
          </div>

          <div className="text-[10px] text-stone-400 font-medium">
            {READINESS_TRUTH_BOUNDARIES.previewModel} · {READINESS_TRUTH_BOUNDARIES.externalUnchanged}
          </div>
        </div>

        {/* Pillar 2: Findings Priority Breakdown */}
        <div className="md:col-span-5 p-6 rounded-3xl bg-white border border-stone-200/80 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                Store Findings
              </span>
              <span className="text-xs font-mono font-bold text-stone-600">
                12 Items to Address
              </span>
            </div>
            <h3 className="text-base font-bold text-stone-900 mt-0.5">
              Prioritized by Urgency
            </h3>
          </div>

          {/* 3 Priority Tiers */}
          <div className="grid grid-cols-3 gap-2.5 py-1">
            <div className="p-3 rounded-2xl bg-rose-50/80 border border-rose-200 text-center space-y-1">
              <span className="text-xs font-bold text-rose-800 block">Must Fix</span>
              <span className="text-2xl font-black text-rose-900 block">3</span>
              <span className="text-[10px] text-rose-600">Blocks AI answers</span>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-center space-y-1">
              <span className="text-xs font-bold text-amber-800 block">Improve</span>
              <span className="text-2xl font-black text-amber-900 block">5</span>
              <span className="text-[10px] text-amber-600">Increases clarity</span>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center space-y-1">
              <span className="text-xs font-bold text-emerald-800 block">Healthy</span>
              <span className="text-2xl font-black text-emerald-900 block">4</span>
              <span className="text-[10px] text-emerald-600">Complete data</span>
            </div>
          </div>

          <p className="text-xs text-stone-500">
            Address items in <strong>Must Fix (3 issues)</strong> to ensure AI models can confirm technical specifications and pricing.
          </p>
        </div>

        {/* Pillar 3: Next Immediate Action */}
        <div className="md:col-span-3 p-6 rounded-3xl bg-gradient-to-br from-stone-900 to-stone-800 text-white flex flex-col justify-between space-y-4 shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-400">
              Next Action
            </span>
            <h3 className="text-base font-bold text-white">
              Start with Top Issues
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed pt-1">
              There are <strong>{openIssuesCount} products</strong> with missing specifications requiring source resolution.
            </p>
          </div>

          <div className="space-y-2 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-orange-500/30 text-orange-400 flex items-center justify-center font-bold text-[10px]">1</span>
              <span>Review findings below</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-stone-700 text-stone-400 flex items-center justify-center font-bold text-[10px]">2</span>
              <span>Fix at store source (Shopify)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-stone-700 text-stone-400 flex items-center justify-center font-bold text-[10px]">3</span>
              <span>Re-check to update readiness</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onStartFixing}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#F97316] hover:bg-[#EA580C] text-white text-xs font-bold transition-all shadow-xs hover:shadow cursor-pointer mt-2"
          >
            <span>View Issues to Fix</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* 3. Two-Layer Store Audit: Store-Level vs Catalog-Level Signals */}
      <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/60 pb-2.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <h4 className="text-xs font-bold text-stone-900">
              Two-Layer Audit Signals (Store & Catalog Integrity)
            </h4>
          </div>
          <span className="text-[11px] text-stone-500 font-mono">
            {CANONICAL_MERCHANT.catalogSize} Products · {CANONICAL_MERCHANT.activeCommercialOffers} Commercial Offers
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Layer A: Store-Level Signals */}
          <div className="bg-white p-4 rounded-xl border border-stone-200/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">1. Store-Level Signals</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">Passed 3 / 4</span>
            </div>
            <ul className="text-xs text-stone-600 space-y-1">
              <li className="flex items-center gap-2 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Store identity & domain: Verified ({CANONICAL_MERCHANT.domain})</span>
              </li>
              <li className="flex items-center gap-2 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Primary brand & merchant licensing: Verified</span>
              </li>
              <li className="flex items-center gap-2 text-[11px]">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Return policy: Missing structured Schema.org MerchantReturnPolicy</span>
              </li>
            </ul>
          </div>

          {/* Layer B: Catalog-Level Signals */}
          <div className="bg-white p-4 rounded-xl border border-stone-200/70 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">2. Catalog-Level Signals</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800">8 Items Need Work</span>
            </div>
            <ul className="text-xs text-stone-600 space-y-1">
              <li className="flex items-center gap-2 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Pricing & in-stock status: Synchronized with storefront checkout</span>
              </li>
              <li className="flex items-center gap-2 text-[11px]">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Specification completeness: 8 products lack structured technical attributes</span>
              </li>
              <li className="flex items-center gap-2 text-[11px]">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Discrepancy arbitration: Competing retailers list conflicting upper mesh specs</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. AI Commerce Readiness by Surface (Truth Boundaries Enforced) */}
      <div className="p-5 rounded-2xl bg-white border border-stone-200/80 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <h4 className="text-xs font-bold text-stone-900">
              AI Commerce Catalog Readiness (5 Supported Surfaces)
            </h4>
          </div>
          <span className="text-[10px] text-stone-400 font-medium">
            * Evaluated from internal catalog structured data readiness. Not an external ranking guarantee. Observed live visibility is marked as not yet observed.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
          {/* Surface 1: Google */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">Google</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800">84% Ready</span>
            </div>
            <p className="text-[11px] text-stone-500 leading-normal">
              Structured catalog readiness for Search & Shopping feeds. (Observed visibility: Not yet observed)
            </p>
          </div>

          {/* Surface 2: ChatGPT */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">ChatGPT</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800">68% Ready</span>
            </div>
            <p className="text-[11px] text-stone-500 leading-normal">
              Missing deep technical attributes (Drop, Plate, Materials). (Observed visibility: Not yet observed)
            </p>
          </div>

          {/* Surface 3: Gemini */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">Gemini</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800">72% Ready</span>
            </div>
            <p className="text-[11px] text-stone-500 leading-normal">
              Discrepancy detected with partner retailer feeds. (Observed visibility: Not yet observed)
            </p>
          </div>

          {/* Surface 4: Bing */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">Bing Copilot</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800">76% Ready</span>
            </div>
            <p className="text-[11px] text-stone-500 leading-normal">
              Baseline attributes present for broad search queries. (Observed visibility: Not yet observed)
            </p>
          </div>

          {/* Surface 5: TikTok */}
          <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/60 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900">TikTok Shop</span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-stone-200 text-stone-700">Preparing</span>
            </div>
            <p className="text-[11px] text-stone-500 leading-normal">
              Catalog feed schema formatting in progress. (Observed visibility: Not yet observed)
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
