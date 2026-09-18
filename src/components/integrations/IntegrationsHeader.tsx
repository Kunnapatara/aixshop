import React from 'react';
import { 
  Workflow, 
  Search, 
  ShieldCheck, 
  Filter, 
  SlidersHorizontal, 
  Layers, 
  Sparkles, 
  Lock, 
  AlertTriangle,
  ArrowRight,
  Info
} from 'lucide-react';
import { IntegrationCategory, IntegrationStatus, IntegrationsFilterState } from '../../types/integrations';

interface IntegrationsHeaderProps {
  filters: IntegrationsFilterState;
  onFilterChange: (updates: Partial<IntegrationsFilterState>) => void;
  onOpenPrinciples: () => void;
  onStartConnectionFlow: () => void;
}

export const IntegrationsHeader: React.FC<IntegrationsHeaderProps> = ({
  filters,
  onFilterChange,
  onOpenPrinciples,
  onStartConnectionFlow
}) => {
  return (
    <header className="border-b border-stone-200/80 bg-white/95 backdrop-blur-md pt-6 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* Top Breadcrumb & Status Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-[#F97316] font-mono text-[11px] font-bold tracking-wide uppercase flex items-center gap-1.5 shadow-3xs">
              <Workflow className="w-3.5 h-3.5 text-[#F97316]" />
              Page 12 · Integrations Workspace
            </span>
            <span className="text-stone-300">/</span>
            <span className="text-xs font-mono text-stone-500">
              AeroPulse Athletics · 24 Representative Products
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-50 border border-stone-200 text-[11px] font-mono font-medium text-stone-700 shadow-3xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Representative Connection Model
            </span>

            <button
              type="button"
              onClick={onOpenPrinciples}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 hover:text-stone-900 border border-stone-200 text-xs font-semibold transition-colors cursor-pointer shadow-3xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Connection Principles</span>
            </button>
          </div>
        </div>

        {/* Title, Subtitle, & Primary Action */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 font-sans flex items-center gap-3">
              Integrations & Authorized Connections
            </h1>
            <p className="mt-1.5 text-sm text-stone-500 max-w-3xl leading-relaxed">
              Connect authorized product sources and control exactly what AIXSHOP can access. 
              Built on least-privilege permissions, zero customer PII, and cryptographic evidence preservation.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onStartConnectionFlow}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Connect New Source Preview</span>
            </button>
          </div>
        </div>

        {/* Acquisition Priority Notice Bar */}
        <div className="rounded-2xl bg-stone-50 border border-stone-200/80 px-4 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-stone-600 shadow-3xs">
          <div className="flex flex-wrap items-center gap-2 font-mono">
            <span className="text-stone-400 uppercase tracking-wider text-[10px] font-semibold">Data Acquisition Priority:</span>
            <span className="text-[#F97316] font-bold">Official APIs</span>
            <span className="text-stone-300">→</span>
            <span className="text-stone-800 font-medium">Merchant Feeds</span>
            <span className="text-stone-300">→</span>
            <span className="text-stone-800 font-medium">Authorized Connections</span>
            <span className="text-stone-300">→</span>
            <span className="text-stone-500">Permitted Public Microdata</span>
            <span className="text-stone-300">→</span>
            <span className="text-emerald-700 font-bold">Merchant Confirmation</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-medium">
            <Lock className="w-3.5 h-3.5 text-stone-400" />
            <span>Zero Scraping · Zero Customer PII · Write Default: OFF</span>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={e => onFilterChange({ searchQuery: e.target.value })}
              placeholder="Search by source name, provider, or identifier..."
              className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-4 py-2 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-orange-500/60 transition-colors shadow-3xs"
            />
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Category Filter */}
            <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-xl px-2.5 py-1.5 shadow-3xs">
              <Filter className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={filters.category}
                onChange={e => onFilterChange({ category: e.target.value as any })}
                className="bg-transparent text-xs text-stone-700 focus:outline-none cursor-pointer font-medium"
              >
                <option value="ALL">All Categories</option>
                <option value="COMMERCE_PLATFORM">Commerce Platforms</option>
                <option value="COMMERCE_FEED">Commerce Feeds</option>
                <option value="STRUCTURED_SOURCE">Structured Sources</option>
                <option value="MARKETPLACE_SOURCE">Marketplace Sources</option>
                <option value="MERCHANT_VERIFICATION">Merchant Verification</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-xl px-2.5 py-1.5 shadow-3xs">
              <span className="text-[11px] font-mono text-stone-400 font-medium">Status:</span>
              <select
                value={filters.status}
                onChange={e => onFilterChange({ status: e.target.value as any })}
                className="bg-transparent text-xs text-stone-700 focus:outline-none cursor-pointer font-medium"
              >
                <option value="ALL">All Statuses</option>
                <option value="CONNECTED">Connected</option>
                <option value="NOT_CONNECTED">Not Connected</option>
                <option value="NEEDS_ATTENTION">Needs Attention</option>
                <option value="PARTIAL">Partial</option>
                <option value="REVOKED">Revoked</option>
                <option value="PREVIEW">Preview</option>
              </select>
            </div>

            {/* Data Scope Filter */}
            <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-xl px-2.5 py-1.5 shadow-3xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={filters.dataScope}
                onChange={e => onFilterChange({ dataScope: e.target.value as any })}
                className="bg-transparent text-xs text-stone-700 focus:outline-none cursor-pointer font-medium"
              >
                <option value="ALL">All Scopes</option>
                <option value="Product">Product Scope</option>
                <option value="Variant">Variant Scope</option>
                <option value="Offer">Offer Scope</option>
                <option value="Evidence">Evidence Scope</option>
                <option value="Inventory">Inventory Scope</option>
                <option value="Images">Images Scope</option>
              </select>
            </div>

            {(filters.searchQuery || filters.category !== 'ALL' || filters.status !== 'ALL' || filters.dataScope !== 'ALL') && (
              <button
                type="button"
                onClick={() => onFilterChange({ searchQuery: '', category: 'ALL', status: 'ALL', dataScope: 'ALL' })}
                className="text-xs text-[#F97316] hover:text-orange-700 font-semibold px-2 py-1 transition-colors cursor-pointer"
              >
                Reset filters
              </button>
            )}

          </div>

        </div>

      </div>
    </header>
  );
};
