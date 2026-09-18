import React from 'react';
import { 
  Search, 
  X, 
  Filter, 
  SlidersHorizontal, 
  ArrowUpDown, 
  TableProperties, 
  Zap,
  RotateCcw,
  Tag
} from 'lucide-react';
import { 
  WorkbenchFiltersState, 
  WorkbenchSortField, 
  SortDirection,
  IntelligenceStatus,
  WorkbenchCategory,
  RemediationPriority
} from '../../types/workbench';
import { EvidenceState } from '../../types/landing';

interface WorkbenchFiltersProps {
  filters: WorkbenchFiltersState;
  onFilterChange: (key: keyof WorkbenchFiltersState, value: any) => void;
  onResetFilters: () => void;
  sortField: WorkbenchSortField;
  sortDirection: SortDirection;
  onSortChange: (field: WorkbenchSortField) => void;
  viewMode: 'catalog' | 'priority';
  onViewModeChange: (mode: 'catalog' | 'priority') => void;
  filteredCount: number;
  totalCount: number;
}

export const WorkbenchFilters: React.FC<WorkbenchFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  sortField,
  sortDirection,
  onSortChange,
  viewMode,
  onViewModeChange,
  filteredCount,
  totalCount
}) => {
  // Count how many non-default filters are active
  const activeFilterTags: { key: keyof WorkbenchFiltersState; label: string; value: string }[] = [];

  if (filters.searchQuery) {
    activeFilterTags.push({ key: 'searchQuery', label: 'Query', value: `"${filters.searchQuery}"` });
  }
  if (filters.intelligenceStatus !== 'All') {
    activeFilterTags.push({ key: 'intelligenceStatus', label: 'Status', value: filters.intelligenceStatus });
  }
  if (filters.evidenceState !== 'All') {
    activeFilterTags.push({ key: 'evidenceState', label: 'Evidence', value: filters.evidenceState });
  }
  if (filters.coverageRange !== 'All') {
    activeFilterTags.push({ key: 'coverageRange', label: 'Coverage', value: filters.coverageRange });
  }
  if (filters.category !== 'All') {
    activeFilterTags.push({ key: 'category', label: 'Category', value: filters.category });
  }
  if (filters.priority !== 'All') {
    activeFilterTags.push({ key: 'priority', label: 'Priority', value: filters.priority });
  }
  if (filters.discoveryStatus !== 'All') {
    activeFilterTags.push({ key: 'discoveryStatus', label: 'Discovery', value: filters.discoveryStatus });
  }

  return (
    <div className="space-y-3 bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs">
      {/* Top row: Search, View Mode Toggle & Primary Sorters */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange('searchQuery', e.target.value)}
            placeholder="Search products, identifiers, variants, or evidence..."
            className="w-full pl-9 pr-8 py-2 bg-stone-50 border border-stone-200/80 rounded-xl text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#F97316] focus:ring-1 focus:ring-[#F97316]/30 transition-all font-mono"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => onFilterChange('searchQuery', '')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* View Mode Toggle: Catalog View vs Priority View */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200/80 shrink-0">
            <button
              type="button"
              onClick={() => onViewModeChange('catalog')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                viewMode === 'catalog'
                  ? 'bg-white text-stone-900 font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Standard catalog table"
            >
              <TableProperties className="w-3.5 h-3.5 text-[#F97316]" />
              <span>Catalog View</span>
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('priority')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                viewMode === 'priority'
                  ? 'bg-white text-amber-900 font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Order by remediation urgency: Fix what matters first"
            >
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>Priority View</span>
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200/80 rounded-xl px-3 py-1.5 text-xs shadow-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-500 text-[11px] hidden sm:inline">Sort:</span>
            <select
              value={sortField}
              onChange={(e) => onSortChange(e.target.value as WorkbenchSortField)}
              className="bg-transparent text-stone-800 text-xs focus:outline-none cursor-pointer font-medium"
            >
              <option value="priority">Remediation Priority</option>
              <option value="coverage">Intelligence Coverage</option>
              <option value="conflicts">Evidence Conflicts</option>
              <option value="gaps">Evidence Gaps</option>
              <option value="discovery">Discovery Readiness</option>
              <option value="name">Product Name</option>
              <option value="lastAnalyzed">Last Analysis</option>
            </select>
            <button
              type="button"
              onClick={() => onSortChange(sortField)}
              className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-lg bg-stone-200 text-stone-700 hover:bg-stone-300 cursor-pointer"
              title="Toggle sort direction"
            >
              {sortDirection}
            </button>
          </div>
        </div>
      </div>

      {/* Second row: Granular Filter Dropdowns */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100 text-xs">
        <span className="text-[11px] font-medium text-stone-500 flex items-center gap-1 mr-1">
          <Filter className="w-3 h-3 text-[#F97316]" />
          <span>Filters:</span>
        </span>

        {/* Intelligence Status */}
        <select
          value={filters.intelligenceStatus}
          onChange={(e) => onFilterChange('intelligenceStatus', e.target.value as any)}
          className="bg-stone-50 border border-stone-200/80 rounded-xl px-2.5 py-1 text-stone-700 text-xs focus:outline-none focus:border-[#F97316] cursor-pointer"
        >
          <option value="All">Status: All</option>
          <option value="Strong">Status: Strong</option>
          <option value="Needs Attention">Status: Needs Attention</option>
          <option value="Critical">Status: Critical</option>
        </select>

        {/* Dominant Evidence State */}
        <select
          value={filters.evidenceState}
          onChange={(e) => onFilterChange('evidenceState', e.target.value as any)}
          className="bg-stone-50 border border-stone-200/80 rounded-xl px-2.5 py-1 text-stone-700 text-xs focus:outline-none focus:border-[#F97316] cursor-pointer"
        >
          <option value="All">Evidence: All</option>
          <option value="OBSERVED">Evidence: Observed</option>
          <option value="MERCHANT_VERIFIED">Evidence: Merchant Verified</option>
          <option value="DERIVED">Evidence: Derived</option>
          <option value="CONFLICT">Evidence: Conflict</option>
          <option value="MISSING">Evidence: Missing</option>
        </select>

        {/* Coverage Range */}
        <select
          value={filters.coverageRange}
          onChange={(e) => onFilterChange('coverageRange', e.target.value as any)}
          className="bg-stone-50 border border-stone-200/80 rounded-xl px-2.5 py-1 text-stone-700 text-xs focus:outline-none focus:border-[#F97316] cursor-pointer"
        >
          <option value="All">Coverage: All</option>
          <option value="90%+">Coverage: 90%+</option>
          <option value="70-89%">Coverage: 70–89%</option>
          <option value="Below 70%">Coverage: Below 70%</option>
        </select>

        {/* Product Category */}
        <select
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value as any)}
          className="bg-stone-50 border border-stone-200/80 rounded-xl px-2.5 py-1 text-stone-700 text-xs focus:outline-none focus:border-[#F97316] cursor-pointer"
        >
          <option value="All">Category: All</option>
          <option value="Running">Running</option>
          <option value="Training">Training</option>
          <option value="Outdoor">Outdoor</option>
          <option value="Apparel">Apparel</option>
          <option value="Accessories">Accessories</option>
        </select>

        {/* Priority Filter */}
        <select
          value={filters.priority}
          onChange={(e) => onFilterChange('priority', e.target.value as any)}
          className="bg-stone-50 border border-stone-200/80 rounded-xl px-2.5 py-1 text-stone-700 text-xs focus:outline-none focus:border-[#F97316] cursor-pointer"
        >
          <option value="All">Priority: All</option>
          <option value="Critical">Priority: Critical</option>
          <option value="High">Priority: High</option>
          <option value="Medium">Priority: Medium</option>
          <option value="Low">Priority: Low</option>
        </select>

        {/* Discovery Readiness */}
        <select
          value={filters.discoveryStatus}
          onChange={(e) => onFilterChange('discoveryStatus', e.target.value as any)}
          className="bg-stone-50 border border-stone-200/80 rounded-xl px-2.5 py-1 text-stone-700 text-xs focus:outline-none focus:border-[#F97316] cursor-pointer"
        >
          <option value="All">Discovery: All</option>
          <option value="Strong">Discovery: Strong</option>
          <option value="Needs Attention">Discovery: Needs Attention</option>
          <option value="Critical">Discovery: Critical</option>
        </select>

        {/* Clear All action if any filters are active */}
        {activeFilterTags.length > 0 && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-[#F97316] hover:text-[#EA580C] transition-colors ml-auto cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Active Filter Pills Bar */}
      {activeFilterTags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-stone-100 text-xs">
          <span className="text-[10px] font-mono uppercase text-stone-400">Active:</span>
          {activeFilterTags.map((tag) => (
            <span
              key={tag.key}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-800 border border-orange-200 text-[11px] font-medium"
            >
              <span className="text-orange-600/70">{tag.label}:</span>
              <span className="text-orange-950 font-semibold">{tag.value}</span>
              <button
                type="button"
                onClick={() => {
                  if (tag.key === 'searchQuery') onFilterChange('searchQuery', '');
                  else onFilterChange(tag.key, 'All');
                }}
                className="text-orange-400 hover:text-orange-800 ml-0.5 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          <span className="text-[11px] font-medium text-stone-500 ml-2">
            Showing <strong className="text-stone-900">{filteredCount}</strong> of {totalCount} products
          </span>
        </div>
      )}
    </div>
  );
};
