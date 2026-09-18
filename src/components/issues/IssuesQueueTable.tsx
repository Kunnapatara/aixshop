// src/components/issues/IssuesQueueTable.tsx
// Dense, readable Issues Queue Table for Page 10

import React, { useState } from 'react';
import { 
  AlertCircle, 
  AlertOctagon, 
  ShieldAlert, 
  CheckCircle2, 
  UserCheck, 
  Sparkles, 
  ChevronRight, 
  CheckSquare, 
  Square, 
  HelpCircle, 
  Eye, 
  ExternalLink,
  Wrench,
  Ban,
  Clock,
  Tag
} from 'lucide-react';
import { 
  IssueItem, 
  IssueSeverity, 
  IssueEvidenceState, 
  IssueRecoveryState 
} from '../../types/issues';

interface IssuesQueueTableProps {
  issues: IssueItem[];
  selectedIssueIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onSelectIssue: (issue: IssueItem) => void;
  onOpenProductReport?: (productId: string) => void;
  onOpenFixWorkflow?: () => void;
}

export const IssuesQueueTable: React.FC<IssuesQueueTableProps> = ({
  issues,
  selectedIssueIds,
  onToggleSelect,
  onSelectIssue,
  onOpenProductReport,
  onOpenFixWorkflow
}) => {
  const [hoveredPriorityId, setHoveredPriorityId] = useState<string | null>(null);

  const getSeverityBadge = (severity: IssueSeverity) => {
    switch (severity) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Critical
          </span>
        );
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            High
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Medium
          </span>
        );
      case 'Low':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-mono font-normal bg-stone-100 text-stone-700 border border-stone-200">
            Low
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono bg-stone-100 text-stone-500 border border-stone-200">
            Info
          </span>
        );
    }
  };

  const getEvidenceStateBadge = (state: IssueEvidenceState) => {
    switch (state) {
      case 'CONFLICT':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <span className="w-1 h-1 rounded-full bg-rose-500 animate-pulse" />
            CONFLICT
          </span>
        );
      case 'MISSING':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
            MISSING
          </span>
        );
      case 'MERCHANT_VERIFIED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
            MERCHANT VERIFIED
          </span>
        );
      case 'DERIVED':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono text-[#F97316] font-semibold bg-orange-50 border border-orange-200">
            DERIVED
          </span>
        );
      case 'OBSERVED':
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono text-stone-700 bg-stone-100 border border-stone-200">
            OBSERVED
          </span>
        );
    }
  };

  const getRecoveryStateBadge = (state: IssueRecoveryState) => {
    switch (state) {
      case 'Resolved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Resolved
          </span>
        );
      case 'Merchant Verification':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <UserCheck className="w-3 h-3 text-purple-600" />
            Merchant Verification
          </span>
        );
      case 'Recovery Proposed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold bg-orange-50 text-[#F97316] border border-orange-200">
            <Sparkles className="w-3 h-3 text-[#F97316]" />
            Recovery Proposed
          </span>
        );
      case 'Validation Required':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <ShieldAlert className="w-3 h-3 text-amber-600" />
            Validation Required
          </span>
        );
      case 'Blocked':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <Ban className="w-3 h-3 text-rose-600" />
            Blocked
          </span>
        );
      case 'Diagnosing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200">
            Diagnosing
          </span>
        );
      case 'Open':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-mono font-medium bg-stone-100 text-stone-700 border border-stone-200">
            Open
          </span>
        );
    }
  };

  if (issues.length === 0) {
    return (
      <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center space-y-3 shadow-2xs">
        <div className="inline-flex p-3 rounded-full bg-stone-50 border border-stone-200 text-stone-400">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-stone-900">No issues match the active filters</h3>
        <p className="text-xs text-stone-500 max-w-md mx-auto">
          Try clearing search filters or changing the severity or recovery state selection.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-stone-50/80 border-b border-stone-200 text-stone-500 font-mono text-[11px] uppercase tracking-wider">
              <th className="py-3 px-3 w-10 text-center">
                <span className="sr-only">Select</span>
              </th>
              <th className="py-3 px-3 font-semibold min-w-[200px]">Issue</th>
              <th className="py-3 px-3 font-semibold min-w-[180px]">Product & SKU</th>
              <th className="py-3 px-3 font-semibold min-w-[120px]">Issue Type</th>
              <th className="py-3 px-3 font-semibold min-w-[90px]">Severity</th>
              <th className="py-3 px-3 font-semibold min-w-[130px]">Evidence State</th>
              <th className="py-3 px-3 font-semibold min-w-[260px]">Why It Matters</th>
              <th className="py-3 px-3 font-semibold min-w-[150px]">Recovery State</th>
              <th className="py-3 px-3 font-semibold min-w-[90px]">Priority</th>
              <th className="py-3 px-3 font-semibold min-w-[90px]">Detected</th>
              <th className="py-3 px-3 font-semibold text-right min-w-[100px]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 font-sans">
            {issues.map(issue => {
              const isSelected = selectedIssueIds.has(issue.id);
              const priority = issue.deterministicPriority;

              return (
                <tr
                  key={issue.id}
                  className={`transition-colors group hover:bg-stone-50/70 ${
                    isSelected ? 'bg-orange-50/40' : issue.isResolved ? 'bg-stone-50/40 opacity-75' : ''
                  }`}
                >
                  {/* Select Checkbox */}
                  <td className="py-3 px-3 text-center">
                    <button
                      type="button"
                      onClick={() => onToggleSelect(issue.id)}
                      className="text-stone-400 hover:text-[#F97316] cursor-pointer p-0.5"
                    >
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-[#F97316]" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </td>

                  {/* Issue Title & ID */}
                  <td className="py-3 px-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] px-1.5 py-0.2 rounded-full bg-orange-50 text-[#F97316] border border-orange-200 font-bold">
                          {issue.issueNumber}
                        </span>
                        <button
                          type="button"
                          onClick={() => onSelectIssue(issue)}
                          className="font-bold text-stone-900 hover:text-[#F97316] transition-colors text-left line-clamp-1 cursor-pointer"
                        >
                          {issue.title}
                        </button>
                      </div>
                      {issue.productVariant && (
                        <div className="text-[10.5px] text-stone-500 font-mono flex items-center gap-1">
                          <Tag className="w-2.5 h-2.5 text-[#F97316]" />
                          <span>{issue.productVariant}</span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Product & SKU */}
                  <td className="py-3 px-3">
                    <div>
                      <button
                        type="button"
                        onClick={() => onOpenProductReport && onOpenProductReport(issue.productId)}
                        className="text-stone-800 hover:text-[#F97316] font-semibold transition-colors text-left line-clamp-1 cursor-pointer flex items-center gap-1 group/p"
                        title="Open Product Intelligence (Page 03)"
                      >
                        <span>{issue.productName}</span>
                        <ExternalLink className="w-2.5 h-2.5 text-stone-400 group-hover/p:text-[#F97316] shrink-0" />
                      </button>
                      <div className="text-[10px] font-mono text-stone-400">
                        SKU: {issue.productSku}
                      </div>
                    </div>
                  </td>

                  {/* Issue Type */}
                  <td className="py-3 px-3">
                    <span className="text-[11px] font-mono text-stone-700 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200 font-medium">
                      {issue.issueType}
                    </span>
                  </td>

                  {/* Severity */}
                  <td className="py-3 px-3">
                    {getSeverityBadge(issue.severity)}
                  </td>

                  {/* Evidence State */}
                  <td className="py-3 px-3">
                    {getEvidenceStateBadge(issue.evidenceState)}
                  </td>

                  {/* Why It Matters */}
                  <td className="py-3 px-3">
                    <p className="text-stone-600 text-[11px] line-clamp-2 leading-relaxed max-w-sm">
                      {issue.whyItMatters}
                    </p>
                  </td>

                  {/* Recovery State */}
                  <td className="py-3 px-3">
                    {getRecoveryStateBadge(issue.recoveryState)}
                  </td>

                  {/* Deterministic Priority (with hover breakdown) */}
                  <td className="py-3 px-3 relative">
                    <div
                      onMouseEnter={() => setHoveredPriorityId(issue.id)}
                      onMouseLeave={() => setHoveredPriorityId(null)}
                      className="cursor-help inline-flex items-center gap-1"
                    >
                      <div className={`px-2 py-0.5 rounded-full font-mono font-bold text-xs border ${
                        priority.score >= 90
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : priority.score >= 70
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-stone-100 text-stone-700 border-stone-200'
                      }`}>
                        {priority.score}
                      </div>
                      <HelpCircle className="w-3 h-3 text-stone-400 hover:text-stone-600" />
                    </div>

                    {/* Popover explaining Priority = Severity × Buyer Impact × Evidence Risk × Recovery Urgency */}
                    {hoveredPriorityId === issue.id && (
                      <div className="absolute right-0 bottom-full mb-2 w-72 p-3.5 rounded-xl bg-white border border-stone-200 shadow-xl z-40 text-[11px] space-y-2 pointer-events-none">
                        <div className="font-mono font-bold text-[#F97316] border-b border-stone-100 pb-1.5 flex items-center justify-between">
                          <span>Deterministic Priority Breakdown</span>
                          <span className="text-stone-900 font-bold">{priority.score}/100</span>
                        </div>
                        <div className="text-[10px] text-stone-500 font-mono">
                          Formula: Severity × Buyer Impact × Evidence Risk × Recovery Urgency
                        </div>
                        <ul className="space-y-1 text-stone-600 text-[10.5px]">
                          {priority.explanationBullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-[#F97316] font-mono">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </td>

                  {/* Detected Time */}
                  <td className="py-3 px-3 text-[10.5px] font-mono text-stone-500 whitespace-nowrap">
                    {issue.detectedAt}
                  </td>

                  {/* Action */}
                  <td className="py-3 px-3 text-right">
                    <button
                      type="button"
                      onClick={() => onSelectIssue(issue)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-stone-50 hover:bg-orange-50 text-stone-700 hover:text-[#F97316] border border-stone-200 hover:border-orange-200 transition-colors font-semibold text-xs cursor-pointer shadow-3xs"
                    >
                      <span>Inspect</span>
                      <ChevronRight className="w-3 h-3 text-stone-400" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="lg:hidden divide-y divide-stone-100">
        {issues.map(issue => {
          const isSelected = selectedIssueIds.has(issue.id);
          const priority = issue.deterministicPriority;

          return (
            <div
              key={issue.id}
              className={`p-4 space-y-3 transition-colors ${
                isSelected ? 'bg-orange-50/40' : issue.isResolved ? 'bg-stone-50/40 opacity-80' : 'bg-white'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onToggleSelect(issue.id)}
                    className="text-stone-400 hover:text-[#F97316] cursor-pointer p-0.5"
                  >
                    {isSelected ? (
                      <CheckSquare className="w-4 h-4 text-[#F97316]" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200 font-bold">
                    {issue.issueNumber}
                  </span>
                  <span className="text-[10px] font-mono text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">
                    {issue.issueType}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className={`px-2 py-0.5 rounded-full font-mono font-bold text-xs border ${
                    priority.score >= 90
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-stone-100 text-stone-700 border-stone-200'
                  }`}>
                    P: {priority.score}
                  </div>
                  {getSeverityBadge(issue.severity)}
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => onSelectIssue(issue)}
                  className="text-sm font-bold text-stone-900 hover:text-[#F97316] text-left transition-colors"
                >
                  {issue.title}
                </button>
                <div className="text-xs text-stone-500 mt-0.5">
                  {issue.productName} ({issue.productSku})
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <div>
                  <span className="text-stone-400 text-[10px] uppercase font-mono mr-1">Evidence:</span>
                  {getEvidenceStateBadge(issue.evidenceState)}
                </div>
                <div>
                  <span className="text-stone-400 text-[10px] uppercase font-mono mr-1">Recovery:</span>
                  {getRecoveryStateBadge(issue.recoveryState)}
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                {issue.whyItMatters}
              </p>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-stone-400">
                  {issue.detectedAt}
                </span>
                <button
                  type="button"
                  onClick={() => onSelectIssue(issue)}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-stone-100 hover:bg-orange-50 text-stone-700 hover:text-[#F97316] text-xs font-bold"
                >
                  <span>Open Drawer</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
