// src/components/issues/IssuesFiltersBar.tsx
// Multi-dimensional filtering, search, sorting, and bulk actions toolbar for Page 10

import React from 'react';
import { 
  Filter, 
  RotateCcw, 
  ArrowUpDown, 
  Layers, 
  ShieldAlert, 
  Sparkles, 
  CheckSquare, 
  Square, 
  Download, 
  GitCompare, 
  Eye,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { 
  IssuesFilterState, 
  IssuesSortField, 
  IssuesSortDirection, 
  IssueType, 
  IssueSeverity, 
  IssueEvidenceState, 
  IssueRecoveryState, 
  BuyerIntentArchetype, 
  RecoveryEligibility 
} from '../../types/issues';

interface IssuesFiltersBarProps {
  filters: IssuesFilterState;
  onUpdateFilters: (updates: Partial<IssuesFilterState>) => void;
  onResetFilters: () => void;
  sortField: IssuesSortField;
  sortDirection: IssuesSortDirection;
  onUpdateSort: (field: IssuesSortField) => void;
  totalFilteredCount: number;
  selectedIssueIds: Set<string>;
  onSelectAllVisible: () => void;
  onDeselectAll: () => void;
  allVisibleSelected: boolean;
  onBulkReview: () => void;
  onBulkCompare: () => void;
  onBulkExport: () => void;
}

export const IssuesFiltersBar: React.FC<IssuesFiltersBarProps> = ({
  filters,
  onUpdateFilters,
  onResetFilters,
  sortField,
  sortDirection,
  onUpdateSort,
  totalFilteredCount,
  selectedIssueIds,
  onSelectAllVisible,
  onDeselectAll,
  allVisibleSelected,
  onBulkReview,
  onBulkCompare,
  onBulkExport
}) => {
  const hasActiveFilters = 
    filters.issueType !== 'ALL' ||
    filters.severity !== 'ALL' ||
    filters.evidenceState !== 'ALL' ||
    filters.recoveryState !== 'ALL' ||
    filters.buyerImpact !== 'ALL' ||
    filters.recoveryEligibility !== 'ALL' ||
    Boolean(filters.searchQuery.trim());

  const selectedCount = selectedIssueIds.size;

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-3.5 space-y-3 shadow-2xs">
      {/* Top row: Dimension dropdowns and sort */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 font-mono pr-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#F97316]" />
            <span>Filters:</span>
          </span>

          {/* Issue Type */}
          <select
            value={filters.issueType}
            onChange={e => onUpdateFilters({ issueType: e.target.value as any })}
            className="bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#F97316] font-medium cursor-pointer"
          >
            <option value="ALL">All Issue Types</option>
            <option value="Evidence Missing">Evidence Missing</option>
            <option value="Evidence Conflict">Evidence Conflict</option>
            <option value="Variant Identity">Variant Identity</option>
            <option value="Product Attribute">Product Attribute</option>
            <option value="Offer Integrity">Offer Integrity</option>
            <option value="Availability">Availability</option>
            <option value="Promotion">Promotion</option>
            <option value="Discovery Readiness">Discovery Readiness</option>
            <option value="Source Drift">Source Drift</option>
          </select>

          {/* Severity */}
          <select
            value={filters.severity}
            onChange={e => onUpdateFilters({ severity: e.target.value as any })}
            className="bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#F97316] font-medium cursor-pointer"
          >
            <option value="ALL">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
            <option value="Informational">Informational</option>
          </select>

          {/* Evidence State */}
          <select
            value={filters.evidenceState}
            onChange={e => onUpdateFilters({ evidenceState: e.target.value as any })}
            className="bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#F97316] font-medium cursor-pointer"
          >
            <option value="ALL">All Evidence States</option>
            <option value="OBSERVED">OBSERVED</option>
            <option value="DERIVED">DERIVED</option>
            <option value="MERCHANT_VERIFIED">MERCHANT VERIFIED</option>
            <option value="MISSING">MISSING</option>
            <option value="CONFLICT">CONFLICT</option>
          </select>

          {/* Recovery State */}
          <select
            value={filters.recoveryState}
            onChange={e => onUpdateFilters({ recoveryState: e.target.value as any })}
            className="bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#F97316] font-medium cursor-pointer"
          >
            <option value="ALL">All Recovery States</option>
            <option value="Open">Open</option>
            <option value="Diagnosing">Diagnosing</option>
            <option value="Recovery Proposed">Recovery Proposed</option>
            <option value="Validation Required">Validation Required</option>
            <option value="Merchant Verification">Merchant Verification</option>
            <option value="Blocked">Blocked</option>
            <option value="Resolved">Resolved</option>
          </select>

          {/* Buyer Impact */}
          <select
            value={filters.buyerImpact}
            onChange={e => onUpdateFilters({ buyerImpact: e.target.value as any })}
            className="bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#F97316] font-medium cursor-pointer"
          >
            <option value="ALL">All Buyer Intents</option>
            <option value="Discovery">Discovery Intent</option>
            <option value="Problem">Problem Intent</option>
            <option value="Comparison">Comparison Intent</option>
            <option value="Specification">Specification Intent</option>
            <option value="Purchase">Purchase Intent</option>
            <option value="Use Case">Use Case Intent</option>
            <option value="Trust">Trust Intent</option>
          </select>

          {/* Recovery Eligibility */}
          <select
            value={filters.recoveryEligibility}
            onChange={e => onUpdateFilters({ recoveryEligibility: e.target.value as any })}
            className="bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#F97316] font-medium cursor-pointer"
          >
            <option value="ALL">All Recovery Classes</option>
            <option value="Eligible">Eligible (Class A)</option>
            <option value="Evidence-Gated">Evidence-Gated (Class B)</option>
            <option value="Merchant Required">Merchant Required</option>
            <option value="Blocked">Blocked</option>
          </select>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-mono font-semibold transition-colors cursor-pointer border border-stone-200"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3 text-stone-500" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Sorting controls and Count */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-500 font-mono text-[11px] hidden sm:inline">
            Showing <strong className="text-stone-900 font-bold">{totalFilteredCount}</strong> issues
          </span>

          <div className="flex items-center gap-1 bg-stone-50 border border-stone-200 rounded-xl p-0.5">
            <span className="text-[11px] font-mono text-stone-500 pl-2 pr-1">Sort:</span>
            <select
              value={sortField}
              onChange={e => onUpdateSort(e.target.value as IssuesSortField)}
              className="bg-transparent border-none text-xs text-stone-800 font-medium focus:outline-none cursor-pointer pr-1"
            >
              <option value="priority">Priority (Formula)</option>
              <option value="severity">Severity</option>
              <option value="detected">Detected Time</option>
              <option value="product">Product Name</option>
              <option value="recoveryState">Recovery State</option>
            </select>
            <button
              type="button"
              onClick={() => onUpdateSort(sortField)}
              className="p-1 text-stone-400 hover:text-[#F97316] rounded transition-colors cursor-pointer"
              title={`Toggle sort order (Current: ${sortDirection.toUpperCase()})`}
            >
              <ArrowUpDown className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Action Strip & Active Filter Chips */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs">
        {/* Bulk selection controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={allVisibleSelected ? onDeselectAll : onSelectAllVisible}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-stone-50 border border-stone-200 hover:border-stone-300 text-stone-700 text-xs font-mono font-medium transition-colors cursor-pointer"
          >
            {allVisibleSelected ? (
              <CheckSquare className="w-3.5 h-3.5 text-[#F97316]" />
            ) : (
              <Square className="w-3.5 h-3.5 text-stone-400" />
            )}
            <span>{allVisibleSelected ? 'Deselect All' : 'Select All Visible'}</span>
          </button>

          {selectedCount > 0 ? (
            <div className="flex items-center gap-1.5 pl-2 border-l border-stone-200">
              <span className="text-[11px] font-mono font-bold text-[#F97316] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                {selectedCount} Selected
              </span>

              <button
                type="button"
                onClick={onBulkReview}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-[#F97316] hover:bg-orange-600 text-white font-semibold text-xs transition-colors cursor-pointer shadow-3xs"
                title="Inspect selected issues"
              >
                <Eye className="w-3 h-3" />
                <span>Review Selected</span>
              </button>

              <button
                type="button"
                onClick={onBulkCompare}
                disabled={selectedCount < 2}
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl font-medium text-xs transition-colors border ${
                  selectedCount >= 2
                    ? 'bg-white hover:bg-stone-50 text-stone-800 border-stone-200 cursor-pointer shadow-3xs'
                    : 'bg-stone-50 text-stone-400 border-stone-200 cursor-not-allowed'
                }`}
                title={selectedCount < 2 ? 'Select at least 2 issues to compare' : 'Compare selected issues'}
              >
                <GitCompare className="w-3 h-3" />
                <span>Compare ({selectedCount})</span>
              </button>

              <button
                type="button"
                onClick={onBulkExport}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 font-medium text-xs transition-colors cursor-pointer shadow-3xs"
                title="Preview export payload in JSON or CSV"
              >
                <Download className="w-3 h-3 text-stone-500" />
                <span>Export Preview</span>
              </button>
            </div>
          ) : (
            <span className="text-[11px] text-stone-400 hidden md:inline">
              Select multiple issues to compare or export reports
            </span>
          )}
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-1.5">
            {filters.searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-50 text-[11px] font-mono text-[#F97316] border border-orange-200">
                Search: "{filters.searchQuery}"
                <button
                  type="button"
                  onClick={() => onUpdateFilters({ searchQuery: '' })}
                  className="hover:text-stone-900 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.issueType !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-100 text-[11px] font-mono text-stone-800 border border-stone-200">
                Type: {filters.issueType}
                <button
                  type="button"
                  onClick={() => onUpdateFilters({ issueType: 'ALL' })}
                  className="hover:text-stone-900 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.severity !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-50 text-[11px] font-mono text-rose-700 border border-rose-200">
                Severity: {filters.severity}
                <button
                  type="button"
                  onClick={() => onUpdateFilters({ severity: 'ALL' })}
                  className="hover:text-stone-900 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.evidenceState !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-[11px] font-mono text-amber-700 border border-amber-200">
                Evidence: {filters.evidenceState}
                <button
                  type="button"
                  onClick={() => onUpdateFilters({ evidenceState: 'ALL' })}
                  className="hover:text-stone-900 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.recoveryState !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 text-[11px] font-mono text-purple-700 border border-purple-200">
                State: {filters.recoveryState}
                <button
                  type="button"
                  onClick={() => onUpdateFilters({ recoveryState: 'ALL' })}
                  className="hover:text-stone-900 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.buyerImpact !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-50 text-[11px] font-mono text-[#F97316] border border-orange-200">
                Impact: {filters.buyerImpact}
                <button
                  type="button"
                  onClick={() => onUpdateFilters({ buyerImpact: 'ALL' })}
                  className="hover:text-stone-900 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.recoveryEligibility !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[11px] font-mono text-emerald-700 border border-emerald-200">
                Class: {filters.recoveryEligibility}
                <button
                  type="button"
                  onClick={() => onUpdateFilters({ recoveryEligibility: 'ALL' })}
                  className="hover:text-stone-900 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
