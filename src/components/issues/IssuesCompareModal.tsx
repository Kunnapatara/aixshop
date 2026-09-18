// src/components/issues/IssuesCompareModal.tsx
// Comparison modal for side-by-side inspection of selected issues on Page 10

import React from 'react';
import { X, GitCompare, ExternalLink, Tag } from 'lucide-react';
import { IssueItem } from '../../types/issues';

interface IssuesCompareModalProps {
  issues: IssueItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelectIssue: (issue: IssueItem) => void;
}

export const IssuesCompareModal: React.FC<IssuesCompareModalProps> = ({
  issues,
  isOpen,
  onClose,
  onSelectIssue
}) => {
  if (!isOpen || issues.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-[#090E1A] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-[#0C1222] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Compare Selected Issues</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                  {issues.length} Issues Selected
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Side-by-side diagnostic evaluation of evidence, buyer impact, and recovery classes.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable Comparison Table */}
        <div className="p-4 sm:p-6 overflow-x-auto flex-1 text-xs">
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${issues.length}, minmax(280px, 1fr))` }}>
            {issues.map(issue => (
              <div
                key={issue.id}
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Issue identity */}
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                      {issue.issueNumber}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-850 px-1.5 py-0.5 rounded">
                      {issue.issueType}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-sm text-slate-100 line-clamp-2">
                      {issue.title}
                    </h4>
                    <p className="text-xs text-cyan-400 mt-0.5 truncate">
                      {issue.productName}
                    </p>
                    <div className="text-[10px] font-mono text-slate-500">
                      SKU: {issue.productSku}
                    </div>
                  </div>

                  {/* Attributes Grid */}
                  <div className="space-y-2 border-t border-slate-800 pt-3 text-xs font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 uppercase text-[10px]">Severity:</span>
                      <span className="font-bold text-slate-200">{issue.severity}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 uppercase text-[10px]">Evidence:</span>
                      <span className="font-bold text-amber-300">{issue.evidenceState}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 uppercase text-[10px]">Recovery:</span>
                      <span className="font-medium text-slate-300">{issue.recoveryState}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 uppercase text-[10px]">Priority Score:</span>
                      <span className="font-bold text-cyan-400">{issue.deterministicPriority.score} / 100</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 uppercase text-[10px]">Recovery Class:</span>
                      <span className="font-medium text-slate-300">{issue.recoveryEligibility}</span>
                    </div>
                  </div>

                  {/* Diagnostic reason snippet */}
                  <div className="border-t border-slate-800 pt-2 text-[11px]">
                    <span className="text-slate-500 uppercase font-mono text-[10px] block mb-1">Diagnostic Reason:</span>
                    <p className="text-slate-300 line-clamp-3 leading-relaxed">
                      {issue.diagnosticReason}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onSelectIssue(issue);
                  }}
                  className="w-full mt-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-900/60 text-slate-200 hover:text-cyan-200 border border-slate-700 text-xs font-medium transition-colors cursor-pointer text-center"
                >
                  Inspect in Drawer
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0C1222] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
