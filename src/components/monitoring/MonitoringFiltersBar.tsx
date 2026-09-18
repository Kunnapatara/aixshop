// src/components/monitoring/MonitoringFiltersBar.tsx
import React from 'react';
import { 
  Search, 
  Filter, 
  Layers, 
  ListTree, 
  ArrowUpDown, 
  X, 
  ShieldAlert, 
  Sparkles, 
  DollarSign, 
  FileCheck2, 
  Package 
} from 'lucide-react';
import { 
  MonitoringCategory, 
  MonitoringPriority, 
  MonitoringState, 
  MonitoringEvidenceState,
  MonitoringFiltersState,
  MonitoringSortField,
  MonitoringSortDirection
} from '../../types/monitoring';

interface MonitoringFiltersBarProps {
  filters: MonitoringFiltersState;
  onUpdateFilters: (updates: Partial<MonitoringFiltersState>) => void;
  onResetFilters: () => void;
  sortField: MonitoringSortField;
  sortDirection: MonitoringSortDirection;
  onUpdateSort: (field: MonitoringSortField) => void;
  eventsCount: number;
  totalProductsCount: number;
}

export const MonitoringFiltersBar: React.FC<MonitoringFiltersBarProps> = ({
  filters,
  onUpdateFilters,
  onResetFilters,
  sortField,
  sortDirection,
  onUpdateSort,
  eventsCount,
  totalProductsCount
}) => {
  const isFiltered = 
    filters.category !== 'ALL' ||
    filters.priority !== 'ALL' ||
    filters.state !== 'ALL' ||
    filters.evidenceState !== 'ALL' ||
    filters.searchQuery.trim() !== '';

  const categories: { id: 'ALL' | MonitoringCategory; label: string; icon?: React.ElementType }[] = [
    { id: 'ALL', label: 'All Dimensions' },
    { id: 'product_intelligence', label: 'Product Intelligence', icon: Package },
    { id: 'variant_integrity', label: 'Variant Integrity', icon: ListTree },
    { id: 'offer_intelligence', label: 'Offer Intelligence', icon: DollarSign },
    { id: 'evidence_integrity', label: 'Evidence Integrity', icon: FileCheck2 },
    { id: 'discovery_readiness', label: 'Discovery Readiness', icon: Sparkles }
  ];

  return (
    <div className="bg-white/95 border-b border-stone-200 py-3.5 px-4 sm:px-6 lg:px-8 sticky top-0 z-20 backdrop-blur-md shadow-2xs">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Upper Row: Search, View Mode Toggle, Sorting */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onUpdateFilters({ searchQuery: e.target.value })}
              placeholder="Search product name, SKU, GTIN, or attribute..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
            />
            {filters.searchQuery && (
              <button
                type="button"
                onClick={() => onUpdateFilters({ searchQuery: '' })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* View Mode & Sorter */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* View Mode Toggle: Event View vs Product View */}
            <div className="flex items-center p-0.5 rounded-xl bg-stone-100 border border-stone-200 text-xs font-medium">
              <button
                type="button"
                onClick={() => onUpdateFilters({ viewMode: 'events' })}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filters.viewMode === 'events'
                    ? 'bg-white text-[#F97316] font-bold shadow-3xs border border-orange-200'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Event View ({eventsCount})
              </button>
              <button
                type="button"
                onClick={() => onUpdateFilters({ viewMode: 'products' })}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filters.viewMode === 'products'
                    ? 'bg-white text-[#F97316] font-bold shadow-3xs border border-orange-200'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Product View ({totalProductsCount})
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-stone-500 font-mono hidden lg:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortField}
                  onChange={(e) => onUpdateSort(e.target.value as MonitoringSortField)}
                  className="bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-700 px-3 py-1.5 pr-7 appearance-none focus:outline-none focus:border-orange-500 cursor-pointer shadow-3xs"
                >
                  <option value="priority">Priority Severity</option>
                  <option value="detectedAt">Observation Time</option>
                  <option value="product">Product Name</option>
                  <option value="changeType">Change Category</option>
                  <option value="impact">Impact Scope</option>
                  <option value="confidence">Evidence Confidence</option>
                </select>
                <ArrowUpDown className="w-3 h-3 text-stone-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {isFiltered && (
              <button
                type="button"
                onClick={onResetFilters}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold border border-stone-200 transition-colors cursor-pointer shadow-3xs"
              >
                <X className="w-3.5 h-3.5 text-stone-500" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Lower Row: Category Pills & Additional Selectors */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          {/* Category Quick Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = filters.category === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onUpdateFilters({ category: cat.id })}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer shadow-3xs ${
                    isSelected
                      ? 'bg-orange-50 text-[#F97316] border border-orange-200 font-bold'
                      : 'bg-stone-50 text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {Icon && <Icon className="w-3 h-3 text-[#F97316]" />}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Selectors: Priority & Evidence State */}
          <div className="flex items-center gap-2 text-xs">
            {/* Priority Selector */}
            <select
              value={filters.priority}
              onChange={(e) => onUpdateFilters({ priority: e.target.value as any })}
              className="bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-700 px-2.5 py-1 focus:outline-none focus:border-orange-500 cursor-pointer shadow-3xs"
            >
              <option value="ALL">Priority: All</option>
              <option value="Critical">Critical Only</option>
              <option value="High">High Only</option>
              <option value="Medium">Medium Only</option>
              <option value="Low">Low Only</option>
            </select>

            {/* Evidence State Selector */}
            <select
              value={filters.evidenceState}
              onChange={(e) => onUpdateFilters({ evidenceState: e.target.value as any })}
              className="bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-700 px-2.5 py-1 focus:outline-none focus:border-orange-500 cursor-pointer shadow-3xs"
            >
              <option value="ALL">Evidence: All States</option>
              <option value="OBSERVED">Observed</option>
              <option value="CONFLICT">Conflict</option>
              <option value="MISSING">Missing</option>
              <option value="MERCHANT_VERIFIED">Verified</option>
              <option value="DERIVED">Derived</option>
              <option value="UNKNOWN">Unknown</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
