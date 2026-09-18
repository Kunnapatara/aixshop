// src/components/monitoring/MonitoringSummaryBar.tsx
import React from 'react';
import { 
  Package, 
  Activity, 
  AlertTriangle, 
  FileCheck2, 
  DollarSign, 
  Sparkles 
} from 'lucide-react';
import { MonitoringSummaryMetrics } from '../../types/monitoring';

interface MonitoringSummaryBarProps {
  metrics: MonitoringSummaryMetrics;
  onFilterChangeType?: (category: any) => void;
  onFilterPriority?: (priority: any) => void;
}

export const MonitoringSummaryBar: React.FC<MonitoringSummaryBarProps> = ({
  metrics,
  onFilterChangeType,
  onFilterPriority
}) => {
  return (
    <div className="bg-stone-100/60 border-b border-stone-200 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-600 font-bold">
              Monitoring Model Diagnostic Summary
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-orange-50 text-[#F97316] border border-orange-200 font-bold">
              Representative Preview
            </span>
          </div>
          <span className="text-[11px] text-stone-500 font-mono hidden sm:inline">
            Pipeline: Detect → Diagnose → Prioritize → Review → Recover
          </span>
        </div>

        {/* 6 Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* 1. Monitored Products */}
          <div className="p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 transition-all shadow-2xs">
            <div className="flex items-center justify-between text-stone-500 mb-1">
              <span className="text-xs font-semibold">Monitored Products</span>
              <Package className="w-3.5 h-3.5 text-stone-400" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-stone-900 font-mono tracking-tight">
                {metrics.monitoredProducts}
              </span>
              <span className="text-[10px] font-mono text-[#F97316] font-bold">Catalog SKUs</span>
            </div>
            <p className="text-[10px] text-stone-400 mt-1 truncate">
              Representative preview
            </p>
          </div>

          {/* 2. Changes Detected */}
          <div 
            onClick={() => onFilterChangeType && onFilterChangeType('ALL')}
            className="p-3.5 rounded-2xl bg-white border border-orange-200 hover:border-orange-400 transition-all cursor-pointer group shadow-2xs"
          >
            <div className="flex items-center justify-between text-[#F97316] mb-1">
              <span className="text-xs font-bold">Changes Detected</span>
              <Activity className="w-3.5 h-3.5 text-[#F97316] group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-[#F97316] font-mono tracking-tight">
                {metrics.changesDetected}
              </span>
              <span className="text-[10px] font-mono text-stone-500 font-medium">Events</span>
            </div>
            <p className="text-[10px] text-stone-500 mt-1 truncate" title="Representative change events detected in the monitoring model.">
              In monitoring model
            </p>
          </div>

          {/* 3. High Priority */}
          <div 
            onClick={() => onFilterPriority && onFilterPriority('High')}
            className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 hover:border-amber-300 transition-all cursor-pointer group shadow-2xs"
          >
            <div className="flex items-center justify-between text-amber-800 mb-1">
              <span className="text-xs font-bold">High Priority</span>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-amber-900 font-mono tracking-tight">
                {metrics.highPriority}
              </span>
              <span className="text-[10px] font-mono text-amber-700 font-semibold">Require Action</span>
            </div>
            <p className="text-[10px] text-amber-700/80 mt-1 truncate">
              Affects identity or trust
            </p>
          </div>

          {/* 4. Evidence Changes */}
          <div 
            onClick={() => onFilterChangeType && onFilterChangeType('evidence_integrity')}
            className="p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 transition-all cursor-pointer group shadow-2xs"
          >
            <div className="flex items-center justify-between text-stone-600 mb-1">
              <span className="text-xs font-semibold">Evidence Changes</span>
              <FileCheck2 className="w-3.5 h-3.5 text-blue-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-blue-700 font-mono tracking-tight">
                {metrics.evidenceChanges}
              </span>
              <span className="text-[10px] font-mono text-stone-400">Claims</span>
            </div>
            <p className="text-[10px] text-stone-400 mt-1 truncate">
              Appeared, lost, or conflict
            </p>
          </div>

          {/* 5. Offer Changes */}
          <div 
            onClick={() => onFilterChangeType && onFilterChangeType('offer_intelligence')}
            className="p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 transition-all cursor-pointer group shadow-2xs"
          >
            <div className="flex items-center justify-between text-stone-600 mb-1">
              <span className="text-xs font-semibold">Offer Changes</span>
              <DollarSign className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-emerald-700 font-mono tracking-tight">
                {metrics.offerChanges}
              </span>
              <span className="text-[10px] font-mono text-stone-400">Commercial</span>
            </div>
            <p className="text-[10px] text-stone-400 mt-1 truncate">
              Price, stock, or promo
            </p>
          </div>

          {/* 6. Discovery Signals Changed */}
          <div 
            onClick={() => onFilterChangeType && onFilterChangeType('discovery_readiness')}
            className="p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-stone-300 transition-all cursor-pointer group shadow-2xs"
          >
            <div className="flex items-center justify-between text-stone-600 mb-1">
              <span className="text-xs font-semibold">Discovery Signals</span>
              <Sparkles className="w-3.5 h-3.5 text-purple-600 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-purple-700 font-mono tracking-tight">
                {metrics.discoverySignalsChanged}
              </span>
              <span className="text-[10px] font-mono text-stone-400">Readiness</span>
            </div>
            <p className="text-[10px] text-stone-400 mt-1 truncate">
              Completeness shifts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
