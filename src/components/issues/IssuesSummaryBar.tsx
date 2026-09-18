// src/components/issues/IssuesSummaryBar.tsx
// Diagnostic Summary Bar for Page 10 — Issues & Recovery

import React from 'react';
import { 
  AlertCircle, 
  AlertOctagon, 
  ShieldAlert, 
  CheckCircle2, 
  UserCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { IssuesMetricsSummary, IssueSeverity, IssueRecoveryState, RecoveryEligibility } from '../../types/issues';

interface IssuesSummaryBarProps {
  metrics: IssuesMetricsSummary;
  activeFilterType: string | null;
  onFilterMetric: (filterKey: 'open' | 'critical' | 'blocked' | 'eligible' | 'merchant' | 'resolved') => void;
}

export const IssuesSummaryBar: React.FC<IssuesSummaryBarProps> = ({
  metrics,
  activeFilterType,
  onFilterMetric
}) => {
  const cards = [
    {
      key: 'open' as const,
      label: 'Open Issues',
      count: metrics.openIssues,
      desc: 'Active intelligence problems diagnosed across catalog',
      icon: AlertCircle,
      color: 'stone',
      badge: 'Unresolved',
      badgeColor: 'bg-stone-100 text-stone-700 border-stone-200'
    },
    {
      key: 'critical' as const,
      label: 'Critical Issues',
      count: metrics.criticalIssues,
      desc: 'Identity collisions, missing policies, or major schema breaks',
      icon: AlertOctagon,
      color: 'rose',
      badge: 'Immediate Priority',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      key: 'blocked' as const,
      label: 'Evidence-Blocked',
      count: metrics.evidenceBlocked,
      desc: 'Halting recovery due to unresolved conflict or missing source',
      icon: ShieldAlert,
      color: 'amber',
      badge: 'Zero Hallucination',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      key: 'eligible' as const,
      label: 'Recovery Eligible',
      count: metrics.recoveryEligible,
      desc: 'Safe deterministic Class A remediation available without guessing',
      icon: Sparkles,
      color: 'orange',
      badge: 'Deterministic',
      badgeColor: 'bg-orange-50 text-[#F97316] border-orange-200'
    },
    {
      key: 'merchant' as const,
      label: 'Merchant Verification Required',
      count: metrics.merchantVerificationRequired,
      desc: 'Authoritative human arbitration needed to certify truth',
      icon: UserCheck,
      color: 'purple',
      badge: 'Human-in-the-Loop',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      key: 'resolved' as const,
      label: 'Recently Resolved',
      count: metrics.recentlyResolved,
      desc: 'Passed verification rules in this representative preview model',
      icon: CheckCircle2,
      color: 'emerald',
      badge: 'Model Verified',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    }
  ];

  return (
    <section className="bg-[#FAF8F5] border-b border-stone-200 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-stone-800 uppercase tracking-wider font-mono text-[11px]">
              Diagnostic Metric Summary
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-stone-500">Click any indicator to filter the issue queue</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white border border-stone-200 text-stone-500 text-[11px] font-mono shadow-3xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
            Representative Issues Preview · Preview Mode
          </div>
        </div>

        {/* 6-Grid Diagnostic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {cards.map(card => {
            const Icon = card.icon;
            const isActive = activeFilterType === card.key;

            return (
              <button
                key={card.key}
                type="button"
                onClick={() => onFilterMetric(card.key)}
                className={`relative p-3.5 rounded-2xl text-left transition-all cursor-pointer border flex flex-col justify-between group shadow-2xs ${
                  isActive
                    ? 'bg-white border-[#F97316] ring-2 ring-[#F97316]/20 shadow-md'
                    : 'bg-white hover:bg-stone-50/80 border-stone-200 hover:border-stone-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`p-1.5 rounded-xl border text-xs ${
                      card.key === 'critical'
                        ? 'bg-rose-50 border-rose-200 text-rose-600'
                        : card.key === 'blocked'
                        ? 'bg-amber-50 border-amber-200 text-amber-600'
                        : card.key === 'eligible'
                        ? 'bg-orange-50 border-orange-200 text-[#F97316]'
                        : card.key === 'merchant'
                        ? 'bg-purple-50 border-purple-200 text-purple-600'
                        : card.key === 'resolved'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                        : 'bg-stone-100 border-stone-200 text-stone-700'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold font-mono text-stone-900 tracking-tight">
                      {card.count}
                    </span>
                    <span className="text-xs font-bold text-stone-800 line-clamp-1">
                      {card.label}
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] font-mono text-stone-400 group-hover:text-[#F97316] transition-colors">
                  <span className="font-semibold">{isActive ? 'Active Filter' : 'Filter Queue'}</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
