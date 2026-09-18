// src/components/issues/IssuesStateDistribution.tsx
// Issue Health & State Distribution Lifecycle for Page 10

import React from 'react';
import { 
  CircleDot, 
  Search, 
  FileCode2, 
  ShieldCheck, 
  UserCheck, 
  CheckCircle, 
  Ban,
  Info
} from 'lucide-react';
import { IssueRecoveryState } from '../../types/issues';

interface IssuesStateDistributionProps {
  distribution: Record<IssueRecoveryState, number>;
  activeStateFilter: IssueRecoveryState | 'ALL';
  onSelectStateFilter: (state: IssueRecoveryState | 'ALL') => void;
}

export const IssuesStateDistribution: React.FC<IssuesStateDistributionProps> = ({
  distribution,
  activeStateFilter,
  onSelectStateFilter
}) => {
  const lifecycleStates: Array<{
    state: IssueRecoveryState;
    label: string;
    icon: React.ElementType;
    color: string;
    badge: string;
    desc: string;
  }> = [
    {
      state: 'Open',
      label: 'Open',
      icon: CircleDot,
      color: 'text-stone-600',
      badge: 'Queue',
      desc: 'Diagnosed problem awaiting recovery review'
    },
    {
      state: 'Diagnosing',
      label: 'Diagnosing',
      icon: Search,
      color: 'text-blue-600',
      badge: 'Analysis',
      desc: 'Evaluating source disagreement or schema gap'
    },
    {
      state: 'Recovery Proposed',
      label: 'Recovery Proposed',
      icon: FileCode2,
      color: 'text-[#F97316]',
      badge: 'Class A',
      desc: 'Deterministic remediation artifact generated'
    },
    {
      state: 'Validation Required',
      label: 'Validation Required',
      icon: ShieldCheck,
      color: 'text-amber-600',
      badge: 'Pre-check',
      desc: 'Running deterministic schema and identity rules'
    },
    {
      state: 'Merchant Verification',
      label: 'Merchant Verification',
      icon: UserCheck,
      color: 'text-purple-600',
      badge: 'Class B',
      desc: 'Human arbitration required to certify facts'
    },
    {
      state: 'Blocked',
      label: 'Blocked',
      icon: Ban,
      color: 'text-rose-600',
      badge: 'Gated',
      desc: 'Halted: cannot resolve without missing evidence'
    },
    {
      state: 'Resolved',
      label: 'Resolved',
      icon: CheckCircle,
      color: 'text-emerald-600',
      badge: 'Model Verified',
      desc: 'Passed verification criteria in preview model'
    }
  ];

  const total = (Object.values(distribution) as number[]).reduce((a, b) => a + b, 0);

  return (
    <section className="bg-[#FAF8F5] border-b border-stone-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-mono flex items-center gap-2">
              <span>Issue Recovery Lifecycle Distribution</span>
              <span className="text-[10px] text-stone-500 font-normal normal-case">
                ({total} Total Tracked Items)
              </span>
            </h2>
            <p className="text-xs text-stone-500">
              Track the exact stage of intelligence recovery from diagnosis to verification.
            </p>
          </div>

          {activeStateFilter !== 'ALL' && (
            <button
              type="button"
              onClick={() => onSelectStateFilter('ALL')}
              className="text-xs text-[#F97316] hover:text-orange-700 font-mono font-bold underline cursor-pointer self-start sm:self-auto"
            >
              Clear state filter (Show all)
            </button>
          )}
        </div>

        {/* Lifecycle Stage Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {lifecycleStates.map(stage => {
            const count = distribution[stage.state] || 0;
            const Icon = stage.icon;
            const isSelected = activeStateFilter === stage.state;

            return (
              <button
                key={stage.state}
                type="button"
                onClick={() => onSelectStateFilter(isSelected ? 'ALL' : stage.state)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between shadow-2xs ${
                  isSelected
                    ? 'bg-orange-50/80 border-[#F97316] ring-2 ring-[#F97316]/20'
                    : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <Icon className={`w-4 h-4 ${stage.color}`} />
                    <span className="text-[10px] font-mono font-semibold text-stone-400">
                      {stage.badge}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-1">
                    <span className="text-base font-bold font-mono text-stone-900">
                      {count}
                    </span>
                    <span className="text-[11px] font-bold text-stone-800 truncate">
                      {stage.label}
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-stone-500 mt-1 line-clamp-1">
                  {stage.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Immutable Scope Clarification Note */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-stone-200 text-[11px] text-stone-600 leading-relaxed shadow-3xs">
          <Info className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
          <p>
            <strong className="text-stone-900 font-bold">Model Lifecycle Semantics:</strong> In AIXSHOP,{' '}
            <span className="text-emerald-700 font-mono font-bold">Resolved</span> indicates that an issue successfully passed the required deterministic validation and verification criteria in this representative preview model. It does <strong className="text-stone-900">not</strong> imply that live external commerce channels (such as Shopify, Google Merchant Center, or marketplaces) have been modified. External synchronization occurs exclusively via authorized integration connectors.
          </p>
        </div>
      </div>
    </section>
  );
};
