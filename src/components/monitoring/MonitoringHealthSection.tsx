// src/components/monitoring/MonitoringHealthSection.tsx
import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  HelpCircle, 
  AlertOctagon, 
  Clock, 
  Info 
} from 'lucide-react';
import { MonitoringState } from '../../types/monitoring';

interface MonitoringHealthSectionProps {
  statusDistribution: {
    stable: number;
    changed: number;
    needsReview: number;
    evidenceConflict: number;
    staleUnknown: number;
  };
  activeStateFilter: 'ALL' | MonitoringState;
  onSelectStateFilter: (state: 'ALL' | MonitoringState) => void;
}

export const MonitoringHealthSection: React.FC<MonitoringHealthSectionProps> = ({
  statusDistribution,
  activeStateFilter,
  onSelectStateFilter
}) => {
  const healthItems: {
    state: MonitoringState;
    label: string;
    count: number;
    icon: React.ElementType;
    color: string;
    bgColor: string;
    borderColor: string;
    definition: string;
  }[] = [
    {
      state: 'stable',
      label: 'Stable',
      count: statusDistribution.stable,
      icon: ShieldCheck,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      definition: 'Information remains consistent with the previous observation across all monitored dimensions.'
    },
    {
      state: 'changed',
      label: 'Changed',
      count: statusDistribution.changed,
      icon: Activity,
      color: 'text-[#F97316]',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      definition: 'A meaningful difference has been detected in attributes, offers, or documents.'
    },
    {
      state: 'needs_review',
      label: 'Needs Review',
      count: statusDistribution.needsReview,
      icon: HelpCircle,
      color: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      definition: 'The change may affect canonical product intelligence, discoverability, or commerce interpretation.'
    },
    {
      state: 'conflict',
      label: 'Evidence Conflict',
      count: statusDistribution.evidenceConflict,
      icon: AlertOctagon,
      color: 'text-rose-700',
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      definition: 'Sources disagree after a change. Discrepancies are never silently averaged or auto-resolved.'
    },
    {
      state: 'stale_unknown',
      label: 'Stale / Unknown',
      count: statusDistribution.staleUnknown,
      icon: Clock,
      color: 'text-stone-600',
      bgColor: 'bg-stone-100',
      borderColor: 'border-stone-200',
      definition: 'Required evidence is no longer sufficiently current, or validUntil is unknown and unverified.'
    }
  ];

  return (
    <div className="bg-white border-b border-stone-200 py-5 px-4 sm:px-6 lg:px-8 shadow-2xs">
      <div className="max-w-7xl mx-auto">
        {/* Header with Honesty Callout */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider font-mono">
                Monitoring Health
              </h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200 font-bold">
                Monitoring States by Signal · Representative Preview
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Reflects the semantic consistency and evidence validity of product intelligence — <span className="text-stone-700 font-medium">not server or network uptime</span>.
            </p>
          </div>

          {activeStateFilter !== 'ALL' && (
            <button
              type="button"
              onClick={() => onSelectStateFilter('ALL')}
              className="text-xs font-mono text-[#F97316] hover:text-orange-700 font-bold underline underline-offset-4 self-start sm:self-auto cursor-pointer"
            >
              Reset State Filter (Showing {activeStateFilter})
            </button>
          )}
        </div>

        {/* 5 States Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {healthItems.map((item) => {
            const Icon = item.icon;
            const isSelected = activeStateFilter === item.state;

            return (
              <button
                key={item.state}
                type="button"
                onClick={() => onSelectStateFilter(isSelected ? 'ALL' : item.state)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative shadow-2xs ${
                  isSelected 
                    ? `${item.bgColor} ${item.borderColor} ring-2 ring-[#F97316]` 
                    : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/50'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-xl ${item.bgColor} border ${item.borderColor}`}>
                      <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                    </div>
                    <span className="text-xs font-bold text-stone-900">
                      {item.label}
                    </span>
                  </div>
                  <span className={`text-base font-bold font-mono ${item.color}`}>
                    {item.count}
                  </span>
                </div>

                <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2">
                  {item.definition}
                </p>

                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#F97316]"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
