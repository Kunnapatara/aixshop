import React, { useState } from 'react';
import { Package, CheckCircle2, AlertTriangle, AlertOctagon, Layers, Flame, Info, X } from 'lucide-react';

interface WorkbenchSummaryBarProps {
  totalCount: number;
  strongCount: number;
  needsAttentionCount: number;
  criticalCount: number;
  coveragePercentage: number;
  conflictsCount: number;
  onFilterByStatus?: (status: 'Strong' | 'Needs Attention' | 'Critical' | 'All') => void;
  activeStatusFilter?: string;
}

export const WorkbenchSummaryBar: React.FC<WorkbenchSummaryBarProps> = ({
  totalCount,
  strongCount,
  needsAttentionCount,
  criticalCount,
  coveragePercentage,
  conflictsCount,
  onFilterByStatus,
  activeStatusFilter = 'All'
}) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const metrics = [
    {
      id: 'total',
      label: 'Total Products',
      value: totalCount,
      subtext: 'Catalog Scope',
      icon: Package,
      color: 'text-stone-900',
      border: 'border-stone-200/80',
      bg: 'bg-white',
      filterValue: 'All',
      explanation: 'The current representative catalog footprint for AeroPulse Athletics. All 24 items are synthetic preview records modeled for multi-surface intelligence testing.'
    },
    {
      id: 'strong',
      label: 'Strong',
      value: strongCount,
      subtext: '>= 88% Coverage',
      icon: CheckCircle2,
      color: 'text-emerald-700',
      border: 'border-emerald-200',
      bg: 'bg-emerald-50/60',
      filterValue: 'Strong',
      explanation: 'Products where core identity, physical specifications, and claims are corroborated by observed merchant or laboratory evidence with zero active conflicts.'
    },
    {
      id: 'needs-attention',
      label: 'Needs Attention',
      value: needsAttentionCount,
      subtext: '70% - 87% Coverage',
      icon: AlertTriangle,
      color: 'text-amber-700',
      border: 'border-amber-200',
      bg: 'bg-amber-50/60',
      filterValue: 'Needs Attention',
      explanation: 'Products with unverified specifications, missing warranty or return policy schema, or incomplete buyer intent grounding that lower AI engine trust.'
    },
    {
      id: 'critical',
      label: 'Critical',
      value: criticalCount,
      subtext: '< 70% or Barcode Clash',
      icon: AlertOctagon,
      color: 'text-rose-700',
      border: 'border-rose-200',
      bg: 'bg-rose-50/60',
      filterValue: 'Critical',
      explanation: 'Products with severe evidence conflicts (e.g. GTIN collisions, contradictory materials, or regulatory standard ambiguity) requiring immediate merchant arbitration.'
    },
    {
      id: 'coverage',
      label: 'Intelligence Coverage',
      value: `${coveragePercentage}%`,
      subtext: 'Catalog Average',
      icon: Layers,
      color: 'text-[#F97316]',
      border: 'border-orange-200',
      bg: 'bg-orange-50/60',
      explanation: 'Aggregate proportion of modeled product attributes currently grounded by verified evidence across the catalog. Coverage measures evidence completeness, not subjective quality.'
    },
    {
      id: 'conflicts',
      label: 'Evidence Conflicts',
      value: conflictsCount,
      subtext: 'Contradictory Claims',
      icon: Flame,
      color: 'text-red-700',
      border: 'border-red-200',
      bg: 'bg-red-50/60',
      explanation: 'Number of representative products with actively contradictory claims between merchant feeds, retailer catalogs, and physical packaging. Conflicting data degrades conversational answer confidence.'
    }
  ];

  return (
    <div className="relative">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const isFilterable = !!metric.filterValue && !!onFilterByStatus;
          const isSelected = metric.filterValue && activeStatusFilter === metric.filterValue;

          return (
            <div
              key={metric.id}
              onClick={() => {
                if (isFilterable && onFilterByStatus && metric.filterValue) {
                  onFilterByStatus(metric.filterValue as any);
                }
              }}
              className={`p-3.5 rounded-2xl border ${metric.border} ${metric.bg} transition-all relative group shadow-xs ${
                isFilterable ? 'cursor-pointer hover:border-stone-400' : ''
              } ${isSelected ? 'ring-2 ring-[#F97316] border-[#F97316] shadow-sm' : ''}`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[11px] font-medium text-stone-500 truncate">{metric.label}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTooltip(activeTooltip === metric.id ? null : metric.id);
                  }}
                  className="text-stone-400 hover:text-stone-600 transition-colors p-0.5"
                  title="Metric definition"
                >
                  <Info className="w-3 h-3" />
                </button>
              </div>

              <div className="flex items-baseline justify-between gap-2">
                <span className={`text-xl font-bold font-mono tracking-tight ${metric.color}`}>
                  {metric.value}
                </span>
                <Icon className={`w-3.5 h-3.5 ${metric.color} opacity-70`} />
              </div>

              <div className="mt-1 flex items-center justify-between text-[10px] font-mono text-stone-500">
                <span>{metric.subtext}</span>
                {isSelected && (
                  <span className="text-[#F97316] font-semibold">Active Filter</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Explanatory Popover Banner when an info icon is selected */}
      {activeTooltip && (
        <div className="mt-2.5 p-3.5 rounded-2xl bg-white border border-stone-200/80 text-xs text-stone-700 flex items-start justify-between gap-3 shadow-md">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-stone-900 mr-1.5">
                {metrics.find((m) => m.id === activeTooltip)?.label}:
              </span>
              <span>{metrics.find((m) => m.id === activeTooltip)?.explanation}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setActiveTooltip(null)}
            className="text-stone-400 hover:text-stone-600 p-0.5 shrink-0 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
